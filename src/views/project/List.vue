<script setup>
import PageTitle from "@/components/PageTitle.vue";
import PageDescriptor from "@/components/PageDescriptor.vue";
import ProjectList from "@/components/ProjectList.vue";
import { useProjectStore } from "@/stores/index.js";
import { storeToRefs } from "pinia";

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

if (!projects.value) {
  projectStore.getAll();
}
</script>

<template>
  <div class="pb-4 mb-8 border-b border-gray-200 dark:border-gray-800">
    <PageTitle> Мои проекты </PageTitle>
    <PageDescriptor v-if="projects && projects.length">
      Выберите проект, отзывами которого вы хотите управлять
    </PageDescriptor>
    <PageDescriptor v-else>
      Создайте проект для того чтобы начать работать с отзывами. Нажмите
      <span class="font-semibold">кнопку «+»</span>
    </PageDescriptor>
  </div>
  <ProjectList />
</template>
