<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-8">
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
                        'bg-gradient-to-r from-red-500 to-pink-500': !statsServiceActive,
                    }"
                    class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none"
                >
                    <span
                        :class="{
                            'translate-x-6': statsServiceActive,
                            'translate-x-1': !statsServiceActive,
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
                <h3 class="text-xl font-bold text-gray-300 mb-4">Game Analytics</h3>
                <p class="text-gray-400">View detailed game statistics and reports.</p>
            </div>

            <!-- Feature Card 3 -->
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 class="text-xl font-bold text-gray-300 mb-4">System Logs</h3>
                <p class="text-gray-400">Monitor system logs and activity.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive state for stats service
const statsServiceActive = ref(false);

// Toggle stats service
const toggleStatsService = () => {
    statsServiceActive.value = !statsServiceActive.value;
    // Here you can add logic to start/stop the stats service via an API call
    if (statsServiceActive.value) {
        console.log('Stats service started.');
    } else {
        console.log('Stats service stopped.');
    }
};
</script>

<style scoped>
/* Custom styles (if needed) */
</style>