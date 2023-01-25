import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import Signup from '../views/auth/Signup.vue';
import { user } from '../composables/getUser';

const requireAuth = (to: any, from: any, next: any) => {
  if (!user.value) {
    return next({ name: 'Login' });
  }
  return next();
};

const requireNoAuth = (to: any, from: any, next: any) => {
  if (user.value) {
    return next({ name: 'Home' });
  }
  return next();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireNoAuth,
  },
  {
    path: '/auth/sign-up',
    name: 'Signup',
    component: Signup,
    beforeEnter: requireNoAuth,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
