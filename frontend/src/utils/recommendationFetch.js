import { API_ROUTES } from './apiRoutes';
import { ERROR_CODES } from './ErrorCodes';

//log interactions with posts
export const interactionLog = async (postId, type) => {
  try {
    const response = await fetch(API_ROUTES.interaction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        postId,
        type,
      }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error(error);
  }
};
