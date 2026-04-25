<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '../lib/supabase.js';
import { fetchMyApps } from '../lib/app-access.js';
import TopBar from '../components/TopBar.vue';
import AppTile from '../components/AppTile.vue';

const APPS = {
  tessio:    { name: 'Tessio',    tagline: 'Tasks',          url: 'https://tessio.tanzillo.ai',    accent: 'var(--fuchsia-600)' },
  luca:      { name: 'Luca',      tagline: 'Calendar',       url: 'https://luca.tanzillo.ai',      accent: 'var(--teal-600)' },
  genco:     { name: 'Genco',     tagline: 'Communications', url: 'https://genco.tanzillo.ai',     accent: 'var(--copper-400)' },
  apollonia: { name: 'Apollonia', tagline: 'Personal CRM',   url: 'https://apollonia.tanzillo.ai', accent: 'var(--violet-600)' },
};

const tiles = ref([]);
const userEmail = ref('');

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  userEmail.value = user?.email ?? '';
  const grants = await fetchMyApps();
  tiles.value = grants
    .filter((g) => g.app !== 'family' && APPS[g.app])
    .map((g) => ({ key: g.app, ...APPS[g.app] }));
});
</script>

<template>
  <TopBar :email="userEmail" />
  <main class="home">
    <section class="hero">
      <div class="eyebrow">The Family</div>
      <h1 class="display-italic title">Buongiorno.</h1>
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
  font-size: var(--step-5);
  color: var(--accent);
  margin: var(--space-2) 0 var(--space-3);
}
.lead { margin: 0; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-5);
}
</style>
