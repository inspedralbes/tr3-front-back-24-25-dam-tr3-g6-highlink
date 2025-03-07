<template>
    <div id="app" class="flex flex-col min-h-screen bg-blue-900 text-white">
        <nav class="bg-blue-700 p-4">
            <ul class="list-none p-0 flex justify-center">
                <li class="mx-4"><router-link to="/" class="text-white no-underline">Home</router-link></li>
                <li class="mx-4"><router-link to="/about" class="text-white no-underline">About</router-link></li>
                <li class="mx-4"><router-link to="/contact" class="text-white no-underline">Contact</router-link></li>
            </ul>
        </nav>
        <main class="flex-1">
            <router-view></router-view>
        </main>
        <footer class="bg-blue-800 text-white text-center p-4">
            <p>&copy; 2025 Arctic Adventure</p>
        </footer>
    </div>
</template>

<script setup>
// Add any additional logic here
</script>

<style scoped>
/* Add any additional styles here */
</style>