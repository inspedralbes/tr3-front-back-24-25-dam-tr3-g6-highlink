<template>
    <div class="animate-fade-in">
        <h2 class="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Comments
        </h2>
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p class="text-gray-300 mb-6">Manage and review user comments here.</p>

            <!-- Comments Grid -->
            <div v-if="comments.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <!-- Comment Card -->
                <div v-for="comment in comments" :key="comment.id" class="bg-slate-800/50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <p class="text-xl font-semibold text-gray-300">{{ comment.name }}</p>
                            <p class="text-md text-gray-400">{{ comment.email }}</p>
                        </div>
                        <button
                            @click="deleteComment(comment.id)"
                            class="text-red-500 hover:text-red-600 transition-colors"
                        >
                            <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                    <p class="text-gray-300 text-lg mb-6">{{ comment.message }}</p>
                    <p class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</p>
                </div>
            </div>
            <p v-else class="text-gray-300">No comments found.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchComments, deleteComment as deleteCommentApi } from '../../services/communicationManager.js';

// Reactive state for comments
const comments = ref([]);

// Fetch comments on page load
onMounted(async () => {
    try {
        const data = await fetchComments();
        comments.value = data;
    } catch (error) {
        console.error('Failed to fetch comments:', error);
    }
});

// Delete a comment
const deleteComment = async (commentId) => {
    try {
        await deleteCommentApi(commentId);
        comments.value = comments.value.filter(comment => comment.id !== commentId); // Remove the deleted comment
        alert('Comment deleted successfully.');
    } catch (error) {
        alert('Failed to delete comment. Please try again.');
    }
};

// Format date for display
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};
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