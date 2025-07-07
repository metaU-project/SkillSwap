import { API_ROUTES } from './apiRoutes';
import { ERROR_CODES } from './ErrorCodes';

export async function registerUser(first_name, last_name, email, password) {
  try {
    const response = await fetch(API_ROUTES.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      return { error: json.error };
    }

    return json;
  } catch (error) {
    console.error(error.message);
    return { error: ERROR_CODES.TRY_AGAIN };
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(API_ROUTES.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error };
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    return { error: ERROR_CODES.TRY_AGAIN };
  }
}

export async function logOutUser() {
  try {
    const response = await fetch(API_ROUTES.logout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const json = await response.json();
    if (!response.ok) {
      return { error: ERROR_CODES.TRY_AGAIN };
    }
    return json;
  } catch (error) {
    console.error(error.message);
    return { error: ERROR_CODES.TRY_AGAIN };
  }
}

export async function checkAuth() {
  try {
    const response = await fetch(API_ROUTES.me, {
      credentials: 'include',
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
