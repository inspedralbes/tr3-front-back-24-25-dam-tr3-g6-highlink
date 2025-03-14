<template>
    <div class="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full animate-fade-in">
            <!-- Page Title -->
            <div class="text-center">
                <h2 class="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Register
                </h2>
                <p class="text-lg text-gray-300 mb-8">
                    Create a new account to access the admin panel.
                </p>
            </div>

            <!-- Registration Form -->
            <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8">
                <form @submit.prevent="register">
                    <!-- Name Field -->
                    <div class="mb-6">
                        <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            v-model="registerForm.name"
                            placeholder="Enter your name"
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <!-- Email Field -->
                    <div class="mb-6">
                        <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            v-model="registerForm.email"
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
                            v-model="registerForm.password"
                            placeholder="Enter your password"
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <!-- Confirm Password Field -->
                    <div class="mb-6">
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            v-model="registerForm.confirmPassword"
                            placeholder="Confirm your password"
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
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/index.js';
import { register as apiRegister } from '../services/communicationManager.js';

const router = useRouter();
const appStore = useAppStore();

// Registration form data
const registerForm = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
});

// Registration function
const register = async () => {
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const { user, token } = await apiRegister(registerForm.value.name, registerForm.value.email, registerForm.value.password);
        appStore.setUser(user);
        appStore.setToken(token);
        console.log('Registration successful:', user);
        router.push('/'); // Redirect to home page after successful registration
    } catch (error) {
        alert('Registration failed. Please try again.');
    }
};
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
</style>