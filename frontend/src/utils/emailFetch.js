import { API_ROUTES } from './apiRoutes';
import { ERROR_CODES } from './ErrorCodes';

export const sendEmail = async (to, skillTitle, senderName) => {
  try {
    const url = `${API_ROUTES.email}/send`;
    const data = {
      to,
      skillTitle,
      senderName,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(ERROR_CODES.EMAIL_SEND_FAILED);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};
