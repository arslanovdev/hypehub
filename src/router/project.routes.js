import { Layout, List, Item } from "@/views/project";
import { useAccountStore, useProjectStore, useTestimonialStore } from "@/stores/index.js";

const checkIsProjectItemExists = async (to) => {
  const projectStore = useProjectStore();

  try {
    await projectStore.getBySlug(to.params.slug);
  } catch (error) {
    return {
      name: "project-list",
    };
  }
};

const getTestimonials = async (to) => {
  const testimonialStore = useTestimonialStore();
  await testimonialStore.getAll(to.params.slug);
};

const checkIsUserLoggedIn = () => {
  const accountStore = useAccountStore();

  if (!accountStore.user) {
    return {
      name: "project-list",
    };
  }
};

export default {
  path: "/projects",
  component: Layout,
  children: [
    {
      path: "",
      component: List,
      name: "project-list",
      beforeEnter: [checkIsUserLoggedIn]
    },
    {
      path: "/projects/:slug",
      component: Item,
      name: "project-item",
      beforeEnter: [checkIsProjectItemExists, getTestimonials],
    },
  ],
};
