import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { router } from "@/router";
import { useAlertStore } from "@/stores";
import { CONFIG } from "@/config.js";

const apiUrl = `${CONFIG.API_HOST}/users`;

export const useAccountStore = defineStore({
  id: "account",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
    returnUrl: null,
  }),
  actions: {
    async register(user) {
      try {
        await fetchWrapper.post(`${apiUrl}`, user);
        await this.login(user.email, user.password, true);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async login(email, password, remember) {
      try {
        const response = await fetchWrapper.post(`${apiUrl}/login`, {
          email,
          password,
          remember,
        });
        // update pinia state
        this.user = response.user;
        this.token = response.token;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", JSON.stringify(response.token));

        // redirect to main page
        await router.push({ name: "project-list" });
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async logout() {
      try {
        await fetchWrapper.post(`${apiUrl}/logout`);

        this.user = null;
        this.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        await router.push({ name: "login" });
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async verifyEmail(hash) {
      const alertStore = useAlertStore();
      try {
        const user = await fetchWrapper.post(`${apiUrl}/verify-email/${hash}`);

        // update pinia state
        this.user = user;

        // store user details in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));

        await router.push({ name: "project-list" });
        alertStore.success("Ваш аккаунт активирован");
      } catch (error) {
        alertStore.error(error);
      }
    },
    async sendResetPasswordEmail(email) {
      const alertStore = useAlertStore();
      try {
        const response = await fetchWrapper.post(`${apiUrl}/forgot-password/`, {
          email,
        });
        alertStore.success(response.message);
      } catch (error) {
        alertStore.error(error);
      }
    },
    async resetPassword(payload) {
      const alertStore = useAlertStore();
      try {
        const response = await fetchWrapper.post(
          `${apiUrl}/reset-password/`,
          payload
        );

        await router.push({ name: "project-list" });
        await this.login(payload.email, payload.password, true);
        alertStore.success(response.message);
      } catch (error) {
        alertStore.error(error);
      }
    },
  },
});
