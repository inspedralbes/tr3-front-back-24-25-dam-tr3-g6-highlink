<template>
    <div class="animate-fade-in">
        <!-- Page Title -->
        <h1 class="text-4xl sm:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 text-center">
            Admin Dashboard
        </h1>

        <!-- Stats Service Control -->
        <div class="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-lg">
            <h2 class="text-2xl font-bold text-gray-300 mb-6">Stats Service Control</h2>

            <!-- Switch for Start/Stop Stats Service -->
            <div class="flex items-center justify-between">
                <p class="text-gray-300">Stats Service Status:</p>
                <button
                    @click="toggleStatsService"
                    :class="{
                        'bg-gradient-to-r from-green-500 to-teal-500': statsServiceActive,
                        'bg-gradient-to-r from-red-500 to-pink-500': statsServiceActive == false,
                    }"
                    class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none"
                >
                    <span
                        :class="{
                            'translate-x-6': statsServiceActive,
                            'translate-x-1': statsServiceActive == false,
                        }"
                        class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300"
                    ></span>
                </button>
            </div>

            <!-- Status Message -->
            <p class="mt-4 text-gray-300">
                {{ statsServiceActive ? 'Stats service is running.' : 'Stats service is stopped.' }}
            </p>
        </div>

        <!-- Additional Admin Features -->
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Feature Card 1 -->
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 class="text-xl font-bold text-gray-300 mb-4">User Management</h3>
                <p class="text-gray-400">Manage and review user accounts.</p>
            </div>

            <!-- Feature Card 2 -->
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 class="text-xl font-bold text-gray-300 mb-4">Game Configuration</h3>
                <p class="text-gray-400">View detailed game configurations and change.</p>
            </div>

            <!-- Feature Card 3 -->
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 class="text-xl font-bold text-gray-300 mb-4">Feedback with users</h3>
                <p class="text-gray-400">Review user comments.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '~/stores/index';
import { checkStatsService, onOffStatsService } from '~/services/communicationManager';

const appStore = useAppStore();
var statsService = ref(appStore.getStats());

var statsServiceActive = ref(statsService.value == 'running');

// Watch for changes in statsService and update statsServiceActive
watch(statsService, (newVal) => {
    statsServiceActive.value = newVal == 'running';
});

// Toggle stats service
const toggleStatsService = async () => {
    await onOffStatsService();
    statsService.value = appStore.getStats();
    if (statsService.value == 'running') {
        console.log('Stats service started.');
    } else {
        console.log('Stats service stopped.');
    }
};

onMounted ( async () => {
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