import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import DocOneV from "@/views/DocOneV.vue";
import DocTwoV from "@/views/DocTwoV.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "DocOne",
    component: DocOneV,
  },
  {
    path: "/docTwo",
    name: "DocTwo",
    component: DocTwoV,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
