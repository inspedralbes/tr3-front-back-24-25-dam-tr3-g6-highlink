<template>
    <div class="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl w-full animate-fade-in">
            <!-- Page Title -->
            <div class="text-center">
                <h1 class="text-5xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Contact Us
                </h1>
                <p class="text-lg text-gray-300 mb-8">
                    Have questions or feedback? We'd love to hear from you!
                </p>
            </div>

            <!-- Contact Form -->
            <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8 transform transition-all hover:scale-105">
                <form @submit.prevent="submitForm">
                    <!-- Name Field -->
                    <div class="mb-6">
                        <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            v-model="form.name"
                            placeholder="Your name"
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <!-- Email Field -->
                    <div class="mb-6">
                        <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            v-model="form.email"
                            placeholder="Your email"
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <!-- Subject Field -->
                    <div class="mb-6">
                        <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            v-model="form.subject"
                            placeholder="Subject"
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <!-- Message Field -->
                    <div class="mb-6">
                        <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Message</label>
                        <textarea
                            id="message"
                            v-model="form.message"
                            placeholder="Your message"
                            rows="4"
                            class="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-300/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    <!-- Submit Button -->
                    <div class="text-center">
                        <button
                            type="submit"
                            class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { sendMessage } from '../services/communicationManager.js';

// Form data
const form = ref({
    name: '',
    email: '',
    subject: '',
    message: '',
});

// Form submission handler
const submitForm = async () => {
    try {
        await sendMessage(form.value.name, form.value.email, form.value.subject, form.value.message);
        alert('Thank you for contacting us! We will get back to you soon.');
        form.value = { name: '', email: '', subject: '', message: '' }; // Reset form
    } catch (error) {
        alert('Failed to send message. Please try again.');
    }
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