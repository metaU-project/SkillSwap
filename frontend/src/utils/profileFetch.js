import { API_ROUTES } from "./apiRoutes";
import { ERROR_CODES } from './ErrorCodes';

export const fetchProfile = async (userId) => {
    try {
        const response = await fetch(`${API_ROUTES.profile}/${userId}`, {
            method: 'GET',
            credentials: 'include',
        }
        );
        if (!response.ok) {
            return { error: ERROR_CODES.ERROR_FETCHING_PROFILE };
        }
        return await response.json();
    }
    catch (error) {
        console.error(error);
        return { error: error };
    }
}
