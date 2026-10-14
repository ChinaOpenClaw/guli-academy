import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Courses from '@/views/Courses.vue'
import CourseDetail from '@/views/CourseDetail.vue'
import Learn from '@/views/Learn.vue'
import Teachers from '@/views/Teachers.vue'
import TeacherDetail from '@/views/TeacherDetail.vue'
import Articles from '@/views/Articles.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import AiKnowledge from '@/views/AiKnowledge.vue'
import Questions from '@/views/Questions.vue'
import QuestionDetail from '@/views/QuestionDetail.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import UserCenter from '@/views/UserCenter.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { title: '首页' } },
  { path: '/courses', name: 'courses', component: Courses, meta: { title: '课程' } },
  { path: '/courses/:id', name: 'course-detail', component: CourseDetail, meta: { title: '课程详情' } },
  { path: '/learn/:id', name: 'learn', component: Learn, meta: { title: '学习中心' } },
  { path: '/teachers', name: 'teachers', component: Teachers, meta: { title: '名师' } },
  { path: '/teachers/:id', name: 'teacher-detail', component: TeacherDetail, meta: { title: '名师详情' } },
  { path: '/articles', name: 'articles', component: Articles, meta: { title: '文章' } },
  { path: '/articles/:id', name: 'article-detail', component: ArticleDetail, meta: { title: '文章详情' } },
  { path: '/ai-cases', name: 'ai-cases', component: AiKnowledge, meta: { title: 'AI知识案例' } },
  { path: '/questions', name: 'questions', component: Questions, meta: { title: '问答' } },
  { path: '/questions/:id', name: 'question-detail', component: QuestionDetail, meta: { title: '问答详情' } },
  { path: '/login', name: 'login', component: Login, meta: { title: '登录', hideLayout: true } },
  { path: '/register', name: 'register', component: Register, meta: { title: '注册', hideLayout: true } },
  { path: '/user', name: 'user', component: UserCenter, meta: { title: '个人中心' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { title: '页面不存在' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const base = '谷粒学院'
  document.title = to.meta.title ? `${base} - ${to.meta.title}` : base
})

export default router
