import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@/components/theme-provider";
import { useAuthStore } from "@/routes/_publicLayout/(auth)/-hooks/use-auth-store";

import { Spinner } from "./components/Spinner";
import "./index.css";
import { routeTree } from "./routeTree.gen";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: (failureCount, error: any) => {
        // No reintentar en caso de error 401 (No autorizado)
        console.log("queryClient Error:", error);
        if (error?.response?.status === 401) {
          return false;
        }
        // Reintentar hasta 3 veces para otros errores
        return failureCount < 3;
      },
    },
  },
});

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="p-2 text-2xl">
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }: { error: Error }) => <ErrorComponent error={error} />,
  context: {
    queryClient,
    auth: undefined!, // We'll inject this when we render
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

function App() {
  const auth = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <RouterProvider
          router={router}
          context={{
            queryClient, // ← AGREGASTE ESTO
            auth,
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
