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
  <header class="app-header">
    <div class="app-header-brand" aria-label="Family">
      <span class="brand-icon">
        <img src="/apple-touch-icon.png" alt="" />
      </span>
      <span class="app-name">Family</span>
    </div>
    <nav class="app-header-nav">
      <span v-if="email" class="who" :title="email">{{ email }}</span>
      <button class="header-btn" aria-label="Sign out" title="Sign out" @click="signOut">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </button>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  background: var(--sage-100);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
}

.app-header::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 39px,
    rgba(20, 34, 53, 0.02) 39px,
    rgba(20, 34, 53, 0.02) 40px
  );
}

.app-header > * { position: relative; z-index: 1; }

.app-header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
}

.brand-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(212, 36, 111, 0.15);
}
.brand-icon img { width: 100%; height: 100%; display: block; }

.app-name {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variation-settings: 'opsz' 24;
  color: inherit;
}

.app-header-nav {
  display: flex;
  align-items: center;
  gap: 12px;
}

.who { color: var(--text-muted); font-size: 0.78rem; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.header-btn {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--sage-50);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--dur-2) var(--ease-out-expo),
              color var(--dur-2) var(--ease-out-expo),
              border-color var(--dur-2) var(--ease-out-expo);
  -webkit-tap-highlight-color: transparent;
  padding: 0;
}
.header-btn:hover, .header-btn:active {
  color: var(--fuchsia-600);
  border-color: rgba(212, 36, 111, 0.25);
}

@media (max-width: 768px) {
  .app-header { padding: 14px 16px; }
  .header-btn { width: 44px; height: 44px; }
  .who { display: none; }
}
</style>
