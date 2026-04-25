<script setup>
defineProps({ tile: { type: Object, required: true } });
</script>

<template>
  <a class="tile" :href="tile.url" :style="{ '--tile-accent': tile.accent }">
    <span class="rule" />
    <span class="name">{{ tile.name }}</span>
    <span class="tagline">{{ tile.tagline }}</span>
  </a>
</template>

<style scoped>
.tile {
  --tile-accent: var(--accent);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--text);
  box-shadow: var(--shadow-hang-sm);
  transition: transform var(--dur-2) var(--ease-out-expo),
              box-shadow var(--dur-3) var(--ease-out-expo),
              border-color var(--dur-2) var(--ease-out-expo);
  min-height: 144px;
}
.tile:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hang-md);
  border-color: var(--border-strong);
}
.rule {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--tile-accent);
}
.name {
  font-family: var(--font-serif);
  font-size: var(--step-3);
  font-weight: 600;
  font-variation-settings: 'opsz' 36, 'WONK' 0;
  letter-spacing: -0.02em;
}
.tagline {
  font-size: var(--step--1);
  color: var(--text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
}
</style>
