<template>
    <div id="app" class="flex flex-col min-h-screen text-white">
        <!-- Hamburger Menu for Mobile -->
        <button @click="toggleSidebar"
            class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900/80 rounded-lg shadow-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </button>

        <!-- Sidebar (Visible only on mobile) -->
        <aside
            :class="['w-64 bg-slate-900/80 backdrop-blur-sm fixed h-screen p-4 shadow-lg transform transition-transform duration-300 z-40 lg:hidden', isSidebarOpen ? 'translate-x-0' : '-translate-x-full']">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Admin Panel
                </h2>
            </div>
            <nav class="space-y-2">
                <router-link to="/howToPlay"
                    class="flex items-center p-2 text-gray-300 hover:bg-slate-800/50 rounded-lg transition-colors duration-300">
                    <span>How To Play</span>
                </router-link>
                <router-link to="/aboutUs"
                    class="flex items-center p-2 text-gray-300 hover:bg-slate-800/50 rounded-lg transition-colors duration-300">
                    <span>About Us</span>
                </router-link>
                <router-link to="/contact"
                    class="flex items-center p-2 text-gray-300 hover:bg-slate-800/50 rounded-lg transition-colors duration-300">
                    <span>Contact</span>
                </router-link>
                <router-link to="/gallery"
                    class="flex items-center p-2 text-gray-300 hover:bg-slate-800/50 rounded-lg transition-colors duration-300">
                    <span>Gallery</span>
                </router-link>
            </nav>
        </aside>

        <!-- Navbar -->
        <nav class="bg-slate-900/80 backdrop-blur-sm py-4 fixed w-full z-30 shadow-lg">
            <div class="container mx-auto flex justify-between items-center px-4">
                <!-- Hamburger Menu and Title -->
                <div class="flex items-center">
                    <button @click="toggleSidebar" class="lg:hidden mr-4 p-2 bg-slate-900/80 rounded-lg shadow-lg">
                        <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <h1 class="text-xl font-bold text-gray-300">
                        {{ currentPageTitle }}
                    </h1>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="flex-1 pt-20 pb-16">
            <NuxtPage />
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

// Get current page title based on the route
const currentPageTitle = computed(() => {
    switch (router.currentRoute.value.path) {
        case '/howToPlay':
            return 'How To Play';
        case '/aboutUs':
            return 'About Us';
        case '/contact':
            return 'Contact';
        case '/gallery':
            return 'Gallery';
        default:
            return 'Home';
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