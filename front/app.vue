<template>
  <ConnectedLinesBackground />
  <component :is="layout" class="font-mono" />
</template>

<script setup>
import ConnectedLinesBackground from "~/components/ConnectedLinesBackground.vue";
import AdminLayout from '~/layouts/admin.vue';
import DefaultLayout from '~/layouts/default.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const layout = computed(() => {
  return route.path.startsWith('/admin') ? AdminLayout : DefaultLayout;
});
</script>