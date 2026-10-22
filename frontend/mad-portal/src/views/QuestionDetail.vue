<template>
  <div class="container mt20 q-detail" v-if="question">
    <div class="q-item" style="align-items:flex-start">
      <div class="q-avatar">{{ question.asker.slice(0, 1) }}</div>
      <div class="q-body">
        <h3 style="font-size:20px">{{ question.title }}</h3>
        <p class="mt10">{{ question.content }}</p>
        <div class="q-meta">{{ question.asker }} · {{ question.date }} · {{ question.views }} 浏览</div>
      </div>
    </div>

    <h3 class="mt40" style="font-size:18px">全部回答（{{ question.answers.length }}）</h3>
    <div class="a-answer" v-for="(ans, i) in question.answers" :key="i">
      <div class="a-answer-author c-master">{{ ans.author }}</div>
      <p class="mt10">{{ ans.text }}</p>
    </div>

    <div class="tac mt40">
      <router-link to="/questions" class="comm-btn c-btn-2">返回问答</router-link>
    </div>
  </div>
  <div class="empty container" v-else>问题不存在。</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getQuestion } from '@/data/questions'

const route = useRoute()
const question = computed(() => getQuestion(route.params.id))
</script>

<style scoped>
.q-detail { max-width: 860px; }
.a-answer { background: #fff; border: 1px solid var(--line); border-radius: 8px; padding: 18px; margin-top: 14px; }
.a-answer-author { font-weight: 600; }
</style>
