<template>
    <div class="animate-fade-in">
        <h2 class="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Comments
        </h2>
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p class="text-gray-300">Manage and review user comments here.</p>
            <!-- Add your comments table or list here -->
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