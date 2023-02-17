import { defineStore } from "pinia";
import { useAlertStore } from "@/stores";
import { fetchWrapper } from "@/helpers";
import { CONFIG } from "@/config.js";

const apiUrl = `${CONFIG.API_HOST}/projects`;

export const useTestimonialStore = defineStore({
  id: "testimonial",

  state: () => ({
    testimonials: null,
    testimonial: null,
  }),

  actions: {
    async getAllByProjectSlug(slug, searchQuery = null) {
      // Set loading state
      this.testimonials = { loading: true };

      try {
        // Make API request
        const url = `${apiUrl}/${slug}/testimonials`;
        const params = searchQuery ? { search: searchQuery } : null;

        // Update state with response data
        this.testimonials = await fetchWrapper.get(url, params);
      } catch (error) {
        // Handle errors
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
  },
});
