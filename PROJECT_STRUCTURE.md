# Project Structure: react-tankstack-template

This document provides an overview of the project structure and source code.
Only includes `/src` directory and `package.json`.

## Table of Contents
- [package.json](#packagejson)
- `src/`
  - [`.DS_Store`](#ds_store)
  - [`index.css`](#indexcss)
  - [`main.tsx`](#maintsx)
  - [`routeTree.gen.ts`](#routetreegents)
  - [`vite-env.d.ts`](#vite-envdts)
- `mocks/`
  - [`products-mock.ts`](#products-mockts)
- `types/`
  - [`inventory.d.ts`](#inventorydts)
  - [`openapi.json`](#openapijson)
- `tests/`
  - [`GUIA_PRUEBAS.md`](#guia_pruebasmd)
- `utils/`
  - [`api.rest`](#apirest)
  - [`config.ts`](#configts)
- `components/`
  - [`ImageUploaderField.tsx`](#imageuploaderfieldtsx)
  - [`Spinner.tsx`](#spinnertsx)
  - [`theme-provider.tsx`](#theme-providertsx)
  - `ui/`
    - [`badge.tsx`](#badgetsx)
    - [`button.tsx`](#buttontsx)
    - [`form.tsx`](#formtsx)
    - [`input.tsx`](#inputtsx)
    - [`label.tsx`](#labeltsx)
    - [`password-input.tsx`](#password-inputtsx)
    - [`select.tsx`](#selecttsx)
    - [`table.tsx`](#tabletsx)
    - [`textarea.tsx`](#textareatsx)
- `lib/`
  - [`api.ts`](#apits)
  - [`utils.ts`](#utilsts)
- `routes/`
  - [`.DS_Store`](#ds_store)
  - [`__root.tsx`](#__roottsx)
  - [`_productLayout.tsx`](#_productlayouttsx)
  - [`_publicLayout.tsx`](#_publiclayouttsx)
  - [`index.tsx`](#indextsx)
  - [`routeTree.gen.ts`](#routetreegents)
  - `_publicLayout/`
    - [`home.tsx`](#hometsx)
    - `(auth)/`
      - [`.DS_Store`](#ds_store)
      - [`login.tsx`](#logintsx)
      - [`register.tsx`](#registertsx)
      - `-types/`
        - [`user.ts`](#userts)
      - `-api/`
        - [`auth-utils.ts`](#auth-utilsts)
        - [`fetch-login.ts`](#fetch-logints)
        - [`fetch-register.ts`](#fetch-registerts)
        - [`mutation-login.ts`](#mutation-logints)
        - [`mutation-register.ts`](#mutation-registerts)
      - `-components/`
        - [`login-user.tsx`](#login-usertsx)
        - [`register-form.tsx`](#register-formtsx)
      - `-hooks/`
        - [`use-auth-store.ts`](#use-auth-storets)
  - `_productLayout/`
    - [`.DS_Store`](#ds_store)
    - `products/`
      - [`.DS_Store`](#ds_store)
      - [`new.tsx`](#newtsx)
      - [`route.tsx`](#routetsx)
      - `-types/`
        - [`product.ts`](#productts)
      - `-api/`
        - [`fetch-auth-products.ts`](#fetch-auth-productsts)
        - [`query-auth-products.ts`](#query-auth-productsts)
      - `-components/`
        - [`ProductForm.tsx`](#productformtsx)
        - [`ProductList.tsx`](#productlisttsx)
      - `-hooks/`
        - [`useImageUploadHandlers.ts`](#useimageuploadhandlersts)
      - `$productId/`
        - [`edit.tsx`](#edittsx)
        - [`index.tsx`](#indextsx)
        - [`route.tsx`](#routetsx)

---

## `package.json`

```json
{
  "name": "product-showcase-template",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "types:generate": "openapi-typescript ./src/types/openapi.json -o ./src/types/inventory.d.ts",
    "test": "vitest",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,css,scss,md}": [
      "prettier --write"
    ]
  },
  "prettier": {
    "importOrder": [
      "^@/(.*)$",
      "^[./]"
    ],
    "importOrderSeparation": true,
    "importOrderSortSpecifiers": true,
    "plugins": [
      "@trivago/prettier-plugin-sort-imports",
      "prettier-plugin-tailwindcss"
    ]
  },
  "dependencies": {
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-slot": "^1.2.3",
    "@tanstack/react-query": "^5.66.9",
    "@tanstack/react-router": "^1.111.7",
    "@tanstack/router": "0.0.1-beta.53",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.476.0",
    "next-themes": "^0.4.4",
    "openapi-typescript": "^7.6.1",
    "postcss": "^8.5.3",
    "qs": "^6.11.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.62.0",
    "redaxios": "^0.5.1",
    "sonner": "^2.0.1",
    "tailwind-merge": "^2.0.0",
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.0",
    "uuid": "^13.0.0",
    "zod": "^3.25.76",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@faker-js/faker": "^9.9.0",
    "@tanstack/react-query-devtools": "^5.66.9",
    "@tanstack/router-devtools": "^1.111.7",
    "@tanstack/router-vite-plugin": "^1.111.7",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/react-hooks": "^8.0.1",
    "@testing-library/user-event": "^14.6.1",
    "@types/axios": "^0.14.4",
    "@types/node": "^22.13.5",
    "@types/qs": "^6.9.18",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.0.0",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "jsdom": "^27.0.0",
    "prettier": "^3.5.3",
    "prettier-plugin-tailwindcss": "^0.6.12",
    "typescript": "~5.7.2",
    "typescript-eslint": "^8.24.1",
    "vite": "^6.2.0",
    "vitest": "^3.2.4"
  }
}

```

---

## `src/.DS_Store`

```text
[Binary file content not displayed]
```

---

## `src/components/ImageUploaderField.tsx`

```tsx
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
// import { useWatch } from 'react-hook-form';
// import { useState, useRef, useEffect, useCallback } from 'react';

interface Props {
  control: any;
  form: any;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  previewUrl: string | null;
  isDragging: boolean;
  handleFileChange: (file: File) => void;
  handleRemoveImage: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
}

export function ImageUploaderField({
  control,
  form,
  fileInputRef,
  previewUrl,
  isDragging,
  handleFileChange,
  handleRemoveImage,
  handleDragOver,
  handleDragLeave,
  handleDrop,
}: Props) {
  return (
    <>
      <FormField
        control={control}
        name="imageFile"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>Product Image</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {previewUrl ? (
                  <div className="relative group">
                    <div className="relative w-full max-w-md h-48 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                        title="Remove image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex justify-center">
                      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-blue-500'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, WEBP (MAX. 5MB)
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  ref={(e) => {
                    fileInputRef.current = e;
                    field.ref?.(e);
                  }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileChange(file);
                      onChange(file);
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Optional image URL */}
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or enter image URL
            </span>
          </div>
        </div>
        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...field}
                  value={typeof field.value === 'string' ? field.value : ''}
                  onChange={(e) => {
                    field.onChange(e);
                    form.setValue('imageFile', undefined);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

```

---

## `src/components/Spinner.tsx`

```tsx
// import * as React from 'react'

export function Spinner({
  show,
  wait,
}: {
  show?: boolean;
  wait?: `delay-${number}`;
}) {
  return (
    <div
      className={`inline-block animate-spin px-3 transition ${
        (show ?? true)
          ? `opacity-1 duration-500 ${wait ?? "delay-300"}`
          : "opacity-0 delay-0 duration-500"
      }`}
    >
      ⍥
    </div>
  );
}

```

---

## `src/components/theme-provider.tsx`

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

```

---

## `src/components/ui/badge.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

---

## `src/components/ui/button.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

---

## `src/components/ui/form.tsx`

```tsx
"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

```

---

## `src/components/ui/input.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

---

## `src/components/ui/label.tsx`

```tsx
import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

```

---

## `src/components/ui/password-input.tsx`

```tsx
"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const disabled =
      props.value === "" || props.value === undefined || props.disabled;

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

```

---

## `src/components/ui/select.tsx`

```tsx
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

---

## `src/components/ui/table.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

---

## `src/components/ui/textarea.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

```

---

## `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

/* Rich Text Block Start */

.richtext h1,
.richtext h2,
.richtext h3,
.richtext h4,
.richtext h5,
.richtext h6 {
  @apply font-bold leading-tight;
}

.richtext h1 {
  @apply text-4xl mb-6 text-gray-900 dark:text-gray-100;
}

.richtext h2 {
  @apply text-3xl mb-4 text-gray-800 dark:text-gray-200;
}

.richtext h3 {
  @apply text-2xl mb-3 text-gray-700 dark:text-gray-300;
}

.richtext h4 {
  @apply text-xl mb-2 text-gray-600 dark:text-gray-400;
}

.richtext h5 {
  @apply text-lg mb-2 text-gray-600 dark:text-gray-400;
}

.richtext h6 {
  @apply text-base mb-2 text-gray-600 dark:text-gray-400;
}

.richtext p {
  @apply mb-4 text-gray-700 dark:text-gray-300 leading-relaxed;
}

.richtext blockquote {
  @apply border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 italic my-8 p-4 rounded-r-lg;
}

.richtext a {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}

.richtext ul,
.richtext ol {
  @apply mb-4 pl-8;
}

.richtext ul {
  @apply list-disc;
}

.richtext ol {
  @apply list-decimal;
}

/* Rich Text Block End */

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 190 60% 55%;
    --primary-foreground: 255 100% 100%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 221.2 83.2% 53.3%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 190 60% 55%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 217.2 91.2% 59.8%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Enhanced Badge Styles */
.badge {
  @apply inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors;
}

.badge-primary {
  @apply bg-primary/10 text-primary border-primary/20 hover:bg-primary/20;
}

.badge-secondary {
  @apply bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700;
}

.badge-destructive {
  @apply bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50 dark:hover:bg-red-900/50;
}

.badge-success {
  @apply bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50 dark:hover:bg-green-900/50;
}

.badge-warning {
  @apply bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50 dark:hover:bg-amber-900/50;
}

.badge-info {
  @apply bg-blue-50 text-blue-800 border-blue-100 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30 dark:hover:bg-blue-900/40;
}

/* Enhanced Card Styles */
.card {
  @apply rounded-lg border bg-card text-card-foreground;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  @apply shadow-sm border-gray-300 dark:border-gray-600;
}

/* Enhanced Button Styles */
.btn-primary {
  @apply bg-primary text-white hover:bg-primary/90;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700;
}

/* Enhanced Icon Colors */
.text-muted-foreground {
  @apply text-slate-500 dark:text-slate-400;
}

/* Enhanced Table Styles */
.table {
  @apply w-full border-collapse;
}

.table th {
  @apply bg-gray-50 text-left px-4 py-2 text-sm font-medium text-gray-500 dark:bg-gray-800/50 dark:text-gray-400 uppercase tracking-wider;
}

.table td {
  @apply px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700;
}

/* Enhanced Form Elements */
.input {
  @apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
}

/* Enhanced Link Styles */
a {
  @apply text-inherit no-underline transition-colors;
}

/* Navigation links */
.nav-link,
[class*="navigation-menu"],
[class*="navigation-menu"] a,
[class*="navigation-menu"] a:visited,
[class*="navigation-menu"] a:hover,
[class*="navigation-menu"] a:active {
  @apply text-inherit no-underline;
}

/* Override any blue link colors in the navigation */
header a:not(.text-blue-600) {
  @apply text-inherit;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  @apply w-2 h-2;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500;
}

```

---

## `src/lib/api.ts`

```ts
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

```

---

## `src/lib/utils.ts`

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

---

## `src/main.tsx`

```tsx
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

```

---

## `src/mocks/products-mock.ts`

```ts
import { v4 as uuidv4 } from 'uuid';
import type { Product, ProductCreateInput } from '../routes/_productLayout/products/-api/fetch-auth-products';

// Sample product names and descriptions for generating mock data
const productNames = [
  'Wireless Earbuds',
  'Smartphone X',
  'Laptop Pro',
  'Wireless Mouse',
  'Mechanical Keyboard',
  '4K Monitor',
  'Bluetooth Speaker',
  'Noise Cancelling Headphones',
  'Smart Watch',
  'Tablet'
];

const productDescriptions = [
  'High-quality product with advanced features',
  'Latest model with improved performance',
  'Premium design and build quality',
  'Energy efficient and eco-friendly',
  'Includes 1-year manufacturer warranty',
  'Perfect for both work and entertainment',
  'Sleek and modern design',
  'Comes with all necessary accessories',
  'Easy to use and maintain',
  'Best in class performance'
];

const productImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1526170375885-4edd8fefb9b7?w=500&auto=format&fit=crop&q=60'
];

// Generate a single mock product
export const generateMockProduct = (id?: string): Product => {
  const name = productNames[Math.floor(Math.random() * productNames.length)];
  const description = productDescriptions[Math.floor(Math.random() * productDescriptions.length)];
  const price = Math.floor(Math.random() * 900) + 100; // Random price between 100 and 1000
  const quantity = Math.floor(Math.random() * 100);
  const image = productImages[Math.floor(Math.random() * productImages.length)];
  const now = new Date().toISOString();

  return {
    id: id || uuidv4(),
    name,
    description,
    price,
    quantity,
    image,
    created_at: now,
    updated_at: now,
  };
};

// Generate an array of mock products
export const generateMockProducts = (count: number): Product[] => {
  return Array.from({ length: count }, () => generateMockProduct());
};

// Mock a single product by ID
export const mockProduct = (id: string): Product => {
  return generateMockProduct(id);
};

// Mock API responses
export const mockProductsApi = {
  getProducts: (count = 10): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockProducts(count));
      }, 500); // Simulate network delay
    });
  },

  getProduct: (id: string): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProduct(id));
      }, 300);
    });
  },

  createProduct: (product: ProductCreateInput): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          ...product,
          id: uuidv4(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          // Ensure image is a string URL, not a File object
          image: typeof product.image === 'string' ? product.image : undefined,
          // If you need to handle File objects, you might want to generate a mock URL
          // image: product.image instanceof File ? `https://example.com/mock-image-${Date.now()}.jpg` : product.image,
        };
        resolve(newProduct);
      }, 300);
    });
  },
  updateProduct: (id: string, updates: Partial<Product>): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = generateMockProduct(id);
        const updatedProduct = { ...product, ...updates, updated_at: new Date().toISOString() };
        resolve(updatedProduct);
      }, 500);
    });
  },

  deleteProduct: (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Product ${id} deleted`);
        resolve();
      }, 500);
    });
  },
};

```

---

## `src/routeTree.gen.ts`

```ts
/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as PublicLayoutRouteImport } from './routes/_publicLayout'
import { Route as ProductLayoutRouteImport } from './routes/_productLayout'
import { Route as IndexRouteImport } from './routes/index'
import { Route as PublicLayoutHomeRouteImport } from './routes/_publicLayout/home'
import { Route as ProductLayoutProductsRouteRouteImport } from './routes/_productLayout/products/route'
import { Route as PublicLayoutauthRegisterRouteImport } from './routes/_publicLayout/(auth)/register'
import { Route as PublicLayoutauthLoginRouteImport } from './routes/_publicLayout/(auth)/login'
import { Route as ProductLayoutProductsNewRouteImport } from './routes/_productLayout/products/new'
import { Route as ProductLayoutProductsProductIdRouteRouteImport } from './routes/_productLayout/products/$productId/route'
import { Route as ProductLayoutProductsProductIdIndexRouteImport } from './routes/_productLayout/products/$productId/index'
import { Route as ProductLayoutProductsProductIdEditRouteImport } from './routes/_productLayout/products/$productId/edit'

const PublicLayoutRoute = PublicLayoutRouteImport.update({
  id: '/_publicLayout',
  getParentRoute: () => rootRouteImport,
} as any)
const ProductLayoutRoute = ProductLayoutRouteImport.update({
  id: '/_productLayout',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const PublicLayoutHomeRoute = PublicLayoutHomeRouteImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => PublicLayoutRoute,
} as any)
const ProductLayoutProductsRouteRoute =
  ProductLayoutProductsRouteRouteImport.update({
    id: '/products',
    path: '/products',
    getParentRoute: () => ProductLayoutRoute,
  } as any)
const PublicLayoutauthRegisterRoute =
  PublicLayoutauthRegisterRouteImport.update({
    id: '/(auth)/register',
    path: '/register',
    getParentRoute: () => PublicLayoutRoute,
  } as any)
const PublicLayoutauthLoginRoute = PublicLayoutauthLoginRouteImport.update({
  id: '/(auth)/login',
  path: '/login',
  getParentRoute: () => PublicLayoutRoute,
} as any)
const ProductLayoutProductsNewRoute =
  ProductLayoutProductsNewRouteImport.update({
    id: '/new',
    path: '/new',
    getParentRoute: () => ProductLayoutProductsRouteRoute,
  } as any)
const ProductLayoutProductsProductIdRouteRoute =
  ProductLayoutProductsProductIdRouteRouteImport.update({
    id: '/$productId',
    path: '/$productId',
    getParentRoute: () => ProductLayoutProductsRouteRoute,
  } as any)
const ProductLayoutProductsProductIdIndexRoute =
  ProductLayoutProductsProductIdIndexRouteImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => ProductLayoutProductsProductIdRouteRoute,
  } as any)
const ProductLayoutProductsProductIdEditRoute =
  ProductLayoutProductsProductIdEditRouteImport.update({
    id: '/edit',
    path: '/edit',
    getParentRoute: () => ProductLayoutProductsProductIdRouteRoute,
  } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/products': typeof ProductLayoutProductsRouteRouteWithChildren
  '/home': typeof PublicLayoutHomeRoute
  '/products/$productId': typeof ProductLayoutProductsProductIdRouteRouteWithChildren
  '/products/new': typeof ProductLayoutProductsNewRoute
  '/login': typeof PublicLayoutauthLoginRoute
  '/register': typeof PublicLayoutauthRegisterRoute
  '/products/$productId/edit': typeof ProductLayoutProductsProductIdEditRoute
  '/products/$productId/': typeof ProductLayoutProductsProductIdIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/products': typeof ProductLayoutProductsRouteRouteWithChildren
  '/home': typeof PublicLayoutHomeRoute
  '/products/new': typeof ProductLayoutProductsNewRoute
  '/login': typeof PublicLayoutauthLoginRoute
  '/register': typeof PublicLayoutauthRegisterRoute
  '/products/$productId/edit': typeof ProductLayoutProductsProductIdEditRoute
  '/products/$productId': typeof ProductLayoutProductsProductIdIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/_productLayout': typeof ProductLayoutRouteWithChildren
  '/_publicLayout': typeof PublicLayoutRouteWithChildren
  '/_productLayout/products': typeof ProductLayoutProductsRouteRouteWithChildren
  '/_publicLayout/home': typeof PublicLayoutHomeRoute
  '/_productLayout/products/$productId': typeof ProductLayoutProductsProductIdRouteRouteWithChildren
  '/_productLayout/products/new': typeof ProductLayoutProductsNewRoute
  '/_publicLayout/(auth)/login': typeof PublicLayoutauthLoginRoute
  '/_publicLayout/(auth)/register': typeof PublicLayoutauthRegisterRoute
  '/_productLayout/products/$productId/edit': typeof ProductLayoutProductsProductIdEditRoute
  '/_productLayout/products/$productId/': typeof ProductLayoutProductsProductIdIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/products'
    | '/home'
    | '/products/$productId'
    | '/products/new'
    | '/login'
    | '/register'
    | '/products/$productId/edit'
    | '/products/$productId/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/products'
    | '/home'
    | '/products/new'
    | '/login'
    | '/register'
    | '/products/$productId/edit'
    | '/products/$productId'
  id:
    | '__root__'
    | '/'
    | '/_productLayout'
    | '/_publicLayout'
    | '/_productLayout/products'
    | '/_publicLayout/home'
    | '/_productLayout/products/$productId'
    | '/_productLayout/products/new'
    | '/_publicLayout/(auth)/login'
    | '/_publicLayout/(auth)/register'
    | '/_productLayout/products/$productId/edit'
    | '/_productLayout/products/$productId/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProductLayoutRoute: typeof ProductLayoutRouteWithChildren
  PublicLayoutRoute: typeof PublicLayoutRouteWithChildren
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_publicLayout': {
      id: '/_publicLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicLayoutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_productLayout': {
      id: '/_productLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProductLayoutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_publicLayout/home': {
      id: '/_publicLayout/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof PublicLayoutHomeRouteImport
      parentRoute: typeof PublicLayoutRoute
    }
    '/_productLayout/products': {
      id: '/_productLayout/products'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductLayoutProductsRouteRouteImport
      parentRoute: typeof ProductLayoutRoute
    }
    '/_publicLayout/(auth)/register': {
      id: '/_publicLayout/(auth)/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof PublicLayoutauthRegisterRouteImport
      parentRoute: typeof PublicLayoutRoute
    }
    '/_publicLayout/(auth)/login': {
      id: '/_publicLayout/(auth)/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof PublicLayoutauthLoginRouteImport
      parentRoute: typeof PublicLayoutRoute
    }
    '/_productLayout/products/new': {
      id: '/_productLayout/products/new'
      path: '/new'
      fullPath: '/products/new'
      preLoaderRoute: typeof ProductLayoutProductsNewRouteImport
      parentRoute: typeof ProductLayoutProductsRouteRoute
    }
    '/_productLayout/products/$productId': {
      id: '/_productLayout/products/$productId'
      path: '/$productId'
      fullPath: '/products/$productId'
      preLoaderRoute: typeof ProductLayoutProductsProductIdRouteRouteImport
      parentRoute: typeof ProductLayoutProductsRouteRoute
    }
    '/_productLayout/products/$productId/': {
      id: '/_productLayout/products/$productId/'
      path: '/'
      fullPath: '/products/$productId/'
      preLoaderRoute: typeof ProductLayoutProductsProductIdIndexRouteImport
      parentRoute: typeof ProductLayoutProductsProductIdRouteRoute
    }
    '/_productLayout/products/$productId/edit': {
      id: '/_productLayout/products/$productId/edit'
      path: '/edit'
      fullPath: '/products/$productId/edit'
      preLoaderRoute: typeof ProductLayoutProductsProductIdEditRouteImport
      parentRoute: typeof ProductLayoutProductsProductIdRouteRoute
    }
  }
}

interface ProductLayoutProductsProductIdRouteRouteChildren {
  ProductLayoutProductsProductIdEditRoute: typeof ProductLayoutProductsProductIdEditRoute
  ProductLayoutProductsProductIdIndexRoute: typeof ProductLayoutProductsProductIdIndexRoute
}

const ProductLayoutProductsProductIdRouteRouteChildren: ProductLayoutProductsProductIdRouteRouteChildren =
  {
    ProductLayoutProductsProductIdEditRoute:
      ProductLayoutProductsProductIdEditRoute,
    ProductLayoutProductsProductIdIndexRoute:
      ProductLayoutProductsProductIdIndexRoute,
  }

const ProductLayoutProductsProductIdRouteRouteWithChildren =
  ProductLayoutProductsProductIdRouteRoute._addFileChildren(
    ProductLayoutProductsProductIdRouteRouteChildren,
  )

interface ProductLayoutProductsRouteRouteChildren {
  ProductLayoutProductsProductIdRouteRoute: typeof ProductLayoutProductsProductIdRouteRouteWithChildren
  ProductLayoutProductsNewRoute: typeof ProductLayoutProductsNewRoute
}

const ProductLayoutProductsRouteRouteChildren: ProductLayoutProductsRouteRouteChildren =
  {
    ProductLayoutProductsProductIdRouteRoute:
      ProductLayoutProductsProductIdRouteRouteWithChildren,
    ProductLayoutProductsNewRoute: ProductLayoutProductsNewRoute,
  }

const ProductLayoutProductsRouteRouteWithChildren =
  ProductLayoutProductsRouteRoute._addFileChildren(
    ProductLayoutProductsRouteRouteChildren,
  )

interface ProductLayoutRouteChildren {
  ProductLayoutProductsRouteRoute: typeof ProductLayoutProductsRouteRouteWithChildren
}

const ProductLayoutRouteChildren: ProductLayoutRouteChildren = {
  ProductLayoutProductsRouteRoute: ProductLayoutProductsRouteRouteWithChildren,
}

const ProductLayoutRouteWithChildren = ProductLayoutRoute._addFileChildren(
  ProductLayoutRouteChildren,
)

interface PublicLayoutRouteChildren {
  PublicLayoutHomeRoute: typeof PublicLayoutHomeRoute
  PublicLayoutauthLoginRoute: typeof PublicLayoutauthLoginRoute
  PublicLayoutauthRegisterRoute: typeof PublicLayoutauthRegisterRoute
}

const PublicLayoutRouteChildren: PublicLayoutRouteChildren = {
  PublicLayoutHomeRoute: PublicLayoutHomeRoute,
  PublicLayoutauthLoginRoute: PublicLayoutauthLoginRoute,
  PublicLayoutauthRegisterRoute: PublicLayoutauthRegisterRoute,
}

const PublicLayoutRouteWithChildren = PublicLayoutRoute._addFileChildren(
  PublicLayoutRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProductLayoutRoute: ProductLayoutRouteWithChildren,
  PublicLayoutRoute: PublicLayoutRouteWithChildren,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

```

---

## `src/routes/.DS_Store`

```text
[Binary file content not displayed]
```

---

## `src/routes/__root.tsx`

```tsx
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      {/* <div>Hello "__root"!</div> */}
      <Outlet />
    </React.Fragment>
  );
}

```

---

## `src/routes/_productLayout.tsx`

```tsx
import { createFileRoute, Outlet, useNavigate, redirect } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_productLayout')({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ProductLayout,
});

function ProductLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('auth-storage');
    
    // Force a full page reload to reset all state
    window.location.href = '/login';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">ProductShowcase</span>
            </a>
            <nav className="hidden gap-6 md:flex">
              <a href="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Products
              </a>
              {/* <a href="/my-products" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                My Products
              </a> */}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ProductShowcase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

```

---

## `src/routes/_productLayout/.DS_Store`

```text
[Binary file content not displayed]
```

---

## `src/routes/_productLayout/products/$productId/edit.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { ProductForm } from '../-components/ProductForm.tsx';

export const Route = createFileRoute('/_productLayout/products/$productId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  console.log('Route Edit Component');
  return <ProductForm isEdit />;
}

```

---

## `src/routes/_productLayout/products/$productId/index.tsx`

```tsx
import { createFileRoute, useNavigate, Outlet } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Pencil, X } from 'lucide-react';
// import { useGetProduct } from './-api/query-auth-products';
import { Badge } from '@/components/ui/badge';
import { useGetProduct } from '../-api/query-auth-products.ts';

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const { data:response, isLoading, error } = useGetProduct(productId);
  
  if (isLoading) return <div className="p-8 text-center">Loading product details...</div>;
  if (error || !response) return <div className="p-8 text-center text-destructive">Failed to load product details</div>;

  // After the initial checks
if (!response?.data || typeof response.data.quantity === 'undefined') {
  return <div className="p-8 text-center text-destructive">Invalid product data</div>;
}


  // Now TypeScript knows response.data exists
  const product = response.data;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{product?.name}</h1>
                <div className="mt-2 flex items-center">
                  <Badge variant={product?.quantity > 0 ? 'default' : 'destructive'} className="text-xs sm:text-sm">
                    {product?.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product?.quantity} units available
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => navigate({ to: `/products/${productId}/edit` })}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate({ to: '/products' })}
                  title="Close"
                  className="hidden sm:flex"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-6">
              <div className="flex justify-center">
                {response.data?.image_url ? (
                  <img
                    src={response.data?.image_url}
                    alt={response.data?.name}
                    className="max-h-96 w-auto rounded-lg border"
                  />
                ) : (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">No image available</span>
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Description</h2>
                  <p className="mt-2 text-muted-foreground">
                    {response.data?.description || 'No description available.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                    <p className="text-2xl font-bold">${Number(response.data?.price).toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <Badge 
                      variant={product?.quantity > 0 ? 'default' : 'destructive'} 
                      className="text-xs sm:text-sm"
                    >
                      {product?.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Product Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Product ID</span>
                      <span className="text-sm font-medium">{product?.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Render child routes like /edit */}
      <Outlet />
    </>
  );
}

// Export the component as default to make it easier to import
export default ProductDetailPage;

// Export the route configuration
export const Route = createFileRoute('/_productLayout/products/$productId/')({
  component: ProductDetailPage,
  errorComponent: () => <div>Error loading product details</div>,
});

```

---

## `src/routes/_productLayout/products/$productId/route.tsx`

```tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_productLayout/products/$productId')({
  component: ProductLayout,
});

function ProductLayout() {
  return <Outlet />;
}

```

---

## `src/routes/_productLayout/products/-api/fetch-auth-products.ts`

```ts
import { api } from "@/lib/api";
import { toast } from "sonner";
import { ApiResponse, Product, ProductCreateInput } from '../-types/product.ts';


export interface ProductUpdateInput extends Partial<ProductCreateInput> {
  id: string;
  data: FormData | ProductCreateInput;
  isFormData?: boolean;
}

// API Functions
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log("Fetching products...");
    const response = await api.get("/products/");
    console.log("Products response:", response);
    return response || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to load products");
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    toast.error("Failed to load product details");
    throw error;
  }
};

export const createProduct = async ({
  data,
}: {
  data: ProductCreateInput | FormData;
}): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.post('/products/', data);
    return { data: response };
  } catch (error: any) {
    console.error("Error creating product:", error);
    const errorMessage = error.response?.data?.detail || "Failed to create product";
    toast.error(errorMessage);
    return {
      error: {
        message: errorMessage,
        details: error.response?.data
      }
    };
  }
};

export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: ProductUpdateInput | FormData;
}): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.put(`/products/${id}`, data);
    return { data: response };
  } catch (error: any) {
    console.error(`Error updating product ${id}:`, error);
    const errorMessage = error.response?.data?.detail || `Failed to update product ${id}`;
    toast.error(errorMessage);
    return {
      error: {
        message: errorMessage,
        details: error.response?.data
      }
    };
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
    toast.success("Product deleted successfully");
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    toast.error("Failed to delete product");
    throw error;
  }
};

// React Query hooks
export const useProducts = () => {
  return {
    getProducts: () => ({
      queryKey: ["products"],
      queryFn: fetchProducts,
    }),
    getProduct: (id: string) => ({
      queryKey: ["products", id],
      queryFn: () => fetchProductById(id),
    }),
    createProduct: (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => ({
      mutationFn: (variables: { data: ProductCreateInput | FormData; isFormData?: boolean }) =>
        createProduct(variables),
      ...options,
    }),
    updateProduct: (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => ({
      mutationFn: (variables: { id: string; data: ProductUpdateInput | FormData; isFormData?: boolean }) =>
        updateProduct(variables),
      ...options,
    }),
    deleteProduct: (options?: { onSuccess?: () => void; onError?: (error: any) => void }) => ({
      mutationFn: (id: string) => deleteProduct(id),
      ...options,
    }),
  };
};

```

---

## `src/routes/_productLayout/products/-api/query-auth-products.ts`

```ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import {
  type ProductUpdateInput,
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './fetch-auth-products';
import { ApiResponse, Product, ProductCreateInput } from '../-types/product.ts';
import { toast } from 'sonner';

// import { generateMockProducts, mockProduct } from "@/mocks/products-mock";

// type ApiError = {
//   message?: string;
//   // Add other error properties as needed
// };

export const useProductQueries = () => {
  const queryClient = useQueryClient();

  // Query: Get all products
  const useGetProducts = (options?: Omit<UseQueryOptions<ApiResponse<Product[]>>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ApiResponse<Product[]>>({
      queryKey: ['products'],
      queryFn: async () => {
        try {
          const response = await fetchProducts();
          return { data: response };
        } catch (error: any) {
          return {
            error: {
              message: error.response?.data?.detail || 'Failed to fetch products',
              details: error.response?.data
            }
          };
        }
      },
      ...options,
    });
  };

  // Query: Get single product by ID
  const useGetProduct = (id: string, options?: Omit<UseQueryOptions<ApiResponse<Product>>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ApiResponse<Product>>({
      queryKey: ['products', id],
      queryFn: async () => {
        try {
          const response = await fetchProductById(id);
          return { data: response };
        } catch (error: any) {
          return {
            error: {
              message: error.response?.data?.detail || `Failed to fetch product ${id}`,
              details: error.response?.data
            }
          };
        }
      },
      ...options,
    });
  };

  // Mutation: Create a new product
  const useCreateProduct = (
    options?: Omit<UseMutationOptions<
      ApiResponse<Product>,
      unknown,
      { data: ProductCreateInput | FormData }
    >, 'mutationFn'>
  ) => {
    return useMutation({
      mutationFn: async ({ data }) => {
        return createProduct({ data });
      },
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        options?.onSuccess?.(data, variables, context);
      },
    });
  };

  // Mutation: Update an existing product
  const useUpdateProduct = (options?: Omit<UseMutationOptions<
    ApiResponse<Product>,
    unknown,
    { id: string; data: ProductUpdateInput | FormData }
  >, 'mutationFn'>) => {
    return useMutation({
      mutationFn: async ({ id, data }) => {
        return updateProduct({ id, data });
      },
      ...options,
      onSuccess: (data, variables, context) => {
        // Invalidate and refetch the updated product and products list
        queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
        queryClient.invalidateQueries({ queryKey: ['products'] });
        options?.onSuccess?.(data, variables, context);
      },
    });
  };
  ``
  // Mutation: Delete a product
  // const useDeleteProduct = (options?: Omit<UseMutationOptions<void, ApiError, string>, 'mutationFn'>) => {
  //   return useMutation<void, ApiError, string>({
  //     mutationFn: deleteProduct,
  //     ...options,
  //     onSuccess: () => {
  //       // Invalidate the products list
  //       queryClient.invalidateQueries({ queryKey: ['products'] });
  //     },
  //   });
  // };
  const useDeleteProduct = (options?: Omit<UseMutationOptions<
    ApiResponse<void>,  // Changed from void to ApiResponse<void>
    unknown,            // Changed from ApiError to unknown
    string              // The ID of the product to delete
  >, 'mutationFn'>) => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          await deleteProduct(id);
          return { data: undefined }; // Return success response with no data
        } catch (error: any) {
          const errorMessage = error.response?.data?.detail || `Failed to delete product ${id}`;
          toast.error(errorMessage);
          return {
            error: {
              message: errorMessage,
              details: error.response?.data
            }
          };
        }
      },
      ...options,
      onSuccess: (data, id, context) => {
        // Invalidate the products list and any individual product queries
        queryClient.invalidateQueries({ queryKey: ['products'] });
        queryClient.invalidateQueries({ queryKey: ['products', id] });
        options?.onSuccess?.(data, id, context);
      },
    });
  };

  return {
    useGetProducts,
    useGetProduct,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
  };
};

// Export individual hooks for convenience
// Export individual hooks with proper types
export const useGetProducts = (options?: Omit<UseQueryOptions<ApiResponse<Product[]>>, 'queryKey' | 'queryFn'>) =>
  useProductQueries().useGetProducts(options);

export const useGetProduct = (id: string, options?: Omit<UseQueryOptions<ApiResponse<Product>>, 'queryKey' | 'queryFn'>) =>
  useProductQueries().useGetProduct(id, options);

// Update the exported hooks to match the new types
export const useCreateProduct = (
  options?: Omit<UseMutationOptions<
    ApiResponse<Product>,
    unknown,
    { data: ProductCreateInput | FormData; isFormData?: boolean }
  >, 'mutationFn'>
) => useProductQueries().useCreateProduct(options);

export const useUpdateProduct = (
  options?: Omit<UseMutationOptions<
    ApiResponse<Product>,
    unknown,
    { id: string; data: ProductUpdateInput | FormData; isFormData?: boolean }
  >, 'mutationFn'>
) => useProductQueries().useUpdateProduct(options);

export const useDeleteProduct = (
  options?: Omit<UseMutationOptions<
    ApiResponse<void>,
    unknown,
    string
  >, 'mutationFn'>
) => useProductQueries().useDeleteProduct(options);

```

---

## `src/routes/_productLayout/products/-components/ProductForm.tsx`

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import {
  useCreateProduct,
  useUpdateProduct,
  useGetProduct,
} from '../-api/query-auth-products';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ImageUploaderField } from '../../../../components/ImageUploaderField';
import { useImageUploadHandlers } from '../-hooks/useImageUploadHandlers';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const productFormSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(1000).optional(),
  price: z.coerce.number().min(0.01).max(1000000),
  quantity: z.coerce.number().int().min(0).max(1000000),
  image: z
    .union([
      z.string().url().startsWith('https://').or(z.literal('')),
      z.instanceof(File).optional().nullable(),
      z.null(),
    ])
    .optional(),
  imageUrl: z.string().optional(),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'Max file size is 5MB.',
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
    }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  isEdit?: boolean;
}

export function ProductForm({ isEdit = false }: ProductFormProps) {
  const { productId } = isEdit
    ? useParams({ from: '/_productLayout/products/$productId' } as const)
    : { productId: undefined };

  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    data: existingProduct,
    isLoading: isLoadingProduct,
  } = useGetProduct(productId || '', {
    enabled: isEdit && !!productId,
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      image: null,
      imageFile: undefined,
      imageUrl: '',
    },
  });

  const {
    previewUrl,
    isDragging,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useImageUploadHandlers(form);

  useEffect(() => {
    if (isEdit && existingProduct) {
      form.reset({
        name: existingProduct?.data?.name,
        description: existingProduct?.data?.description ?? '',
        price: existingProduct?.data?.price,
        quantity: existingProduct?.data?.quantity,
        image: existingProduct?.data?.image_url ?? '',
        imageFile: undefined,
        imageUrl: existingProduct?.data?.image_url ?? '',
      });
    }
  }, [existingProduct, form, isEdit]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description || '');
      formData.append('price', data.price.toString());
      formData.append('quantity', data.quantity.toString());

      // if (data.imageFile instanceof File) {
      //   formData.append('file', data.imageFile);
      // } else if (typeof data.image === 'string' && data.image) {
      //   formData.append('image_url', data.image);
      // }

      if (data.imageFile instanceof File) {
        formData.append('image', data.imageFile); // ✅ nombre debe ser 'image'
      }

      const mutationArgs = {
        data: formData,
        isFormData: true,
      };

      if (isEdit && productId) {
        await updateProduct.mutateAsync(
          { id: productId, ...mutationArgs },
          {
            onSuccess: () => {
              toast.success('Product updated successfully');
              navigate({ to: '/products' });
            },
            onError: (error) => {
              toast.error(
                error instanceof Error
                  ? `Failed to update product: ${error.message}`
                  : 'Failed to update product. Please try again.'
              );
            },
          }
        );
      } else {
        await createProduct.mutateAsync(mutationArgs, {
          onSuccess: () => {
            toast.success('Product created successfully');
            navigate({ to: '/products' });
          },
          onError: (error) => {
            toast.error(
              error instanceof Error
                ? `Failed to create product: ${error.message}`
                : 'Failed to create product. Please try again.'
            );
          },
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  if (isEdit && isLoadingProduct) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading product data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Product' : 'Create New Product'}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ImageUploaderField
            control={form.control}
            form={form}
            previewUrl={previewUrl}
            isDragging={isDragging}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            handleRemoveImage={handleRemoveImage}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity in Stock</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/products' })}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : isEdit ? (
                'Update Product'
              ) : (
                'Create Product'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

```

---

## `src/routes/_productLayout/products/-components/ProductList.tsx`

```tsx
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useGetProducts, useDeleteProduct } from '../-api/query-auth-products';

export function ProductList() {
  // const { data: products = [], isLoading, isError } = useGetProducts();
  const { data, error, isLoading } = useGetProducts();

  const { mutate: deleteProduct } = useDeleteProduct();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate({ to: `/products/${id}/edit` });
  };

  const handleView = (id: string) => {
    navigate({ to: `/products/${id}` });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id, {
        onSuccess: () => {
          toast.success('Product deleted successfully');
        },
        onError: () => {
          toast.error('Failed to delete product');
        }
      });
    }
  };

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-destructive">Error loading products</div>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            {/* <TableHead>Description</TableHead> */}
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  )}
                  <div 
                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    onClick={() => handleView(product.id.toString())}
                  >
                    {product.name}
                  </div>
                </div>
              </TableCell>
              {/* <TableCell className="max-w-xs truncate">
                <p className="truncate">{product.description}</p>
              </TableCell> */}
              <TableCell className="text-right">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={product.quantity > 0 ? 'default' : 'destructive'}>
                  {product.quantity} in stock
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(product.id.toString());
                    }}
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(product.id.toString());
                    }}
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product.id.toString())}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

```

---

## `src/routes/_productLayout/products/-hooks/useImageUploadHandlers.ts`

```ts
import { useState, useRef, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';

export function useImageUploadHandlers(form: UseFormReturn<any>) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = useCallback((file?: File) => {
    if (file) {
      form.setValue('imageFile', file);
      form.setValue('image', '');
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [form]);

  const handleRemoveImage = useCallback(() => {
    setPreviewUrl(null);
    form.setValue('imageFile', undefined);
    form.setValue('image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [form]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileChange(file);
    }
  }, [handleFileChange]);

  return {
    previewUrl,
    isDragging,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}

```

---

## `src/routes/_productLayout/products/-types/product.ts`

```ts
// Types
// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   imagen?: string;  // Changed from 'image' to 'imagen' to match API
//   created_at?: string;
//   updated_at?: string;
// }



// export interface ProductCreateInput {
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   image?: File;  // For form data uploads
//   imagen?: string;  // For direct API calls
// }

// Import the generated types
import { components } from '@/types/inventory.js';

// Use the generated types
export type Product = components['schemas']['ProductOut'];
export type ProductCreateInput = components['schemas']['Body_create_product_products__post'];
export type ProductUpdateInput = components['schemas']['Body_update_product_products__product_id__put'];

// API response types
export type ApiResponse<T> = {
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
};


// Custom type for API error response
// export interface ApiError {
//   response?: {
//     data?: {
//       detail?: string;
//     };
//   };
//   message?: string;
// }
```

---

## `src/routes/_productLayout/products/.DS_Store`

```text
[Binary file content not displayed]
```

---

## `src/routes/_productLayout/products/new.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { ProductForm } from './-components/ProductForm.tsx';

export const Route = createFileRoute('/_productLayout/products/new')({
  component: NewProductPage,
});

function NewProductPage() {
  console.log('NewProductPage');
  return (
    <div className="container mx-auto py-8">
      <ProductForm isEdit={false} />
    </div>
  );
}

```

---

## `src/routes/_productLayout/products/route.tsx`

```tsx
import { createFileRoute, useNavigate, Outlet } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProductList } from './-components/ProductList.tsx'

export const Route = createFileRoute('/_productLayout/products')({
  component: ProductsPage,
  errorComponent: () => <div>Error loading products</div>,
});

function ProductsPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Inventory</h1>
            <p className="text-muted-foreground">
              Manage your product catalog
            </p>
          </div>
          <Button onClick={() => navigate({ to: '/products/new' })}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Product List */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <ProductList />
            </div>
          </div>
          
          {/* Right column - Form or Details */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## `src/routes/_publicLayout.tsx`

```tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_publicLayout')({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">ProductShowcase</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ProductShowcase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

```

---

## `src/routes/_publicLayout/(auth)/-api/auth-utils.ts`

```ts
import { useAuthStore } from "@/routes/_publicLayout/(auth)/-hooks/use-auth-store";

/**
 * Fetches and sets user location and currency data in the auth store
 */
export async function setUserLocationAndCurrency(queryClient: any) {
  try {
    const { user } = useAuthStore.getState();

    // Set country and language
    // user.country = "mx";
    // user.language = "es";
    // user.countryName = "México";

    // Get and set currency
    // user.currency = 1;

    // console.log("User location and currency set:", {
    //   country: user.country,
    //   language: user.language,
    //   countryName: user.countryName,
    //   currency: user.currency,
    // });
  } catch (error) {
    console.error("Error setting user location and currency:", error);
  }
}

```

---

## `src/routes/_publicLayout/(auth)/-api/fetch-login.ts`

```ts
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

```

---

## `src/routes/_publicLayout/(auth)/-api/fetch-register.ts`

```ts
import { publicApi } from "@/lib/api";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

//User Type
interface ApiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

//Successful Registration Response
interface RegisterResponse {
  jwt: string;
  user: ApiUser;
  registration?: {
    email: string;
    username: string;
  };
}

export async function registerUser(
  userData: RegisterRequest,
): Promise<RegisterResponse> {
  const registrationData = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };

  console.log("Sending registration request:", registrationData);

  try {
    const response = await publicApi.post<RegisterResponse>(
      "/auth/register",
      registrationData,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    console.log("Registration successful");
    return response;
  } catch (error: any) {
    // Log the raw error for debugging
    console.log("Raw error object:", error);

    // Default error message
    let errorMessage = "Error al conectar con el servidor";
    let errorCode = "UNKNOWN_ERROR";

    try {
      // Handle Axios error format
      if (error.response) {
        const { status, data } = error.response;

        // Log the error details for debugging
        console.error("Registration error details:", {
          status,
          statusText: error.response.statusText,
          data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: error.config?.data,
          },
        });

        // Extract error data from different possible locations
        const errorData = data?.error || data?.data?.error;

        if (errorData) {
          const errorStatus = errorData.status || status;
          const errorName = errorData.name;
          const errorMessageText =
            errorData.message || errorData.error?.message;
          const details = errorData.details;

          errorCode = errorName || `HTTP_${errorStatus}`;

          // Handle specific error types
          if (errorStatus === 400) {
            if (
              errorMessageText?.includes("already taken") ||
              errorName === "ApplicationError" ||
              errorMessageText?.includes("Email or Username are already taken")
            ) {
              errorMessage =
                "El correo electrónico o nombre de usuario ya está en uso. ¿Ya tienes una cuenta? Intenta iniciar sesión o utiliza un correo diferente.";
              errorCode = "DUPLICATE_ACCOUNT";
            } else if (errorName === "ValidationError") {
              errorMessage =
                errorMessageText ||
                "Error de validación. Por favor verifica los datos ingresados.";
              errorCode = "VALIDATION_ERROR";

              // If we have validation details, add them to the message
              if (details?.errors) {
                const errorMessages = Object.values(details.errors)
                  .map(
                    (err: any) =>
                      (err as any).message ||
                      (err as any).id ||
                      "Error de validación",
                  )
                  .filter(Boolean);

                if (errorMessages.length > 0) {
                  errorMessage = errorMessages.join("\n");
                }
              }
            } else {
              errorMessage =
                errorMessageText ||
                "Solicitud incorrecta. Por favor verifica los datos e intenta de nuevo.";
            }
          } else if (errorStatus === 401) {
            errorMessage = "No autorizado. Por favor inicia sesión nuevamente.";
            errorCode = "UNAUTHORIZED";
          } else if (errorStatus === 403) {
            errorMessage = "No tienes permiso para realizar esta acción.";
            errorCode = "FORBIDDEN";
          } else if (errorStatus === 404) {
            errorMessage = "El recurso solicitado no fue encontrado.";
            errorCode = "NOT_FOUND";
          } else if (errorStatus === 409) {
            errorMessage =
              "Conflicto: " +
              (errorMessageText || "El recurso ya existe o está en conflicto.");
            errorCode = "CONFLICT";
          } else if (errorStatus === 429) {
            errorMessage =
              "Demasiadas solicitudes. Por favor intenta de nuevo más tarde.";
            errorCode = "RATE_LIMIT_EXCEEDED";
          } else if (errorStatus >= 500) {
            errorMessage =
              "Error interno del servidor. Por favor intenta de nuevo más tarde.";
            errorCode = "INTERNAL_SERVER_ERROR";
          } else {
            errorMessage =
              errorMessageText || `Error del servidor (${errorStatus})`;
          }
        } else {
          errorMessage =
            data?.message ||
            `Error del servidor: ${status} ${error.response.statusText}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage =
          "No se recibió respuesta del servidor. Verifica tu conexión a internet.";
        errorCode = "NETWORK_ERROR";
      } else if (error.message) {
        // Something happened in setting up the request
        errorMessage = `Error en la solicitud: ${error.message}`;
        errorCode = "REQUEST_ERROR";
      }
    } catch (parseError) {
      console.error("Error parsing error object:", parseError);
      const fallbackError = new Error(
        "Error desconocido al procesar la respuesta del servidor.",
      );
      (fallbackError as any).code = "ERROR_PARSING_ERROR";
      (fallbackError as any).originalError = error;
      throw fallbackError;
    }

    // Create and throw the enhanced error
    const enhancedError = new Error(errorMessage);
    (enhancedError as any).code = errorCode;
    (enhancedError as any).originalError = error;
    throw enhancedError;
  }
}

```

---

## `src/routes/_publicLayout/(auth)/-api/mutation-login.ts`

```ts
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

```

---

## `src/routes/_publicLayout/(auth)/-api/mutation-register.ts`

```ts
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
      setTimeout(() => {
        navigate({ to: "/home" });
      }, 1500);
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

```

---

## `src/routes/_publicLayout/(auth)/-components/login-user.tsx`

```tsx
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

```

---

## `src/routes/_publicLayout/(auth)/-components/register-form.tsx`

```tsx
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

```

---

## `src/routes/_publicLayout/(auth)/-hooks/use-auth-store.ts`

```ts
// import { UserInfoDataType } from "@/routes/(profile)/-types/user-info";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { UserDataType } from "@/routes/_publicLayout/(auth)/-types/user";

//export type UserType = UserDataType;// & UserInfoDataType;

type AuthState = {
  user: UserDataType;
  // language: string;
  // country: string;
  // countryName: string;
  // currency: number;
};

type AuthAction = {
  setUser: (user: UserDataType) => void;
  removeUser: () => void;
  // setLanguage: (language: string) => void;
  // setCountry: (country: string) => void;
  // setCountryName: (countryName: string) => void;
  // setCurrency: (currency: number) => void;
};

export type AuthProps = AuthState & AuthAction;

const initialState: AuthState = {
  user: {
    id: 0,
    userName: "",
    email: "",
    // avatar: "",
    createdAt: "",
    authToken: "",
    isLoggedIn: false,
    // role: "estudiante" as const, // Explicitly typed as const for type safety
  },
};

const useAuthStore = create<AuthProps>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => {
        // Validar y asegurar que el rol sea uno de los valores permitidos
        // const validRoles = ["administrador", "docente", "estudiante"] as const;
        // const role = validRoles.includes(user.role as any)
        //   ? user.role
        //   : "estudiante";

        // const userWithRole = {
        //   ...user,
        //   role,
        // };

        console.log("useAuthStore - setUser called:", {
          userId: user.id,
          userName: user.userName,
          // role: userWithRole.role,
          hasToken: !!user.authToken,
          tokenLength: user.authToken?.length || 0,
          isLoggedIn: user.isLoggedIn,
          // roleValidation: {
          //   originalRole: user.role,
          //   // validatedRole: role,
          //   isValid: user.role === role,
          // },
        });

        set({ user: user });
      },
      removeUser: () => {
        console.log("useAuthStore - removeUser called");
        set(initialState);
      },
      // setLanguage: (language) => {
      //   set({ language });
      // },
      // setCountry: (country) => {
      //   set({ country });
      // },
      // setCountryName: (countryName) => {
      //   set({ countryName });
      // },
      // setCurrency: (currency) => {
      //   set({ currency });
      // },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useAuthStore };

```

---

## `src/routes/_publicLayout/(auth)/-types/user.ts`

```ts

export interface UserDataType {
  id: number | string;  // Allow both string and number for flexibility
  userName: string;
  email?: string;
  createdAt: string;
  authToken: string;
  isLoggedIn: boolean;
}

```

---

## `src/routes/_publicLayout/(auth)/.DS_Store`

```text
[Binary file content not displayed]
```

---

## `src/routes/_publicLayout/(auth)/login.tsx`

```tsx
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
          <span className="sm:hidden">Volver al inicio</span>
          <span className="hidden sm:inline">Inicio</span>
        </a>
        <div className="w-full space-y-6 rounded-xl border bg-card p-5 shadow-lg dark:border-gray-800 sm:space-y-8 sm:p-8">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Bienvenido de nuevo
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>
          <div className="mt-4">
            <LoginUser />
          </div>
          <div className="border-t border-border/50 pt-4">
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <a
                href="/register"
                className="font-medium text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/register";
                }}
              >
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## `src/routes/_publicLayout/(auth)/register.tsx`

```tsx
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
        <span className="sm:hidden">Volver al inicio</span>
        <span className="hidden sm:inline">Inicio</span>
      </a>
      <div className="mt-12 w-full max-w-2xl space-y-4 rounded-xl border bg-card p-5 shadow-lg dark:border-gray-800 sm:mt-0 sm:space-y-6 sm:p-8">
        <div className="sticky top-0 -mx-5 space-y-1 bg-card px-5 pb-3 pt-2 text-center sm:static sm:mx-0 sm:bg-transparent sm:px-8 sm:pb-0 sm:pt-0">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Crea tu cuenta
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Completa el formulario para registrarte
          </p>
        </div>
        <div className="-mx-2 sm:mx-0">
          <RegisterForm />
        </div>
        <div className="sticky bottom-0 -mx-5 border-t border-border/50 bg-card px-5 pb-2 pt-4 sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pb-0">
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/login";
              }}
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

```

---

## `src/routes/_publicLayout/home.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_publicLayout/home')({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Inventory Management System
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A secure platform for managing your product inventory with ease.
          </p>
        </div>
        
        <div className="grid w-full max-w-2xl gap-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Secure Access Required</h2>
            <p className="text-muted-foreground">
              Please log in to access and manage your inventory.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Login to Your Account
            </a>
            <a
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Create New Account
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Don't have an account? Register now to get started with our inventory management system.
          </p>
        </div>
      </div>
    </section>
  );
}

```

---

## `src/routes/index.tsx`

```tsx
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

```

---

## `src/routes/routeTree.gen.ts`

```ts
import { Route } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { Route as ProductLayoutRoute } from './_productLayout';
import { Route as ProductsRoute } from './_productLayout/products';
import { Route as ProductDetailRoute } from './_productLayout/products/$id';
import { Route as EditProductRoute } from './_productLayout/products/$id/edit';
import { Route as NewProductRoute } from './_productLayout/products/new';
import { Route as PublicLayoutRoute } from './_publicLayout';
import { Route as HomeRoute } from './_publicLayout/home';
import { Route as LoginRoute } from './_publicLayout/(auth)/login';
import { Route as RegisterRoute } from './_publicLayout/(auth)/register';

// Create the route tree
export const routeTree = rootRoute.addChildren([
  PublicLayoutRoute.addChildren([
    HomeRoute,
    LoginRoute,
    RegisterRoute,
  ]),
  ProductLayoutRoute.addChildren([
    ProductsRoute,
    ProductDetailRoute,
    EditProductRoute,
    NewProductRoute,
  ]),
]);

// Export the route tree type
export type RouteTree = typeof routeTree;

```

---

## `src/tests/GUIA_PRUEBAS.md`

```md
# Guía de Pruebas para React + TypeScript

## 🔧 Configuración Inicial

### 📦 Dependencias Recomendadas

```bash
# Testing base
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Para mockear fetch / API
npm install -D msw

# Tipado
npm install -D @types/jest @types/testing-library__jest-dom

# Para probar hooks
npm install -D @testing-library/react-hooks

# Para pruebas E2E (opcional)
npm install -D @playwright/test
```

### ⚙️ Configuración de Vitest

**vite.config.ts:**
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### 🛠 Configuración de MSW (Mock Service Worker)

**src/mocks/handlers.ts:**
```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
      ])
    );
  }),
];

// Configura el servidor de mocks con los manejadores
export const server = setupServer(...handlers);
```

**src/setupTests.ts:**
```typescript
import { server } from './mocks/server';
import '@testing-library/jest-dom';

// Iniciar el servidor de mocks antes de las pruebas
beforeAll(() => server.listen());

// Restablecer cualquier solicitud que hayamos agregado durante las pruebas
// para que no afecten a otras pruebas
afterEach(() => server.resetHandlers());

// Limpiar después de que terminen las pruebas
afterAll(() => server.close());
```

### 🎭 Configuración de Playwright (E2E)

**playwright.config.ts:**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 📝 Scripts de Prueba

**package.json:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

## 🔍 Tipos de Pruebas

### 1. Pruebas Unitarias

**Qué probar:**
- Funciones puras (helpers, utils)
- Validaciones con Zod
- Mutaciones de estado en Zustand

**Ejemplo de prueba para Zustand Store (store.test.ts):**
```typescript
import { useStore } from '../store';

describe('Zustand Store', () => {
  beforeEach(() => {
    // Resetear el estado antes de cada prueba
    useStore.setState(useStore.getInitialState());
  });

  it('debería manejar el contador correctamente', () => {
    // Estado inicial
    useStore.setState({ count: 0 });
    
    // Acción
    useStore.getState().increment();
    
    // Aserción
    expect(useStore.getState().count).toBe(1);
  });

  it('debería manejar la autenticación', () => {
    // Mock de datos de usuario
    const mockUser = { 
      id: '1', 
      name: 'Usuario de Prueba',
      email: 'test@example.com' 
    };

    // Acción
    useStore.getState().login(mockUser);
    
    // Aserciones
    const { user, isAuthenticated } = useStore.getState();
    expect(isAuthenticated).toBe(true);
    expect(user).toEqual(mockUser);
    
    // Probar logout
    useStore.getState().logout();
    expect(useStore.getState().isAuthenticated).toBe(false);
    expect(useStore.getState().user).toBeNull();
  });

  it('debería manejar el estado de carga', () => {
    // Estado inicial
    expect(useStore.getState().isLoading).toBe(false);
    
    // Acción
    useStore.getState().setLoading(true);
    expect(useStore.getState().isLoading).toBe(true);
    
    useStore.getState().setLoading(false);
    expect(useStore.getState().isLoading).toBe(false);
  });
});
```

**Consejos para probar Zustand:**
1. Usa `beforeEach` para resetear el estado entre pruebas
2. Prueba tanto las acciones como los selectores
3. Verifica los cambios de estado después de cada acción
4. Prueba los casos límite y estados de error
5. Considera usar `zustand/testing` para mocks más avanzados

**Ejemplo (utils.test.ts):**
```typescript
import { formatPrice } from '../lib/utils';

describe('formatPrice', () => {
  it('formats price correctly', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
    expect(formatPrice(0)).toBe('$0.00');
  });
});
```

### 2. Pruebas de Componentes

**Qué probar:**
- Render de UI con React Testing Library
- Props y estados locales
- Interacciones del usuario

**Ejemplo (Button.test.tsx):**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/ui/button';

describe('Button', () => {
  it('renders with correct text and handles click', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 3. Pruebas de Integración

**Qué probar:**
- Queries y Mutations con TanStack Query
- Navegación con TanStack Router
- Integración entre componentes

**Ejemplo (ProductList.test.tsx):**
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductList } from '../components/ProductList';
import { server } from '../mocks/server';

const queryClient = new QueryClient();

describe('ProductList', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('displays products after loading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProductList />
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });
});
```

### 4. Pruebas de API con MSW

**Ejemplo de prueba de API:**
```typescript
import { server, rest } from '../mocks/server';
import { fetchProducts } from '../api/products';

describe('API Tests', () => {
  it('fetches products successfully', async () => {
    const products = await fetchProducts();
    expect(products).toHaveLength(2);
    expect(products[0].name).toBe('Product 1');
  });
});
```

### 5. Pruebas de Rutas con TanStack Router

**Ejemplo (routes.test.tsx):**
```typescript
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../routes';

describe('Router', () => {
  it('renders the home page', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText('Bienvenido')).toBeInTheDocument();
  });
});
```

### 6. Pruebas E2E con Playwright

**Ejemplo de prueba E2E (e2e/home.spec.ts):**
```typescript
import { test, expect } from '@playwright/test';

test('navegación básica', async ({ page }) => {
  // Ir a la página de inicio
  await page.goto('/');
  
  // Verificar que estamos en la página correcta
  await expect(page).toHaveTitle('Mi Aplicación');
  
  // Navegar a la página de productos
  await page.click('text=Productos');
  
  // Verificar que se cargaron los productos
  await expect(page.locator('.product-item')).toHaveCountGreaterThan(0);
});
```

## 📌 Mejores Prácticas

1. **Nombrado de pruebas**: Usa nombres descriptivos que expliquen qué y por qué se está probando.
2. **AAA Pattern**: Organiza tus pruebas en Arrange-Act-Assert.
3. **Mocks**: Usa mocks para dependencias externas y APIs.
4. **Pruebas aisladas**: Cada prueba debe ser independiente de las demás.
5. **Pruebas deterministas**: Asegúrate de que las pruebas sean consistentes.
6. **Cobertura útil**: No persigas el 100% de cobertura, enfócate en lo importante.

## 🔍 Depuración

- Usa `console.log` o `debug()` de Testing Library.
- En VS Code, configura el lanzador de depuración para pruebas.
- Usa `--ui` para la interfaz de Vitest: `npm run test:ui`

## 📚 Recursos Adicionales

- [Documentación de Testing Library](https://testing-library.com/)
- [Guía de Vitest](https://vitest.dev/guide/)
- [MSW - API Mocking](https://mswjs.io/)
- [Playwright E2E Testing](https://playwright.dev/)
- [TanStack Query Testing](https://tanstack.com/query/latest/docs/react/guides/testing)

```

---

## `src/types/inventory.d.ts`

```ts
/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Register */
        post: operations["register_auth_register_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login */
        post: operations["login_auth_login_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/products/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Products */
        get: operations["list_products_products__get"];
        put?: never;
        /** Create Product */
        post: operations["create_product_products__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/products/{product_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Product */
        get: operations["get_product_products__product_id__get"];
        /** Update Product */
        put: operations["update_product_products__product_id__put"];
        post?: never;
        /** Delete Product */
        delete: operations["delete_product_products__product_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** Body_create_product_products__post */
        Body_create_product_products__post: {
            /** Name */
            name: string;
            /** Description */
            description: string;
            /** Price */
            price: number;
            /** Quantity */
            quantity: number;
            /**
             * Image
             * Format: binary
             */
            image?: string;
        };
        /** Body_update_product_products__product_id__put */
        Body_update_product_products__product_id__put: {
            /** Name */
            name?: string;
            /** Description */
            description?: string;
            /** Price */
            price?: number;
            /** Quantity */
            quantity?: number;
            /**
             * Image
             * Format: binary
             */
            image?: string;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** ProductOut */
        ProductOut: {
            /** Name */
            name: string;
            /** Description */
            description: string;
            /** Price */
            price: number;
            /** Quantity */
            quantity: number;
            /** Image Url */
            image_url?: string | null;
            /** Id */
            id: number;
        };
        /** TokenWithUser */
        TokenWithUser: {
            /** Access Token */
            access_token: string;
            /** Token Type */
            token_type: string;
            user: components["schemas"]["UserRead"];
        };
        /** UserCreate */
        UserCreate: {
            /** Username */
            username: string;
            /**
             * Email
             * Format: email
             */
            email: string;
            /** Password */
            password: string;
        };
        /** UserLogin */
        UserLogin: {
            /**
             * Email
             * Format: email
             */
            email: string;
            /** Password */
            password: string;
        };
        /** UserRead */
        UserRead: {
            /** Id */
            id: number;
            /** Username */
            username: string;
            /**
             * Email
             * Format: email
             */
            email: string;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    register_auth_register_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenWithUser"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    login_auth_login_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserLogin"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenWithUser"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_products_products__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductOut"][];
                };
            };
        };
    };
    create_product_products__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["Body_create_product_products__post"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductOut"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_product_products__product_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                product_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductOut"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_product_products__product_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                product_id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "multipart/form-data": components["schemas"]["Body_update_product_products__product_id__put"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductOut"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_product_products__product_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                product_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}

```

---

## `src/types/openapi.json`

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Inventory Management API",
    "version": "0.1.0"
  },
  "paths": {
    "/auth/register": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Register",
        "operationId": "register_auth_register_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserCreate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TokenWithUser"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/auth/login": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Login",
        "operationId": "login_auth_login_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserLogin"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TokenWithUser"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/products/": {
      "get": {
        "tags": [
          "Products"
        ],
        "summary": "List Products",
        "operationId": "list_products_products__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/ProductOut"
                  },
                  "type": "array",
                  "title": "Response List Products Products  Get"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Products"
        ],
        "summary": "Create Product",
        "operationId": "create_product_products__post",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/Body_create_product_products__post"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductOut"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/products/{product_id}": {
      "get": {
        "tags": [
          "Products"
        ],
        "summary": "Get Product",
        "operationId": "get_product_products__product_id__get",
        "parameters": [
          {
            "name": "product_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Product Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductOut"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Products"
        ],
        "summary": "Update Product",
        "operationId": "update_product_products__product_id__put",
        "parameters": [
          {
            "name": "product_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Product Id"
            }
          }
        ],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/Body_update_product_products__product_id__put"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductOut"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Products"
        ],
        "summary": "Delete Product",
        "operationId": "delete_product_products__product_id__delete",
        "parameters": [
          {
            "name": "product_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Product Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Body_create_product_products__post": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description"
          },
          "price": {
            "type": "number",
            "title": "Price"
          },
          "quantity": {
            "type": "integer",
            "title": "Quantity"
          },
          "image": {
            "type": "string",
            "format": "binary",
            "title": "Image"
          }
        },
        "type": "object",
        "required": [
          "name",
          "description",
          "price",
          "quantity"
        ],
        "title": "Body_create_product_products__post"
      },
      "Body_update_product_products__product_id__put": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description"
          },
          "price": {
            "type": "number",
            "title": "Price"
          },
          "quantity": {
            "type": "integer",
            "title": "Quantity"
          },
          "image": {
            "type": "string",
            "format": "binary",
            "title": "Image"
          }
        },
        "type": "object",
        "title": "Body_update_product_products__product_id__put"
      },
      "HTTPValidationError": {
        "properties": {
          "detail": {
            "items": {
              "$ref": "#/components/schemas/ValidationError"
            },
            "type": "array",
            "title": "Detail"
          }
        },
        "type": "object",
        "title": "HTTPValidationError"
      },
      "ProductOut": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description"
          },
          "price": {
            "type": "number",
            "title": "Price"
          },
          "quantity": {
            "type": "integer",
            "title": "Quantity"
          },
          "image_url": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Url"
          },
          "id": {
            "type": "integer",
            "title": "Id"
          }
        },
        "type": "object",
        "required": [
          "name",
          "description",
          "price",
          "quantity",
          "id"
        ],
        "title": "ProductOut"
      },
      "TokenWithUser": {
        "properties": {
          "access_token": {
            "type": "string",
            "title": "Access Token"
          },
          "token_type": {
            "type": "string",
            "title": "Token Type"
          },
          "user": {
            "$ref": "#/components/schemas/UserRead"
          }
        },
        "type": "object",
        "required": [
          "access_token",
          "token_type",
          "user"
        ],
        "title": "TokenWithUser"
      },
      "UserCreate": {
        "properties": {
          "username": {
            "type": "string",
            "title": "Username"
          },
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          },
          "password": {
            "type": "string",
            "title": "Password"
          }
        },
        "type": "object",
        "required": [
          "username",
          "email",
          "password"
        ],
        "title": "UserCreate"
      },
      "UserLogin": {
        "properties": {
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          },
          "password": {
            "type": "string",
            "title": "Password"
          }
        },
        "type": "object",
        "required": [
          "email",
          "password"
        ],
        "title": "UserLogin"
      },
      "UserRead": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "username": {
            "type": "string",
            "title": "Username"
          },
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          }
        },
        "type": "object",
        "required": [
          "id",
          "username",
          "email"
        ],
        "title": "UserRead"
      },
      "ValidationError": {
        "properties": {
          "loc": {
            "items": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            },
            "type": "array",
            "title": "Location"
          },
          "msg": {
            "type": "string",
            "title": "Message"
          },
          "type": {
            "type": "string",
            "title": "Error Type"
          }
        },
        "type": "object",
        "required": [
          "loc",
          "msg",
          "type"
        ],
        "title": "ValidationError"
      }
    }
  }
}
```

---

## `src/utils/api.rest`

```rest

###
POST http://127.0.0.1:8000/auth/login
content-type: application/json

{
    "email": "hel2@gmail.com",
    "password": "12345678"
}
    

###
POST http://127.0.0.1:8000/auth/register
content-type: application/json

{
  "username": "hel2",
  "email": "hel2@gmail.com",
  "password": "12345678"
}

###
GET http://127.0.0.1:8000/products 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


```

---

## `src/utils/config.ts`

```ts
export function getApiURL() {
  return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:1337";
}

export function getApiMedia(url: string | null | undefined) {
  if (url == null) return undefined;
  if (url == undefined) return undefined;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getApiURL()}${url}`;
}



```

---

## `src/vite-env.d.ts`

```ts
/// <reference types="vite/client" />

```

---

