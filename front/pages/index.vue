<template>
    <div class="min-h-screen text-white flex flex-col items-center justify-center">
        <ConnectedLinesBackground />
        <h1 class="text-4xl font-bold mb-4">Welcome to the Game Project</h1>
        <p class="text-lg mb-8">Get ready to play an amazing game!</p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start Game
        </button>
    </div>
</template>

<script setup>
import ConnectedLinesBackground from "~/components/ConnectedLinesBackground.vue";
</script>

<style scoped>
/* Add any additional styles here */
</style>