export const DETAILS_ROUTE = {
  path: "/details/:name",
  name: "details",
  component: () => import("../views/details.vue"),
};
