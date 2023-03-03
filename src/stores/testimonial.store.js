import { defineStore } from "pinia";
import { useAlertStore } from "@/stores";
import { fetchWrapper } from "@/helpers";
import { CONFIG } from "@/config.js";

const API_URL = `${CONFIG.API_HOST}`;

export const useTestimonialStore = defineStore({
  id: "testimonial",

  state: () => ({
    testimonials: null,
    selectedTestimonial: null
  }),

  actions: {
    // Get all testimonials by project slug
    async getAll(projectSlug, searchQuery = null) {
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

    // Delete testimonial by id
    async delete(id) {
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

    // Delete testimonials by array of ids
    async deleteAll(projectSlug, ids) {
      const alertStore = useAlertStore();

      try {
        // Prepare payload
        const params = { 'testimonial_ids': ids }

        // Make API request
        await fetchWrapper.delete(`${API_URL}/projects/${projectSlug}/testimonials`, params);

        // Update state after deletion
        this.testimonials = this.testimonials.filter((testimonial) => !ids.includes(testimonial.id));

        // Display success message
        alertStore.success("Отзывы удалены");
      } catch (error) {
        // Handle errors
        alertStore.error(error);
      }
    },

    // Update an existing testimonial
    async update(id, params) {
      const alertStore = useAlertStore();

      try {
        await fetchWrapper.put(`${API_URL}/testimonials/${id}`, params);

        // Update state
        this.testimonials = this.testimonials.map((item) => {
            return id === item.id ? params : item
        });
        alertStore.success("Отзыв обновлен");
      } catch (error) {
        // Handle errors
        alertStore.error(error);
      }
    },

    // Update testimonials by array of ids
    async updateAll(projectSlug, ids, params) {
      const alertStore = useAlertStore();
      params['testimonial_ids'] = ids

      try {
        this.testimonials = await fetchWrapper.put(`${API_URL}/projects/${projectSlug}/testimonials`, params);
        alertStore.success("Отзывы обновлены");
      } catch (error) {
        // Handle errors
        alertStore.error(error);
      }
    }
  },
});
