import { defineStore } from "pinia";

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alert: null,
  }),
  actions: {
    success(message) {
      this.alert = { message, type: "success" };
      setTimeout(this.clear, 5000);
    },
    error(message) {
      this.alert = { message, type: "danger" };
      setTimeout(this.clear, 5000);
    },
    clear() {
      this.alert = null;
    },
  },
});
