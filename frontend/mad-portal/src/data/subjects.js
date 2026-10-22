// MAD网课系统 · 课程分类树（与数据库 edu_subject 对应）
export const subjectTree = {
  "金融投资": ["价值投资", "宏观策略", "公司估值", "量化交易", "财务报表", "资产管理"],
  "IT工程": ["算法与数据结构", "系统设计", "数据库", "Java 生态", "前端工程", "分布式计算"],
  "人工智能": ["机器学习", "深度学习", "计算机视觉", "大模型工程", "全栈 MLOps"],
}

export const allSubjects = Object.entries(subjectTree).flatMap(([p, cs]) =>
  cs.map((c) => ({ parent: p, child: c }))
)
