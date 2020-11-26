import { createWebHistory, createRouter } from 'vue-router'


import Home from '../components/Home.vue'
import Choice from '../components/Choice.vue'
const routes = [
    { path: '/Choice', name: 'Choice', component: Choice },
    { path: '/Home', name: 'Home', component: Home },
    { path: '/:catchAll(.*)', name: 'NotFound', component: Home } //Routers desconocidos
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router