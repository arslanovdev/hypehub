<script setup>
import { Button } from "flowbite-vue";
import { Form, Field } from "vee-validate";
import { useAccountStore } from "@/stores/index.js";
import PageTitle from "@/components/PageTitle.vue";
import * as Yup from "yup";
import { onMounted } from "vue";
import { router } from "@/router/index.js";

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has("token")) {
    router.push({ name: "project-list" });
  }
});

const accountStore = useAccountStore();

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Некорректный адрес электронной почты")
    .required("Email обязателен")
    .max(255, "Email не должен превышать 255 символов"),
  password: Yup.string()
    .required("Пароль обязателен")
    .min(8, "Пароль должен состоять не менее чем из 8 символов"),
  password_confirmation: Yup.string()
    .required("Пароль обязателен")
    .oneOf([Yup.ref("password"), null], "Пароли должны совпадать"),
});

async function onSubmit(values) {
  const token = new URLSearchParams(window.location.search).get("token")
  values = {...values, token};

  await accountStore.resetPassword(values)
}

const failedValidationClasses =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 " +
  "focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 dark:focus:ring-red-500 " +
  "dark:focus:border-red-500";
</script>

<template>
  <PageTitle> Изменение пароля </PageTitle>
  <p class="mb-3 text-gray-500 dark:text-gray-400">
    Введите свой e-mail и задайте новый пароль
  </p>
  <Form
    v-slot="{ errors, isSubmitting }"
    class="mt-8"
    :validation-schema="schema"
    @submit="onSubmit"
  >
    <div class="mb-6">
      <label
        for="email"
        :class="{ 'text-red-700 dark:text-red-500': errors.email }"
        class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
      >
        Email
      </label>
      <Field
        id="email"
        required
        placeholder="name@company.com"
        name="email"
        type="email"
        :class="{ [failedValidationClasses]: errors.email }"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <p
        v-if="errors.email"
        class="mt-2 text-sm text-red-600 dark:text-red-500"
      >
        {{ errors.email }}
      </p>
    </div>
    <div class="mb-6">
      <label
        for="password"
        :class="{ 'text-red-700 dark:text-red-500': errors.password }"
        class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
      >
        Пароль
      </label>
      <Field
        id="password"
        required
        name="password"
        type="password"
        :class="{ [failedValidationClasses]: errors.password }"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <p
        v-if="errors.password"
        class="mt-2 text-sm text-red-600 dark:text-red-500"
      >
        {{ errors.password }}
      </p>
    </div>
    <div class="mb-6">
      <label
        for="confirmPassword"
        :class="{
          'text-red-700 dark:text-red-500': errors.password_confirmation,
        }"
        class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
      >
        Подтвердите пароль
      </label>
      <Field
        id="password_confirmation"
        required
        name="password_confirmation"
        type="password"
        :class="{ [failedValidationClasses]: errors.password_confirmation }"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <p
        v-if="errors.password_confirmation"
        class="mt-2 text-sm text-red-600 dark:text-red-500"
      >
        {{ errors.password_confirmation }}
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
        Изменить пароль
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
