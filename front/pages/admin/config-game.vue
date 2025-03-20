<template>
    <div class="animate-fade-in">
        <h2 class="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Config Game
        </h2>
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p class="text-gray-300">Configure game settings here.</p>
            <div v-for="(config, index) in configs" :key="index" class="mb-4">
                <label class="block text-gray-300">{{ config.name }}</label>
                <input 
                    v-if="config.type === 'float' || config.type === 'int'" 
                    :type="'number'" 
                    v-model="config.value" 
                    class="input"
                />
                <input 
                    v-else 
                    :type="'text'" 
                    v-model="config.value" 
                    class="input"
                />
                <button @click="removeConfig(index)" class="btn btn-danger">Remove</button>
            </div>
            <div class="mt-6">
                <h3 class="text-xl font-bold mb-4">Add New Config</h3>
                <label class="block text-gray-300">Name</label>
                <input type="text" v-model="newConfig.name" class="input mb-2" />
                <label class="block text-gray-300">Value</label>
                <input 
                    :type="newConfig.type === 'float' || newConfig.type === 'int' ? 'number' : 'text'" 
                    v-model="newConfig.value" 
                    class="input mb-2" 
                />
                <label class="block text-gray-300">Type</label>
                <select v-model="newConfig.type" class="input mb-4">
                    <option value="float">Float</option>
                    <option value="int">Int</option>
                    <option value="text">Text</option>
                </select>
                <button @click="addConfig" class="btn" :disabled="!newConfig.name || !newConfig.value">Add Config</button>
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

.input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
}

.btn {
    padding: 0.5rem 1rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
}

.btn-danger {
    background-color: #e53e3e;
    margin-left: 0.5rem;
}
</style>