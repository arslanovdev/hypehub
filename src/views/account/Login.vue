<script setup>
import { Button } from "flowbite-vue";
import { Form, Field } from "vee-validate";
import { useAccountStore } from "@/stores";
import * as Yup from "yup";
import PageTitle from "@/components/PageTitle.vue";

const schema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
  remember: Yup.bool(),
});
async function onSubmit(values) {
  const accountStore = useAccountStore();
  const { email, password, remember } = values;
  await accountStore.login(email, password, remember);
}

const failedValidationClasses =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 " +
  "focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 dark:focus:ring-red-500 " +
  "dark:focus:border-red-500";
</script>

<template>
  <PageTitle> Войдите в свой аккаунт </PageTitle>
  <p class="mb-3 text-gray-500 dark:text-gray-400">
    Присоединяйтесь к нашему сервису, чтобы получить облегчить работу с отзывами
    с различных источников.
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
        name="email"
        type="email"
        placeholder="name@company.com"
        :class="{ [failedValidationClasses]: errors.email }"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
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
        name="password"
        type="password"
        :class="{ [failedValidationClasses]: errors.password }"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="flex items-center mb-6">
      <div class="flex">
        <div class="flex items-center h-5">
          <Field
            id="remember"
            name="remember"
            aria-describedby="remember"
            type="checkbox"
            :value="true"
            checked
            class="w-4 h-4 bg-gray-50 rounded border-gray-300 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div class="ml-3 text-sm">
          <label
            for="remember"
            class="font-medium text-gray-900 dark:text-white"
          >
            Запомнить меня
          </label>
        </div>
      </div>
      <router-link
        :to="{ name: 'forgot-password' }"
        class="ml-auto text-sm text-blue-700 dark:text-blue-500 hover:underline"
      >
        Забыли пароль?
      </router-link>
    </div>
    <Button
      :disabled="isSubmitting"
      :loading="isSubmitting"
      class="mb-6"
      color="default"
      size="xl"
    >
      Войти в аккаунт
    </Button>
    <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
      Не зарегистрированы?
      <router-link
        :to="{ name: 'signup' }"
        class="ml-1 text-blue-700 hover:underline dark:text-blue-500"
      >
        Создайте учетную запись.
      </router-link>
    </div>
  </Form>
</template>
