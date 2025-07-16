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

//get recommendations
export const getRecommendations = async (userId) => {
  try {
    const response = await fetch(`${API_ROUTES.recommendations}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return { error: ERROR_CODES.ERROR_FETCHING_RECOMMENDATIONS };
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
