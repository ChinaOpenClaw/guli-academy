# 系统架构说明

![架构图](./docs/architecture.svg)

MAD网课系统采用**前后台分离 + 微服务**架构，整体分为四层。

## 1. 客户端层（前端）

| 应用 | 技术 | 角色 | 端口 |
| --- | --- | --- | --- |
| `mad-portal` | Vue 3 + Vite + vue-router | 学员端前台门户：课程浏览、详情、学习中心、AI 知识案例 | 9529 |
| `mad-admin` | Vue 2 + ElementUI + Axios + ECharts | 运营端后台：课程 / 讲师 / 章节 / 课时 / 分类全模块管理，数据看板 | 9528 |

两者通过 `API 网关 / 路由转发`（Nginx 同源代理 + 跨域 CORS）访问后端。

## 2. 网关层

- Nginx 反向代理，将 `/admin/edu`、`/edu`、`/admin/sysuser` 等前缀路由到对应微服务。
- 开发态由两个前端 dev server 各自代理（见 `mad-admin/config/index.js` 与 `mad-portal/vite.config.js`）。

## 3. 微服务层（Spring Cloud）

所有微服务向 **Eureka 注册中心** 注册，互相通过服务名调用。

| 服务 | 端口 | 职责 |
| --- | --- | --- |
| `mad-commonservice-eureka` | 8220 | 服务注册与发现 |
| `mad-microservice-edu` | 8110 | 课程 / 讲师 / 章节 / 课时 / 分类关联（核心业务，MySQL `mad_edu`） |
| `mad-microservice-vod` | 8160 | 阿里云视频点播 SDK 封装：上传、删除、上传凭证与刷新 |
| `mad-microservice-oss` | 8002 | 阿里云对象存储：封面、素材 |
| `mad-microservice-ucenter` | — | 用户中心：会员、订单、学习记录 |
| `mad-microservice-statistics` | — | 统计：注册、播放、活跃 |
| `mad-microservice-sysuser` | 8120 | 登录鉴权：JWT / 统一 token |

### 后台内容管理接口（edu 服务）

后台 `mad-admin` 调用以下 admin 接口完成课程内容管理（统一返回 `R` 结果对象）：

| 模块 | 接口 |
| --- | --- |
| 课程 | `GET /admin/edu/course/{page}/{limit}` · `POST /admin/edu/course/save-course-info` · `GET /admin/edu/course/course-info/{id}` · `PUT /admin/edu/course/update-course-info/{id}` · `PUT /admin/edu/course/publish-course/{id}` · `DELETE /admin/edu/course/{id}` |
| 讲师 | `GET /admin/edu/teacher` · `GET /admin/edu/teacher/{page}/{limit}` · `POST /admin/edu/teacher` · `PUT /admin/edu/teacher/{id}` · `DELETE /admin/edu/teacher/{id}` |
| 章节 | `GET /admin/edu/chapter/nested-list/{courseId}` · `POST /admin/edu/chapter` · `PUT /admin/edu/chapter/{id}` · `DELETE /admin/edu/chapter/{id}` |
| 课时 | `POST /admin/edu/video/save-video-info` · `GET /admin/edu/video/video-info/{id}` · `PUT /admin/edu/video/update-video-info/{id}` · `DELETE /admin/edu/video/{id}` |
| 分类 | `GET /admin/edu/subject/list2` |

### 视频 SDK 接口（vod 服务）

- `POST /admin/vod/video/upload`（MultipartFile → 返回阿里云 `videoId`）
- `DELETE /admin/vod/video/{videoId}`
- `GET /admin/vod/video/get-upload-auth-and-address/{title}/{fileName}`
- `GET /admin/vod/video/refresh-upload-auth-and-address/{videoId}`

## 4. 存储 / 中间件层

| 组件 | 用途 |
| --- | --- |
| MySQL（`mad_edu`，3307 独立实例） | 业务主库：课程、讲师、章节、课时、分类 |
| Redis | 缓存、统计计数 |
| 阿里云 VOD | 视频存储、转码、播放（播放凭证由 vod 服务签发） |
| 阿里云 OSS | 静态资源：课程封面、素材 |
| YouTube / B 站 | **课程内容真实来源**：按 `videoSourceId` 前缀（`YT:` / `BI:`）前端直接嵌入原片 |

## 5. 统一数据源与资源生成

```
scripts/mad_data.py          # 唯一真源：讲师 / 课程 / 分类 / 章节 / 播放来源
        │
        ▼
scripts/gen_mad_assets.py    # 生成器
        ├──> frontend/mad-portal/src/data/{teachers,courses,subjects}.js
        ├──> frontend/mad-portal/public/photo/course/01..16.jpg
        ├──> frontend/mad-portal/public/photo/teacher/01..14.jpg
        └──> sql/mad_edu.sql
```

保证「前端展示」与「数据库内容」永远一致，避免两边数据漂移。

## 6. 演示后端（learn-center）

`backend/learn-center` 是一个 Node 服务，实现与 `edu` 微服务**同款契约**的章节大纲接口
`GET /edu/chapter/nested-list/{courseId}`，数据直接复用前台门户的 `courses.js`。
本地联调门户时，可不启动 MySQL 与 edu 微服务，仅运行它（默认 8110，可用 `PORT=8111` 错开）即可。

## 7. 调用时序（以「学员观看课程视频」为例）

1. 门户请求 `GET /edu/chapter/nested-list/{courseId}` → edu 服务返回章节与 `videoSourceId`。
2. 前端 `resolvePlayer()` 解析来源前缀：
   - `YT:PLxxxx` → 渲染 `youtube.com/embed/videoseries?list=PLxxxx&index={n}`；
   - `BI:BVxxxx` → 渲染 `player.bilibili.com/player.html?bvid=BVxxxx&page={n}`；
   - 无前缀 → 回落到阿里云 VOD 播放凭证流程。
3. 课程详情页与学习中心提供「在原站观看 ↗」外链，直达 YouTube 播放列表 / B 站分P。

## 8. 运行期兼容性补丁

| 层 | 问题 | 处理 |
| --- | --- | --- |
| JVM | Spring Boot 2.0.7 的 CGLIB 反射在 JDK 17 被模块系统拦截 | `--add-opens java.base/java.lang=ALL-UNNAMED` 等 12 项（见 `scripts/start_backend.sh`） |
| JVM | JAXB 在 JDK 11+ 被移除，Eureka 启动报 `JAXBContext` 缺失 | eureka 模块补 `jaxb-api` / `jaxb-impl` / `activation-api` / `istack-commons-runtime` |
| 编译期 | 旧版 Lombok 与 JDK 17 编译器不兼容 | `MAVEN_OPTS` 加 `--add-opens jdk.compiler/com.sun.tools.javac.*=ALL-UNNAMED` |
| 日志 | `logback-spring.xml` 硬编码 Windows 路径 `D:/mad_log_190105` | 改为 `${mad.log.path}`，可用 `MAD_LOG_PATH` 覆盖 |
| 构建 | webpack 4 在 Node 17+ OpenSSL 3 下崩溃 | 启动时加 `NODE_OPTIONS=--openssl-legacy-provider` |
