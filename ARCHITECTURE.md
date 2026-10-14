# 系统架构说明

![架构图](./docs/architecture.svg)

谷粒学院在线教学平台采用**前后台分离 + 微服务**架构，整体分为四层。

## 1. 客户端层（前端）

| 应用 | 技术 | 角色 |
| --- | --- | --- |
| `guli-portal` | Vue 3 + Vite + vue-router | 学员端前台门户：课程浏览、详情、学习中心、AI 知识案例 |
| `guli-admin` | Vue 2 + ElementUI + Axios + ECharts | 运营端后台：课程内容管理（课程/讲师/章节/科目）、数据看板 |

两者通过 `API 网关 / 路由转发`（Nginx 同源代理 + 跨域 CORS）访问后端。

## 2. 网关层

- Nginx 反向代理，将 `/admin/edu`、`/edu`、`/admin/vod` 等前缀路由到对应微服务。
- 开发态由两个前端 dev server 各自代理（见各 `config/index.js` / `vite.config`）。

## 3. 微服务层（Spring Cloud）

所有微服务向 **Eureka 注册中心** 注册，互相通过服务名调用。

| 服务 | 职责 |
| --- | --- |
| `guli-commonservice-eureka` | 服务注册与发现 |
| `guli-microservice-edu` | 课程 / 讲师 / 章节 / 科目 / 视频关联（核心业务，MySQL `guli_edu`） |
| `guli-microservice-vod` | 阿里云视频点播 SDK 封装：上传、删除、上传凭证与刷新 |
| `guli-microservice-oss` | 阿里云对象存储：封面、素材 |
| `guli-microservice-ucenter` | 用户中心：会员、订单、学习记录 |
| `guli-microservice-statistics` | 统计：注册、播放、活跃 |
| `guli-microservice-sysuser` | 登录鉴权：JWT / 统一 token |

### 后台内容管理接口（edu 服务）

后台 `guli-admin` 调用以下 admin 接口完成课程内容管理（统一返回 `R` 结果对象）：

- `POST /admin/edu/course/save` · `POST /admin/edu/course/update` · `GET /admin/edu/course/list`
- `POST /admin/edu/chapter/save` · `GET /admin/edu/chapter/nested-list/{courseId}`
- `POST /admin/edu/teacher/save` · `GET /admin/edu/teacher/pageList/{page}/{limit}`
- `POST /admin/edu/subject/add` · `GET /admin/edu/subject/list`

### 视频 SDK 接口（vod 服务）

- `POST /admin/vod/video/upload`（MultipartFile → 返回阿里云 `videoId`）
- `DELETE /admin/vod/video/{videoId}`
- `GET /admin/vod/video/get-upload-auth-and-address/{title}/{fileName}`
- `GET /admin/vod/video/refresh-upload-auth-and-address/{videoId}`

## 4. 存储 / 中间件层

| 组件 | 用途 |
| --- | --- |
| MySQL（`guli_edu`） | 业务主库：课程、讲师、章节、科目、用户 |
| Redis | 缓存、统计计数 |
| 阿里云 VOD | 视频存储、转码、播放（播放凭证由 vod 服务签发） |
| 阿里云 OSS | 静态资源：课程封面、素材图 |

## 5. 演示后端（learn-center）

`backend/learn-center` 是一个 Node 服务，实现与 `edu` 微服务**同款契约**的章节大纲接口
`GET /edu/chapter/nested-list/{courseId}`，数据直接复用前台门户的 `courses.js`。
本地联调门户时，可不启动 MySQL 与 edu 微服务，仅运行它（默认 8110）即可。

## 6. 调用时序（以「学员观看课程视频」为例）

1. 门户请求 `GET /edu/chapter/nested-list/{courseId}` → edu 服务返回章节与 `videoSourceId`。
2. 门户拿 `videoSourceId` 请求 vod 服务 `GET /admin/vod/video/get-play-auth/{videoId}` 获取播放凭证。
3. 前端用阿里云播放器 + 播放凭证播放 VOD 视频。
