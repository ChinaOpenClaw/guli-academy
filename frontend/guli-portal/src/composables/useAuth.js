import { ref, computed } from 'vue'

// 登录态：模块级单例，SPA 内共享，持久化到 localStorage（刷新后保持）
const TOKEN_KEY = 'guli_token'
const USER_KEY = 'guli_user'

const token = ref(localStorage.getItem(TOKEN_KEY) || '')
const user = ref((() => { try { return JSON.parse(localStorage.getItem(USER_KEY)) || null } catch { return null } })())
const isLogin = computed(() => !!token.value)
// 兼容旧逻辑：优先取会员昵称
const userName = computed(() => (user.value && user.value.nickname) || localStorage.getItem('guli_name') || '')

export function useAuth() {
  // 登录成功：写入 token + 会员信息（来自后端）
  function login({ token: t, member } = {}) {
    token.value = t || 'demo-token'
    user.value = member || { nickname: '谷粒学员', avatar: '/img/avatar-boy.gif' }
    localStorage.setItem(TOKEN_KEY, token.value)
    localStorage.setItem(USER_KEY, JSON.stringify(user.value))
  }
  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem('guli_name')
  }
  return { isLogin, token, user, userName, login, logout }
}
