// import { mount } from "@vue/test-utils";
// import { createStore } from "vuex";
// import PortfolioDetail from "../src/components/PortfolioDetail.vue";
// import { describe, it, expect, vi } from "vitest";

// // Mock Chart.js so canvas rendering doesn't break in tests
// vi.mock("chart.js/auto", () => ({
//   default: vi.fn().mockImplementation(() => ({
//     destroy: vi.fn()
//   }))
// }));

// // Sample data
// const portfolios = [
//   {
//     id: "p1",
//     name: "Tech Portfolio",
//     status: "ACTIVE",
//     createdAt: "2025-01-01T00:00:00Z",
//     initialInvestment: 5000,
//     clientId: "u1",
//     holdings: [
//       { symbol: "AAPL", quantity: 10, avgPrice: 150 },
//       { symbol: "MSFT", quantity: 5, avgPrice: 200 }
//     ],
//     notes: "Long-term growth focus."
//   }
// ];

// const users = [{ id: "u1", name: "Alice" }];

// const createMockStore = () =>
//   createStore({
//     state: { portfolios, users },
//     getters: {
//       getPortfolioById: (state) => (id: string) =>
//         state.portfolios.find((p) => p.id === id)
//     }
//   });

// describe("PortfolioDetail.vue", () => {
//   it("renders portfolio details with client name", async () => {
//     const store = createMockStore();

//     const wrapper = mount(PortfolioDetail, {
//       global: { plugins: [store] }
//     });

//     // Simulate being on /portfolios/p1 by directly mocking $route
//     await wrapper.vm.$router.push("/portfolios/p1");
//     await wrapper.vm.$router.isReady();

//     expect(wrapper.text()).toContain("Tech Portfolio");
//     expect(wrapper.text()).toContain("Alice");
//     expect(wrapper.text()).toContain("ACTIVE");
//     expect(wrapper.text()).toContain("Initial Investment");
//     expect(wrapper.text()).toContain("₹ 5,000");
//   });

//   it("renders holdings table and summary correctly", async () => {
//     const store = createMockStore();

//     const wrapper = mount(PortfolioDetail, {
//       global: { plugins: [store] }
//     });

//     await wrapper.vm.$router.push("/portfolios/p1");
//     await wrapper.vm.$router.isReady();

//     // Holdings rows
//     expect(wrapper.text()).toContain("AAPL");
//     expect(wrapper.text()).toContain("MSFT");

//     // Quantity & summary
//     expect(wrapper.text()).toContain("10");
//     expect(wrapper.text()).toContain("5");
//     expect(wrapper.text()).toContain("Total Quantity");
//     expect(wrapper.text()).toContain("15"); // 10 + 5
//     expect(wrapper.text()).toContain("Total Investment");

//     // Total investment: (10*150) + (5*200) = 2500
//     expect(wrapper.text()).toContain("2,500");
//   });
// });


import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import PortfolioDetail from "../src/components/PortfolioDetail.vue";
import { describe, it, expect, vi } from "vitest";

// Mock Chart.js so canvas rendering doesn't break in tests
vi.mock("chart.js/auto", () => ({
  default: vi.fn().mockImplementation(() => ({
    destroy: vi.fn()
  }))
}));

// Sample data
const portfolios = [
  {
    id: "p1",
    name: "Tech Portfolio",
    status: "ACTIVE",
    createdAt: "2025-01-01T00:00:00Z",
    initialInvestment: 5000,
    clientId: "u1",
    holdings: [
      { symbol: "AAPL", quantity: 10, avgPrice: 150 },
      { symbol: "MSFT", quantity: 5, avgPrice: 200 }
    ],
    notes: "Long-term growth focus."
  }
];

const users = [{ id: "u1", name: "Alice" }];

const createMockStore = () =>
  createStore({
    state: { portfolios, users },
    getters: {
      getPortfolioById: (state) => (id: string) =>
        state.portfolios.find((p) => p.id === id)
    }
  });

const createMockRouter = () =>
  createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component: { template: "<div>Home</div>" } },
      { path: "/users/:id?", component: { template: "<div>User</div>" } },
      { path: "/portfolios/:id", component: PortfolioDetail }
    ]
  });

describe("PortfolioDetail.vue", () => {
  it("renders portfolio details with client name", async () => {
    const store = createMockStore();
    const router = createMockRouter();

    // Navigate to the route first
    await router.push("/portfolios/p1");
    await router.isReady();

    const wrapper = mount(PortfolioDetail, {
      global: { 
        plugins: [store, router]
      }
    });

    // Wait for component to render
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Tech Portfolio");
    expect(wrapper.text()).toContain("Alice");
    expect(wrapper.text()).toContain("ACTIVE");
    expect(wrapper.text()).toContain("Initial Investment");
    expect(wrapper.text()).toContain("₹ 5,000");
  });

  it("renders holdings table and summary correctly", async () => {
    const store = createMockStore();
    const router = createMockRouter();

    // Navigate to the route first
    await router.push("/portfolios/p1");
    await router.isReady();

    const wrapper = mount(PortfolioDetail, {
      global: { 
        plugins: [store, router]
      }
    });

    // Wait for component to render
    await wrapper.vm.$nextTick();

    // Holdings rows
    expect(wrapper.text()).toContain("AAPL");
    expect(wrapper.text()).toContain("MSFT");

    // Quantity & summary
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("Total Quantity");
    expect(wrapper.text()).toContain("15"); // 10 + 5
    expect(wrapper.text()).toContain("Total Investment");

    // Total investment: (10*150) + (5*200) = 2500
    expect(wrapper.text()).toContain("2,500");
  });

  it("shows 'Portfolio not found' when portfolio doesn't exist", async () => {
    const store = createMockStore();
    const router = createMockRouter();

    // Navigate to a non-existent portfolio
    await router.push("/portfolios/nonexistent");
    await router.isReady();

    const wrapper = mount(PortfolioDetail, {
      global: { 
        plugins: [store, router]
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Portfolio not found");
  });
});