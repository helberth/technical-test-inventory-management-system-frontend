import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

//Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/routes/_publicLayout/(auth)/-api/mutation-login";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
  email: z.string({
    required_error: "El correo electrónico es requerido",
  }).email({
    message: "Por favor ingresa un correo electrónico válido",
  }),
  password: z.string({
    required_error: "La contraseña no puede estar vacía.",
  }).regex(/^.{6,20}$/, {
    message: "Mínimo 6 y máximo 20 caracteres.",
  }),
  // .regex(/(?=.*[A-Z])/, {
  //   message: "At least one uppercase character.",
  // })
  // .regex(/(?=.*[a-z])/, {
  //   message: "At least one lowercase character.",
  // })
  // .regex(/(?=.*\d)/, {
  //   message: "At least one digit.",
  // }),
  // .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
  //   message: "At least one special character.",
  // }),
});

type FormData = z.infer<typeof formSchema>;

const LoginUser = () => {
  const { mutateAsync, error } = useLoginMutation();
  const router = useRouter();
  const search = createFileRoute('/_publicLayout/(auth)/login')({}).useSearch();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  const onSubmit = async (values: FormData) => {
    try {
      console.log('Calling mutateAsync...');
      const result = await mutateAsync({ 
        email: values.email, 
        password: values.password,
        redirect: search.redirect || '/products'
      });
      
      // If we get here, login was successful
      if (result) {
        // Force a hard redirect to ensure all auth state is properly set
        const redirectTo = search.redirect || '/products';
        window.location.href = redirectTo;
      }
    } catch (error) {
      console.error('Login error in onSubmit:', error);
      // Re-throw the error to show it in the UI
      throw error;
    }
  };

  // Redirect if already logged in
  React.useEffect(() => {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      try {
        const { state } = JSON.parse(authData);
        if (state?.user?.isLoggedIn) {
          const redirectTo = search.redirect || '/products';
          window.location.href = redirectTo;
        }
      } catch (e) {
        console.error('Error parsing auth data:', e);
      }
    }
  }, [search.redirect]);
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="correo electrónico"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Este es tu correo electrónico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="contraseña" {...field} />
              </FormControl>
              <FormDescription>Ingresa tu contraseña.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Iniciar Sesión"}
        </Button>
        {/* <Button className="bg-sky-600 mx-2" onClick={handlerRegister}>
          Register
        </Button> */}
      </form>
    </Form>
  );
};

export { LoginUser };
