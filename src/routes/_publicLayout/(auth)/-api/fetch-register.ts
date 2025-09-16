import { publicApi } from "@/lib/api";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

//User Type
interface ApiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

//Successful Registration Response
interface RegisterResponse {
  jwt: string;
  user: ApiUser;
  registration?: {
    email: string;
    username: string;
  };
}

export async function registerUser(
  userData: RegisterRequest,
): Promise<RegisterResponse> {
  const registrationData = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };

  console.log("Sending registration request:", registrationData);

  try {
    const response = await publicApi.post<RegisterResponse>(
      "/auth/register",
      registrationData,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    console.log("Registration successful");
    return response;
  } catch (error: any) {
    // Log the raw error for debugging
    console.log("Raw error object:", error);

    // Default error message
    let errorMessage = "Error al conectar con el servidor";
    let errorCode = "UNKNOWN_ERROR";

    try {
      // Handle Axios error format
      if (error.response) {
        const { status, data } = error.response;

        // Log the error details for debugging
        console.error("Registration error details:", {
          status,
          statusText: error.response.statusText,
          data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: error.config?.data,
          },
        });

        // Extract error data from different possible locations
        const errorData = data?.error || data?.data?.error;

        if (errorData) {
          const errorStatus = errorData.status || status;
          const errorName = errorData.name;
          const errorMessageText =
            errorData.message || errorData.error?.message;
          const details = errorData.details;

          errorCode = errorName || `HTTP_${errorStatus}`;

          // Handle specific error types
          if (errorStatus === 400) {
            if (
              errorMessageText?.includes("already taken") ||
              errorName === "ApplicationError" ||
              errorMessageText?.includes("Email or Username are already taken")
            ) {
              errorMessage =
                "El correo electrónico o nombre de usuario ya está en uso. ¿Ya tienes una cuenta? Intenta iniciar sesión o utiliza un correo diferente.";
              errorCode = "DUPLICATE_ACCOUNT";
            } else if (errorName === "ValidationError") {
              errorMessage =
                errorMessageText ||
                "Error de validación. Por favor verifica los datos ingresados.";
              errorCode = "VALIDATION_ERROR";

              // If we have validation details, add them to the message
              if (details?.errors) {
                const errorMessages = Object.values(details.errors)
                  .map(
                    (err: any) =>
                      (err as any).message ||
                      (err as any).id ||
                      "Error de validación",
                  )
                  .filter(Boolean);

                if (errorMessages.length > 0) {
                  errorMessage = errorMessages.join("\n");
                }
              }
            } else {
              errorMessage =
                errorMessageText ||
                "Solicitud incorrecta. Por favor verifica los datos e intenta de nuevo.";
            }
          } else if (errorStatus === 401) {
            errorMessage = "No autorizado. Por favor inicia sesión nuevamente.";
            errorCode = "UNAUTHORIZED";
          } else if (errorStatus === 403) {
            errorMessage = "No tienes permiso para realizar esta acción.";
            errorCode = "FORBIDDEN";
          } else if (errorStatus === 404) {
            errorMessage = "El recurso solicitado no fue encontrado.";
            errorCode = "NOT_FOUND";
          } else if (errorStatus === 409) {
            errorMessage =
              "Conflicto: " +
              (errorMessageText || "El recurso ya existe o está en conflicto.");
            errorCode = "CONFLICT";
          } else if (errorStatus === 429) {
            errorMessage =
              "Demasiadas solicitudes. Por favor intenta de nuevo más tarde.";
            errorCode = "RATE_LIMIT_EXCEEDED";
          } else if (errorStatus >= 500) {
            errorMessage =
              "Error interno del servidor. Por favor intenta de nuevo más tarde.";
            errorCode = "INTERNAL_SERVER_ERROR";
          } else {
            errorMessage =
              errorMessageText || `Error del servidor (${errorStatus})`;
          }
        } else {
          errorMessage =
            data?.message ||
            `Error del servidor: ${status} ${error.response.statusText}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage =
          "No se recibió respuesta del servidor. Verifica tu conexión a internet.";
        errorCode = "NETWORK_ERROR";
      } else if (error.message) {
        // Something happened in setting up the request
        errorMessage = `Error en la solicitud: ${error.message}`;
        errorCode = "REQUEST_ERROR";
      }
    } catch (parseError) {
      console.error("Error parsing error object:", parseError);
      const fallbackError = new Error(
        "Error desconocido al procesar la respuesta del servidor.",
      );
      (fallbackError as any).code = "ERROR_PARSING_ERROR";
      (fallbackError as any).originalError = error;
      throw fallbackError;
    }

    // Create and throw the enhanced error
    const enhancedError = new Error(errorMessage);
    (enhancedError as any).code = errorCode;
    (enhancedError as any).originalError = error;
    throw enhancedError;
  }
}
