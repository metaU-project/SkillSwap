import { API_ROUTES } from './apiRoutes';
import { ERROR_CODES } from './ErrorCodes';

//tokenized search
export const getTokenizedSearch = async (keywords) => {
  try {
    const response = await fetch(
      `${API_ROUTES.tokenizedSearch}?keyword=${keywords}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    if (!response.ok) {
      return { error: ERROR_CODES.ERROR_FETCHING_TOKENIZED_SEARCH };
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

//autosuggestions
export const getAutosuggestions = async (input) => {
  try {
    const response = await fetch(
      `${API_ROUTES.autosuggestions}?input=${input}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    if (!response.ok) {
      return { error: ERROR_CODES.ERROR_FETCHING_SUGGESTIONS };
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};
