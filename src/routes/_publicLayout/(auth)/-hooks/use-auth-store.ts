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
