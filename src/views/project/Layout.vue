<script setup>
import Alert from "@/components/Alert.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <AppHeader />
  <Alert />
  <main class="px-4 mx-auto max-w-8xl pt-6 lg:pt-8 pb-6 lg:pb-16">
    <router-view />
  </main>
</template>
