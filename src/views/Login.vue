<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { signInWithGoogle } from '../lib/google-credentials.js';

const route = useRoute();
const loading = ref(false);
const error = ref(null);

// Sub-apps that bounce here when unauthenticated send ?return_app=tessio.
// Stash it across the OAuth round-trip so AuthCallback can land the user
// back on the original sub-app instead of the hub home.
onMounted(() => {
  const returnApp = route.query.return_app;
  if (typeof returnApp === 'string' && returnApp) {
    sessionStorage.setItem('family.return_app', returnApp);
  }
});

async function onSignIn() {
  loading.value = true;
  error.value = null;
  try {
    const { error: signInError } = await signInWithGoogle();
    if (signInError) throw signInError;
  } catch (e) {
    error.value = e.message;
    loading.value = false;
  }
}
</script>

<template>
  <main class="login">
    <div class="card">
      <div class="eyebrow">tanzillo.ai</div>
      <h1 class="display-italic title">The Family</h1>
      <p class="lead">Sign in to your suite.</p>

      <button class="btn-google" :disabled="loading" @click="onSignIn">
        <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
          <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z"/>
        </svg>
        <span>{{ loading ? 'Opening Google…' : 'Sign in with Google' }}</span>
      </button>

      <p v-if="error" class="error">{{ error }}</p>

      <p class="fine footnote">
        By signing in you agree to the
        <a href="https://tanzillo.ai/terms.html">Terms</a> and
        <a href="https://tanzillo.ai/privacy.html">Privacy Policy</a>.
      </p>
    </div>
  </main>
</template>

<style scoped>
.login {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: var(--space-6) var(--space-5);
  background: var(--bg);
}
.card {
  width: min(420px, 100%);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-7) var(--space-6);
  box-shadow: var(--shadow-hang-md);
  text-align: center;
}
.title {
  font-size: var(--step-4);
  color: var(--accent);
  margin: var(--space-2) 0 var(--space-4);
}
.lead {
  margin: 0 auto var(--space-6);
  max-width: 28ch;
}
.btn-google {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-4) var(--space-5);
  font-family: var(--font-sans);
  font-size: var(--step-0);
  font-weight: 600;
  color: var(--text);
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--dur-2) var(--ease-out-expo),
              border-color var(--dur-2) var(--ease-out-expo);
}
.btn-google:hover:not(:disabled) {
  background: var(--bg-elevated);
  border-color: var(--text-muted);
}
.btn-google:disabled { opacity: 0.6; cursor: progress; }
.error {
  margin-top: var(--space-4);
  color: var(--danger-600);
  font-size: var(--step--1);
}
.footnote {
  margin-top: var(--space-6);
  color: var(--text-muted);
}
</style>
