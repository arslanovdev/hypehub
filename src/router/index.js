import { createRouter, createWebHistory } from "vue-router";

import { useAccountStore, useAlertStore } from "@/stores";
import accountRoutes from "./account.routes";
import projectRoutes from "./project.routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    { ...accountRoutes },
    { ...projectRoutes },

    // catch all redirect to home page
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicRoutes = accountRoutes.children;
  const publicPages = Object.keys(publicRoutes).map(
    (idx) => "/" + publicRoutes[idx].path
  );
  const authRequired = !publicPages.includes(to.path);
  const accountStore = useAccountStore();

  if (authRequired && accountStore.user && !accountStore.user.verified) {
    accountStore.returnUrl = to.fullPath;
    return router.resolve({ name: "verify-email" }).fullPath;
  }

  if (authRequired && !accountStore.user) {
    accountStore.returnUrl = to.fullPath;
    return router.resolve({ name: "login" }).fullPath;
  }
});
