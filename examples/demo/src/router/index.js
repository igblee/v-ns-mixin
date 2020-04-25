import Vue from "vue";
import VueRouter from "vue-router";
import Test1 from "../views/Test1.vue";
import Test2 from "../views/Test2.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "test1",
    component: Test1
  },
  {
    path: "/test2",
    name: "test2",
    component: Test2
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
