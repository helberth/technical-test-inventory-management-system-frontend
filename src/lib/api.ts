import axios from "redaxios";

import { useAuthStore } from "@/routes/_publicLayout/(auth)/-hooks/use-auth-store";
import { getApiURL } from "@/utils/config";

type HttpMethod = "get" | "post" | "put" | "delete";

interface RequestOptions {
  headers?: Record<string, string>;
  [key: string]: any;
}

// Función base para crear cualquier tipo de petición
const createBaseRequest = async <T>(
  method: HttpMethod,
  url: string,
  data: any = undefined,
  options: RequestOptions = {},
  requireAuth: boolean = true,
): Promise<T> => {
  const headers: Record<string, string> = {
    // "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  console.log(url);

  // Agregar autenticación si es requerida
  if (requireAuth) {
    const token = useAuthStore.getState().user?.authToken;
    if (token) {
      const cleanToken = token.startsWith("Bearer ")
        ? token.substring(7)
        : token;
      headers["Authorization"] = `Bearer ${cleanToken}`;
    } else {
      console.warn("No auth token found for authenticated request to:", url);
    }
  }

  // Construir la URL completa
  const fullUrl = `${getApiURL()}${url.startsWith("/") ? "" : "/"}${url}`;

  // Configuración de la petición
  const config = {
    method,
    url: fullUrl,
    headers,
    ...(method !== "get" && data ? { data } : {}),
    ...(method === "get" && data ? { params: data } : {}),
  };

  try {
    const response = await axios<T>(config);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error("API Request Error:", {
      url: fullUrl,
      method,
      status: error.response?.status,
      statusText: error.response?.statusText,
    });

    // Manejar error de autenticación
    if (error.response?.status === 401 && requireAuth) {
      console.log("Authentication error - clearing auth state");
      useAuthStore.getState().removeUser();

      // Redirigir al login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    throw error;
  }
};

// API para peticiones autenticadas
export const api = {
  get: <T = any>(url: string, options?: RequestOptions) =>
    createBaseRequest<T>("get", url, undefined, options, true),

  post: <T = any>(url: string, data?: any, options?: RequestOptions) =>
    createBaseRequest<T>("post", url, data, options, true),

  put: <T = any>(url: string, data?: any, options?: RequestOptions) =>
    createBaseRequest<T>("put", url, data, options, true),

  delete: <T = any>(url: string, options?: RequestOptions) =>
    createBaseRequest<T>("delete", url, undefined, options, true),
} as const;

// API para peticiones públicas (sin autenticación)
export const publicApi = {
  get: <T = any>(url: string, options?: RequestOptions) =>
    createBaseRequest<T>("get", url, undefined, options, false),

  post: <T = any>(url: string, data?: any, options?: RequestOptions) =>
    createBaseRequest<T>("post", url, data, options, false),

  put: <T = any>(url: string, data?: any, options?: RequestOptions) =>
    createBaseRequest<T>("put", url, data, options, false),

  delete: <T = any>(url: string, options?: RequestOptions) =>
    createBaseRequest<T>("delete", url, undefined, options, false),
} as const;
