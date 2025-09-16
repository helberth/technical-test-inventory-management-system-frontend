import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/routes/_publicLayout/(auth)/-hooks/use-auth-store";

// This is a root route that handles redirection
export const Route = createFileRoute("/")({
  component: RootRedirect,
});

function RootRedirect() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  useEffect(() => {
    if (!user?.isLoggedIn) {
      navigate({ to: "/home" });
    } else {
      navigate({ to: "/products" });
    }
  }, [navigate, user]);
  
  return <div>Redirecting...</div>;
}
