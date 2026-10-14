<template>
  <div class="container uc-wrap" v-if="isLogin">
    <!-- 侧栏 -->
    <aside class="uc-side">
      <div class="uc-avatar">
        <img :src="(user && user.avatar) || '/img/avatar-boy.gif'" alt="头像" />
        <div class="c-333" style="font-weight:600">{{ userName }}</div>
        <div class="c-999" style="font-size:12px" v-if="user && user.mobile">{{ user.mobile }}</div>
      </div>
      <nav class="uc-menu">
        <router-link to="/user" class="router-link-active">我的主页</router-link>
        <a href="javascript:void(0)" @click="$router.push('/courses')">我的课程</a>
        <a href="javascript:void(0)">我的订单</a>
        <a href="javascript:void(0)">我的收藏</a>
        <a href="javascript:void(0)" @click="logout">退出登录</a>
      </nav>
    </aside>

    <!-- 主区 -->
    <main class="uc-main">
      <h2 style="font-size:20px">我的课程</h2>
      <div class="comm-course-list mt20">
        <ul>
          <CourseCard v-for="c in myCourses" :key="c.id" :course="c" />
        </ul>
      </div>
      <div class="empty" v-if="!myCourses.length">还没有学习记录，去<a href="javascript:void(0)" @click="$router.push('/courses')" class="c-master">选课</a>吧～</div>
    </main>
  </div>

  <div class="empty container" v-else>
    您还未登录，
    <router-link to="/login" class="c-master">去登录</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import CourseCard from '@/components/CourseCard.vue'
import { useAuth } from '@/composables/useAuth'
import { courses, getCourse } from '@/data/courses'
import { myCourseIds } from '@/api/learn'

const { isLogin, userName, user, logout } = useAuth()
const router = useRouter()
// 优先展示用户实际开始学习的课程（来自学习中心记录），无记录时给推荐
const myCourses = computed(() => {
  const list = myCourseIds().map((id) => getCourse(id)).filter(Boolean)
  return list.length ? list : courses.slice(0, 4)
})
</script>
