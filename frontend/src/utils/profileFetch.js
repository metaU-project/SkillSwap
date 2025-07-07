import { API_ROUTES } from "./apiRoutes";
import { ERROR_CODES } from "./ErrorCodes";

export const fetchProfile = async (userId) => {
  try {
    const response = await fetch(`${API_ROUTES.profile}/${userId}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      return { error: ERROR_CODES.ERROR_FETCHING_PROFILE };
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

//update profile picture
export const updateProfilePicture = async (userId, profilePicture) => {
  const formData = new FormData();
  formData.append("profilePicture", profilePicture);
  try {
    const response = await fetch(
      `${API_ROUTES.profile}/${userId}/profile-pic`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    if (!response.ok) {
      return { error: ERROR_CODES.ERROR_UPDATING_PROFILE_PICTURE };
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};
