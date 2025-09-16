"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "../-api/mutation-register";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  })
});

export function RegisterForm() {
  const {
    mutate: registerUser,
    isPending,
    error: registrationError,
  } = useRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  // Handle server-side errors
  useEffect(() => {
    if (registrationError) {
      console.log("Registration error received:", registrationError);

      // Handle duplicate account error
      if (
        registrationError.code === "DUPLICATE_ACCOUNT" ||
        registrationError.code === "ApplicationError" ||
        registrationError.originalError?.data?.error?.message?.includes(
          "already taken",
        )
      ) {
        // This is a duplicate account error, we'll show it in the form-level error
        console.log("Duplicate account error detected");
        return;
      }

      // Handle validation errors
      if (
        registrationError.code === "VALIDATION_ERROR" ||
        registrationError.originalError?.data?.error?.name === "ValidationError"
      ) {
        const errors =
          registrationError.originalError?.data?.error?.details?.errors || {};

        // Set field-level errors if we have them
        Object.entries(errors).forEach(([field, error]: [string, any]) => {
          const fieldName = field.toLowerCase();
          if (fieldName in form.getValues()) {
            form.setError(fieldName as keyof z.infer<typeof formSchema>, {
              type: "server",
              message: error.message || `Error en el campo ${field}`,
            });
          }
        });
      }
    }
  }, [registrationError, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Clear any previous server errors
    form.clearErrors();

    registerUser({
      username: values.username.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre de usuario <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="nombredeusuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contraseña <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Correo Electrónico <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Form actions area with fixed position */}
        <div className="sticky bottom-0 bg-white pb-6 pt-4">
          <Button
            type="submit"
            className="mb-4 w-full"
            disabled={isPending}
            aria-busy={isPending}
            aria-live="polite"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              "Crear cuenta"
            )}
          </Button>

          {/* Display form-level errors */}
          {registrationError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              <p className="font-medium">
                {registrationError.code === "DUPLICATE_ACCOUNT" ||
                registrationError.code === "ApplicationError"
                  ? "Cuenta existente"
                  : "Error al crear la cuenta"}
              </p>
              <p>
                {registrationError.code === "DUPLICATE_ACCOUNT" ||
                registrationError.code === "ApplicationError"
                  ? "El correo electrónico o nombre de usuario ya está en uso. ¿Ya tienes una cuenta? Intenta iniciar sesión o utiliza un correo diferente."
                  : registrationError.message}
              </p>

              {/* Debug info - only shown in development */}
              {process.env.NODE_ENV === "development" && (
                <div className="mt-2 rounded bg-black/5 p-2 text-xs">
                  <p className="font-medium">Información de depuración:</p>
                  <p>
                    <span className="font-medium">Código:</span>{" "}
                    {registrationError.code || "Ninguno"}
                  </p>
                  {registrationError.originalError?.data?.error?.message && (
                    <p>
                      <span className="font-medium">Error del servidor:</span>{" "}
                      {registrationError.originalError.data.error.message}
                    </p>
                  )}
                  <details className="mt-1">
                    <summary className="cursor-pointer text-xs text-gray-600">
                      Ver detalles técnicos
                    </summary>
                    <pre className="mt-1 max-h-40 overflow-auto rounded bg-black/10 p-2">
                      {JSON.stringify(
                        {
                          code: registrationError.code,
                          message: registrationError.message,
                          serverError:
                            registrationError.originalError?.data?.error ||
                            null,
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Al crear una cuenta, aceptas nuestros Términos de Servicio y Política
          de Privacidad.
        </p>
      </form>
    </Form>
  );
}
