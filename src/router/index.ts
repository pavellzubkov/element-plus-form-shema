import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import { defineAsyncComponent } from "vue";
import DocOneV from "@/views/DocOneV.vue";
import DocTwoV from "@/views/DocTwoV.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "DocOne",
    component: DocOneV,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
