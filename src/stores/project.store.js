import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import { useAlertStore } from "@/stores";
import { CONFIG } from "@/config.js";
import { router } from "@/router/index.js";

const API_URL = `${CONFIG.API_HOST}/projects`;

export const useProjectStore = defineStore({
  id: "project",

  state: () => ({
    projects: null,
    project: null,
  }),

  actions: {
    // Get all projects
    async getAll() {
      this.projects = { loading: true };
      try {
        this.projects = await fetchWrapper.get(API_URL);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },

    // Get project by slug
    async getBySlug(slug) {
      return (this.project = await fetchWrapper.get(`${API_URL}/${slug}`));
    },

    // Create a new project
    async create(payload) {
      const alertStore = useAlertStore();
      const project = await fetchWrapper.post(API_URL, payload);
      this.projects.push(project);

      alertStore.success("Проект успешно создан");
    },

    // Update an existing project
    async update(slug, params) {
      this.project = await fetchWrapper.put(`${API_URL}/${slug}`, params);
      const alertStore = useAlertStore();
      alertStore.success("Настройки проекта обновлены");
    },

    // Delete a project
    async delete(slug) {
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.delete(`${API_URL}/${slug}`);

        // Remove project from list after deleted
        this.projects = this.projects.filter((x) => x.slug !== slug);

        await router.push({ name: "project-list" });
        alertStore.success("Проект удален");
      } catch (error) {
        alertStore.error(error);
      }
    },
  },
});
