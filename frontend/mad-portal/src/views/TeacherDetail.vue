<template>
  <div class="container mt20" v-if="teacher">
    <!-- 讲师信息 -->
    <section class="course-detail-hero" style="align-items:center">
      <div class="teacher-pic" style="width:120px;height:120px;margin:0">
        <img :src="teacher.avatar" :alt="teacher.name" />
      </div>
      <div class="cd-info">
        <h1>{{ teacher.name }}</h1>
        <p class="cd-line c-master">{{ teacher.title }}</p>
        <p class="cd-intro">{{ teacher.intro }}</p>
      </div>
    </section>

    <!-- 该讲师的课程 -->
    <section class="mt40">
      <SectionTitle title="TA 的课程" />
      <div class="comm-course-list mt15" v-if="teacherCourses.length">
        <ul>
          <CourseCard v-for="c in teacherCourses" :key="c.id" :course="c" />
        </ul>
      </div>
      <div class="empty" v-else>该讲师暂无上线课程。</div>
    </section>
  </div>
  <div class="empty container" v-else>讲师不存在。</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SectionTitle from '@/components/SectionTitle.vue'
import CourseCard from '@/components/CourseCard.vue'
import { getTeacher } from '@/data/teachers'
import { getCoursesByTeacher } from '@/data/courses'

const route = useRoute()
const teacher = computed(() => getTeacher(route.params.id))
const teacherCourses = computed(() => (teacher.value ? getCoursesByTeacher(teacher.value.id) : []))
</script>
