<template>
  <router-link class="article-card" :to="`/articles/${article.id}`">
    <div class="a-cover"><img :src="article.cover" :alt="article.title" loading="lazy" /></div>
    <div class="a-body">
      <div class="a-title txtOf">{{ article.title }}</div>
      <div class="a-excerpt">{{ article.excerpt }}</div>
      <div class="c-999 mt10" style="font-size:12px">
        {{ article.author }} · {{ article.date }} · {{ article.views }}阅读
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  article: { type: Object, required: true }
})
</script>
