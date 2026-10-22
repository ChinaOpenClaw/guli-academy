<template>
  <div class="sign-page">
    <div class="sign-box">
      <div class="logo"><img src="/img/logo.png" alt="MAD网课系统 MAD" /></div>
      <div class="sign-tabs">
        <router-link to="/login">登录</router-link>
        <router-link to="/register" class="active">注册</router-link>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="sign-input">
          <input v-model="phone" type="text" placeholder="请输入手机号" />
        </div>
        <div class="sign-input">
          <input v-model="code" type="text" placeholder="请输入验证码" />
        </div>
        <div class="sign-input">
          <input v-model="pwd" type="password" placeholder="设置登录密码" />
        </div>
        <button type="submit" class="sign-submit">注 册</button>
      </form>

      <div class="more-sign">
        注册即代表同意
        <a href="javascript:void(0)" class="c-master">《MAD网课系统用户协议》</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()
const router = useRouter()
const phone = ref('')
const code = ref('')
const pwd = ref('')

function onSubmit() {
  if (!phone.value || !code.value || !pwd.value) {
    alert('请完整填写注册信息')
    return
  }
  login('MAD学员' + phone.value.slice(-4))
  router.push('/user')
}
</script>
