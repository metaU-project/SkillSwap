const BASE_URL = 'http://localhost:3000/auth';

export async function registerUser(first_name, last_name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password
            })
        });
        const json = await response.json();

        if (!response.ok) {
            return { error: json.error}
        }

        return json;
    }
    catch (error) {
        console.error(error.message);
        return { error: 'An error occured please try again later'}
    }
}

export async function loginUser(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { error: errorData.error || 'Login failed' };
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
        return { error: 'An error occured please try again later'}
    }
}


export async function logOutUser() {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        const json = await response.json();
        if (!response.ok) {
            return { error: 'An error occured please try again later'}
        }
        return json;


    }



    catch (error) {
        console.error(error.message);
        return { error: 'An error occured please try again later'}
    }
}


export async function checkAuth() {
    try {
        const response = await fetch(`${BASE_URL}/me`, {
            credentials: 'include',
        });
        if (!response.ok) {
            return null;

        }
        return await response.json();
    }
        catch (error) {
            console.error(error.message);
            return null;
        }
}
