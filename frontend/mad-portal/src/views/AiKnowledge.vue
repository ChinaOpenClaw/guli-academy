<template>
  <div class="container mt20 ai-cases">
    <!-- 概览 -->
    <section class="ac-hero">
      <div class="ac-hero-main">
        <span class="ac-badge">知识案例 · 行业实战</span>
        <h1>{{ overview.title }}</h1>
        <p class="ac-sub">{{ overview.subtitle }}</p>
        <p class="ac-desc">{{ overview.desc }}</p>
        <div class="ac-tags">
          <span v-for="t in overview.tags" :key="t" class="ac-tag">{{ t }}</span>
        </div>
      </div>
      <div class="ac-hero-side">
        <div class="ac-stat">
          <div class="ac-stat-num">{{ overview.salary }}</div>
          <div class="ac-stat-label">岗位薪资区间</div>
        </div>
        <div class="ac-stat">
          <div class="ac-stat-num">10 阶段</div>
          <div class="ac-stat-label">体系化课程大纲</div>
        </div>
        <div class="ac-stat">
          <div class="ac-stat-num">19+</div>
          <div class="ac-stat-label">真实项目库</div>
        </div>
        <div class="ac-stat hl">
          <div class="ac-stat-num">{{ overview.highlight }}</div>
          <div class="ac-stat-label">尚硅谷赋能</div>
        </div>
      </div>
    </section>

    <!-- 10 阶段大纲 -->
    <section class="mt40">
      <SectionTitle title="10 阶段课程体系" subtitle="从 Python 基础到就业冲刺的完整成长链路" />
      <div class="ac-stages">
        <div class="ac-stage" v-for="s in stages" :key="s.no">
          <div class="ac-stage-no">{{ s.no < 10 ? '0' + s.no : s.no }}</div>
          <div class="ac-stage-body">
            <div class="ac-stage-name">{{ s.name }}</div>
            <div class="ac-stage-desc">{{ s.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目库 -->
    <section class="mt40">
      <SectionTitle title="真实项目库" subtitle="RAG / 智能体 / 微调 / 全栈，覆盖主流 AI 落地场景" />
      <div class="ac-grid">
        <div
          class="ac-card"
          v-for="p in projects"
          :key="p.id"
          :class="{ featured: p.featured }"
        >
          <div class="ac-card-top">
            <span class="ac-card-cat">{{ p.cat }}</span>
            <span v-if="p.featured" class="ac-card-flag">重点</span>
          </div>
          <div class="ac-card-name">{{ p.name }}</div>
          <div class="ac-card-desc">{{ p.desc }}</div>
          <div class="ac-card-tech">
            <span v-for="t in p.tech" :key="t" class="ac-chip">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 重点案例：掌柜智库 RAG -->
    <section class="mt40">
      <SectionTitle title="重点案例详解" subtitle="掌柜智库 · 企业级 RAG 知识库技术栈" />
      <div class="ac-feature">
        <div class="ac-feature-info">
          <h3>{{ featured.name }}</h3>
          <p>{{ featured.summary }}</p>
        </div>
        <div class="ac-feature-flow">
          <div class="ac-flow-item" v-for="(f, i) in featured.flow" :key="i">
            <span class="ac-flow-no">{{ i + 1 }}</span>
            <span>{{ f }}</span>
          </div>
        </div>
        <div class="ac-feature-stack">
          <span v-for="t in featured.stack" :key="t" class="ac-chip brand">{{ t }}</span>
        </div>
      </div>
    </section>

    <!-- 来源 -->
    <section class="mt40 ac-source">
      <p>
        本板块内容整理自
        <a :href="sourceUrl" target="_blank" rel="noopener">尚硅谷 AI 全能开发（atguigu.com/aicoding）</a>
        ，作为MAD网课系统「知识案例」补充，帮助学员了解 AI 时代真实项目形态。
      </p>
    </section>
  </div>
</template>

<script setup>
import SectionTitle from '@/components/SectionTitle.vue'
import { aiCaseOverview, aiStages, aiProjects, aiFeaturedCase, aiSourceUrl } from '@/data/cases'

const overview = aiCaseOverview
const stages = aiStages
const projects = aiProjects
const featured = aiFeaturedCase
const sourceUrl = aiSourceUrl
</script>

<style scoped>
.ai-cases { padding-bottom: 30px; }
.ac-hero {
  display: flex; gap: 24px; align-items: stretch; flex-wrap: wrap;
  background: linear-gradient(120deg, var(--brand-light), #fff);
  border: 1px solid var(--line); border-radius: 14px; padding: 26px 28px;
}
.ac-hero-main { flex: 1; min-width: 320px; }
.ac-badge { display: inline-block; background: var(--brand); color: #fff; font-size: 12px; padding: 3px 10px; border-radius: 20px; }
.ac-hero-main h1 { font-size: 26px; margin: 12px 0 6px; }
.ac-sub { color: var(--brand); font-weight: 600; margin-bottom: 10px; }
.ac-desc { color: #555; line-height: 1.8; }
.ac-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.ac-tag { font-size: 12px; color: var(--brand); border: 1px solid var(--brand); border-radius: 20px; padding: 2px 10px; }
.ac-hero-side { width: 280px; flex: none; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-content: center; }
.ac-stat { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 14px; text-align: center; }
.ac-stat.hl { grid-column: span 2; background: var(--brand); border-color: var(--brand); }
.ac-stat.hl .ac-stat-num, .ac-stat.hl .ac-stat-label { color: #fff; }
.ac-stat-num { font-size: 18px; font-weight: 700; color: var(--brand); }
.ac-stat-label { font-size: 12px; color: #888; margin-top: 4px; }

.ac-stages { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 16px; }
.ac-stage { display: flex; gap: 14px; background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; }
.ac-stage-no { flex: none; width: 40px; height: 40px; border-radius: 50%; background: var(--brand-light); color: var(--brand); font-weight: 800; display: flex; align-items: center; justify-content: center; }
.ac-stage-name { font-weight: 600; }
.ac-stage-desc { color: #888; font-size: 13px; margin-top: 4px; line-height: 1.6; }

.ac-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 16px; }
.ac-card { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 8px; transition: box-shadow .2s, transform .2s; }
.ac-card:hover { box-shadow: 0 8px 22px rgba(0,0,0,.08); transform: translateY(-2px); }
.ac-card.featured { border-color: var(--brand); box-shadow: 0 6px 18px rgba(104,203,155,.2); }
.ac-card-top { display: flex; align-items: center; justify-content: space-between; }
.ac-card-cat { font-size: 12px; color: #999; }
.ac-card-flag { font-size: 11px; color: #fff; background: #fb7299; border-radius: 3px; padding: 1px 7px; }
.ac-card-name { font-size: 17px; font-weight: 700; }
.ac-card-desc { color: #666; font-size: 13px; line-height: 1.7; flex: 1; }
.ac-card-tech { display: flex; flex-wrap: wrap; gap: 6px; }
.ac-chip { font-size: 11px; color: #555; background: #f3f5f7; border-radius: 4px; padding: 2px 7px; }
.ac-chip.brand { color: var(--brand); background: var(--brand-light); }

.ac-feature { display: grid; grid-template-columns: 1.1fr .9fr; gap: 20px; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 20px; }
.ac-feature-info h3 { font-size: 19px; margin-bottom: 10px; }
.ac-feature-info p { color: #666; line-height: 1.8; }
.ac-feature-flow { display: flex; flex-direction: column; gap: 8px; }
.ac-flow-item { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: #555; line-height: 1.6; }
.ac-flow-no { flex: none; width: 20px; height: 20px; border-radius: 50%; background: var(--brand); color: #fff; font-size: 12px; display: flex; align-items: center; justify-content: center; }
.ac-feature-stack { grid-column: span 2; display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; padding-top: 14px; border-top: 1px dashed var(--line); }

.ac-source { color: #888; font-size: 13px; line-height: 1.8; }
.ac-source a { color: var(--brand); }

@media (max-width: 992px) {
  .ac-hero-side { width: 100%; }
  .ac-stages, .ac-grid { grid-template-columns: 1fr; }
  .ac-feature { grid-template-columns: 1fr; }
  .ac-feature-stack { grid-column: span 1; }
}
</style>
