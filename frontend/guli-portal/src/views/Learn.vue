<template>
  <div class="learn container" v-if="course">
    <!-- 未登录：学习中心门禁 -->
    <div class="learn-gate" v-if="!isLogin">
      <div class="lg-icon">🔒</div>
      <h2>登录后即可进入学习中心</h2>
      <p class="c-666">记录学习进度、续播上次课程，登录后体验完整学习中心。</p>
      <button class="comm-btn c-btn-1" @click="goLogin">登录学习</button>
    </div>

    <!-- 学习中心主体 -->
    <div class="learn-body" v-else>
      <div class="learn-head">
        <router-link :to="`/courses/${course.id}`" class="c-999">‹ 返回课程</router-link>
        <h1 class="learn-title">{{ course.title }}</h1>
      </div>

      <div class="learn-grid">
        <!-- 左侧章节目录 -->
        <aside class="learn-side">
          <div class="ls-progress">
            <div class="ls-bar"><span :style="{ width: progressPct + '%' }"></span></div>
            <div class="c-999" style="font-size:13px;margin-top:6px">
              已学 {{ doneCount }} / {{ total }} 节（{{ progressPct }}%）
            </div>
          </div>
          <div class="ls-chapters">
            <div class="ls-chapter" v-for="(ch, ci) in outline" :key="ch.id">
              <div class="ls-ch-title">第{{ ci + 1 }}章 · {{ ch.title }}</div>
              <ul>
                <li
                  v-for="v in ch.videos"
                  :key="v.id"
                  :class="{ active: v.id === currentVideoId, done: completed.has(v.id) }"
                  @click="selectVideo(v)"
                >
                  <span class="ls-dot">{{ completed.has(v.id) ? '✓' : '▷' }}</span>
                  <span class="ls-v-title txtOf">{{ v.title }}</span>
                  <span v-if="v.free" class="ls-free">免费</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <!-- 右侧播放器 -->
        <main class="learn-main">
          <VideoPlayer
            v-if="currentVideo"
            :src="player.type === 'mp4' ? player.src : ''"
            :title="currentVideo.title"
            :free="currentVideo.free"
            :poster="course.cover"
            :bvid="player.type === 'bilibili' ? player.bvid : ''"
            :page="player.page"
            @ended="onEnded"
          />
          <div v-if="currentVideo" class="lm-actions">
            <button class="comm-btn c-btn-3 sm" @click="onEnded">✓ 标记本节已学</button>
            <a v-if="biliUrl" :href="biliUrl" target="_blank" rel="noopener" class="lm-bili-link">在 B 站观看原版 ↗</a>
          </div>
          <div v-if="currentVideo" class="lm-info">
            <h3>{{ currentVideo.title }}</h3>
            <p class="c-999">讲师：
              <router-link v-if="teacher" :to="`/teachers/${teacher.id}`" class="c-master">{{ teacher.name }}</router-link>
              <span v-else>—</span>
            </p>
          </div>
          <div class="empty" v-else>本章暂无视频。</div>
        </main>
      </div>
    </div>
  </div>

  <div class="empty container" v-else>课程不存在。</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { getCourse } from '@/data/courses'
import { getTeacher } from '@/data/teachers'
import { fetchCourseOutline, localOutline, loadProgress, saveProgress, markStarted, resolvePlayer, bilibiliPageUrl } from '@/api/learn'
import VideoPlayer from '@/components/VideoPlayer.vue'

const { isLogin } = useAuth()
const route = useRoute()
const router = useRouter()

const course = computed(() => getCourse(route.params.id))
const teacher = computed(() => (course.value ? getTeacher(course.value.teacherId) : null))

const outline = ref([])
const loading = ref(false)
const currentVideoId = ref('')
const completed = ref(new Set())

const flatVideos = computed(() => outline.value.flatMap((ch) => ch.videos))
const currentVideo = computed(
  () => flatVideos.value.find((v) => v.id === currentVideoId.value) || flatVideos.value[0] || null
)
// 播放方案：有课程级 B 站 BV 则走 B 站分 P 嵌入，否则演示 MP4
const player = computed(() => resolvePlayer(currentVideo.value, course.value?.bilibili))
const biliUrl = computed(() =>
  player.value.type === 'bilibili' ? bilibiliPageUrl(player.value.bvid, player.value.page) : ''
)
const total = computed(() => flatVideos.value.length)
const doneCount = computed(() => flatVideos.value.filter((v) => completed.value.has(v.id)).length)
const progressPct = computed(() => (total.value ? Math.round((doneCount.value / total.value) * 100) : 0))

async function loadOutline() {
  loading.value = true
  const backend = await fetchCourseOutline(route.params.id)
  outline.value = backend && backend.length ? backend : localOutline(course.value)
  loading.value = false

  const p = loadProgress()[route.params.id]
  if (p && p.currentVideoId) {
    completed.value = new Set(p.completed || [])
    currentVideoId.value = outline.value.flatMap((c) => c.videos).some((v) => v.id === p.currentVideoId)
      ? p.currentVideoId
      : (flatVideos.value[0] && flatVideos.value[0].id) || ''
  } else {
    currentVideoId.value = (flatVideos.value[0] && flatVideos.value[0].id) || ''
  }
  markStarted(route.params.id)
}

function selectVideo(v) {
  currentVideoId.value = v.id
  persist()
}
function onEnded() {
  if (currentVideo.value) {
    const s = new Set(completed.value)
    s.add(currentVideo.value.id)
    completed.value = s
    persist()
  }
}
function persist() {
  saveProgress(route.params.id, { currentVideoId: currentVideoId.value, completed: [...completed.value] })
}
function goLogin() {
  router.push({ path: '/login', query: { redirect: `/learn/${route.params.id}` } })
}

watch(isLogin, (v) => { if (v) loadOutline() })
onMounted(() => { if (isLogin.value) loadOutline() })
</script>

<style scoped>
.learn { padding: 20px 0 40px; }
.learn-gate { text-align: center; padding: 80px 0; }
.lg-icon { font-size: 48px; }
.learn-gate h2 { margin: 14px 0 8px; font-size: 22px; }
.learn-gate p { margin-bottom: 22px; }
.learn-head { margin-bottom: 18px; }
.learn-title { font-size: 22px; margin-top: 6px; }
.learn-grid { display: flex; gap: 22px; align-items: flex-start; }
.learn-side { width: 340px; flex: none; background: #fff; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.ls-progress { padding: 16px 18px; border-bottom: 1px solid var(--line); background: var(--brand-light); }
.ls-bar { height: 8px; border-radius: 5px; background: #d8f0e6; overflow: hidden; }
.ls-bar span { display: block; height: 100%; background: var(--brand); transition: width .3s; }
.ls-chapters { max-height: 620px; overflow: auto; }
.ls-chapter { border-bottom: 1px solid var(--line); }
.ls-ch-title { padding: 12px 18px; font-weight: 600; background: var(--bg-fa); }
.ls-chapters li { display: flex; align-items: center; gap: 8px; padding: 10px 18px 10px 30px; cursor: pointer; border-left: 3px solid transparent; }
.ls-chapters li:hover { background: var(--brand-light); }
.ls-chapters li.active { background: var(--brand-light); border-left-color: var(--brand); color: var(--brand); }
.ls-chapters li.done .ls-dot { color: var(--brand); }
.ls-dot { flex: none; width: 18px; text-align: center; }
.ls-v-title { flex: 1; }
.ls-free { flex: none; font-size: 11px; color: var(--brand); border: 1px solid var(--brand); border-radius: 3px; padding: 0 5px; }
.learn-main { flex: 1; min-width: 0; }
.lm-actions { display: flex; align-items: center; gap: 14px; margin-top: 12px; }
.lm-actions .sm { padding: 7px 16px; font-size: 13px; }
.lm-bili-link { color: #fb7299; font-size: 13px; }
.lm-bili-link:hover { text-decoration: underline; }
.lm-info { margin-top: 14px; }
.lm-info h3 { font-size: 18px; }
.lm-info p { margin-top: 6px; }

@media (max-width: 992px) {
  .learn-grid { flex-direction: column; }
  .learn-side { width: 100%; }
}
</style>
