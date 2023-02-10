<script setup>
import ProjectListItem from "./ProjectListItem.vue";
import { Modal, Button } from "flowbite-vue";
import { Form, Field } from "vee-validate";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAlertStore, useProjectStore } from "@/stores";
import * as Yup from "yup";

const isShowModal = ref(false);
function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Название обязательно")
    .max(50, "Название должно быть не длинее 40 символов"),
  slug: Yup.string()
    .required("url обязателен")
    .max(50, "Фамилия должна быть не длинее 20 символов"),
});

async function onSubmit(values) {
  const alertStore = useAlertStore();

  try {
    await projectStore.create(values);
    closeModal();
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
  <div
    v-if="projects.length"
    class="grid md:grid-cols-3 2xl:grid-cols-4 gap-4"
  >
    <ProjectListItem
      v-for="(project, idx) in projects"
      :key="idx"
      :project="project"
    />
    <button
      class="flex justify-center text-5xl font-bold tracking-tight text-gray-900 dark:text-white p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      type="button"
      @click="showModal"
    >
      +
    </button>
  </div>

  <div
    v-else
    class="grid md:grid-cols-3 2xl:grid-cols-4 gap-4"
  >
    <button
      class="flex justify-center text-5xl font-bold tracking-tight text-gray-900 dark:text-white p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      type="button"
      @click="showModal"
    >
      +
    </button>
  </div>

  <Teleport to="body">
    <Modal
      v-if="isShowModal"
      size="md"
      @close="closeModal"
    >
      <template #header>
        <div class="text-xl font-medium text-gray-900 dark:text-white">
          Создать новый проект
        </div>
      </template>
      <template #body>
        <Form
          v-slot="{ errors, isSubmitting }"
          class="space-y-6"
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <div>
            <label
              for="project-name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Название
            </label>
            <Field
              id="name"
              type="text"
              name="name"
              :class="{ [failedValidationClasses]: errors.slug }"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Например, OpenAI"
              required
            />
            <p
              v-if="errors.name"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
            >
              {{ errors.name }}
            </p>
          </div>
          <div>
            <label
              for="project-url"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              URL
            </label>
            <div class="flex">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              >
                hypehub.ru/r/
              </span>
              <Field
                id="slug"
                type="text"
                name="slug"
                :class="{ [failedValidationClasses]: errors.slug }"
                class="lowercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="open-ai"
                required
              />
            </div>
            <p
              v-if="errors.slug"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
            >
              {{ errors.slug }}
            </p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <Button
              color="alternative"
              @click="closeModal"
            >
              Отменить
            </Button>
            <Button
              color="default"
              :disabled="isSubmitting"
            >
              Создать
            </Button>
          </div>
        </Form>
      </template>
    </Modal>
  </Teleport>
</template>
