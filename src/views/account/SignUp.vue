<script setup>
import * as Yup from "yup";
import PageTitle from "@/components/PageTitle.vue";
import { Button } from "flowbite-vue";
import { Form, Field } from "vee-validate";
import { useAccountStore, useAlertStore } from "@/stores";
import { router } from "@/router";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Имя обязательно")
    .max(50, "Имя должно быть не длинее 50 символов"),
  surname: Yup.string()
    .required("Фамилия обязательна")
    .max(50, "Фамилия должна быть не длинее 50 символов"),
  email: Yup.string()
    .email("Некорректный адрес электронной почты")
    .required("Email обязателен")
    .max(255, "Email не должен превышать 255 символов"),
  password: Yup.string()
    .required("Пароль обязателен")
    .min(8, "Пароль должен состоять не менее чем из 8 символов"),
  confirmPassword: Yup.string()
    .required("Пароль обязателен")
    .oneOf([Yup.ref("password"), null], "Пароли должны совпадать"),
  terms: Yup.bool().oneOf([true], "The terms and conditions must be accepted"),
});

async function onSubmit(values) {
  const accountStore = useAccountStore();
  const alertStore = useAlertStore();
  try {
    await accountStore.register(values);
    await router.push({ name: "project-list" });
    alertStore.success("Регистрация прошла успешно");
  } catch (error) {
    alertStore.error(error);
  }
}

const failedValidationClasses =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 " +
  "focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 dark:focus:ring-red-500 " +
  "dark:focus:border-red-500";
</script>

<template>
  <PageTitle> Создать учетную запись </PageTitle>
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
    <div
      class="flex flex-col mb-6 space-y-6 md:flex-row md:space-y-0 md:space-x-6"
    >
      <div class="w-full">
        <label
          for="name"
          :class="{ 'text-red-700 dark:text-red-500': errors.name }"
          class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
        >
          Имя
        </label>
        <Field
          id="name"
          required
          placeholder="Иван"
          name="name"
          type="text"
          :class="{ [failedValidationClasses]: errors.name }"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <p
          v-if="errors.name"
          class="mt-2 text-sm text-red-600 dark:text-red-500"
        >
          {{ errors.name }}
        </p>
      </div>
      <div class="w-full">
        <label
          for="surname"
          :class="{ 'text-red-700 dark:text-red-500': errors.surname }"
          class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
        >
          Фамилия
        </label>
        <Field
          id="surname"
          required
          placeholder="Иванов"
          name="surname"
          type="text"
          :class="{ [failedValidationClasses]: errors.surname }"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <p
          v-if="errors.surname"
          class="mt-2 text-sm text-red-600 dark:text-red-500"
        >
          {{ errors.surname }}
        </p>
      </div>
    </div>
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
        :class="{ 'text-red-700 dark:text-red-500': errors.confirmPassword }"
        class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
      >
        Подтвердите пароль
      </label>
      <Field
        id="confirmPassword"
        required
        name="confirmPassword"
        type="password"
        :class="{ [failedValidationClasses]: errors.confirmPassword }"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <p
        v-if="errors.confirmPassword"
        class="mt-2 text-sm text-red-600 dark:text-red-500"
      >
        {{ errors.confirmPassword }}
      </p>
    </div>
    <div class="flex mb-6">
      <div class="flex items-center h-5">
        <Field
          id="terms"
          required
          name="terms"
          aria-describedby="terms"
          type="checkbox"
          class="w-4 h-4 bg-gray-50 rounded border-gray-300 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div class="ml-3 text-sm">
        <label
          for="terms"
          :class="{ 'text-red-700 dark:text-red-500': errors.terms }"
          class="font-semibold text-gray-900 dark:text-white"
        >
          Я принимаю условия
          <a
            class="text-blue-700 dark:text-blue-500 hover:underline"
            target="_blank"
            href="/terms/"
          >
            Пользовательского соглашения
          </a>
          и <br>
          <a
            class="text-blue-700 dark:text-blue-500 hover:underline"
            target="_blank"
            href="/privacy/"
          >
            Политики конфиденциальности
          </a>
        </label>
      </div>
    </div>
    <Button
      :disabled="isSubmitting"
      :loading="isSubmitting"
      class="mb-6"
      color="default"
      size="xl"
    >
      Создать учётную запись
    </Button>
    <div class="text-sm font-semibold text-gray-500 dark:text-gray-400">
      У вас уже есть аккаунт?
      <router-link
        :to="{ name: 'login' }"
        class="ml-1 text-blue-700 dark:text-blue-500 hover:underline"
      >
        Войдите здесь.
      </router-link>
    </div>
  </Form>
</template>
