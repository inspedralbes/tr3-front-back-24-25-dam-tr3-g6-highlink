<template>
    <div class="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl w-full animate-fade-in">
            <!-- Page Title -->
            <div class="text-center">
                <h1 class="text-5xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Art Gallery
                </h1>
                <p class="text-lg text-gray-300">Discover the amazing art of our game</p>
            </div>

            <!-- Art Gallery Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <!-- Artwork 1 -->
                <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                    <img class="w-full h-64 object-cover" src="/public/assets/artGallery/red-player.png" alt="Red Player Art">
                    <div class="p-4 bg-blue-500/10">
                        <p class="text-sm text-blue-400">Red Player Character</p>
                    </div>
                </div>

                <!-- Artwork 2 -->
                <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                    <img class="w-full h-64 object-cover" src="/public/assets/artGallery/yellow-player.png" alt="Yellow Player Art">
                    <div class="p-4 bg-purple-500/10">
                        <p class="text-sm text-purple-400">Yellow Player Character</p>
                    </div>
                </div>

                <!-- Artwork 3 -->
                <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                    <img class="w-full h-64 object-cover" src="/public/assets/artGallery/crab-extra.png" alt="Crab Extra Art">
                    <div class="p-4 bg-red-500/10">
                        <p class="text-sm text-red-400">Crab Enemy</p>
                    </div>
                </div>

                <!-- Artwork 4 -->
                <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                    <img class="w-full h-64 object-cover" src="/public/assets/artGallery/background-1.png" alt="Game Background Art">
                    <div class="p-4 bg-green-500/10">
                        <p class="text-sm text-green-400">Game Background</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
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