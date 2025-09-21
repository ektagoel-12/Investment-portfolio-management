import { createRouter, createWebHistory } from "vue-router";

export function createTestRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/users/:id", component: { template: "<div>User</div>" } },
      { path: "/portfolios/:id", component: { template: "<div>Portfolio</div>" } },
    ],
  });
}
