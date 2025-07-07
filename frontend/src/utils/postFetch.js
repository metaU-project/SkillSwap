import { API_ROUTES } from './apiRoutes';
import { ERROR_CODES } from './ErrorCodes';

// Fetches all posts from the server
export const postFetch = async () => {
  try {
    const response = await fetch(API_ROUTES.posts, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      return { error: ERROR_CODES.POST_ERROR };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};
