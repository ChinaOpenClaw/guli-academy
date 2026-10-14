<template>
  <div class="container mt20" v-if="course">
    <!-- 课程头 -->
    <section class="course-detail-hero">
      <div class="cd-cover"><img :src="course.cover" :alt="course.title" /></div>
      <div class="cd-info">
        <h1>{{ course.title }}</h1>
        <p class="cd-line">分类：{{ course.category }} · 难度：{{ course.level }}</p>
        <p class="cd-line">讲师：
          <router-link v-if="teacher" :to="`/teachers/${teacher.id}`" class="c-master">{{ teacher.name }}</router-link>
          <span v-else>—</span>
        </p>
        <p class="cd-line">{{ course.studyCount }} 人在学</p>
        <div class="cd-price">{{ course.price }}</div>
        <p class="cd-intro">{{ course.intro }}</p>
        <div class="cd-actions">
          <button class="comm-btn c-btn-1" @click="start">立即开始学习</button>
          <a v-if="biliUrl" :href="biliUrl" target="_blank" rel="noopener" class="comm-btn c-btn-3">B站配套视频 ↗</a>
          <router-link v-if="course.category === 'AI'" to="/ai-cases" class="comm-btn c-btn-2">AI 知识案例 ↗</router-link>
        </div>
      </div>
    </section>

    <!-- 章节 -->
    <section class="mt40">
      <SectionTitle title="课程目录" />
      <div class="chapter-list">
        <div class="chapter-item" v-for="(ch, i) in course.chapters" :key="i">
          <div class="ch-title">{{ ch.name }}</div>
          <div class="ch-video" v-for="(v, j) in ch.videos" :key="j">▷ {{ v }}</div>
        </div>
      </div>
    </section>

    <!-- 相关课程 -->
    <section class="mt40" v-if="related.length">
      <SectionTitle title="相关课程" />
      <div class="comm-course-list">
        <ul>
          <CourseCard v-for="c in related" :key="c.id" :course="c" />
        </ul>
      </div>
    </section>
  </div>
  <div class="empty container" v-else>课程不存在或已下架。</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import SectionTitle from '@/components/SectionTitle.vue'
import CourseCard from '@/components/CourseCard.vue'
import { getCourse, getCoursesByTeacher, courses } from '@/data/courses'
import { getTeacher } from '@/data/teachers'
import { bilibiliPageUrl } from '@/api/learn'

const route = useRoute()
const router = useRouter()
const { isLogin } = useAuth()
const course = computed(() => getCourse(route.params.id))
const teacher = computed(() => (course.value ? getTeacher(course.value.teacherId) : null))
const biliUrl = computed(() => (course.value?.bilibili ? bilibiliPageUrl(course.value.bilibili) : ''))
const related = computed(() => {
  if (!course.value) return []
  return courses.filter((c) => c.category === course.value.category && c.id !== course.value.id).slice(0, 4)
})

// 进入学习中心：未登录先去登录（带回跳地址），已登录直接进
function start() {
  if (!isLogin.value) {
    router.push({ path: '/login', query: { redirect: `/learn/${course.value.id}` } })
  } else {
    router.push(`/learn/${course.value.id}`)
  }
}
</script>

<style scoped>
.cd-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 18px; }
</style>
