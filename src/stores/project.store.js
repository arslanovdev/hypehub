import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAlertStore } from "@/stores";
import { CONFIG } from "@/config.js";
import { router } from "@/router/index.js";

const apiUrl = `${CONFIG.API_HOST}/projects`;

export const useProjectStore = defineStore({
  id: "project",
  state: () => ({
    projects: null,
    project: null,
  }),
  actions: {
    async getAll() {
      this.projects = { loading: true };
      try {
        this.projects = await fetchWrapper.get(apiUrl);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getBySlug(slug) {
      return (this.project = await fetchWrapper.get(`${apiUrl}/${slug}`));
    },
    async create(payload) {
      const alertStore = useAlertStore();
      const project = await fetchWrapper.post(`${apiUrl}`, payload);
      this.projects.push(project);

      alertStore.success("Проект успешно создан");
    },
    async update(slug, params) {
      this.project = await fetchWrapper.put(`${apiUrl}/${slug}`, params);
      const alertStore = useAlertStore();
      alertStore.success("Настройки проекта обновлены");
    },
    async delete(slug) {
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.delete(`${apiUrl}/${slug}`);

        // remove project from list after deleted
        this.projects = this.projects.filter((x) => x.slug !== slug);

        await router.push({ name: "project-list" });
        alertStore.success("Проект удален");
      } catch (error) {
        alertStore.error(error);
      }
    },
  },
});
