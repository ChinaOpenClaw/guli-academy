<template>
  <div class="sign-page">
    <div class="sign-box">
      <div class="logo"><img src="/img/logo.png" alt="MAD网课系统 MAD" /></div>
      <div class="sign-tabs">
        <router-link to="/login" class="active">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="sign-input">
          <input v-model="phone" type="text" placeholder="请输入手机号" />
        </div>
        <div class="sign-input">
          <input v-model="pwd" type="password" placeholder="请输入密码" />
        </div>
        <button type="submit" class="sign-submit">登 录</button>
      </form>

      <div class="more-sign">
        其他登录方式
        <ul>
          <li class="wx" title="微信登录" @click="social('微信')">&#xe654;</li>
          <li class="qq" title="QQ登录" @click="social('QQ')">&#xe656;</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()
const route = useRoute()
const router = useRouter()
const phone = ref('')
const pwd = ref('')

async function onSubmit() {
  if (!phone.value || !pwd.value) {
    alert('请输入手机号和密码')
    return
  }
  try {
    const res = await fetch('/ucenter/member/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: phone.value, password: pwd.value })
    })
    const json = await res.json()
    if (json.success && json.data && json.data.token) {
      login({ token: json.data.token, member: json.data.member })
      const redirect = route.query.redirect
      router.push(redirect ? String(redirect) : '/user')
    } else {
      alert(json.message || '登录失败')
    }
  } catch (e) {
    alert('网络错误，登录接口暂不可用')
  }
}

function social(name) {
  alert(`演示站点：${name} 登录需对接 OAuth 后端`)
}
</script>
