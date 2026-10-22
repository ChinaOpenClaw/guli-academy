<template>
  <nav class="paging" v-if="totalPages > 1">
    <a class="undisable" v-if="current === 1" @click.prevent>« 首页</a>
    <a v-else @click="go(1)">« 首页</a>

    <a class="undisable" v-if="current === 1" @click.prevent>‹ 上一页</a>
    <a v-else @click="go(current - 1)">‹ 上一页</a>

    <a
      v-for="p in pages"
      :key="p"
      :class="{ active: p === current }"
      @click="go(p)"
    >{{ p }}</a>

    <a class="undisable" v-if="current === totalPages" @click.prevent>下一页 ›</a>
    <a v-else @click="go(current + 1)">下一页 ›</a>

    <a class="undisable" v-if="current === totalPages" @click.prevent>尾页 »</a>
    <a v-else @click="go(totalPages)">尾页 »</a>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 }
})
const emit = defineEmits(['change'])

// 显示当前页前后各 2 页，首尾始终可见
const pages = computed(() => {
  const total = props.totalPages
  const cur = props.current
  const set = new Set([1, total, cur, cur - 1, cur + 1, cur - 2, cur + 2])
  return [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
})

function go(p) {
  if (p < 1 || p > props.totalPages || p === props.current) return
  emit('change', p)
}
</script>
