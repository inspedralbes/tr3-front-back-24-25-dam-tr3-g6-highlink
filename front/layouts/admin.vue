<template>
    <div id="admin-app" class="flex min-h-screen text-white bg-gradient-to-br from-slate-800 to-slate-900">
        <!-- Show login form if not logged in -->
        <div v-if="!isLoggedIn" class="flex items-center justify-center w-full p-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full animate-fade-in">
                <h2 class="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Admin Login
                </h2>
                <form @submit.prevent="login">
                    <!-- Email Field -->
                    <div class="mb-6">
                        <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            v-model="loginForm.email"
                            placeholder="Enter your email"
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <!-- Password Field -->
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            v-model="loginForm.password"
                            placeholder="Enter your password"
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <!-- Submit Button -->
                    <div class="text-center">
                        <button
                            type="submit"
                            class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <!-- Registration Link -->
                <div class="text-center mt-4">
                    <router-link to="/register" class="text-blue-400 hover:text-blue-300 text-sm">
                        Don't have an account? Register here.
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Show admin content if logged in -->
        <div v-else class="flex w-full">
            <!-- Hamburger Menu for Mobile -->
            <button @click="toggleSidebar" class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900/80 rounded-lg shadow-lg">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            <!-- Sidebar -->
            <aside :class="['w-64 bg-slate-900/80 backdrop-blur-sm fixed h-screen p-4 shadow-lg transform transition-transform duration-300 z-40', isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">
                <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Admin Panel
                    </h2>
                </div>
                <nav class="space-y-2">
                    <router-link to="/admin/feedback"
                        class="flex items-center p-2 text-gray-300 hover:bg-slate-800/50 rounded-lg transition-colors duration-300">
                        <span>Comments</span>
                    </router-link>
                    <router-link to="/admin/config-game"
                        class="flex items-center p-2 text-gray-300 hover:bg-slate-800/50 rounded-lg transition-colors duration-300">
                        <span>Config Game</span>
                    </router-link>
                    <router-link to="/admin/config-users"
                        class="flex items-center p-2 text-gray-300 hover:bg-slate-800/50 rounded-lg transition-colors duration-300">
                        <span>Config Users</span>
                    </router-link>
                </nav>
            </aside>

            <!-- Main Content -->
            <div class="flex-1 lg:ml-64">
                <!-- Navbar -->
                <nav class="bg-slate-900/80 backdrop-blur-sm py-4 fixed w-full z-30 shadow-lg">
                    <div class="container mx-auto flex justify-between items-center px-4">
                        <!-- Hamburger Menu and Title -->
                        <div class="flex items-center">
                            <button @click="toggleSidebar" class="lg:hidden mr-4 p-2 bg-slate-900/80 rounded-lg shadow-lg">
                                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                            <h1 class="text-xl font-bold text-gray-300">
                                {{ currentPageTitle }}
                            </h1>
                        </div>
                        <!-- Logout Button -->
                        <button @click="logout"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                            Logout
                        </button>
                    </div>
                </nav>

                <!-- Page Content -->
                <main class="pt-20 pb-16 px-4 sm:px-6">
                    <NuxtPage />
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/index.js';
import { login as apiLogin } from '../services/communicationManager.js';

const router = useRouter();
const appStore = useAppStore();

// Reactive state for login status
const isLoggedIn = computed(() => !!appStore.getToken());

// Reactive state for sidebar visibility on mobile
const isSidebarOpen = ref(false);

// Login form data
const loginForm = ref({
    email: '',
    password: '',
});

// Simulate login function
const login = async () => {
    try {
        const { user, token } = await apiLogin(loginForm.value.email, loginForm.value.password);
        appStore.setUser(user);
        appStore.setToken(token);
        console.log('Logged in successfully');
    } catch (error) {
        alert('Invalid email or password');
    }
};

// Logout function
const logout = () => {
    appStore.logout(); // Clear user data
    console.log('Logged out');
    router.push('/'); // Redirect to the home page
};

// Toggle sidebar on mobile
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

// Get current page title based on the route
const currentPageTitle = computed(() => {
    switch (router.currentRoute.value.path) {
        case '/admin/feedback':
            return 'Comments';
        case '/admin/config-game':
            return 'Game Configuration';
        case '/admin/config-users':
            return 'User Configuration';
        default:
            return 'Admin Panel';
    }
});
</script>

<style scoped>
/* Fade-in animation */
.animate-fade-in {
    animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Smooth transitions for sidebar links */
aside a {
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* Highlight active route in the sidebar */
.router-link-active {
    background-color: rgba(59, 130, 246, 0.5); /* Blue background for active link */
    color: white;
}
</style>