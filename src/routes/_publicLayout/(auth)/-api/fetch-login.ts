import { publicApi } from "@/lib/api";

type LoginResponse = {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};


export type LoginResponseType = (
  email: string,
  password: string,
) => Promise<LoginResponse>;

export const getLogin = async (email: string, password: string) => {
  try {
    const response = await publicApi.post<LoginResponse>("/auth/login", {
      email: email,
      password: password,
    });

    console.log("Login response:", response);
    return response;
  } catch (error: any) {
    console.error("Error en la autenticación:", error);

    // First, check if we have data directly in the error
    if (error?.data?.detail) {
      throw new Error(error.data.detail);
    }

    // Then check error.response.data
    if (error?.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    // If we have a data object, try to use it
    if (error?.data) {
      if (typeof error.data === 'string') {
        throw new Error(error.data);
      }
      throw new Error(JSON.stringify(error.data));
    }

    // If we have a response with status text, use that
    if (error?.response?.statusText) {
      throw new Error(error.response.statusText);
    }

    // If we have a message, use that
    if (error?.message) {
      return Promise.reject(error);
    }

    // Fallback to a generic error message
    throw new Error('Error during login');
  }
};

export default getLogin;
