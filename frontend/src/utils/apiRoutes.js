const BASE_URL = 'http://localhost:3000';

export const API_ROUTES = {
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  logout: `${BASE_URL}/auth/logout`,
  me: `${BASE_URL}/auth/me`,
  onboarding: `${BASE_URL}/onboarding`,
  suggestions: `${BASE_URL}/onboarding/interests/suggestions`,
  interests: `${BASE_URL}/onboarding/interests`,
  posts: `${BASE_URL}/post`,
  reviews: `${BASE_URL}/review`,
  postReview: `${BASE_URL}/review/post`,
  likePost: `${BASE_URL}/like/post`,
  profile: `${BASE_URL}/profile`,
};
