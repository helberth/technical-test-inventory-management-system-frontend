import { createFileRoute } from "@tanstack/react-router";

import { RegisterForm } from "./-components/register-form";

export const Route = createFileRoute("/_publicLayout/(auth)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4 sm:p-4">
      <a
        href="/"
        className="fixed left-4 right-4 top-4 inline-flex items-center justify-center rounded-lg border bg-card/80 px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-foreground sm:absolute sm:left-6 sm:right-auto sm:top-6 sm:justify-start sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none"
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
      <div className="mt-12 w-full max-w-2xl space-y-4 rounded-xl border bg-card p-5 shadow-lg dark:border-gray-800 sm:mt-0 sm:space-y-6 sm:p-8">
        <div className="sticky top-0 -mx-5 space-y-1 bg-card px-5 pb-3 pt-2 text-center sm:static sm:mx-0 sm:bg-transparent sm:px-8 sm:pb-0 sm:pt-0">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Complete the form to sign up
          </p>
        </div>
        <div className="-mx-2 sm:mx-0">
          <RegisterForm />
        </div>
        <div className="sticky bottom-0 -mx-5 border-t border-border/50 bg-card px-5 pb-2 pt-4 sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pb-0">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/login";
              }}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
