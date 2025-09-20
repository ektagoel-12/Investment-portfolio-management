import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../components/UserList.vue';
import UserForm from '../components/UserForm.vue';
import PortfolioList from '../components/PortfolioList.vue';
import PortfolioForm from '../components/PortfolioForm.vue';
import PortfolioDetail from '../components/PortfolioDetail.vue';

const routes = [
  { path: '/', redirect: '/portfolios' },
  { path: '/users', component: UserList },
  { path: '/users/new', component: UserForm },
  { path: '/users/:id/edit', component: UserForm, props: true },
  { path: '/portfolios', component: PortfolioList },
  { path: '/portfolios/new', component: PortfolioForm },
  { path: '/portfolios/:id', component: PortfolioDetail, props: true },
  { path: '/portfolios/:id/edit', component: PortfolioForm, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
