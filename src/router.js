import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from './lib/supabase.js';

const routes = [
  { path: '/', name: 'home', component: () => import('./views/Home.vue'), meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: () => import('./views/Login.vue') },
  { path: '/auth/callback', name: 'auth-callback', component: () => import('./views/AuthCallback.vue') },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { name: 'login', query: { next: to.fullPath } };
  return true;
});

export default router;
