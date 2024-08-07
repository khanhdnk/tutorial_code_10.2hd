import { createRouter, createWebHistory } from 'vue-router';
import MarketPage from "@/views/MarketPage.vue";
import { useAuthStore } from "@/store/auth.js";

const routes = [
    { path: '/', redirect: '/market' },
    { path: '/market', component: MarketPage, name: 'market' },

    // { path: '/admin', component: AdminPage, name: 'admin' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const listOfUnprotectedRoutes = ['login', 'registration', 'home', 'market'];

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Check if the user is authenticated
    if (authStore.isAuthenticated) {
        // If the user is authenticated and trying to access login or registration, redirect to market
        if (to.name === 'login' || to.name === 'registration') {
            next({ name: 'market' });
        } else {
            next();
        }
    } else {
        // If the user is not authenticated and trying to access a protected route, redirect to login
        if (!listOfUnprotectedRoutes.includes(to.name)) {
            next({ name: 'login' });
        } else {
            next();
        }
    }
});


export default router;
