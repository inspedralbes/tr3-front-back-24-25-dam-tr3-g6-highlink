<template>
    <div class="animate-fade-in">
        <h2 class="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Users
        </h2>
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p class="text-gray-300 mb-6">Manage users here.</p>

            <!-- Users Grid -->
            <div v-if="users.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- User Card -->
                <div v-for="user in users" :key="user.id" class="bg-slate-800/50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <p class="text-xl font-semibold text-gray-300">{{ user.name }}</p>
                            <p class="text-md text-gray-400">{{ user.email }}</p>
                        </div>
                        <button
                            @click="deleteUser(user.id)"
                            class="text-red-500 hover:text-red-600 transition-colors"
                        >
                            <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>

                    <!-- Update Form -->
                    <form @submit.prevent="updateUser(user.id)">
                        <!-- Email Field -->
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                v-model="user.email"
                                placeholder="New email"
                                class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <!-- Password Field -->
                        <div class="mb-4">
                            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                type="password"
                                v-model="user.password"
                                placeholder="New password"
                                class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- Admin Permission Toggle -->
                        <div class="mb-6">
                            <label class="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    v-model="user.admin"
                                    class="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                                />
                                <span class="text-gray-300">Admin Permissions</span>
                            </label>
                        </div>

                        <!-- Update Button -->
                        <div class="text-center">
                            <button
                                type="submit"
                                class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Update User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <p v-else class="text-gray-300">No users found.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchAdminUsers, updateAdminUser, deleteAdminUser } from '../../services/communicationManager.js';

// Reactive state for users
const users = ref([]);

// Fetch users on page load
onMounted(async () => {
    try {
        const data = await fetchAdminUsers();
        users.value = data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
});

// Update a user
const updateUser = async (userId) => {
    try {
        const user = users.value.find(u => u.id === userId);
        await updateAdminUser(userId, {
            email: user.email,
            password: user.password,
            admin: user.admin,
        });
        alert('User updated successfully.');
    } catch (error) {
        alert('Failed to update user. Please try again.');
    }
};

// Delete a user
const deleteUser = async (userId) => {
    try {
        await deleteAdminUser(userId);
        users.value = users.value.filter(user => user.id !== userId); // Remove the deleted user
        alert('User deleted successfully.');
    } catch (error) {
        alert('Failed to delete user. Please try again.');
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