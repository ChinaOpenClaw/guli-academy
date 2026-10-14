<template>
  <article class="container mt20" v-if="article">
    <div class="a-detail">
      <h1 class="a-detail-title">{{ article.title }}</h1>
      <div class="a-detail-meta c-999">
        {{ article.author }} · {{ article.date }} · {{ article.views }} 阅读
      </div>
      <div class="a-detail-body">
        <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
      </div>
      <div class="tac mt40">
        <router-link to="/articles" class="comm-btn c-btn-2">返回文章列表</router-link>
      </div>
    </div>
  </article>
  <div class="empty container" v-else>文章不存在。</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getArticle } from '@/data/articles'

const route = useRoute()
const article = computed(() => getArticle(route.params.id))
const paragraphs = computed(() => (article.value ? article.value.content.split('\n\n').filter(Boolean) : []))
</script>

<style scoped>
.a-detail { max-width: 820px; margin: 0 auto; background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 34px 40px; }
.a-detail-title { font-size: 26px; font-weight: 800; }
.a-detail-meta { margin: 12px 0 24px; padding-bottom: 18px; border-bottom: 1px dashed var(--line); }
.a-detail-body p { margin-bottom: 18px; line-height: 2; color: var(--text-2); }
</style>
