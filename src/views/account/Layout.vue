<script setup>
import Logo from "@/components/Logo.vue";

import { useAccountStore } from "@/stores";
import { router } from "@/router";
import { useDark } from "@vueuse/core";
import Alert from "@/components/Alert.vue";

useDark();

// redirect to project list if already logged in
const accountStore = useAccountStore();
if (accountStore.user && accountStore.user?.verified) {
  router.push({ name: "project-list" });
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
    <main class="bg-gray-50 dark:bg-gray-900">
      <div
        class="flex flex-col justify-center items-center py-8 px-6 mx-auto md:min-h-screen"
      >
        <Logo class="mb-6 lg:mb-8" />
        <Alert />
        <div
          class="justify-center items-center w-full bg-white rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-sm xl:p-0 dark:bg-gray-800"
        >
          <div class="p-6 w-full sm:p-8 lg:p-10">
            <router-view />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
