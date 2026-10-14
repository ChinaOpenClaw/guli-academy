// 谷粒学院学习中心 - 演示后端
// 实现 edu 微服务同款契约： GET /edu/chapter/nested-list/{courseId}
// 返回 Guli 统一结果： { success, code:20000, message, data:{ items:[ChapterVo] } }
//   ChapterVo: { id, title, children:[VideoVo] }
//   VideoVo:   { id, title, free(Boolean), videoSourceId }
// 数据直接复用前台门户的 courses.js（单一数据源），保证演示与门户一致。
// 生产环境：停掉本服务、启动 edu 微服务即可（同一路径 /edu/chapter/...，门户无需改动）。

import http from 'node:http'
import { courses } from '/Users/sang/Desktop/谷粒学院项目/workspace/frontend/guli-portal/src/data/courses.js'

console.log(`[learn-center] 已加载 ${courses.length} 门课程（来源：portal src/data/courses.js）`)

function buildOutline(courseId) {
  const course = courses.find((c) => String(c.id) === String(courseId))
  if (!course || !course.chapters) return []
  return course.chapters.map((ch, ci) => ({
    id: `ch-${ci}`,
    title: ch.name,
    children: ch.videos.map((title, vi) => ({
      id: `ch-${ci}-v-${vi}`,
      title,
      free: vi === 0,
      videoSourceId: ''
    }))
  }))
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    return res.end()
  }

  // 课程大纲（与 edu 微服务同款契约）
  const m = req.url.match(/^\/edu\/chapter\/nested-list\/([^/?]+)/)
  if (m) {
    const items = buildOutline(decodeURIComponent(m[1]))
    const body = JSON.stringify({ success: true, code: 20000, message: '成功', data: { items } })
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    return res.end(body)
  }

  // 会员登录（与 ucenter 微服务同款契约：POST /ucenter/member/login）
  const lm = req.url.match(/^\/(api\/)?ucenter\/member\/login/)
  if (lm && req.method === 'POST') {
    return readJson(req, (body) => {
      const mobile = (body && body.mobile) || ''
      const password = (body && body.password) || ''
      // 演示账号（生产由 ucenter 微服务查 MySQL ucenter_member 校验）
      if (mobile === '13354281998' && password === '123456') {
        const token = 'demo-jwt-' + Buffer.from(mobile).toString('base64') + '-' + Date.now()
        const member = {
          id: '1001',
          mobile,
          nickname: '谷粒学员',
          avatar: '/img/avatar-boy.gif'
        }
        const out = JSON.stringify({ success: true, code: 20000, message: '成功', data: { token, member } })
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        return res.end(out)
      }
      const out = JSON.stringify({ success: false, code: 20001, message: '手机号或密码错误', data: {} })
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(out)
    })
  }

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify({ success: true, code: 20000, message: 'learning-center demo api', data: {} }))
})

// 读取 POST 请求体（JSON）
function readJson(req, cb) {
  let raw = ''
  req.on('data', (c) => {
    raw += c
    if (raw.length > 1e6) req.destroy()
  })
  req.on('end', () => {
    let obj = {}
    try { obj = raw ? JSON.parse(raw) : {} } catch { obj = {} }
    cb(obj)
  })
}

const PORT = 8110
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[learn-center] 监听 http://localhost:${PORT}  (GET /edu/chapter/nested-list/:courseId)`)
})
