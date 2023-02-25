<script setup>
import { Button } from "flowbite-vue";
import { Form, Field } from "vee-validate";
import { useAccountStore } from "@/stores/index.js";
import PageTitle from "@/components/PageTitle.vue";

const accountStore = useAccountStore();

async function onSubmit(values) {
  await accountStore.sendResetPasswordEmail(values);
}

const failedValidationClasses =
    "bg-red-50 border-red-500 placeholder-red-700 focus:ring-red-500 " +
    "focus:border-red-500 dark:placeholder-red-500 dark:border-red-500 dark:focus:ring-red-500 " +
    "dark:focus:border-red-500";
</script>

<template>
  <PageTitle> Забыли пароль? </PageTitle>
  <p class="mb-3 text-gray-500 dark:text-gray-400">
    Введите свой e-mail в поле ниже, и мы вышлем вам код
    <br class="hidden md:inline">
    для сброса пароля.
  </p>
  <Form
    v-slot="{ errors, isSubmitting }"
    class="mt-8"
    @submit="onSubmit"
  >
    <div class="mb-6">
      <label
        for="email"
        :class="{ 'text-red-700 dark:text-red-500': errors.email }"
        class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
      >
        Ваш email
      </label>
      <Field
        id="email"
        type="email"
        name="email"
        placeholder="name@company.com"
        required
        :class="{ [failedValidationClasses]: errors.email }"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full p-2.5"
      />
      <p
        v-if="errors.email"
        class="mt-2 text-sm text-red-600 dark:text-red-500"
      >
        {{ errors.email }}
      </p>
    </div>
    <div
      class="flex items-end text-sm font-medium text-gray-500 dark:text-gray-400"
    >
      <Button
        :disabled="isSubmitting"
        color="default"
        size="xl"
      >
        Отправить код
      </Button>
      <router-link
        :to="{ name: 'login' }"
        class="ml-auto text-blue-700 dark:text-blue-500 hover:underline"
      >
        Назад к входу в систему
      </router-link>
    </div>
  </Form>
</template>
