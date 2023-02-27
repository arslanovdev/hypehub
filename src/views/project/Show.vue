<script setup>
import { Spinner, Button } from "flowbite-vue";
import PageTitle from "@/components/PageTitle.vue";
import PageDescriptor from "@/components/PageDescriptor.vue";
import ProjectSettingDropdown from "@/components/ProjectSettingDropdown.vue";
import {useProjectStore, useTestimonialStore} from "@/stores/index.js";
import { storeToRefs } from "pinia";
import TestimonialList from "@/components/TestimonialList.vue";

const projectStore = useProjectStore();
const { project } = storeToRefs(projectStore);

const testimonialStore = useTestimonialStore();
const { testimonials } = storeToRefs(testimonialStore);
</script>

<template>
  <div class="mb-4 flex flex-wrap justify-between md:justify-start items-start">
    <router-link
      :to="{ name: 'project-list' }"
      class="self-start mr-3 mb-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    >
      <span class="sr-only">Назад к проектам</span>
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </router-link>
    <ProjectSettingDropdown />
    <div class="order-3 md:order-2">
      <PageTitle> Отзывы ({{ project.name }}) </PageTitle>
      <PageDescriptor>
        Добавляйте отзывы вручную или импортируйте их из различных сервисов
      </PageDescriptor>
    </div>
  </div>
  <div class="flex py-4 mb-4">
    <Button
      class="mr-2"
      color="alternative"
    >
      Добавить вручную
    </Button>
    <Button color="default">
      Импортировать
    </Button>
  </div>
  <Spinner
    v-if="testimonials.loading"
    class="mx-auto"
    color="blue"
    size="12"
  />
  <div
    v-if="!testimonials.length"
    class="text-center"
  >
    <p class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
      Отзывов пока нет 😞
    </p>
  </div>
  <TestimonialList v-else />
</template>
