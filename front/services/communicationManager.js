const BACKEND_URL = 'http://localhost:4000';

export async function login(email, password) {
    const response = await fetch(`${BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}

export async function register(name, email, password) {
    const response = await fetch(`${BACKEND_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return response.json();
}

export async function logout() {
    // Implement logout logic
}