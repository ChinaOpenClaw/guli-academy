// 课程数据（镜像自原静态站 course.html / index.html 热门课程，封面沿用 photo/course/0X.jpg）
// bilibili 字段为真实 B 站教程 BV 号（尚硅谷等官方免费教程），学习中心按章节顺序映射为分 P 播放
export const courses = [
  {
    id: 1,
    title: '30天搞定Java核心技术',
    cover: '/photo/course/01.jpg',
    price: '免费',
    studyCount: 9634,
    category: 'Java',
    level: 'Java基础',
    teacherId: 1,
    bilibili: 'BV1Kb411W75N',
    intro:
      '系统讲解 Java 核心技术体系，从语法基础到面向对象、集合、IO、多线程、反射与泛型，30 天带你构建扎实的 Java 内功，配套大量手写代码与面试题。',
    chapters: [
      { name: '第一章 Java入门与环境搭建', videos: ['1-1 课程导学', '1-2 JDK安装与HelloWorld', '1-3 第一个程序的背后'] },
      { name: '第二章 面向对象编程', videos: ['2-1 类与对象', '2-2 封装继承多态', '2-3 抽象类与接口'] },
      { name: '第三章 集合与泛型', videos: ['3-1 List/Set/Map', '3-2 迭代器与泛型', '3-3 集合源码初探'] }
    ]
  },
  {
    id: 2,
    title: 'Linux集群教程',
    cover: '/photo/course/02.jpg',
    price: '免费',
    studyCount: 501,
    category: 'Linux',
    level: '运维',
    teacherId: 3,
    bilibili: 'BV1Sv411r7vd',
    intro: '从单台 Linux 到高可用集群，手把手搭建 LVS、Keepalived、Nginx 负载均衡与故障转移，掌握生产级集群运维核心技能。',
    chapters: [
      { name: '第一章 Linux基础', videos: ['1-1 常用命令', '1-2 权限与用户'] },
      { name: '第二章 集群原理', videos: ['2-1 LVS工作模式', '2-2 Keepalived高可用'] }
    ]
  },
  {
    id: 3,
    title: '互联网大厂高频重点面试题（第2季）',
    cover: '/photo/course/03.jpg',
    price: '免费',
    studyCount: 300,
    category: 'Java',
    level: 'JavaWeb',
    teacherId: 2,
    bilibili: 'BV18b411M7xz',
    intro: '汇总 BAT 等大厂高频面试题，覆盖 JVM、并发、Spring、分布式与算法，每题配套原理剖析与答题套路。',
    chapters: [
      { name: '第一章 JVM', videos: ['1-1 内存模型', '1-2 GC算法'] },
      { name: '第二章 并发', videos: ['2-1 线程池', '2-2 锁机制'] }
    ]
  },
  {
    id: 4,
    title: 'RBAC权限模型',
    cover: '/photo/course/04.jpg',
    price: '免费',
    studyCount: 256,
    category: 'Java',
    level: 'Spring4',
    teacherId: 8,
    bilibili: 'BV1AP411s7D7',
    intro: '深入讲解基于角色的访问控制（RBAC）设计，从数据库建模到 Spring Security / Shiro 落地，打通企业级权限方案。',
    chapters: [
      { name: '第一章 权限模型', videos: ['1-1 RBAC五张表', '1-2 菜单与按钮权限'] },
      { name: '第二章 框架落地', videos: ['2-1 Shiro集成', '2-2 动态过滤器'] }
    ]
  },
  {
    id: 5,
    title: 'SpringMVC',
    cover: '/photo/course/05.jpg',
    price: '免费',
    studyCount: 137,
    category: 'Java',
    level: 'Spring4',
    teacherId: 2,
    bilibili: 'BV1Ry4y1574R',
    intro: '从 DispatcherServlet 到注解驱动开发，完整掌握 SpringMVC 请求流程、参数绑定、拦截器与文件上传。',
    chapters: [
      { name: '第一章 入门', videos: ['1-1 第一个Controller', '1-2 注解映射'] },
      { name: '第二章 进阶', videos: ['2-1 拦截器', '2-2 异常处理'] }
    ]
  },
  {
    id: 6,
    title: '图解Java数据结构和算法',
    cover: '/photo/course/06.jpg',
    price: '免费',
    studyCount: 125,
    category: 'Java',
    level: 'Java基础',
    teacherId: 1,
    bilibili: 'BV1E4411H73v',
    intro: '用图解方式讲透数组、链表、栈、队列、树、图与常见排序查找算法，配大量动画与手绘，算法不再抽象。',
    chapters: [
      { name: '第一章 线性结构', videos: ['1-1 数组与链表', '1-2 栈和队列'] },
      { name: '第二章 树与图', videos: ['2-1 二叉树', '2-2 图的遍历'] }
    ]
  },
  {
    id: 7,
    title: 'IT人面试求职技巧',
    cover: '/photo/course/07.jpg',
    price: '免费',
    studyCount: 123,
    category: 'Java',
    level: 'JavaWeb',
    teacherId: 3,
    bilibili: 'BV18b411M7xz',
    intro: '简历怎么写、面试怎么说、薪资怎么谈。一线 HR 与架构师双视角，帮你避开求职路上的常见坑。',
    chapters: [
      { name: '第一章 简历', videos: ['1-1 简历结构', '1-2 项目描述'] },
      { name: '第二章 谈判', videos: ['2-1 薪资谈判', '2-2 Offer选择'] }
    ]
  },
  {
    id: 8,
    title: 'Java11新特性教程',
    cover: '/photo/course/08.jpg',
    price: '免费',
    studyCount: 34,
    category: 'Java',
    level: 'Java8',
    teacherId: 4,
    bilibili: 'BV1Dt411472L',
    intro: ' local variable type inference、HttpClient、模块化等 Java 11 核心新特性一网打尽，平滑升级你的 Java 版本。',
    chapters: [
      { name: '第一章 语法', videos: ['1-1 var关键字', '1-2 字符串增强'] },
      { name: '第二章 工具', videos: ['2-1 新HttpClient', '2-2 单文件源码'] }
    ]
  },
  {
    id: 9,
    title: 'Python全栈开发',
    cover: '/photo/course/09.jpg',
    price: '免费',
    studyCount: 882,
    category: 'Python',
    level: '基础',
    teacherId: 7,
    bilibili: 'BV1hW41197sB',
    intro: '从 Python 语法到 Django/Flask Web 开发、爬虫与数据分析，一条龙打通 Python 全栈能力。',
    chapters: [
      { name: '第一章 语法', videos: ['1-1 数据类型', '1-2 函数与装饰器'] },
      { name: '第二章 Web', videos: ['2-1 Flask入门', '2-2 RESTful API'] }
    ]
  },
  {
    id: 10,
    title: '大数据Hadoop实战',
    cover: '/photo/course/10.jpg',
    price: '免费',
    studyCount: 645,
    category: '大数据',
    level: '实战',
    teacherId: 6,
    bilibili: 'BV1Qp4y1n7EN',
    intro: '基于真实日志场景，搭建 Hadoop 集群，跑通 MapReduce + Hive + HBase 离线数仓全流程。',
    chapters: [
      { name: '第一章 集群', videos: ['1-1 HDFS原理', '1-2 YARN调度'] },
      { name: '第二章 计算', videos: ['2-1 MapReduce', '2-2 Hive SQL'] }
    ]
  },
  {
    id: 11,
    title: '前端Vue3从入门到实战',
    cover: '/photo/course/11.jpg',
    price: '免费',
    studyCount: 1532,
    category: 'H5前端',
    level: '前端',
    teacherId: 5,
    bilibili: 'BV1Za4y1r7KE',
    intro: 'Composition API、响应式原理、组件化与 Vue Router / Pinia，配套一个完整后台项目贯穿全程。',
    chapters: [
      { name: '第一章 基础', videos: ['1-1 响应式', '1-2 模板语法'] },
      { name: '第二章 工程化', videos: ['2-1 Vite', '2-2 路由与状态'] }
    ]
  },
  {
    id: 12,
    title: 'MySQL性能优化',
    cover: '/photo/course/12.jpg',
    price: '免费',
    studyCount: 421,
    category: '数据库',
    level: 'DBA',
    teacherId: 8,
    bilibili: 'BV1iq4y1u7vj',
    intro: '索引底层、执行计划、慢查询治理与分库分表，从原理到调优让 MySQL 飞起来。',
    chapters: [
      { name: '第一章 索引', videos: ['1-1 B+树', '1-2 最左前缀'] },
      { name: '第二章 调优', videos: ['2-1 执行计划', '2-2 慢查询'] }
    ]
  },
  {
    id: 13,
    title: 'AI 全能开发 · Vibe Coding 实战',
    cover: '/photo/course/13.jpg',
    price: '免费',
    studyCount: 2600,
    category: 'AI',
    level: 'AI开发',
    teacherId: 7,
    bilibili: 'BV1rv7A6oEeP',
    intro: '用自然语言写代码、用智能体搭系统。基于尚硅谷 LangChain 1.2 体系，从模型调用、工具封装到智能体与 RAG，完整掌握 AI 时代全栈开发范式。',
    chapters: [
      { name: '第一章 AI 工程基座', videos: ['1-1 模型调用与动态模型', '1-2 提示词模板与消息'] },
      { name: '第二章 工具与链', videos: ['2-1 Tool 工具封装', '2-2 Chain 与 LCEL'] },
      { name: '第三章 智能体与 RAG', videos: ['3-1 Agents 智能体', '3-2 RAG 知识库实战'] }
    ]
  },
  {
    id: 14,
    title: '智能体 Agent 工程实战',
    cover: '/photo/course/14.jpg',
    price: '免费',
    studyCount: 2100,
    category: 'AI',
    level: 'AI开发',
    teacherId: 8,
    bilibili: 'BV1HVFLzfEeS',
    intro: '围绕 LangGraph 工作流编排，掌握状态节点、条件跳转、循环与中断恢复，用多智能体协作承接复杂业务，配套企业级实战项目。',
    chapters: [
      { name: '第一章 Agent 基础', videos: ['1-1 智能体开发框架', '1-2 让 AI 自动干活'] },
      { name: '第二章 工作流编排', videos: ['2-1 LangGraph 状态机', '2-2 多 Agent 协作'] },
      { name: '第三章 平台落地', videos: ['3-1 Coze / Dify 低代码', '3-2 企业级项目练手'] }
    ]
  },
  {
    id: 15,
    title: 'RAG 应用开发实战',
    cover: '/photo/course/15.jpg',
    price: '免费',
    studyCount: 1900,
    category: 'AI',
    level: 'AI开发',
    teacherId: 7,
    bilibili: 'BV1otokBpENn',
    intro: '手把手搭建私有知识库：文档预处理、向量化、相似性检索、重排与增强生成，覆盖高级分块、多轮检索与 RAGAS 评测，彻底解决大模型幻觉。',
    chapters: [
      { name: '第一章 RAG 原理', videos: ['1-1 RAG 技术解析', '1-2 基本运行流程'] },
      { name: '第二章 知识库搭建', videos: ['2-1 高质量文本分块', '2-2 索引与召回'] },
      { name: '第三章 优化与实战', videos: ['3-1 重排与生成', '3-2 LangChain RAG 实战'] }
    ]
  },
  {
    id: 16,
    title: '大模型微调与私有化部署',
    cover: '/photo/course/16.jpg',
    price: '免费',
    studyCount: 1500,
    category: 'AI',
    level: 'AI开发',
    teacherId: 6,
    bilibili: 'BV1rv7A6oEeP',
    intro: '从 SFT / LoRA 微调到模型评测与私有化部署，把通用大模型变成懂你业务的专属模型，配套向量库与推理服务落地。',
    chapters: [
      { name: '第一章 微调基础', videos: ['1-1 SFT 与 LoRA', '1-2 训练数据准备'] },
      { name: '第二章 评测与部署', videos: ['2-1 模型评测', '2-2 私有化部署'] },
      { name: '第三章 工程集成', videos: ['3-1 向量库接入', '3-2 推理服务上线'] }
    ]
  }
]

export const categories = ['全部', 'Java', 'Python', '大数据', 'Linux', 'H5前端', '数据库', 'AI', 'Android', '直播课']
export const levels = ['全部', 'Java基础', 'Java8', 'JavaWeb', 'Spring4', 'Linux', 'Python', '大数据', 'H5前端', '数据库', 'AI开发']

export const getCourse = (id) => courses.find((c) => c.id === Number(id))
export const getCoursesByTeacher = (teacherId) => courses.filter((c) => c.teacherId === Number(teacherId))
