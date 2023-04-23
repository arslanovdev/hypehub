<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div
    class="block relative p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <router-link
      :to="{ name: 'project-item', params: { slug: project.slug } }"
      class="after:absolute after:inset-0 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      {{ project.name }}
    </router-link>
    <p class="font-normal text-gray-700 dark:text-gray-400">
      Страница проекта: /{{ project.slug }}
    </p>
  </div>
</template>
