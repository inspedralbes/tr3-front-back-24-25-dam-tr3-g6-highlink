<template>
    <div id="app" class="flex flex-col min-h-screen text-white">
        <!-- Navbar -->
        <nav class="bg-gradient-to-r from-slate-800 to-slate-900 py-4 fixed top-0 w-full z-50 shadow-lg">
            <div class="container mx-auto flex justify-between items-center px-4">
                <!-- Brand Name -->
                <router-link to="/"
                    class="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300">
                    High Link
                </router-link>

                <!-- Mobile Menu Toggle -->
                <button @click="toggleMenu" class="block lg:hidden text-white focus:outline-none">
                    <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path v-if="!showMenu" fill-rule="evenodd" clip-rule="evenodd"
                            d="M3 5h18v2H3V5zm18 4H3v2h18V9zm0 6H3v2h18v-2z" />
                        <path v-else fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 5c1.1046 0 2 .89543 2 2v10c0 1.1046-.8954 2-2 2s-2-.8954-2-2V7c0-1.10457.8954-2 2-2zM4 5c1.1046 0 2 .89543 2 2v10c0 1.1046-.8954 2-2 2s-2-.8954-2-2V7c0-1.10457.8954-2 2-2zm14 0c1.1046 0 2 .89543 2 2v10c0 1.1046-.8954 2-2 2s-2-.8954-2-2V7c0-1.10457.8954-2 2-2z" />
                    </svg>
                </button>

                <!-- Navigation Links -->
                <div :class="menuClasses">
                    <router-link to="/howToPlay"
                        class="text-white hover:text-gray-300 transition-colors duration-300 block mt-4 lg:inline-block lg:mt-0 mr-6">
                        How To Play
                    </router-link>
                    <router-link to="/aboutUs"
                        class="text-white hover:text-gray-300 transition-colors duration-300 block mt-4 lg:inline-block lg:mt-0 mr-6">
                        About Us
                    </router-link>
                    <router-link to="/contact"
                        class="text-white hover:text-gray-300 transition-colors duration-300 block mt-4 lg:inline-block lg:mt-0 mr-6">
                        Contact
                    </router-link>
                    <router-link to="/gallery"
                        class="text-white hover:text-gray-300 transition-colors duration-300 block mt-4 lg:inline-block lg:mt-0">
                        Gallery
                    </router-link>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <!-- <main class="container mx-auto my-auto">
            <NuxtPage />
        </main> -->

        <main class="flex-1 flex items-center justify-center">
            <NuxtPage />
        </main>

        <!-- Footer -->
        <footer
            class="bg-gradient-to-r from-slate-800 to-slate-900 text-white text-center p-4 fixed bottom-0 w-full shadow-lg">
            <p>&copy; 2025 High Link</p>
        </footer>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showMenu = ref(false);

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

const menuClasses = computed(() => ({
    'hidden': !showMenu.value,
    'lg:flex': true,
    'flex-col': true, // Stack vertically on mobile
    'lg:flex-row': true, // Align horizontally on desktop
    'items-center': true,
    'w-full': true,
    'lg:w-auto': true,
    'text-right': true, // Align text to the right on mobile
    'lg:text-left': true // Align text to the left on desktop
}));
</script>

<style scoped>
/* Smooth transition for navbar links */
nav a {
    transition: color 0.3s ease;
}

/* Gradient animation for navbar links */
nav a:hover {
    background: linear-gradient(90deg, #ffd700, #ff0000, #ffd700);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: backgroundChange 3s linear infinite;
}

@keyframes backgroundChange {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>