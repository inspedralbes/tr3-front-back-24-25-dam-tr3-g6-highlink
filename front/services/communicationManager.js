import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/index.js';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const STATS_URL = import.meta.env.VITE_STATS_URL;

const handleResponse = async (response) => {
    if (response.status == 401) {
        const router = useRouter();
        const appStore = useAppStore();
        appStore.logout(); // Clear the app store
        router.push('/admin'); // Redirect to login page
        throw new Error('Unauthorized');
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred');
    }

    return response.json();
};

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

export async function sendMessage(name, email, subject, message) {
    const response = await fetch(`${BACKEND_URL}/api/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return response.json();
}

export async function fetchComments() {
    const appStore = useAppStore();
    const response = await fetch(`${BACKEND_URL}/api/messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${appStore.getToken()}`,
        },
    });

    return handleResponse(response);
}

export async function deleteComment(commentId) {
    const appStore = useAppStore();
    const response = await fetch(`${BACKEND_URL}/api/messages/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',            
            'Authorization': `Bearer ${appStore.getToken()}`,
        },
    });

    return handleResponse(response);
}

// New functions for managing users
export async function fetchAdminUsers() {
    const appStore = useAppStore();
    const response = await fetch(`${BACKEND_URL}/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${appStore.getToken()}`,
        },
    });

    return handleResponse(response);
}

export async function updateAdminUser(userId, userData) {
    const appStore = useAppStore();
    const response = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${appStore.getToken()}`,
        },
        body: JSON.stringify(userData),
    });

    return handleResponse(response);
}

export async function deleteAdminUser(userId) {
    const appStore = useAppStore();
    const response = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${appStore.getToken()}`,
        },
    });

    return handleResponse(response);
}

export async function checkStatsService() {
    const appStore = useAppStore();
    const response = await fetch(`${BACKEND_URL}/state-stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    appStore.setStats(await response.text());
}

export async function onOffStatsService() {
    const appStore = useAppStore();
    const response = await fetch(`${BACKEND_URL}/on-off-stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${appStore.getToken()}`,
        },
    });

    appStore.setStats(await response.text());
    
    if (!response.ok) {
        return handleResponse(response);
    }
}

export async function fetchStats(id) {
    const response = await fetch(`${STATS_URL}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch stats');
    }

    return response.json();
}

export async function fetchConfig() {
    const appStore = useAppStore();
    const response = await fetch(`${BACKEND_URL}/api/config`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.json();
}

export async function updateConfig(newConfig) {
    const appStore = useAppStore();
    const response = await fetch(`${BACKEND_URL}/api/config`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${appStore.getToken()}`,
        },
        body: JSON.stringify(newConfig),
    });

    return handleResponse(response);
}