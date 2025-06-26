import { API_ROUTES } from "./apiRoutes";


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
        return { error: json.error };
      }

      return json;
    } catch (error) {
      console.error(error);
      return { error: "An error occurred, please try again later" };
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
      return { error: "Could not load suggested interests" };
    }
  }
