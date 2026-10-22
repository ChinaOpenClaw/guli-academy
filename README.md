# MAD网课系统（Mad Academy）

> 一个开源的在线教育平台：**后台管理课程**（课程 / 讲师 / 章节 / 科目 / 课时），前台门户供学员浏览与学习；后端采用 Spring Cloud 微服务架构，视频能力基于**阿里云视频点播（VOD）SDK**。
>
> 本项目聚焦 **金融投资 / IT 工程 / 人工智能** 三大方向，师资对标巴菲特、席勒、达利欧、西蒙斯、达摩达兰、Jeff Dean、Kernighan、Karpathy 等一线名师，课程内容全部来自**真实 YouTube 播放列表与 B 站正版课程**。

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![架构](https://img.shields.io/badge/arch-Spring%20Cloud%20%2B%20Vue-brightgreen.svg)](./ARCHITECTURE.md)

---

## ✨ 特性

- **前后台分离**：Vue 3 前台门户（学员端）+ Vue 2 + ElementUI 后台管理（运营端）。
- **完整课程后台管理**：课程、讲师、章节、课时、科目五大模块的全套 CRUD，课程一键发布。
- **真实名师师资**：14 位金融 / IT 领域一线学者，含巴菲特、芒格、格雷厄姆、席勒、达利欧、马克斯、达摩达兰、西蒙斯、Jeff Dean、Kernighan、高斯林、Karpathy、施密特、Stoica。
- **真实原课来源**：16 门课程全部对应真实 YouTube 播放列表（耶鲁 ECON 252、MIT 6.006、Stanford CS231n、吴恩达 ML 专项、Damodaran 估值课等）或 B 站正版系列课，前台按章节序号精准定位到原片。
- **微服务架构**：Eureka 注册中心 + 多微服务（edu / vod / oss / ucenter / statistics / sysuser）。
- **JDK 17 兼容**：内置 `--add-opens` 启动脚本与 JAXB 依赖补丁，可直接在 JDK 17 上运行 Spring Boot 2.0.7。
- **开放开源**：MIT 协议，文档与架构图齐备，开箱即读。

## 🧱 技术栈

| 层 | 技术 |
| --- | --- |
| 前台门户 | Vue 3.5 · Vite 5 · vue-router 4 |
| 后台管理 | Vue 2 · ElementUI · Axios · ECharts |
| 后端微服务 | Spring Boot 2.0.7 · Spring Cloud · Eureka · MyBatis-Plus |
| 视频 / 存储 | 阿里云 VOD SDK · 阿里云 OSS |
| 数据 / 缓存 | MySQL 8（3307 独立实例）· Redis |
| 可视化素材 | draw.io（.drawio 源文件 + SVG）· 亿图（.eddx）· SVG 思维导图 |

## 🗺️ 系统架构

![架构图](./docs/architecture.svg)

分层说明与调用关系见 [ARCHITECTURE.md](./ARCHITECTURE.md)。

## 📁 目录结构

```
guli-academy/
├── backend/
│   └── mad/                        # Spring Cloud 微服务（父工程 + 各微服务）
│       ├── mad-commonservice-eureka/   # 注册中心（8220）
│       ├── mad-microservice-edu/       # 课程/讲师/章节/科目/课时关联（8110）
│       ├── mad-microservice-vod/       # 阿里云视频点播 SDK 封装
│       ├── mad-microservice-oss/       # 对象存储
│       ├── mad-microservice-ucenter/   # 用户中心
│       ├── mad-microservice-statistics/# 统计
│       ├── mad-microservice-sysuser/   # 登录鉴权（8120）
│       └── mad-framework-*/            # 公共依赖
├── frontend/
│   ├── mad-admin/                # Vue2 后台管理（课程内容管理，9528）
│   └── mad-portal/               # Vue3 前台门户（学员端，9529）
├── sql/
│   ├── mad_edu.sql               #   课程库：讲师/课程/章节/课时/分类（含完整初始数据）
│   ├── mad_ucenter.sql           #   用户库
│   └── mad_statistics.sql        #   统计库
├── scripts/
│   ├── mad_data.py               # 统一数据源（讲师/课程/章节/来源）
│   ├── gen_mad_assets.py         # 资源生成器（前端 JS + 封面/头像 + SQL）
│   ├── start_backend.sh          # JDK17 兼容一键启动脚本
│   └── sync_to_github.py         # 仓库同步脚本
├── config/
│   └── mysql-dev-3307.example.cnf   # 独立 MySQL 实例（3307）示例配置
└── docs/
    ├── architecture.svg     # 架构图
    ├── 数据库说明.md          # 建库/导数据/驱动兼容性（MySQL 8/9）
    ├── 部署指南.md            # 本地部署步骤
    ├── 图表索引.md            # 全部图表导航
    ├── SDK配置.md            # 阿里云 VOD / OSS SDK 配置
    ├── 导图-*.svg            # 思维导图（架构/技术栈/功能模块）
    ├── drawio/               # 可编辑架构图（.drawio 源文件 + SVG 预览）
    └── edraw/                # 亿图原始课件图（.eddx）
```

## 🚀 快速开始

### 1. 前台门户（学员端）

```bash
cd frontend/mad-portal
npm install
npm run dev          # http://localhost:9529
```

### 2. 后台管理（课程管理）

```bash
cd frontend/mad-admin
npm install --legacy-peer-deps
NODE_OPTIONS=--openssl-legacy-provider npm run dev   # http://localhost:9528
```

> `NODE_OPTIONS=--openssl-legacy-provider` 是必需的：webpack 4 在 Node 17+ 的 OpenSSL 3 下会报
> `error:0308010C:digital envelope routines::unsupported`。

默认账号 `admin / admin`。

### 3. 后端微服务

```bash
# 需 JDK 8+（已在 JDK 17 上验证）与 MySQL（默认 3307 端口，库名 mad_edu）
mysql -u root -p -e "CREATE DATABASE mad_edu DEFAULT CHARACTER SET utf8mb4;
CREATE USER 'mad'@'%' IDENTIFIED BY 'mad';
GRANT ALL PRIVILEGES ON mad_edu.* TO 'mad'@'%';"
mysql -u mad -pmad mad_edu < sql/mad_edu.sql

cd backend/mad
mvn -pl mad-commonservice-eureka -am spring-boot:run   # 8220
mvn -pl mad-microservice-edu     -am spring-boot:run   # 8110
mvn -pl mad-microservice-sysuser -am spring-boot:run   # 8120
```

或直接使用内置脚本（已内置 JDK 17 所需的全部 `--add-opens`）：

```bash
bash scripts/start_backend.sh all
```

> ⚠️ MySQL 8/9 用户注意：项目已在 `mad-microservice-edu/pom.xml` 钉住
> `mysql-connector-java` 8.0.33（Spring Boot 2.0.7 默认解析的 5.1.47 连不上 MySQL 8+）。
> 详见 [docs/数据库说明.md](./docs/数据库说明.md)。
>
> ⚠️ JDK 17 用户注意：Spring Boot 2.0.7 依赖 CGLIB 与 JAXB（已被 JDK 11 移除），
> 需 `--add-opens java.base/java.lang=ALL-UNNAMED` 等参数，并补 `jaxb-api` / `jaxb-impl` /
> `javax.activation-api` / `istack-commons-runtime` 依赖，`scripts/start_backend.sh` 已处理。

详细的阿里云 **VOD / OSS SDK 配置**（AccessKey、地域、上传凭证）见 [docs/SDK配置.md](./docs/SDK配置.md)；完整部署步骤见 [docs/部署指南.md](./docs/部署指南.md)；图表（思维导图 / draw.io 可编辑架构图 / 亿图课件图）导航见 [docs/图表索引.md](./docs/图表索引.md)。

## 🎓 师资与课程

### 讲师（14 位 · 金融 / IT 双领域）

| 领域 | 讲师 |
| --- | --- |
| 金融投资 | 沃伦·巴菲特、查理·芒格、本杰明·格雷厄姆、罗伯特·席勒、瑞·达利欧、霍华德·马克斯、阿斯瓦特·达摩达兰、吉姆·西蒙斯 |
| IT 工程 | 杰夫·迪恩、布莱恩·克尼汉、詹姆斯·高斯林、安德烈·卡帕斯、埃里克·施密特、本·斯托伊卡 |

### 课程（16 门 · 三大方向）

| 方向 | 课程 |
| --- | --- |
| 金融投资 | 金融市场全景（耶鲁 ECON 252）、公司估值（Damodaran 实战）、价值投资（护城河思维）、财务报表分析、宏观经济与周期（达利欧的经济机器）、量化投资（西蒙斯体系） |
| IT 工程 | 算法与数据结构（MIT 6.006）、大规模系统架构（Berkeley FSDL）、数据库系统、Java 全栈开发、前端工程化（Vue3 + TS）、微服务与分布式、大数据与 Spark |
| 人工智能 | 计算机视觉深度学习（Stanford CS231n）、机器学习基础（吴恩达专项）、全栈 MLOps |

### 播放来源路由

前台播放器按 `edu_video.video_source_id` 前缀自动路由：

| 前缀 | 平台 | 嵌入方式 |
| --- | --- | --- |
| `YT:` | YouTube | `youtube.com/embed/videoseries?list={playlistId}&index={n}` |
| `BI:` | B 站 | `player.bilibili.com/player.html?bvid={bvid}&page={n}` |

## 🔑 后台内容管理与 SDK 配置

- **课程内容管理**：`mad-microservice-edu` 提供 `CourseAdminController` / `ChapterAdminController` / `TeacherAdminController` / `SubjectAdminController` / `VideoAdminController`，后台 `mad-admin` 通过统一 `R` 结果对象调用。
- **视频 SDK**：`mad-microservice-vod` 的 `AliyunVODSDKUtils` 初始化 `cn-shanghai` 客户端，`VideoAdminController` 暴露上传 / 删除 / 上传凭证接口，密钥来自 `application.properties` 的 `aliyun.vod.file.keyid/keysecret`。

## 📄 开源协议

[MIT](./LICENSE) © MAD网课系统 / ChinaOpenClaw
