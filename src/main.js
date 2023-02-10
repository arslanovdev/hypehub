import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import "./index.css";
import "flowbite";

const app = createApp(App);

import { router } from "./router";

app.use(createPinia());
app.use(router);

app.mount("#app");
