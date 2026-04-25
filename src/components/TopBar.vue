<script setup>
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase.js';

defineProps({ email: { type: String, default: '' } });

const router = useRouter();

async function signOut() {
  await supabase.auth.signOut();
  router.replace({ name: 'login' });
}
</script>

<template>
  <header class="bar">
    <div class="brand">
      <img class="icon" src="/apple-touch-icon.png" alt="" />
      <span class="word">Family</span>
    </div>
    <div class="right">
      <span class="who">{{ email }}</span>
      <button class="signout" @click="signOut">Sign out</button>
    </div>
  </header>
</template>

<style scoped>
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border);
  background: var(--bg);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: saturate(140%) blur(8px);
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.icon {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm);
  display: block;
}
.word {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: var(--step-1);
  letter-spacing: -0.01em;
}
.right { display: flex; align-items: center; gap: var(--space-4); }
.who { color: var(--text-muted); font-size: var(--step--1); }
.signout {
  background: transparent;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--step--1);
  color: var(--text);
  cursor: pointer;
  transition: background var(--dur-2) var(--ease-out-expo);
}
.signout:hover { background: var(--bg-elevated); }
</style>
