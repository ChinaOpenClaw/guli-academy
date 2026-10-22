<template>
  <router-link class="course-card" :to="`/courses/${course.id}`">
    <div class="course-img">
      <img :src="course.cover" :alt="course.title" loading="lazy" />
      <div class="course-mask"><span class="comm-btn c-btn-2">开始学习</span></div>
    </div>
    <h3 class="txtOf">{{ course.title }}</h3>
    <div class="course-meta">
      <span class="c-999">{{ course.studyCount }}人在学</span>
      <span class="jgAttr"><i class="c-orange">{{ course.price }}</i></span>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  course: { type: Object, required: true }
})
</script>
