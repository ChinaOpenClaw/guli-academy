<template>
  <div class="container mt20">
    <SectionTitle title="技术文章" subtitle="行业趋势、原理拆解与实战经验" />
    <div class="comm-article-list mt20">
      <ul>
        <ArticleCard v-for="a in articles" :key="a.id" :article="a" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import SectionTitle from '@/components/SectionTitle.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { articles } from '@/data/articles'
</script>
