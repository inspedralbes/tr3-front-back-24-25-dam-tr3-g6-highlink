<template>
    <div id="app" class="flex flex-col min-h-screen bg-gray-800 text-white">
        <!-- <nav class="bg-blue-700 p-4">
            <ul class="list-none p-0 flex justify-center">
                <li class="mx-4"><router-link to="/" class="text-white no-underline">Home</router-link></li>
                <li class="mx-4"><router-link to="/aboutUs" class="text-white no-underline">About</router-link></li>
                <li class="mx-4"><router-link to="/contact" class="text-white no-underline">Contact</router-link></li>
            </ul>
        </nav> -->
        <nav class="bg-gray-900 py-4 absolute t-0 w-full">
            <div class="container mx-auto flex justify-between items-center">
                <!-- Nombre del cine a la izquierda -->
                <router-link to="/" class="text-white text-2xl font-semibold">High Link</router-link>
                <!-- Botón para toggle de menú en dispositivos móviles -->
                <button @click="toggleMenu" class="block lg:hidden text-white focus:outline-none">
                    <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path v-if="!showMenu" fill-rule="evenodd" clip-rule="evenodd"
                            d="M3 5h18v2H3V5zm18 4H3v2h18V9zm0 6H3v2h18v-2z" />
                        <path v-else fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 5c1.1046 0 2 .89543 2 2v10c0 1.1046-.8954 2-2 2s-2-.8954-2-2V7c0-1.10457.8954-2 2-2zM4 5c1.1046 0 2 .89543 2 2v10c0 1.1046-.8954 2-2 2s-2-.8954-2-2V7c0-1.10457.8954-2 2-2zm14 0c1.1046 0 2 .89543 2 2v10c0 1.1046-.8954 2-2 2s-2-.8954-2-2V7c0-1.10457.8954-2 2-2z" />
                    </svg>
                </button>
                <div :class="menuClasses">
                    <router-link to="/howToPlay" class="text-white block mt-4 lg:inline-block lg:mt-0 mr-4">How To
                        Play</router-link>
                    <router-link to="/aboutUs" class="text-white block mt-4 lg:inline-block lg:mt-0 mr-4">About
                        Us</router-link>
                    <router-link to="/contact"
                        class="text-white block mt-4 lg:inline-block lg:mt-0 mr-4">Contact</router-link>
                    <router-link to="/gallery"
                        class="text-white cursor-pointer block mt-4 lg:inline-block lg:mt-0 mr-4">Gallery</router-link>
                </div>
            </div>
        </nav>
        <main class="flex-1">
            <router-view></router-view>
        </main>
        <footer class="bg-gray-900 text-white text-center p-4">
            <p>&copy; 2025 High Link</p>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showMenu = ref(false);

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

const menuClasses = computed(() => ({
    'hidden': !showMenu.value,
    'lg:flex': true,
    'flex-row': true,
    'items-center': true,
    'w-full': true,
    'lg:w-auto': true,
    'text-center': true
}));
</script>

<style scoped>
nav button {
    margin-bottom: -0.125rem;
}

nav a {
    transition: color 0.3s ease;
}

nav a:hover {
    color: #ffd700;
    /* Cambiar color al pasar el cursor */
}
</style>