# 谷粒学院 · 在线教学平台（Guli Academy）

> 一个开源的在线教育平台：支持**后台管理课程**（课程 / 讲师 / 章节 / 科目 / 视频），前台门户供学员浏览与学习，后端采用 Spring Cloud 微服务架构，视频能力基于**阿里云视频点播（VOD）SDK**。

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![架构](https://img.shields.io/badge/arch-Spring%20Cloud%20%2B%20Vue-brightgreen.svg)](./ARCHITECTURE.md)

---

## ✨ 特性

- **前后台分离**：Vue 3 前台门户（学员端）+ Vue 2 + ElementUI 后台管理（运营端）。
- **课程后台管理**：课程、讲师、章节、科目、视频关联的全套 CRUD，后台一键发布。
- **视频点播 SDK**：基于阿里云 VOD Java SDK 实现上传 / 删除 / 上传凭证刷新（`guli-microservice-vod`）。
- **微服务架构**：Eureka 注册中心 + 多微服务（edu / vod / oss / ucenter / statistics / sysuser）。
- **轻量演示后端**：`learn-center`（Node）实现与 edu 微服务一致的章节大纲契约，无需 MySQL 即可本地联调门户。
- **开放开源**：MIT 协议，文档与架构图齐备，开箱即读。

## 🧱 技术栈

| 层 | 技术 |
| --- | --- |
| 前台门户 | Vue 3.5 · Vite 5 · vue-router 4 |
| 后台管理 | Vue 2 · ElementUI · Axios · ECharts |
| 后端微服务 | Spring Boot · Spring Cloud · Eureka · MyBatis-Plus |
| 视频 / 存储 | 阿里云 VOD SDK · 阿里云 OSS |
| 数据 / 缓存 | MySQL · Redis |
| 演示后端 | Node.js（learn-center） |

## 🗺️ 系统架构

![架构图](./docs/architecture.svg)

分层说明与调用关系见 [ARCHITECTURE.md](./ARCHITECTURE.md)。

## 📁 目录结构

```
guli-academy/
├── backend/
│   ├── guli/                # Spring Cloud 微服务（父工程 + 各微服务）
│   │   ├── guli-commonservice-eureka/   # 注册中心
│   │   ├── guli-microservice-edu/       # 课程/讲师/章节/科目/视频关联
│   │   ├── guli-microservice-vod/       # 阿里云视频点播 SDK 封装
│   │   ├── guli-microservice-oss/       # 对象存储
│   │   ├── guli-microservice-ucenter/   # 用户中心
│   │   ├── guli-microservice-statistics/# 统计
│   │   ├── guli-microservice-sysuser/   # 登录鉴权
│   │   └── guli-framework-*/            # 公共依赖
│   └── learn-center/        # Node 演示后端（与 edu 同契约）
├── frontend/
│   ├── guli-admin/          # Vue2 后台管理（课程内容管理）
│   └── guli-portal/         # Vue3 前台门户（学员端）
└── docs/
    ├── architecture.svg     # 架构图
    ├── SDK配置.md            # 阿里云 VOD / OSS SDK 配置
    └── 部署指南.md           # 本地部署步骤
```

## 🚀 快速开始

### 1. 前台门户（学员端）

```bash
cd frontend/guli-portal
npm install
npm run dev          # http://localhost:9529
```

### 2. 后台管理（课程管理）

```bash
cd frontend/guli-admin
npm install --legacy-peer-deps
npm run dev          # http://localhost:9528
```

### 3. 后端微服务

```bash
# 需 JDK 8 + MySQL（默认 3307 端口，库名 guli_edu）
cd backend/guli
# 启动顺序：eureka -> 各微服务
mvn -pl guli-commonservice-eureka -am spring-boot:run
mvn -pl guli-microservice-edu -am spring-boot:run
mvn -pl guli-microservice-vod -am spring-boot:run
```

> 不想起 MySQL？用 `backend/learn-center` 的 Node 演示后端即可联调门户：
> `node backend/learn-center/server.mjs`（默认 8110），门户章节大纲走 `/edu/chapter/nested-list/{courseId}`。

详细的阿里云 **VOD / OSS SDK 配置**（AccessKey、地域、上传凭证）见 [docs/SDK配置.md](./docs/SDK配置.md)；完整部署步骤见 [docs/部署指南.md](./docs/部署指南.md)。

## 🔑 后台内容管理与 SDK 配置

- **课程内容管理**：`guli-microservice-edu` 提供 `CourseAdminController` / `ChapterAdminController` / `TeacherAdminController` / `SubjectAdminController`，后台 `guli-admin` 通过统一 `R` 结果对象调用。
- **视频 SDK**：`guli-microservice-vod` 的 `AliyunVODSDKUtils` 初始化 `cn-shanghai` 客户端，`VideoAdminController` 暴露上传 / 删除 / 上传凭证接口，密钥来自 `application.properties` 的 `aliyun.vod.file.keyid/keysecret`（参考 `06.资源/视频上传SDK` 与 `06.资源/工具类`）。

## 📄 开源协议

[MIT](./LICENSE) © 谷粒学院 / ATOMS
