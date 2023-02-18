import { defineStore } from "pinia";
import { useAlertStore } from "@/stores";
import { fetchWrapper } from "@/helpers";
import { CONFIG } from "@/config.js";

const API_URL = `${CONFIG.API_HOST}`;

export const useTestimonialStore = defineStore({
  id: "testimonial",

  state: () => ({
    testimonials: null,
    testimonial: null,
    selectedTestimonial: null,
  }),

  actions: {
    // Get all testimonials
    async getAllByProjectSlug(projectSlug, searchQuery = null) {
      // Set loading state
      this.testimonials = { loading: true };

      try {
        // Make API request
        const params = searchQuery ? { search: searchQuery } : null;

        // Update state with response data
        this.testimonials = await fetchWrapper.get(`${API_URL}/projects/${projectSlug}/testimonials`, params);
      } catch (error) {
        // Handle errors
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },

    async deleteById(id) {
      const alertStore = useAlertStore();

      try {
        // Make API request
        await fetchWrapper.delete(`${API_URL}/testimonials/${id}`);

        // Update state after deletion
        this.testimonials = this.testimonials.filter((testimonial) => testimonial.id !== id);

        // Display success message
        alertStore.success("Отзыв удален");
      } catch (error) {
        // Handle errors
        alertStore.error(error);
      }
    },
  },
});
