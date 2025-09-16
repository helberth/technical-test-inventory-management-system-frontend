import { createFileRoute, useRouter } from "@tanstack/react-router";
import * as React from "react";
import { z } from "zod";

import { LoginUser } from "@/routes/_publicLayout/(auth)/-components/login-user";

export const Route = createFileRoute("/_publicLayout/(auth)/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: LoginComponent,
});

function LoginComponent() {
  const router = useRouter();
  const search = Route.useSearch();
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const authData = localStorage.getItem('auth-storage');
        if (authData) {
          const parsed = JSON.parse(authData);
          if (parsed?.state?.user?.isLoggedIn) {
            const redirectTo = search.redirect || '/products';
            // Only redirect if we're not already on the target page
            if (window.location.pathname !== redirectTo) {
              window.location.href = redirectTo;
              return;
            }
          }
        }
      } catch (e) {
        console.error('Error checking auth status:', e);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
    
    // Only depend on search.redirect since we're using window.location for navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.redirect]);

  // Show loading state while checking auth
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-gradient-to-br from-background to-muted/20 px-4 pt-4 sm:px-6">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="fixed left-4 right-4 top-4 inline-flex items-center justify-center rounded-lg border bg-card/80 px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-foreground sm:left-6 sm:right-auto sm:top-6 sm:justify-start sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1.5"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="sm:hidden">Back to home</span>
          {/* <span className="hidden sm:inline">Home</span> */}
        </a>
        <div className="w-full space-y-6 rounded-xl border bg-card p-5 shadow-lg dark:border-gray-800 sm:space-y-8 sm:p-8">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="mt-4">
            <LoginUser />
          </div>
          <div className="border-t border-border/50 pt-4">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/register";
                }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
