import { API_ROUTES } from './apiRoutes';
import { ERROR_CODES } from './ErrorCodes';

/**
 * @param {*} dateString - date in format YYYY-MM-DD
 * @param {*} timeString - time in format HH:MM
 * @returns unix timestamp
 */
export function toUnixTimestamp(dateString, timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date(dateString);
  date.setHours(hours, minutes, 0, 0);
  return Math.floor(date.getTime() / 1000);
}

export const postSession = async (
  postId,
  startTime,
  duration,
  title,
  description,
  location
) => {
  try {
    const response = await fetch(API_ROUTES.sessions, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        postId,
        startTime,
        duration,
        title,
        description,
        location,
      }),
    });
    if (!response.ok) {
      return { error: json.error };
    }
    return await response.json();
  } catch (error) {
    return { error: ERROR_CODES.TRY_AGAIN };
  }
};
