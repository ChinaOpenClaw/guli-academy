<template>
  <div class="home">
    <!-- Banner -->
    <section class="g-banner g-banner--mad">
      <img src="/photo/banner/mad-banner.png" alt="MAD网课系统 — 金融与 IT 名师课堂" />
      <div class="banner-mask">
        <div class="container">
          <h1>MAD网课系统 · 金融与 IT 名师课堂</h1>
          <p>巴菲特 / 达利欧 / 西蒙斯 / Jeff Dean / Kernighan 名师亲授 · 真实 YouTube 与 B 站原课 · 案例实战全覆盖</p>
          <router-link to="/courses" class="comm-btn c-btn-1 banner-btn">免费试学</router-link>
        </div>
      </div>
    </section>

    <!-- 热门课程 -->
    <section class="container mt40">
      <SectionTitle title="热门课程" subtitle="覆盖金融投资 / IT 工程 / 人工智能 三大方向" />
      <div class="comm-course-list">
        <ul>
          <CourseCard v-for="c in hotCourses" :key="c.id" :course="c" />
        </ul>
      </div>
      <div class="tac mt20">
        <router-link to="/courses" class="comm-btn c-btn-2">查看全部课程</router-link>
      </div>
    </section>

    <!-- 名师大咖 -->
    <section class="container mt40">
      <SectionTitle title="名师大咖" subtitle="巴菲特 · 席勒 · 达利欧 · 达摩达兰 · Jeff Dean · Karpathy" />
      <div class="i-teacher-list">
        <ul>
          <TeacherCard v-for="t in teachers" :key="t.id" :teacher="t" />
        </ul>
      </div>
    </section>

    <!-- 技术文章 -->
    <section class="container mt40">
      <SectionTitle title="技术文章" subtitle="每周更新，紧跟行业趋势" />
      <div class="comm-article-list">
        <ul>
          <ArticleCard v-for="a in latestArticles" :key="a.id" :article="a" />
        </ul>
      </div>
    </section>

    <!-- AI 知识案例 -->
    <section class="container mt40">
      <SectionTitle title="AI 知识案例" subtitle="Vibe Coding & 智能体 · 真实行业项目形态" />
      <div class="home-ai">
        <div class="home-ai-intro">
          <h3>{{ aiOverview.title }}</h3>
          <p>{{ aiOverview.desc }}</p>
          <router-link to="/ai-cases" class="comm-btn c-btn-2">查看全部案例</router-link>
        </div>
        <div class="home-ai-grid">
          <router-link
            v-for="p in aiHighlights"
            :key="p.id"
            :to="'/ai-cases'"
            class="home-ai-card"
          >
            <span class="home-ai-cat">{{ p.cat }}</span>
            <div class="home-ai-name">{{ p.name }}</div>
            <div class="home-ai-desc">{{ p.desc }}</div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CourseCard from '@/components/CourseCard.vue'
import TeacherCard from '@/components/TeacherCard.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { courses } from '@/data/courses'
import { teachers } from '@/data/teachers'
import { articles } from '@/data/articles'
import { aiCaseOverview, aiProjects } from '@/data/cases'

const hotCourses = computed(() => [...courses].sort((a, b) => b.studyCount - a.studyCount).slice(0, 8))
const latestArticles = computed(() => [...articles].slice(0, 3))
const aiOverview = aiCaseOverview
const aiHighlights = computed(() => aiProjects.filter((p) => p.featured).concat(aiProjects.filter((p) => !p.featured)).slice(0, 4))
</script>

<style scoped>
.banner-mask {
  position: absolute; inset: 0; display: flex; align-items: flex-end;
  padding-bottom: 30px;
  background: linear-gradient(180deg, rgba(4,11,27,0) 45%, rgba(4,11,27,.72) 100%);
}
.banner-mask h1 { color: #fff; font-size: 36px; font-weight: 800; text-shadow: 0 2px 14px rgba(0,0,0,.45); }
.banner-mask p { color: #d7e9e0; margin: 12px 0 22px; font-size: 15px; text-shadow: 0 1px 8px rgba(0,0,0,.4); }
.banner-btn { padding: 11px 34px; font-size: 16px; }

@media (max-width: 768px) {
  .banner-mask { padding-bottom: 18px; }
  .banner-mask h1 { font-size: 22px; }
  .banner-mask p { font-size: 12px; margin: 8px 0 14px; }
}

.home-ai { display: grid; grid-template-columns: 300px 1fr; gap: 22px; align-items: start; }
.home-ai-intro { background: linear-gradient(120deg, var(--brand-light), #fff); border: 1px solid var(--line); border-radius: 12px; padding: 20px; }
.home-ai-intro h3 { font-size: 18px; margin-bottom: 10px; }
.home-ai-intro p { color: #666; font-size: 13px; line-height: 1.8; margin-bottom: 16px; }
.home-ai-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.home-ai-card { display: flex; flex-direction: column; gap: 6px; background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; text-decoration: none; color: inherit; transition: box-shadow .2s, transform .2s; }
.home-ai-card:hover { box-shadow: 0 8px 22px rgba(0,0,0,.08); transform: translateY(-2px); border-color: var(--brand); }
.home-ai-cat { font-size: 12px; color: #999; }
.home-ai-name { font-size: 16px; font-weight: 700; }
.home-ai-desc { font-size: 12px; color: #777; line-height: 1.6; }

@media (max-width: 992px) {
  .home-ai { grid-template-columns: 1fr; }
  .home-ai-grid { grid-template-columns: 1fr; }
}
</style>
