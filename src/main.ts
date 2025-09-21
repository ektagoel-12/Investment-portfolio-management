import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style.css'; // Tailwind entry (assume you already have it)

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
