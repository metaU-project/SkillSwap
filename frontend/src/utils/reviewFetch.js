import { API_ROUTES } from './apiRoutes';
import { ERROR_CODES } from './ErrorCodes';

// Fetches all reviews from the server
export const reviewFetch = async (userId) => {
  try {
    const response = await fetch(`${API_ROUTES.reviews}/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      return { error: ERROR_CODES.ERROR_FETCHING_REVIEWS };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

//fetch review for a post
export const fetchPostReviews = async (postId) => {
  try {
    const response = await fetch(`${API_ROUTES.postReview}/${postId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      return { error: ERROR_CODES.ERROR_FETCHING_REVIEWS };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

//create a review for a post
export const createPostReview = async (postId, review) => {
  try {
    const response = await fetch(`${API_ROUTES.postReview}/${postId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) {
      return { error: ERROR_CODES.ERROR_CREATING_REVIEW };
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};
