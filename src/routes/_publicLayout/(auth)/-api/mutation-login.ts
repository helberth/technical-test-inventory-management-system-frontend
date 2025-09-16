import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/routes/_publicLayout/(auth)/-hooks/use-auth-store";

import { UserDataType } from "../-types/user";
import { setUserLocationAndCurrency } from "./auth-utils";
import getLogin from "./fetch-login";

type LoginCredentials = {
  email: string;
  password: string;
  redirect?: string;
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { setUser, removeUser } = useAuthStore();

  return useMutation<{ access_token: string; user: any }, Error, LoginCredentials>({
    mutationKey: ["login"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
      redirect?: string;
    }) => {
      try {
        const response = await getLogin(email, password);
        return response;
      } catch (error: any) {
        // Re-throw the error to be caught by the component
        throw new Error(error.message || 'Error during login');
      }
    },
    onSuccess: async (data, variables) => {
      console.log("useLoginMutation onSuccess - Datos recibidos:", data);

      // Store the access token
      const authToken = data.access_token;

      if (!authToken || !data.user) {
        throw new Error('Invalid login response: missing token or user data');
      }

      try {
        // Create user data from the login response
        const userData: UserDataType = {
          id: data.user.id || 0,
          userName: data.user.username || (data.user.email ? data.user.email.split('@')[0] : 'user'),
          email: data.user.email || '',
          createdAt: new Date().toISOString(),
          authToken,
          isLoggedIn: true,
        };

        // Set the user in the auth store
        setUser(userData);
        console.log("User updated in auth store:", userData);
        
        // Store token in localStorage for persistence
        localStorage.setItem('token', authToken);
        
        // Invalidate queries and set location/currency
        queryClient.invalidateQueries();
        await setUserLocationAndCurrency(queryClient);
        
        // The actual redirect will be handled by the component
        // to ensure the auth state is properly updated
        
      } catch (error) {
        console.error("Error processing login response:", error);
        throw new Error('Failed to process login response');
      }
    },
    onError: (error: Error) => {
      console.error('Login error:', error);
      removeUser();
      // The error will be available in the error property from useMutation
    },
  });
};
