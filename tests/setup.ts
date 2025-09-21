// tests/setup.ts
import { config } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";

// Fake routes for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: { template: "<div>Home</div>" } },
    { path: "/users/:id?", component: { template: "<div>User</div>" } },
    { path: "/portfolios/:id?", component: { template: "<div>Portfolio</div>" } }
  ]
});

// Make <router-link> and <router-view> available
config.global.plugins = [router];
config.global.stubs = {
  RouterLink: { template: "<a><slot /></a>" },
  RouterView: { template: "<div><slot /></div>" }
};
