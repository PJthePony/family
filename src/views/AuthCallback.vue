<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from '../lib/supabase.js';
import { captureGoogleCredentials } from '../lib/google-credentials.js';
import { bridgeSessionToLuca } from '../lib/luca-bridge.js';

const router = useRouter();
const route = useRoute();
const status = ref('Finishing sign-in…');
const error = ref(null);

onMounted(async () => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error('No session after Google sign-in.');

    status.value = 'Saving your Google connection…';
    await captureGoogleCredentials(session);

    status.value = 'Linking sub-apps…';
    const next = route.query.next || '/';
    const returnTo = `${import.meta.env.VITE_HUB_URL}${next}`;
    window.location.replace(bridgeSessionToLuca(session, returnTo));
  } catch (e) {
    error.value = e.message;
    setTimeout(() => router.replace({ name: 'login' }), 3000);
  }
});
</script>

<template>
  <main class="callback">
    <p v-if="!error" class="status">{{ status }}</p>
    <p v-else class="error">{{ error }}</p>
  </main>
</template>

<style scoped>
.callback {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  background: var(--bg);
  color: var(--text-muted);
  padding: var(--space-6);
}
.error { color: var(--danger-600); }
</style>
