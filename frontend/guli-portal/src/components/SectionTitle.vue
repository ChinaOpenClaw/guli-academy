<template>
  <div class="comm-title">
    <h2><span>{{ title }}</span></h2>
    <p class="c-999 mt10" v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>
