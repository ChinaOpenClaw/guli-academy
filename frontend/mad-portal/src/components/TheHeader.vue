<template>
  <header class="g-header">
    <div class="container">
      <h1 class="g-logo">
        <router-link to="/"><img src="/img/logo.png" alt="MAD网课系统 MAD" /></router-link>
      </h1>
      <nav class="g-nav">
        <router-link to="/">首页</router-link>
        <router-link to="/courses">课程</router-link>
        <router-link to="/teachers">名师</router-link>
        <router-link to="/articles">文章</router-link>
        <router-link to="/ai-cases">AI案例</router-link>
        <router-link to="/questions">问答</router-link>
      </nav>
      <div class="g-header-right">
        <form class="g-search" @submit.prevent="onSearch">
          <input v-model="kw" type="text" placeholder="搜索课程" />
          <button type="submit" aria-label="搜索">🔍</button>
        </form>
        <template v-if="isLogin">
          <div class="g-user">
            <router-link to="/user"><img :src="user?.avatar || '/img/avatar-boy.gif'" alt="头像" /></router-link>
            <router-link to="/user" class="c-666">{{ userName }}</router-link>
            <a href="javascript:void(0)" class="c-666 ml5" @click="logout">退出</a>
          </div>
        </template>
        <template v-else>
          <div class="g-login">
            <router-link to="/login">登录</router-link>
            <span class="ml5 c-999">|</span>
            <router-link to="/register" class="ml5">注册</router-link>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { isLogin, userName, user, logout } = useAuth()
const router = useRouter()
const kw = ref('')

function onSearch() {
  router.push({ path: '/courses', query: { kw: kw.value || undefined } })
}
</script>
