<template>
    <div id="admin-app" class="flex min-h-screen text-white bg-gradient-to-br from-slate-800 to-slate-900">
        <!-- Sidebar -->
        <aside class="w-64 bg-slate-900/80 backdrop-blur-sm fixed h-screen p-4 shadow-lg">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Admin Panel
                </h2>
            </div>
            <nav class="space-y-2">
                <router-link to="/admin/comments"
                    class="flex items-center p-2 text-gray-300 hover:bg-slate-800/50 rounded-lg transition-colors duration-300">
                    <span>Comments</span>
                </router-link>
                <router-link to="/admin/config-game"
                    class="flex items-center p-2 text-gray-300 hover:bg-slate-800/50 rounded-lg transition-colors duration-300">
                    <span>Config Game</span>
                </router-link>
            </nav>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 ml-64">
            <!-- Navbar -->
            <nav class="bg-slate-900/80 backdrop-blur-sm py-4 fixed w-full z-40 shadow-lg">
                <div class="container mx-auto flex justify-between items-center px-4">
                    <h1 class="text-xl font-bold text-gray-300">
                        {{ currentPageTitle }}
                    </h1>
                    <button @click="logout"
                        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                        Logout
                    </button>
                </div>
            </nav>

            <!-- Page Content -->
            <main class="pt-20 pb-16 px-6">
                <NuxtPage />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Get current page title based on the route
const currentPageTitle = computed(() => {
    switch (router.currentRoute.value.path) {
        case '/admin/feedback':
            return 'Feedback';
        case '/admin/config':
            return 'Config';
        default:
            return 'Admin Panel';
    }
});

// Logout function
const logout = () => {
    // Add your logout logic here
    console.log('Logged out');
    router.push('/'); // Redirect to the home page
};
</script>

<style scoped>
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