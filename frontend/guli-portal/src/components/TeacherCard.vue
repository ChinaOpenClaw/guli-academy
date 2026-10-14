<template>
  <router-link class="teacher-card" :to="`/teachers/${teacher.id}`">
    <div class="teacher-pic"><img :src="teacher.avatar" :alt="teacher.name" loading="lazy" /></div>
    <div class="teacher-name">{{ teacher.name }}</div>
    <div class="teacher-title">{{ teacher.title }}</div>
    <div class="teacher-intro">{{ teacher.intro }}</div>
  </router-link>
</template>

<script setup>
defineProps({
  teacher: { type: Object, required: true }
})
</script>
