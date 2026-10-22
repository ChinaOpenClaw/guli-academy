// 问答数据
export const questions = [
  {
    id: 1,
    title: 'Java 中 String 为什么设计成不可变？',
    asker: '初学者小王',
    date: '2026-09-20',
    views: 540,
    content: '看书说 String 不可变，但不太理解这么设计的好处是什么，能通俗讲讲吗？',
    answers: [
      { author: '宋老师', text: '不可变带来三个好处：字符串常量池复用节省内存；天然线程安全，可自由共享；其 hash 值可缓存，适合做 HashMap 的 key。' },
      { author: '陈同学', text: '补充一点：类加载器也用 String 做类名，不可变能保证安全性，避免被篡改。' }
    ]
  },
  {
    id: 2,
    title: 'Vue3 和 Vue2 在响应式上有什么区别？',
    asker: '前端Lisa',
    date: '2026-09-15',
    views: 880,
    content: '听说 Vue3 用 Proxy 重写了响应式，相比 Vue2 的 Object.defineProperty 好在哪？',
    answers: [
      { author: '陈老师', text: 'defineProperty 只能劫持已有属性，对新增/删除属性需要 $set；Proxy 能代理整个对象，天然支持数组索引、动态属性，且无需递归初始化。' }
    ]
  },
  {
    id: 3,
    title: 'MySQL 深分页（limit 1000000,10）慢怎么优化？',
    asker: 'DBA老张',
    date: '2026-09-02',
    views: 712,
    content: '翻到很深的页时查询越来越慢，有什么常见的优化手段？',
    answers: [
      { author: '刘老师', text: '用"延迟关联"：先按索引拿到主键 id，再回表取数据（select * from t join (select id from t order by id limit 1000000,10) b using(id)）。或改用游标分页（where id>? order by id limit 10）。' }
    ]
  },
  {
    id: 4,
    title: '微服务之间怎么保证数据一致性？',
    asker: '架构师Mike',
    date: '2026-08-21',
    views: 603,
    content: '下单要扣库存、减余额，跨服务怎么保证要么都成功要么都回滚？',
    answers: [
      { author: '刘老师', text: '强一致可用 TCC/Saga；多数场景用"本地消息表 + MQ"做最终一致，保证幂等即可。先想清楚业务能否接受短暂不一致。' }
    ]
  },
  {
    id: 5,
    title: 'Hadoop 和 Spark 到底什么关系？',
    asker: '大数据萌新',
    date: '2026-08-10',
    views: 455,
    content: '总是搞混，它们是替代关系还是互补关系？',
    answers: [
      { author: '王老师', text: '互补。Hadoop 提供 HDFS 存储 + MapReduce 批计算；Spark 是更快的内存计算引擎，通常跑在 Hadoop 的 HDFS 之上，替代的是 MapReduce 而非 HDFS。' }
    ]
  }
]

export const getQuestion = (id) => questions.find((q) => q.id === Number(id))
