// AI 知识案例（内容来源：尚硅谷 AI 全能开发 https://www.atguigu.com/aicoding/）
// 作为门户「知识案例」板块，展示 Vibe Coding / 智能体(Agent) 真实行业项目与技术方案
export const aiCaseOverview = {
  title: 'AI 全能开发 · Vibe Coding & 智能体',
  subtitle: '用自然语言写代码、用智能体搭系统 —— AI 时代的全栈开发范式',
  salary: '15K - 80K',
  highlight: '10v1 就业陪跑 · 全免费教程资料',
  tags: ['Vibe Coding', '智能体 Agent', 'RAG', '大模型微调', '多智能体协作', 'AI 低代码平台'],
  desc:
    'AI 全能开发 = Vibe Coding（氛围编程）+ 智能体（Agent）工程。开发者用自然语言描述需求，由大模型与智能体完成编码、调试与系统搭建；复杂业务则由多智能体协作编排完成。尚硅谷将这一范式拆解为 10 个阶段、19 个真实项目，覆盖从 Python 基础到就业冲刺的完整链路。'
}

// 10 阶段课程大纲
export const aiStages = [
  { no: 1, name: 'Python 核心基础', desc: '语法、数据结构、函数式与面向对象，为 AI 工程打底。' },
  { no: 2, name: 'AI 应用工程基座', desc: '大模型 API、Prompt 工程、向量数据库与 Agent 框架基础。' },
  { no: 3, name: '智能体架构与工程落地', desc: '单智能体规划-记忆-工具调用，打通第一个可用 Agent。' },
  { no: 4, name: 'RAG 应用开发实战', desc: '检索增强生成：切片、向量化、召回与重排的工程细节。' },
  { no: 5, name: '智能体全栈技术', desc: '前后端打通，把 Agent 封装为可交互的产品。' },
  { no: 6, name: '大模型高阶项目与微调', desc: 'SFT / LoRA 微调、模型评测与私有化部署。' },
  { no: 7, name: '多智能体高阶实战', desc: '多 Agent 协作、任务编排与状态机，承接复杂业务。' },
  { no: 8, name: 'AI 低代码平台', desc: '可视化编排 Agent 工作流，降低落地门槛。' },
  { no: 9, name: 'Vibe Coding 综合项目实战', desc: '用自然语言驱动完成端到端项目，沉淀工程方法论。' },
  { no: 10, name: '就业冲刺', desc: '简历、面试、项目复盘与 10v1 陪跑，直达offer。' }
]

// 19 个项目库（节选核心 17 个，持续扩充）
export const aiProjects = [
  { id: 1, name: '掌柜智库', cat: 'RAG 知识库', tech: ['LangGraph', 'MinerU+OCR', 'Milvus', '稀疏检索', '高级切片', 'HyDE', 'BGE-Rerank', 'RAGAS'], desc: '面向企业的 RAG 知识库：文档解析→切片→向量召回→重排→生成，并用 RAGAS 做质量评测。', featured: true },
  { id: 2, name: '智能体中台', cat: 'Agent 平台', tech: ['Agent', '编排引擎', '工具市场'], desc: '统一纳管智能体的中台，支持注册、编排与多租户调用。' },
  { id: 3, name: '电商小二', cat: '行业 Agent', tech: ['RAG', '业务 API', '对话'], desc: '电商场景智能客服与导购，承接售前售后全流程。' },
  { id: 4, name: '智数归因平台', cat: '数据分析', tech: ['LLM', 'SQL Agent', '归因'], desc: '用自然语言问数，自动归因业务波动。' },
  { id: 5, name: '舆情分析', cat: 'NLP', tech: ['爬虫', '情感分析', '摘要'], desc: '全网舆情采集、情感判别与态势摘要。' },
  { id: 6, name: '市场罗盘', cat: '数据分析', tech: ['LLM', '可视化'], desc: '市场情报聚合与竞品洞察仪表盘。' },
  { id: 7, name: '工程调研助手', cat: '研发提效', tech: ['RAG', '代码检索'], desc: '面向研发的知识检索与方案调研助手。' },
  { id: 8, name: '电商运营助手', cat: '行业 Agent', tech: ['Agent', '工作流'], desc: '电商运营自动化：选品、文案、活动编排。' },
  { id: 9, name: 'RAG 知识库实战', cat: 'RAG', tech: ['向量库', '重排'], desc: '通用 RAG 知识库模板，可快速复用到垂直领域。' },
  { id: 10, name: '智能客服实战', cat: '对话', tech: ['对话管理', 'RAG'], desc: '高并发智能客服，含意图识别与转人工。' },
  { id: 11, name: '模型微调实战', cat: '微调', tech: ['SFT', 'LoRA', '评测'], desc: '基于业务数据做模型微调与效果评测。' },
  { id: 12, name: '全栈项目实战', cat: '全栈', tech: ['Vue', '后端', 'Agent'], desc: '从前端到后端的 Agent 应用全栈落地。' },
  { id: 13, name: '商城风控', cat: '风控', tech: ['规则引擎', '模型'], desc: '电商交易风控，识别刷单与欺诈。' },
  { id: 14, name: '万应助手', cat: '通用 Agent', tech: ['工具调用', '规划'], desc: '通用任务助手，可调用多类工具完成跨系统任务。' },
  { id: 15, name: '自动漏洞挖掘', cat: '安全', tech: ['代码分析', 'LLM'], desc: '结合代码分析做大模型辅助漏洞挖掘。' },
  { id: 16, name: 'ETL-Agent', cat: '数据工程', tech: ['Agent', '数据管道'], desc: '用智能体编排数据抽取、转换与加载。' },
  { id: 17, name: '合同审批助手', cat: '办公', tech: ['RAG', 'OCR', '合规'], desc: '合同智能审阅与风险条款标注。' }
]

// 重点案例详解：掌柜智库 RAG 技术栈
export const aiFeaturedCase = {
  name: '掌柜智库 · RAG 知识库',
  summary:
    '掌柜智库是 AI 全能开发路线中的标杆 RAG 项目：把企业散落的文档、PDF、网页统一解析为结构化知识，经高级切片与向量化后入库，检索阶段融合「稠密向量 + 稀疏检索 + HyDE」三重召回，再用 BGE-Rerank 重排，最终交由大模型生成可信答案，并持续用 RAGAS 做质量评测与迭代。',
  flow: [
    '文档解析：MinerU + OCR 把 PDF / 扫描件转为结构化 Markdown',
    '高级切片：按语义切分，保留标题层级与表格结构',
    '三重召回：稠密向量（Milvus）+ 稀疏检索（BM25）+ HyDE 假设向量',
    '重排：BGE-Rerank 对候选段落精排，提升相关性',
    '生成：LangGraph 编排检索-生成链路，输出带引用的答案',
    '评测：RAGAS 评估忠实度 / 相关性，闭环优化'
  ],
  stack: ['LangGraph', 'MinerU+OCR', 'Milvus', '稀疏检索', '高级切片', 'HyDE', 'BGE-Rerank', 'RAGAS']
}

export const aiSourceUrl = 'https://www.atguigu.com/aicoding/'
