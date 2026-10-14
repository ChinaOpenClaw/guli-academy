<template>
  <div class="player">
    <!-- B 站正版嵌入 -->
    <iframe
      v-if="bvid"
      class="player-iframe"
      :src="embedSrc"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
      :title="title"
    ></iframe>

    <!-- 演示 MP4（无 B 站源时回退） -->
    <video
      v-else
      ref="vid"
      class="player-video"
      :src="src"
      :poster="poster"
      controls
      preload="metadata"
      playsinline
      @ended="$emit('ended')"
    >您的浏览器不支持 HTML5 视频。</video>

    <div class="player-bar">
      <span class="player-title txtOf">{{ title }}</span>
      <span v-if="bvid" class="player-bili">B站正版</span>
      <span v-else-if="free" class="player-free">免费试看</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  title: { type: String, default: '' },
  free: { type: Boolean, default: false },
  poster: { type: String, default: '' },
  bvid: { type: String, default: '' },
  page: { type: Number, default: 1 }
})
defineEmits(['ended'])

const vid = ref(null)

const embedSrc = computed(() =>
  `https://player.bilibili.com/player.html?bvid=${props.bvid}&page=${props.page || 1}&high_quality=1&danmaku=0&autoplay=0`
)

// 切换视频时（MP4 模式）从头加载
watch(() => props.src, () => {
  if (vid.value && !props.bvid) vid.value.load()
})
</script>

<style scoped>
.player { background: #000; border-radius: 10px; overflow: hidden; }
.player-video { width: 100%; aspect-ratio: 16 / 9; background: #000; display: block; }
.player-iframe { width: 100%; aspect-ratio: 16 / 9; border: 0; display: block; background: #000; }
.player-bar {
  display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: #11161c; color: #fff;
}
.player-title { flex: 1; font-size: 15px; }
.player-free {
  flex: none; font-size: 12px; color: #fff; background: var(--brand);
  border-radius: 3px; padding: 1px 8px;
}
.player-bili {
  flex: none; font-size: 12px; color: #fff; background: #fb7299;
  border-radius: 3px; padding: 1px 8px;
}
</style>
