// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/index.vue';
import About from '../views/About/index.vue';
import Movies from '../views/Movies/index.vue';



const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/movies', name: 'Movies', component: Movies },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
