import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAlertStore } from "@/stores";
import { CONFIG } from "@/config.js";

const apiUrl = `${CONFIG.API_HOST}/projects`;

export const useTestimonialStore = defineStore({
  id: "testimonial",
  state: () => ({
    testimonials: null,
    testimonial: null,
  }),
  actions: {
    async getAllByProjectSlug(slug) {
      this.testimonials = { loading: true };
      try {
        this.testimonials = await fetchWrapper.get(`${apiUrl}/${slug}/testimonials`);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    }
  }
});
