<script setup>
import {Modal, Button} from "flowbite-vue";
import {Form, Field} from "vee-validate";
import {ref} from "vue";
import * as Yup from "yup";
import {useAlertStore, useTestimonialStore} from "@/stores/index.js";

const props = defineProps({
  testimonial: {
    type: Object,
    required: true
  }
});

const emit = defineEmits({
  onCloseModal: null,
})

const testimonial = ref()
testimonial.value = {...props.testimonial}

const availableSources = {
  MANUAL: 'Добавлен вручную',
  YANDEX_MARKET: 'Яндекс Маркет',
  YANDEX_MAP: 'Яндекс Карты',
  GOOGLE_MAP: 'Google Карты',
  VK: 'ВКонтакте',
}

const failedValidationClasses =
    "bg-red-50 border-red-500 placeholder-red-700 focus:ring-red-500 " +
    "focus:border-red-500 dark:placeholder-red-500 dark:border-red-500 dark:focus:ring-red-500 " +
    "dark:focus:border-red-500";

const schema = Yup.object().shape({
  author_name: Yup.string()
      .required("Имя автора обязательно")
      .max(40, "Имя автора должно быть не длинее 40 символов"),
  text: Yup.string()
      .required("Текст отзыва обязателен")
      .max(500, "Текст отзыва должен быть не длинее 500 символов"),
  is_verified: Yup.bool()
});

async function onSubmit(values) {
  const alertStore = useAlertStore();
  const testimonialStore = useTestimonialStore();

  try {
    await testimonialStore.update(testimonial.value.id, values);
    emit('onCloseModal')
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <Modal
    size="lg"
    @close="$emit('onCloseModal')"
  >
    <template #header>
      <div class="text-xl font-medium text-gray-900 dark:text-white">
        Изменить отзыв
      </div>
    </template>
    <template #body>
      <Form
        v-slot="{ errors, isSubmitting }"
        class="space-y-6"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              for="author_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              :class="{ 'text-red-700 dark:text-red-500': errors.author_name }"
            >
              Имя автора
            </label>
            <Field
              id="author_name"
              v-model="testimonial.author_name"
              type="text"
              name="author_name"
              :class="{ [failedValidationClasses]: errors.author_name }"
              class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Иван Иванов"
              required
            />
            <p
              v-if="errors.author_name"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
            >
              {{ errors.author_name }}
            </p>
          </div>
          <div>
            <label
              for="source"
              :class="{ 'text-red-700 dark:text-red-500': errors.source }"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Выберите источник</label>
            <select
              id="source"
              v-model="testimonial.source"
              class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option
                v-for="(source, key) in availableSources"
                :key="'source-' + key"
                :value="key"
              >
                {{ source }}
              </option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label
              for="text"
              :class="{ 'text-red-700 dark:text-red-500': errors.text }"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Текст
            </label>
            <Field
              id="text"
              v-model="testimonial.text"
              as="textarea"
              name="text"
              rows="5"
              :class="{ [failedValidationClasses]: errors.text }"
              class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Напишите текст отзыва..."
            />
            <p
              v-if="errors.text"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
            >
              {{ errors.text }}
            </p>
          </div>
          <div class="flex sm:col-span-2">
            <div class="flex items-center h-5">
              <Field
                id="is_verified"
                v-model="testimonial.is_verified"
                aria-describedby="is_verified"
                type="checkbox"
                name="is_verified"
                :value="true"
                :unchecked-value="false"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div class="ml-2 text-sm">
              <label
                for="is_verified"
                :class="{ 'text-red-700 dark:text-red-500': errors.is_verified }"
                class="font-medium text-gray-900 dark:text-white"
              >
                Проверен
              </label>
              <p
                id="verified"
                :class="{ 'text-red-700 dark:text-red-500': errors.verified }"
                class="text-xs font-normal text-gray-500 dark:text-white"
              >
                Проверенные отзывы отображаются для всех пользователей
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <Button
            :disabled="isSubmitting"
            color="default"
          >
            Сохранить
          </Button>
          <Button
            type="button"
            color="alternative"
            :disabled="isSubmitting"
            @click="$emit('onCloseModal')"
          >
            Отменить
          </Button>
        </div>
      </form>
    </template>
  </Modal>
</template>
