const BASE_URL = 'http://localhost:3000/auth';

export async function registerUser(name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();

    }
    catch (error) {
        console.error(error.message);
    }
}

export async function loginUser(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

    } catch (error) {
        console.error(error.message);
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

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
    }

    catch (error) {
        console.error(error.message);
    }
}


export async function checkAuth() {
    try {
        const response = await fetch(`${BASE_URL}/me`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);

        }
        return response.json();
    }
        catch (error) {
            console.error(error.message);
        }
}
