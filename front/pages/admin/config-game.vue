<template>
    <div class="animate-fade-in">
        <h2 class="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Config Game
        </h2>
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <p class="text-gray-300 mb-6">Configure game settings here.</p>

            <!-- Existing Configs -->
            <div v-for="(config, index) in configs" :key="index" class="mb-4 p-4 bg-slate-800/50 rounded-lg">
                <label class="block text-gray-300 text-sm font-medium mb-1">{{ config.name }}</label>
                <input 
                    v-if="config.type === 'float' || config.type === 'int'" 
                    :type="'number'" 
                    v-model="config.value" 
                    class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    v-else 
                    :type="'text'" 
                    v-model="config.value" 
                    class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    @click="removeConfig(index)" 
                    class="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                    Remove
                </button>
            </div>

            <!-- Add New Config -->
            <div class="mt-8">
                <h3 class="text-xl font-bold text-gray-300 mb-4">Add New Config</h3>
                <div class="space-y-4">
                    <!-- Name Input -->
                    <div>
                        <label class="block text-gray-300 text-sm font-medium mb-1">Name</label>
                        <input 
                            type="text" 
                            v-model="newConfig.name" 
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- Value Input -->
                    <div>
                        <label class="block text-gray-300 text-sm font-medium mb-1">Value</label>
                        <input 
                            :type="newConfig.type === 'float' || newConfig.type === 'int' ? 'number' : 'text'" 
                            v-model="newConfig.value" 
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- Type Dropdown -->
                    <div>
                        <label class="block text-gray-300 text-sm font-medium mb-1">Type</label>
                        <select 
                            v-model="newConfig.type" 
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="float" class="bg-slate-800">Float</option>
                            <option value="int" class="bg-slate-800">Int</option>
                            <option value="text" class="bg-slate-800">Text</option>
                        </select>
                    </div>

                    <!-- Add Config Button -->
                    <button 
                        @click="addConfig" 
                        :disabled="!newConfig.name || !newConfig.value" 
                        class="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add Config
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchConfig, updateConfig } from '../../services/communicationManager.js';

const configs = ref([]);
const newConfig = ref({ name: '', value: '', type: 'text' });

const fetchConfigs = async () => {
    try {
        const response = await fetchConfig();
        configs.value = response.Config;
    } catch (error) {
        console.error('Failed to fetch configs:', error);
    }
};

const addConfig = async () => {
    try {
        configs.value.push({ ...newConfig.value });
        await updateConfig({ Config: configs.value });
        newConfig.value = { name: '', value: '', type: 'text' };
    } catch (error) {
        console.error('Failed to add config:', error);
    }
};

const removeConfig = async (index) => {
    try {
        configs.value.splice(index, 1);
        await updateConfig({ Config: configs.value });
    } catch (error) {
        console.error('Failed to remove config:', error);
    }
};

onMounted(fetchConfigs);
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