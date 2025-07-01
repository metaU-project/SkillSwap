import { API_ROUTES } from "./apiRoutes";
import { ERROR_CODES } from "./ErrorCodes";

//complete onboarding
export async function completeOnboarding(interests, location, bio = "") {
    try {
      const response = await fetch(API_ROUTES.onboarding, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ interests, location, bio }),
      });

      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || ERROR_CODES.UNAUTHORIZED};
      }

      return json;
    } catch (error) {
      console.error(error);
      return { error: ERROR_CODES.TRY_AGAIN };
    }
  }

//get suggested interests
  export async function getSuggestedInterests() {
    try {
      const response = await fetch(API_ROUTES.suggestions);
      const json = await response.json();

      if (!response.ok) {
        return { error: json.error };
      }
      return json;
    } catch (error) {
      console.error(error);
      return { error:ERROR_CODES.ERROR_FETCHING_INTERESTS };
    }
  }
