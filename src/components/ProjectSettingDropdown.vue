<script setup>
import {
  Dropdown,
  ListGroup,
  ListGroupItem,
  Modal,
  Button,
} from "flowbite-vue";
import DeleteModal from "@/components/DeleteModal.vue"
import { ref } from "vue";
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { useProjectStore, useAlertStore } from "@/stores/index.js";
import { storeToRefs } from "pinia";
import { router } from "@/router/index.js";

const projectStore = useProjectStore();
const { project } = storeToRefs(projectStore);

const failedValidationClasses =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 " +
  "focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 dark:focus:ring-red-500 " +
  "dark:focus:border-red-500";

// Delete modal
const isShowDeleteModal = ref(false);
function closeDeleteModal() {
  isShowDeleteModal.value = false;
}
function showDeleteModal() {
  isShowDeleteModal.value = true;
}
const deleteProject = () => {
  projectStore.delete(project.value.slug);
};

// Edit modal
const isShowEditModal = ref(false);
function closeEditModal() {
  isShowEditModal.value = false;
}
function showEditModal() {
  isShowEditModal.value = true;
}

const editSchema = Yup.object().shape({
  name: Yup.string()
    .required("Название обязательно")
    .max(50, "Название должно быть не длинее 40 символов"),
  slug: Yup.string()
    .required("URL обязателен")
    .max(50, "Фамилия должна быть не длинее 20 символов"),
});

async function onEditSubmit(values) {
  const alertStore = useAlertStore();

  try {
    await projectStore.update(project.value.slug, values);
    closeEditModal();
    await router.push({
      name: "project-item",
      params: { slug: project.value.slug },
    });
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <Dropdown
    placement="left"
    class="order-3 ml-auto"
  >
    <template #trigger>
      <!-- button -->
      <button
        class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        type="button"
      >
        <span class="sr-only">Настройки проекта</span>
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </button>
    </template>
    <list-group>
      <list-group-item @click="showEditModal">
        <template #prefix>
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </template>
        Настройки
      </list-group-item>
      <list-group-item @click="showDeleteModal">
        <template #prefix>
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </template>
        Удалить
      </list-group-item>
    </list-group>
  </Dropdown>

  <Teleport to="body">
    <!-- Delete project modal -->
    <DeleteModal
      v-if="isShowDeleteModal"
      :title="`Вы уверены что хотите удалить проект «${ project.name }»?`"
      @on-close-modal="closeDeleteModal"
      @on-click-delete-button="deleteProject"
    />

    <!-- Edit project modal -->
    <Modal
      v-if="isShowEditModal"
      size="md"
      @close="closeEditModal"
    >
      <template #header>
        <div class="text-xl font-medium text-gray-900 dark:text-white">
          Настройки проекта «{{ project.name }}»
        </div>
      </template>
      <template #body>
        <Form
          v-slot="{ errors, isSubmitting }"
          class="space-y-6"
          :validation-schema="editSchema"
          @submit="onEditSubmit"
        >
          <div>
            <label
              for="project-name"
              :class="{ 'text-red-700 dark:text-red-500': errors.name }"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Название
            </label>
            <Field
              id="name"
              type="text"
              name="name"
              :class="{ [failedValidationClasses]: errors.name }"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Например, OpenAI"
              :value="project.name"
              required
            />
          </div>
          <div>
            <label
              for="project-url"
              :class="{ 'text-red-700 dark:text-red-500': errors.slug }"
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
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="open-ai"
                :value="project.slug"
                required
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <Button
              :disabled="isSubmitting"
              color="alternative"
              @click="closeEditModal"
            >
              Отменить
            </Button>
            <Button color="default">
              Сохранить
            </Button>
          </div>
        </Form>
      </template>
    </Modal>
  </Teleport>
</template>
