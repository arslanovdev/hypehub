<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
});

const initials = computed(() => {
  const namesArray = props.name.trim().split(' ');
  if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
  else return `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}`;
});
</script>

<template>
  <div class="inline-flex cursor-pointer ml-2 sm:ml-4 overflow-hidden relative justify-center items-center w-9 h-9 bg-blue-200 rounded-full dark:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
    <span class="font-medium text-gray-600 dark:text-gray-300">
      {{ initials }}
    </span>
  </div>
</template>
