<script setup>
import { useAccountStore } from "@/stores";
import { onBeforeMount, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { router } from "@/router/index.js";
import PageTitle from "@/components/PageTitle.vue";

const accountStore = useAccountStore();

onBeforeMount(() => {
  const accountStore = useAccountStore();
  const { user } = storeToRefs(accountStore);
  if (!user.value) {
    router.push({ name: "project-list" });
  }
});
onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("hash")) {
    await accountStore.verifyEmail(urlParams.get("hash"));
  }
});
</script>

<template>
  <PageTitle> Активируйте свою учетную запись </PageTitle>
  <p class="mb-3 text-gray-500 dark:text-gray-400">
    Мы отправили ссылку на ваш адрес электронной почты
    <span class="font-semibold">"{{ accountStore.user.email }}"</span>.
    Перейдите по ней, чтобы активировать свой аккаунт.
  </p>
  <div class="text-sm font-semibold text-gray-500 dark:text-gray-400">
    Хотите войти в другой аккаунт?
    <router-link
      :to="{ name: 'login' }"
      class="ml-1 text-blue-700 dark:text-blue-500 hover:underline"
    >
      Сделайте это здесь.
    </router-link>
  </div>
</template>
