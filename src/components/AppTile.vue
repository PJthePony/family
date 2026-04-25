<script setup>
defineProps({ tile: { type: Object, required: true } });

const ICONS = {
  tessio:    '<polyline points="20 6 9 17 4 12"/>',
  luca:      '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  genco:     '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  apollonia: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
};
</script>

<template>
  <a class="tile" :href="tile.url">
    <span class="tile-icon" v-html="`<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>${ICONS[tile.key] ?? ''}</svg>`" />
    <div class="tile-text">
      <span class="name">{{ tile.name }}</span>
      <span class="tagline">{{ tile.tagline }}</span>
    </div>
  </a>
</template>

<style scoped>
.tile {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--text);
  box-shadow: var(--shadow-hang-sm);
  transition: transform var(--dur-2) var(--ease-out-expo),
              box-shadow var(--dur-3) var(--ease-out-expo),
              border-color var(--dur-2) var(--ease-out-expo);
}
.tile:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hang-md);
  border-color: var(--border-strong);
}

.tile-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(212, 36, 111, 0.08);
  border: 1px solid rgba(212, 36, 111, 0.18);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tile-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.name {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  font-variation-settings: 'opsz' 24;
  letter-spacing: -0.02em;
  color: var(--text);
  line-height: 1.1;
}
.tagline {
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
}
</style>
