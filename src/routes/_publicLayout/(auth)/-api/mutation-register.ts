import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { useAuthStore } from "@/routes/_publicLayout/(auth)/-hooks/use-auth-store";

import { UserDataType } from "../-types/user.ts";
import { setUserLocationAndCurrency } from "./auth-utils.ts";
import { type RegisterRequest, registerUser } from "./fetch-register.ts";

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (userData: RegisterRequest) => {
      try {
        return await registerUser(userData);
      } catch (error: any) {
        console.error("Registration error:", error);

        // If the error is already enhanced by registerUser, just rethrow it
        if (error.code && error.code !== "UNKNOWN_ERROR") {
          throw error;
        }

        // Default error message
        let errorMessage =
          "Ocurrió un error al crear tu cuenta. Por favor, intenta nuevamente.";
        let errorCode = "UNKNOWN_ERROR";

        // Check for error in different possible locations
        const errorData =
          error.response?.data?.error ||
          error.originalError?.response?.data?.error ||
          error.data?.error ||
          error.originalError?.data?.error;

        if (errorData) {
          const { message, name } = errorData;

          if (
            message?.includes("already taken") ||
            name === "ApplicationError" ||
            message?.includes("Email or Username are already taken")
          ) {
            errorMessage =
              "El correo electrónico o nombre de usuario ya está en uso. ¿Ya tienes una cuenta? Intenta iniciar sesión o utiliza un correo diferente.";
            errorCode = "DUPLICATE_ACCOUNT";
          } else if (message) {
            errorMessage = message;
            errorCode = name || errorCode;
          }
        }
        // Handle other error formats
        else if (error.message) {
          errorMessage = error.message;
          errorCode = error.code || errorCode;
        }

        // Create and throw the enhanced error
        const enhancedError = new Error(errorMessage);
        (enhancedError as any).code = errorCode;
        (enhancedError as any).originalError = error;
        throw enhancedError;
      }
    },
    onSuccess: async (data) => {
      // First, set the basic user data with a temporary role
      // Create user data from the registration response
      const userData: UserDataType = {
        id: data.user.id,
        userName: data.user.username,
        email: data.user.email,
        authToken: data.jwt,
        isLoggedIn: true,
        createdAt: data.user.createdAt || new Date().toISOString(),
      };

      // Set the user in the auth store
      setUser(userData);
      console.log("Registered user in auth store:", userData);

      try {
        // Invalidate queries and set location/currency
        queryClient.invalidateQueries();
        await setUserLocationAndCurrency(queryClient);
      } catch (error) {
        console.warn("Could not set user location/currency:", error);
        // Continue with registration even if location/currency setup fails
      }

      // Show success message
      toast.success("¡Registro exitoso!", {
        description: "Tu cuenta ha sido creada correctamente. Redirigiendo...",
      });

      // Redirect to dashboard after a short delay
      // setTimeout(() => {
      //   navigate({ to: "/home" });
      // }, 1500);
    },
    onError: (error: any) => {
      console.error("Registration mutation error:", error);

      // Show error message with appropriate title based on error code
      const errorTitle =
        error.code === "DUPLICATE_ACCOUNT"
          ? "Cuenta existente"
          : "Error en el registro";

      toast.error(errorTitle, {
        description:
          error.message ||
          "Ocurrió un error al crear tu cuenta. Por favor, verifica los datos e intenta nuevamente.",
      });
    },
  });
};
