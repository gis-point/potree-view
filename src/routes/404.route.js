export const ROUTE_404 = {
  path: "/:pathMatch(.*)*",
  component: () => import("../views/index.vue"),
};
