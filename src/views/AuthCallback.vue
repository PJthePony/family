<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from '../lib/supabase.js';
import { captureGoogleCredentials } from '../lib/google-credentials.js';
import { bridgeSessionToLuca } from '../lib/luca-bridge.js';

const SUB_APP_URLS = {
  tessio:    'https://tessio.tanzillo.ai',
  genco:     'https://genco.tanzillo.ai',
  apollonia: 'https://apollonia.tanzillo.ai',
  luca:      'https://app.luca.tanzillo.ai',
};

const router = useRouter();
const route = useRoute();
const status = ref('Finishing sign-in…');
const error = ref(null);

function ssoFragment(session) {
  const payload = { access_token: session.access_token, refresh_token: session.refresh_token };
  return encodeURIComponent(btoa(JSON.stringify(payload)));
}

onMounted(async () => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error('No session after Google sign-in.');

    status.value = 'Saving your Google connection…';
    await captureGoogleCredentials(session);

    // If a sub-app bounced the user here, send them back there after the
    // Luca cookie bridge. Otherwise land on the hub home.
    const returnApp = sessionStorage.getItem('family.return_app');
    sessionStorage.removeItem('family.return_app');

    let returnTo;
    if (returnApp && SUB_APP_URLS[returnApp]) {
      const base = SUB_APP_URLS[returnApp];
      returnTo = `${base}/#sso=${ssoFragment(session)}`;
    } else {
      const next = route.query.next || '/';
      returnTo = `${import.meta.env.VITE_HUB_URL}${next}`;
    }

    status.value = 'Linking sub-apps…';
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
