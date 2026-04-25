<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '../lib/supabase.js';
import { fetchMyApps } from '../lib/app-access.js';
import TopBar from '../components/TopBar.vue';
import AppTile from '../components/AppTile.vue';

const APPS = {
  tessio:    { name: 'Tessio',    tagline: 'Tasks',          url: 'https://tessio.tanzillo.ai',    accent: 'var(--fuchsia-600)', sso: true },
  luca:      { name: 'Luca',      tagline: 'Calendar',       url: 'https://luca.tanzillo.ai',      accent: 'var(--teal-600)',    sso: false },
  genco:     { name: 'Genco',     tagline: 'Communications', url: 'https://genco.tanzillo.ai',     accent: 'var(--copper-400)',  sso: true },
  apollonia: { name: 'Apollonia', tagline: 'Personal CRM',   url: 'https://apollonia.tanzillo.ai', accent: 'var(--violet-600)',  sso: true },
};

const tiles = ref([]);
const userEmail = ref('');

function ssoFragment(session) {
  const payload = { access_token: session.access_token, refresh_token: session.refresh_token };
  return encodeURIComponent(btoa(JSON.stringify(payload)));
}

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  userEmail.value = session?.user?.email ?? '';
  const fragment = session ? ssoFragment(session) : '';

  const grants = await fetchMyApps();
  tiles.value = grants
    .filter((g) => g.app !== 'family' && APPS[g.app])
    .map((g) => {
      const app = APPS[g.app];
      const url = app.sso && fragment ? `${app.url}/#sso=${fragment}` : app.url;
      return { key: g.app, ...app, url };
    });
});
</script>

<template>
  <TopBar :email="userEmail" />
  <main class="home">
    <section class="hero">
      <div class="eyebrow">The Family</div>
      <h1 class="title">Buongiorno.</h1>
      <p class="lead">Pick your tool.</p>
    </section>

    <section class="grid">
      <AppTile v-for="t in tiles" :key="t.key" :tile="t" />
    </section>
  </main>
</template>

<style scoped>
.home {
  max-width: 920px;
  margin: 0 auto;
  padding: var(--space-7) var(--space-5) var(--space-9);
}
.hero { margin-bottom: var(--space-7); }
.title {
  font-family: var(--font-serif);
  font-weight: 600;
  font-variation-settings: 'opsz' 36;
  letter-spacing: -0.018em;
  line-height: 1.1;
  font-size: 2rem;
  color: var(--text);
  margin: var(--space-2) 0 var(--space-3);
}
.lead { margin: 0; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-5);
}
</style>
