<template>
    <div class="animate-fade-in p-4 sm:p-6 md:pt-24 md:pb-12">
        <!-- Page Title -->
        <h1 class="text-4xl sm:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 text-center">
            Search Game Stats by ID
        </h1>

        <!-- Search Input -->
        <div class="max-w-2xl mx-auto mb-8">
            <div class="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    v-model="gameId"
                    placeholder="Enter Game ID"
                    class="w-full px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
                <button
                    @click="searchGame"
                    class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                >
                    Search Stats
                </button>
            </div>
        </div>

        <!-- Game Details -->
        <div v-if="game" class="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-lg max-w-4xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
                <!-- Game Stats Image -->
                <div class="flex justify-center items-center">
                    <img :src="`${statsUrl}/${game.statsImage}`" :alt="`${game.name} Stats`" class="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
                </div>
            </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-8 text-center text-red-500 text-lg">
            {{ error }}
        </div>
    </div>

    <!-- <div v-else class="flex flex-col items-center justify-center h-full p-4 sm:p-6">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400 text-center">
            Service Unavailable
        </h1>
        <p class="text-lg text-gray-300 text-center">
            The service is currently under reconstruction. Please check back later.
        </p>
    </div> -->
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAppStore } from '~/stores/index';
import { checkStatsService, fetchStats } from '~/services/communicationManager';

const appStore = useAppStore();
var statsService = ref(appStore.getStats());
var statsServiceActive = ref(statsService.value == 'running');

var statsUrl = import.meta.env.VITE_STATS_URL;

// Watch for changes in statsService and update statsServiceActive
watch(statsService, (newVal) => {
    statsServiceActive.value = newVal == 'running';
});

// Reactive state for game ID, game data, and error
const gameId = ref('');
const game = ref(null);
const error = ref('');

// Search for a game by ID
const searchGame = async () => {
    const response = await fetchStats(gameId.value);

    if (response.status === 'success') {
        game.value = {
            id: response.case_id,
            statsImage: response.image_path,
            name: `Game ${response.case_id}`
        };
        error.value = '';
    } else {
        game.value = null;
        error.value = 'Failed to fetch game stats. Please try again.';
    }
};

onMounted(async () => {
    await checkStatsService();

    statsService.value = appStore.getStats();
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
</style>