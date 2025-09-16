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
