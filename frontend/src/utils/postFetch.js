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
    }
    catch (error) {
        console.error(error);
        return { error: error };
    }
}

// creates a new post on the server
export const postCreate = async (post) => {
    try {
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('description', post.description);
        formData.append('type', post.type);
        formData.append('category', post.category);
        formData.append('location', post.location);

        if (post.image) {
            formData.append('image', post.image);
        }
        const response = await fetch(API_ROUTES.posts, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error(error);
    }
}
