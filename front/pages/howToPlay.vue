<template>
    <div class="text-center animate-fade-in">
        <h1 class="text-5xl sm:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            How to Play
        </h1>
        <p class="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Welcome to High Link! Get ready for an exciting adventure. Use the following controls to navigate and unleash your player's power.
        </p>

        <!-- Controls Section -->
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 max-w-2xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">
                Controls
            </h2>
            <div class="space-y-4 text-left">
                <!-- WASD Controls -->
                <div class="flex items-center space-x-4">
                    <div class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                        W
                    </div>
                    <p class="text-lg text-gray-300">Move Up</p>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                        A
                    </div>
                    <p class="text-lg text-gray-300">Move Left</p>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                        S
                    </div>
                    <p class="text-lg text-gray-300">Move Down</p>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                        D
                    </div>
                    <p class="text-lg text-gray-300">Move Right</p>
                </div>

                <!-- Player Power Control -->
                <div class="flex items-center space-x-4">
                    <div class="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                        C
                    </div>
                    <p class="text-lg text-gray-300">Activate Player Power</p>
                </div>
            </div>
        </div>
    </div>
</template>

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