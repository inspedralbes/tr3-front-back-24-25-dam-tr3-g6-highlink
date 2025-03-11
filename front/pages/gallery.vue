<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
            <!-- Page Title -->
            <div class="text-center">
                <h1 class="text-4xl sm:text-5xl font-bold mb-4">Art Gallery</h1>
                <p class="text-lg text-gray-300">Discover the amazing art of our game</p>
            </div>

            <!-- Art Gallery Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <!-- Artwork 1 -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                    <img class="w-full h-64 object-cover" src="/public/assets/artGallery/red-player.png" alt="Red Player Art">
                    <div class="p-4 bg-blue-100">
                        <p class="text-sm text-blue-800">Red Player Character</p>
                    </div>
                </div>

                <!-- Artwork 2 -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                    <img class="w-full h-64 object-cover" src="/public/assets/artGallery/yellow-player.png" alt="Yellow Player Art">
                    <div class="p-4 bg-purple-100">
                        <p class="text-sm text-purple-800">Yellow Player Character</p>
                    </div>
                </div>

                <!-- Artwork 3 -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                    <img class="w-full h-64 object-cover" src="/public/assets/artGallery/crab-extra.png" alt="Crab Extra Art">
                    <div class="p-4 bg-red-100">
                        <p class="text-sm text-red-800">Crab Enemy</p>
                    </div>
                </div>

                <!-- Artwork 4 -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                    <img class="w-full h-64 object-cover" src="/public/assets/artGallery/background-1.png" alt="Game Background Art">
                    <div class="p-4 bg-green-100">
                        <p class="text-sm text-green-800">Game Background</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Add any additional logic here
</script>

<style scoped>
/* Add custom styles if needed */
</style>