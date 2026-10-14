// 学习中心 - 后端接入层
// 真实数据源：edu 微服务 GET /edu/chapter/nested-list/{courseId}
// 返回 Guli 统一结果 R: { code, success, message, data: { items: [ChapterVo] } }
//   ChapterVo: { id, title, children: [VideoVo] }
//   VideoVo:   { id, title, free(Boolean), videoSourceId }
// 前端门户通过 vite proxy '/edu -> 8110' 调用，无需跨域。

const EDU_BASE = '/edu'

// 演示用播放源：真实环境应拿 video.videoSourceId 向阿里云 VOD 换取 playAuth 后用 Aliplayer 播放
const DEMO_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
]

// 解析播放地址（生产接入点：videoSourceId -> VOD GetVideoPlayAuth -> Aliplayer）
export function resolvePlayUrl(video, index = 0) {
  if (video && video.videoSourceId) {
    // TODO 生产：用 videoSourceId 调 VOD 获取 playAuth，返回 { playAuth, coverUrl }
    console.info('[learn] 生产环境应基于 videoSourceId 换取 VOD 播放凭证：', video.videoSourceId)
  }
  return DEMO_VIDEOS[index % DEMO_VIDEOS.length]
}

// 把课程级 B 站 BV 号 + 全局序号映射为播放方案
// 返回 { type: 'bilibili', bvid, page } 或 { type: 'mp4', src }
export function resolvePlayer(video, courseBvid) {
  if (courseBvid && video && video._seq != null) {
    return { type: 'bilibili', bvid: courseBvid, page: video._seq + 1 }
  }
  if (video && video.playUrl) return { type: 'mp4', src: video.playUrl }
  return { type: 'mp4', src: DEMO_VIDEOS[(video && video._seq) || 0] }
}

// 还原 B 站播放页地址（用于课程详情外链）
export function bilibiliPageUrl(bvid, page = 1) {
  return `https://www.bilibili.com/video/${bvid}${page > 1 ? `?p=${page}` : ''}`
}

// 拉取课程大纲：后端优先，失败/无数据返回 null（上层回退本地 mock）
export async function fetchCourseOutline(courseId) {
  try {
    const res = await fetch(`${EDU_BASE}/chapter/nested-list/${courseId}`)
    if (!res.ok) return null
    const json = await res.json()
    const items = json?.data?.items || json?.items
    if (!items || !items.length) return null
    return items.map((ch, ci) => ({
      id: ch.id,
      title: ch.title,
      videos: (ch.children || []).map((v, vi) => ({
        id: v.id,
        title: v.title,
        free: !!v.free,
        videoSourceId: v.videoSourceId || '',
        playUrl: resolvePlayUrl(v, ci + vi)
      }))
    }))
  } catch (e) {
    return null
  }
}

// 本地 mock 大纲：把 courses.js 的 chapters（{name, videos:[string]}）转成统一结构
// _seq 为全局序号（跨章节累计），用于映射 B 站分 P 播放
export function localOutline(course) {
  if (!course || !course.chapters) return []
  let seq = 0
  return course.chapters.map((ch, ci) => ({
    id: `ch-${ci}`,
    title: ch.name,
    videos: ch.videos.map((title, vi) => ({
      id: `ch-${ci}-v-${vi}`,
      title,
      free: vi === 0,
      videoSourceId: '',
      playUrl: resolvePlayUrl({ videoSourceId: '' }, seq),
      _seq: seq++
    }))
  }))
}

// ---------- 学习进度（演示用 localStorage；生产应上报后端会员学习记录）----------
const PROGRESS_KEY = 'guli_learn_progress'
const MY_COURSES_KEY = 'guli_my_courses'

export function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {} } catch { return {} }
}
export function saveProgress(courseId, p) {
  const all = loadProgress()
  all[courseId] = p
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all))
}
export function markStarted(courseId) {
  const set = new Set(JSON.parse(localStorage.getItem(MY_COURSES_KEY) || '[]'))
  set.add(Number(courseId))
  localStorage.setItem(MY_COURSES_KEY, JSON.stringify([...set]))
}
export function myCourseIds() {
  try { return JSON.parse(localStorage.getItem(MY_COURSES_KEY) || '[]') } catch { return [] }
}
