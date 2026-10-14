<template>
  <div class="container mt20">
    <SectionTitle title="学员问答" subtitle="不懂就问，老师与同学一起答" />
    <div class="mt20">
      <div class="q-item" v-for="q in questions" :key="q.id">
        <div class="q-avatar">{{ q.asker.slice(0, 1) }}</div>
        <div class="q-body">
          <router-link :to="`/questions/${q.id}`" class="c-333"><h3>{{ q.title }}</h3></router-link>
          <p class="txtOf">{{ q.content }}</p>
          <div class="q-meta">{{ q.asker }} · {{ q.date }} · {{ q.views }} 浏览 · {{ q.answers.length }} 回答</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionTitle from '@/components/SectionTitle.vue'
import { questions } from '@/data/questions'
</script>
