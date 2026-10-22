// 文章数据（封面沿用 photo/article/0X.jpg）
export const articles = [
  {
    id: 1,
    title: '2026年IT行业就业趋势与学习路径建议',
    cover: '/photo/article/01.jpg',
    author: 'MAD网课系统教研',
    date: '2026-09-12',
    views: 3280,
    excerpt: '从大模型席卷到云原生普及，技术栈快速迭代。本文梳理后端、前端、数据三个方向的就业现状，并给出可落地的一年学习路线。',
    content:
      '过去一年，AI 辅助编程大幅提升了个人产能，但也抬高了企业对工程师综合素养的要求。\n\n后端方向，Java 依旧是招聘基本盘，Spring Boot + 微服务 + 云原生（K8s）成为标配；前端方向，Vue3 与 React 双雄并立，工程化与可视化能力愈发重要；数据方向，实时计算（Flink）与湖仓一体（Iceberg）需求旺盛。\n\n建议：先打牢一门语言与计算机基础，再用一个完整项目串联框架，最后补分布式与运维视野。'
  },
  {
    id: 2,
    title: '从零理解 JVM 内存模型与垃圾回收',
    cover: '/photo/article/02.jpg',
    author: '韩老师',
    date: '2026-08-28',
    views: 2156,
    excerpt: '堆、栈、方法区到底存了什么？GC 为什么会让服务偶发卡顿？用一张图讲清 JVM 内存与回收器选型。',
    content:
      'JVM 运行时数据区分为线程私有（程序计数器、虚拟机栈、本地方法栈）与线程共享（堆、方法区）。\n\n垃圾回收主要针对堆。分代假说下，年轻代用复制算法（Minor GC），老年代用标记-整理（Full GC）。G1 通过 Region 化把停顿可控，ZGC 则把停顿压缩到毫秒级。\n\n调优第一步永远是看懂 GC 日志，再谈参数。'
  },
  {
    id: 3,
    title: 'Vue3 Composition API 到底解决了什么问题',
    cover: '/photo/article/03.jpg',
    author: '陈老师',
    date: '2026-08-15',
    views: 4012,
    excerpt: 'Options API 在复杂组件里容易逻辑碎片化，Composition API 用函数把相关逻辑聚合，复用与类型推导都更顺手。',
    content:
      'Options API 把数据、方法、生命周期分散在不同选项里，组件一大就难以追踪一段逻辑的来龙去脉。\n\nComposition API 允许用 setup() 把同一业务的状态与行为写在一起，配合 composable 函数跨组件复用。配合 <script setup> 语法糖，模板与逻辑更紧凑，TS 推导也更自然。'
  },
  {
    id: 4,
    title: 'MySQL 索引为什么会失效？十个常见坑',
    cover: '/photo/article/04.jpg',
    author: '刘老师',
    date: '2026-07-30',
    views: 1877,
    excerpt: '最左前缀、隐式转换、函数包裹、模糊查询……这些写法会让索引悄悄失效，本文逐一拆解并给出改写方案。',
    content:
      '索引失效常见于：对列做函数运算、隐式类型转换、使用前导通配符 LIKE、违反最左前缀、or 连接非索引列等。\n\n定位手段是用 EXPLAIN 看 type 与 key 字段。改写原则：把计算移到等号右侧、保证联合索引顺序、必要时建覆盖索引。'
  },
  {
    id: 5,
    title: '半小时搞懂 RESTful API 设计规范',
    cover: '/photo/article/05.jpg',
    author: '宋老师',
    date: '2026-07-18',
    views: 2640,
    excerpt: '资源用名词、动作交给 HTTP 方法、状态码表达结果。一套清晰的 API 规范能省下团队一半的沟通成本。',
    content:
      'RESTful 强调资源导向：URL 用名词复数（/courses），增删改用 POST/DELETE/PUT，查询用 GET。\n\n版本放 URL 前缀或请求头；统一返回结构（code/message/data）；用 200/201/400/401/403/404/500 表达语义。文档优先用 OpenAPI。'
  },
  {
    id: 6,
    title: '分布式事务：从两阶段提交到最终一致',
    cover: '/photo/article/06.jpg',
    author: '刘老师',
    date: '2026-06-22',
    views: 1990,
    excerpt: '强一致的两阶段提交性能差，互联网更常用消息队列实现最终一致。本文对比主流方案的取舍。',
    content:
      '2PC 简单但同步阻塞、单点风险高；TCC 把事务拆为 try/confirm/cancel，适合核心资金链路。\n\n多数业务可用本地消息表 + MQ 实现最终一致：本地事务与消息入库同库，异步投递并保证幂等消费，牺牲强一致换取可用性与吞吐。'
  }
]

export const getArticle = (id) => articles.find((a) => a.id === Number(id))
