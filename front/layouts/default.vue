<template>
    <div id="app" class="flex flex-col min-h-screen text-white">
        <nav class="bg-slate-800 py-4 absolute t-0 w-full">
            <div class="container mx-auto flex justify-between items-center">
                <!-- Nombre del cine a la izquierda -->
                <router-link to="/" class="text-white text-2xl font-semibold ml-2">High Link</router-link>
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
            <NuxtPage />
        </main>
        <footer class="bg-slate-800 text-white text-center p-4">
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
    'flex-col': true, // Cambiar a columna en dispositivos móviles
    'lg:flex-row': true, // Cambiar a fila en dispositivos grandes
    'items-center': true,
    'w-full': true,
    'lg:w-auto': true,
    'text-right': true, // Alinear a la derecha
    'lg:text-left': true // Alinear a la izquierda en dispositivos grandes
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
    animation: backgroundChange 3s linear infinite;
    background: linear-gradient(90deg, #ffd700, #ff0000, #ffd700);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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