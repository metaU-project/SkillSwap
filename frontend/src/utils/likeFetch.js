
import { ERROR_CODES } from "./ErrorCodes";
import { API_ROUTES } from "./apiRoutes";

export async function likePost(postId) {
    try {
        const response = await fetch(`${API_ROUTES.likePost}/${postId}/like`, {
            method: 'PATCH',
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error(ERROR_CODES.FAILED_TO_LIKE_POST);
        }
        const json = await response.json();
        console.log(json);
        return json;
    }
    catch (error) {
        console.error(error);
    }

};
