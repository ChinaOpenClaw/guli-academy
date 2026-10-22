// MAD网课系统 · 课程数据（真实 YouTube / B 站 公开课）
// source: { type: 'youtube' | 'bilibili', playlistId | bvid, label }
// 全部播放源均已核验存在；章节标题按真实课程大纲整理。
import { subjectTree } from './subjects'

export const courses = [
  {
    id: 1,
    title: "金融市场全景：耶鲁 ECON 252",
    cover: "/photo/course/01.jpg",
    price: "免费",
    studyCount: 8634,
    category: "金融投资",
    level: "宏观策略",
    teacherId: 4,
    source: {
      type: "youtube",
      playlistId: "PL8FB14A2200B87185",
      label: "Yale Courses 官方播放列表 · 23 讲全片"
    },
    intro: "耶鲁大学 Robert Shiller 名下的经典经济学公开课，23 讲完整覆盖金融市场的本质、风险与收益、行为金融学、衍生品定价与金融危机的形成机制。席勒用「市场先生」寓言和大量真实数据把抽象的金融理论讲得清晰可感，是理解现代金融体系的最佳第一课。",
    chapters: [
      {
        name: "第一章 金融市场的功能与风险",
        videos: [
          "第1讲 课程导论与金融市场的角色",
          "第2讲 保险、风险管理与衍生品市场",
          "第3讲 套利与一价定律",
          "第4讲 证券组合分散化、风险与收益",
          "第5讲 CAPM 与证券市场线",
        ]
      },
      {
        name: "第二章 行为金融学与市场有效性",
        videos: [
          "第6讲 行为金融学导论",
          "第7讲 有效市场假说与行为金融",
          "第8讲 套利与市场有效性检验",
          "第9讲 行为金融学案例与投资者心理",
          "第10讲 泡沫与叙事经济学",
        ]
      },
      {
        name: "第三章 固定收益、期货与期权",
        videos: [
          "第11讲 债券与利率结构",
          "第12讲 期货市场与套期保值",
          "第13讲 股票期权与看涨看跌期权",
          "第14讲 隐含波动率与波动率微笑",
          "第15讲 金融创新的机会与陷阱",
        ]
      },
      {
        name: "第四章 金融危机的剖析",
        videos: [
          "第16讲 次贷危机与金融创新失控",
          "第17讲 银行体系与金融危机",
          "第18讲 证券价格泡沫案例",
          "第19讲 金融危机的应对与政策",
          "第20讲 金融市场的未来与监管",
        ]
      },
      {
        name: "第五章 财富管理与长期配置",
        videos: [
          "第21讲 家庭资产配置实务",
          "第22讲 长期投资与指数化",
          "第23讲 全球宏观格局与课程总结",
        ]
      },
    ]
  },
  {
    id: 2,
    title: "公司估值：达摩达兰股权估值实战",
    cover: "/photo/course/02.jpg",
    price: "免费",
    studyCount: 6218,
    category: "金融投资",
    level: "公司估值",
    teacherId: 7,
    source: {
      type: "youtube",
      playlistId: "PLUkh9m2BorqkgpNyRpP-NL3BS4yvFabXk",
      label: "NYU Stern 达摩达兰估值课 · 26 场次公开录像"
    },
    intro: "纽约大学斯特恩商学院 Aswath Damodaran 教授的完整股权估值课程，从「估值为何重要」讲到内在价值、相对估值、私募公司估值、实物期权与价值提升五大板块，每一场都配可下载的讲义与电子表格。适合想把「感觉贵不贵」变成可计算结论的所有人。",
    chapters: [
      {
        name: "第一章 估值的思想前提",
        videos: [
          "第1场 估值前的立场与偏见",
          "第2场 估值偏误的自我检测",
          "第3场 现金流一致性：核心命题",
          "第4场 无风险利率的估算与国别风险",
          "第5场 隐含股权风险溢价的推导",
          "第6场 风险与贝塔的度量",
        ]
      },
      {
        name: "第二章 内在价值：DCF 模型",
        videos: [
          "第7场 现金流贴现模型整体框架",
          "第8场 收入与利润的归一化",
          "第9场 无杠杆现金流与再投资",
          "第10场 终值假设与衰退期设定",
          "第11场 折现率构建与调整",
          "第12场 敏感度分析与情景法",
        ]
      },
      {
        name: "第三章 相对估值与可比公司",
        videos: [
          "第13场 可比公司与可比交易的选择",
          "第14场 乘数法：PE、PB、EV/Sales",
          "第15场 行业调整与数据源",
          "第16场 相对估值的偏差修正",
        ]
      },
      {
        name: "第四章 私募公司估值",
        videos: [
          "第17场 私募公司的估值难点",
          "第18场 情景法与概率加权",
          "第19场 剩余收益模型初探",
        ]
      },
      {
        name: "第五章 实物期权与价值提升",
        videos: [
          "第20场 实物期权思维入门",
          "第21场 期权思维在扩张决策中的应用",
          "第22场 收购与价值提升路径",
        ]
      },
      {
        name: "第六章 结论与作业",
        videos: [
          "第23场 估值案例复盘",
          "第24场 常见估值错误清单",
          "第25场 课堂答疑与作业讲解",
          "第26场 课程总结与后续学习路径",
        ]
      },
    ]
  },
  {
    id: 3,
    title: "价值投资：巴菲特与芒格的护城河思维",
    cover: "/photo/course/03.jpg",
    price: "免费",
    studyCount: 12480,
    category: "金融投资",
    level: "价值投资",
    teacherId: 1,
    source: {
      type: "bilibili",
      bvid: "BV1qK4y1p7wG",
      label: "B 站巴菲特与芒格访谈合集 · 24 集"
    },
    intro: "汇集巴菲特与查理·芒格历年访谈与股东大会精华 24 集，从「能力圈」「护城河」「安全边际」到「集中投资」与「持有期限」，完整呈现价值投资的方法论骨架。适合想建立自己的投资决策框架、而不是靠消息选股的读者。",
    chapters: [
      {
        name: "第一章 投资智慧总纲",
        videos: [
          "第1集 投资并不需要高智商",
          "第2集 认清自己的能力圈",
          "第3集 股市中人可以有多疯狂",
          "第4集 投资的6大原则",
        ]
      },
      {
        name: "第二章 风险与价值",
        videos: [
          "第5集 危险的投机游戏",
          "第6集 拥抱波动和风险",
          "第7集 多年投资策略和心得分享",
          "第8集 最好的投资就是投资自己",
          "第9集 预测市场是在浪费时间",
        ]
      },
      {
        name: "第三章 组合与卖出",
        videos: [
          "第10集 分散投资是无知的表现",
          "第11集 何时卖出股票",
          "第12集 市盈率多少合理",
          "第13集 诠释护城河理论",
        ]
      },
      {
        name: "第四章 长期主义与箴言",
        videos: [
          "第14集 2020年3月访谈",
          "第15集 2019巴菲特股东大会",
          "第16集 CCTV巴菲特专访",
          "第17集 走向成功的10句箴言",
          "第18集 巴菲特年轻时首次电视采访",
        ]
      },
      {
        name: "第五章 巴菲特与芒格对话",
        videos: [
          "第19集 CCTV对话：沃伦巴菲特和查理芒格",
          "第20集 巴菲特1998年佛罗里达大学演讲",
          "第21集 财富大亨巴菲特人生传记",
        ]
      },
    ]
  },
  {
    id: 4,
    title: "财务报表分析：读懂一家公司的三张表",
    cover: "/photo/course/04.jpg",
    price: "免费",
    studyCount: 5392,
    category: "金融投资",
    level: "财务报表",
    teacherId: 3,
    source: {
      type: "bilibili",
      bvid: "BV1154y1M7ii",
      label: "对外经贸大学张新民教授公开课 · 全 32 讲"
    },
    intro: "对外经济贸易大学张新民教授的《财务报表分析》必修课全 32 讲，从「财报对老板和高管很重要」讲到如何从利润表、资产负债表、现金流量表交叉验证企业的真实盈利能力，配套长安汽车等真实案例拆解。",
    chapters: [
      {
        name: "第一章 财报阅读的基本功",
        videos: [
          "第1讲 财报对老板和高管很重要",
          "第2讲 千万不要对下属说财报我看不懂",
          "第3讲 看财务报表做决策",
          "第4讲 如何在极短时间内通过报表看透企业",
          "第5讲 重资产与轻资产在报表中如何体现",
          "第6讲 谁在支持企业发展所需资源",
          "第8讲 企业的钱从哪来",
        ]
      },
      {
        name: "第二章 利润与现金的玄妙",
        videos: [
          "第9讲 为什么企业有利润却没有钱",
          "第10讲 挑选股东那点事儿",
          "第11讲 怎样看待固定资产结构与规模",
          "第12讲 企业无形资产的变化与财务效应",
          "第13讲 如何从财报看企业的两头吃能力",
          "第14讲 存货多点好还是少点好",
          "第15讲 为什么账上有钱还贷款",
        ]
      },
      {
        name: "第三章 负债、治理与经营分析",
        videos: [
          "第16讲 别被流动比率给忽悠了",
          "第17讲 高资产负债率真的可怕吗",
          "第18讲 治理特征如何决定企业未来的发展方向",
          "第19讲 净利润的构成与玄妙",
          "第20讲 长安汽车400亿利润却没有盈利能力的原因",
          "第21讲 从企业的营业收入你能看到什么",
          "第22讲 毛利与毛利率的极端重要性",
        ]
      },
      {
        name: "第四章 费用、战略与结论",
        videos: [
          "第23讲 销售费用与销售费用率背后的故事",
          "第24讲 什么决定了企业间差异",
          "第25讲 研发费用与研发费用率",
          "第26讲 利息费用是谁的业绩",
          "第27讲 利润表分析总结",
          "第28讲 现金流量与现金流动的区别",
        ]
      },
      {
        name: "第五章 从报表认识企业",
        videos: [
          "第29讲 结构与企业发展之路",
          "第30讲 从报表看企业的盈利能力与现金能力",
          "第31讲 战略执行与竞争力",
          "第32讲 如何通过财务报表认识企业",
        ]
      },
    ]
  },
  {
    id: 5,
    title: "宏观经济与周期：达利欧的经济机器",
    cover: "/photo/course/05.jpg",
    price: "免费",
    studyCount: 7821,
    category: "金融投资",
    level: "资产管理",
    teacherId: 5,
    source: {
      type: "bilibili",
      bvid: "BV1KT41137GV",
      label: "B 站瑞·达利欧投资智慧合集 · 42 集"
    },
    intro: "桥水基金创始人瑞·达利欧的 42 集投资智慧合集，以《经济机器是如何运转的》开篇，系统讲解信用创造、债务周期、央行政策、黄金与货币秩序，以及他创立并写入《原则》的方法论体系。",
    chapters: [
      {
        name: "第一章 经济机器如何运转",
        videos: [
          "第1集 经济机器是怎样运行的",
          "第2集 瑞达利欧TED演讲2017",
          "第3集 对人生大问题的最新思考",
          "第4集 现金仍是垃圾，资产需要多元化",
          "第5集 关于成功原则的访谈",
          "第6集 达利奥讲述原则",
        ]
      },
      {
        name: "第二章 宏观经济与周期",
        videos: [
          "第7集 达利欧谈宏观经济与投资",
          "第8集 新冠疫情对全球经济意味着什么",
          "第10集 达利欧谈资本主义需要改革",
          "第20集 学习历史战胜股市",
          "第21集 达利欧演讲2020",
          "第22集 投资与经济机器",
        ]
      },
      {
        name: "第三章 原则体系",
        videos: [
          "第9集 《原则》绘本版线上发布会访谈",
          "第11集 达利欧谈《原则》：工作与生活（上）",
          "第12集 达利欧谈《原则》：工作与生活（下）",
          "第13集 《成功的原则》动画版",
          "第14集 分享操盘经历",
          "第19集 极度开放的工作原则",
        ]
      },
      {
        name: "第四章 资产配置与投资方法",
        videos: [
          "第17集 如何获得财务上的成功",
          "第23集 桥水基金的企业文化",
          "第28集 追寻全球经济的真相",
          "第29集 桥水基金的实践",
          "第30集 使用流程来决定投资",
          "第34集 投资理念",
          "第35集 达利欧给千禧一代的3个投资建议",
        ]
      },
      {
        name: "第五章 全球格局与人生智慧",
        videos: [
          "第24集 达利欧回忆第一次来中国",
          "第27集 对话前美联储主席保罗沃克尔",
          "第31集 教你人生不同阶段（上）",
          "第32集 教你人生不同阶段（下）",
          "第36集 达利欧预测2020年的危机",
          "第38集 达利欧谈中国的巨大变迁与发展潜力",
          "第41集 达利欧谈世界格局变迁",
          "第42集 达利欧对话红杉资本沈南鹏",
        ]
      },
    ]
  },
  {
    id: 6,
    title: "量化投资：西蒙斯体系的统计与因子方法",
    cover: "/photo/course/06.jpg",
    price: "免费",
    studyCount: 4160,
    category: "金融投资",
    level: "量化交易",
    teacherId: 8,
    source: {
      type: "youtube",
      playlistId: "PLRFLF1OxMm_UL7WUWM31iynp0jMVf_vLW",
      label: "Quantopian 公开课系列 · 56 讲"
    },
    intro: "Quantopian 公开的 56 讲量化投资课程，从 Python 工具链、统计推断一路讲到因子模型、风险约束组合优化、VaR/CVaR、协整与配对交易、期货与多因子实盘复盘。是被量化圈公认为最系统的入门到进阶路线。",
    chapters: [
      {
        name: "第一章 研究与工具链",
        videos: [
          "第1讲 研究导论",
          "第2讲 Python 导论",
          "第3讲 NumPy 导论",
          "第4讲 pandas 导论",
          "第5讲 绘图与数据呈现",
        ]
      },
      {
        name: "第二章 统计与回归",
        videos: [
          "第6讲 均值",
          "第7讲 方差",
          "第8讲 统计矩",
          "第9讲 线性相关分析",
          "第10讲 估计量不稳定性",
          "第11讲 随机变量",
          "第12讲 线性回归",
          "第13讲 最大似然估计",
        ]
      },
      {
        name: "第三章 模型风险与检验",
        videos: [
          "第14讲 回归模型不稳定性",
          "第15讲 神经网络训练",
          "第16讲 模型设定错误",
          "第17讲 残差分析",
          "第18讲 过拟合的危险",
          "第19讲 假设检验",
          "第20讲 置信区间",
          "第21讲 p-Hacking 与多重比较偏差",
        ]
      },
      {
        name: "第四章 风险与组合构建",
        videos: [
          "第22讲 Spearman 秩相关",
          "第23讲 杠杆",
          "第24讲 头寸集中度风险",
          "第25讲 估计协方差矩阵",
          "第26讲 成交量、滑点与流动性",
          "第27讲 市场冲击模型",
          "第28讲 股票池筛选",
          "第29讲 CAPM 与 APT",
          "第30讲 Beta 对冲与因子风险",
        ]
      },
      {
        name: "第五章 组合优化与因子分析",
        videos: [
          "第31讲 组合分析",
          "第32讲 因子风险暴露",
          "第33讲 风险约束的组合优化",
          "第34讲 主成分分析",
          "第35讲 多空股票",
          "第36讲 多空股票算法示例",
          "第37讲 Alphalens 因子分析",
          "第38讲 对冲 Beta 与行业暴露",
        ]
      },
      {
        name: "第六章 VaR、时间序列与期货",
        videos: [
          "第39讲 VaR 与 CVaR",
          "第40讲 协整与平稳性",
          "第41讲 配对交易导论",
          "第42讲 配对交易算法示例",
          "第43讲 自相关与 AR 模型",
          "第44讲 ARCH、GARCH 与 GMM",
          "第45讲 卡尔曼滤波",
          "第46讲 期货导论",
          "第47讲 期货交易考量",
          "第48讲 期货均值回复",
        ]
      },
      {
        name: "第七章 因子案例复盘",
        videos: [
          "第49讲 传统价值因子案例研究",
          "第50讲 ETF 对比案例研究",
        ]
      },
    ]
  },
  {
    id: 7,
    title: "算法与数据结构：MIT 6.006 全套精讲",
    cover: "/photo/course/07.jpg",
    price: "免费",
    studyCount: 10385,
    category: "IT工程",
    level: "算法与数据结构",
    teacherId: 10,
    source: {
      type: "youtube",
      playlistId: "PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb",
      label: "MIT OCW 6.006 官方播放列表 · 24 讲 + 习题课"
    },
    intro: "MIT 6.006《算法导论》官方课程完整播放列表，24 讲正课覆盖排序、哈希、BFS/DFS、最短路、动态规划与复杂度分析，并附 14 节习题讲解课。算法工程师与后端面试准备者的标准教材级训练。",
    chapters: [
      {
        name: "第一章 算法思维与分析框架",
        videos: [
          "Lecture 1 算法思维与峰值查找",
          "Lecture 2 计算模型与文档距离",
          "Lecture 3 插入排序与归并排序",
          "Lecture 4 堆与堆排序",
          "Lecture 5 二叉搜索树与 BST 排序",
          "Lecture 6 AVL 树与 AVL 排序",
        ]
      },
      {
        name: "第二章 线性排序与哈希",
        videos: [
          "Lecture 7 计数排序与基数排序",
          "Lecture 8 排序的下界",
          "Lecture 9 链地址法哈希",
          "Lecture 10 开放地址法与加密哈希",
        ]
      },
      {
        name: "第三章 整数运算与图遍历",
        videos: [
          "Lecture 11 整数运算与 Karatsuba 乘法",
          "Lecture 12 平方根与牛顿法",
          "Lecture 13 广度优先搜索 BFS",
          "Lecture 14 深度优先搜索与拓扑排序",
        ]
      },
      {
        name: "第四章 最短路径",
        videos: [
          "Lecture 15 单源最短路径问题",
          "Lecture 16 Dijkstra 算法",
          "Lecture 17 Bellman-Ford 算法",
          "Lecture 18 加速 Dijkstra",
        ]
      },
      {
        name: "第五章 动态规划",
        videos: [
          "Lecture 19 动态规划 I：斐波那契与最短路径",
          "Lecture 20 动态规划 II：文本对齐与 21 点",
          "Lecture 21 动态规划 III：括号化、编辑距离与背包",
          "Lecture 22 动态规划 IV：吉他指法与俄罗斯方块",
        ]
      },
      {
        name: "第六章 复杂度与研究前沿",
        videos: [
          "Lecture 23 计算复杂度",
          "Lecture 24 算法研究中的前沿话题",
        ]
      },
    ]
  },
  {
    id: 8,
    title: "大规模系统架构：Google 的工程方法论",
    cover: "/photo/course/08.jpg",
    price: "免费",
    studyCount: 7288,
    category: "IT工程",
    level: "系统设计",
    teacherId: 9,
    source: {
      type: "youtube",
      playlistId: "PL1T8fO7ArWleMMI8KPJ_5D5XSlovTW_Ur",
      label: "UC Berkeley Full Stack Deep Learning 2022 · 9 讲 + 8 实验"
    },
    intro: "伯克利 Full Stack Deep Learning 课程 2022 版完整录像，9 讲覆盖课程愿景、开发基础设施、测试排障、数据管理、模型部署、持续学习、基础大模型、团队管理与伦理，配套 8 个动手实验。这是把模型变成产品的唯一系统化路径。",
    chapters: [
      {
        name: "第一章 课程愿景与工程基础设施",
        videos: [
          "Lecture 1 课程愿景与何时该用机器学习",
          "Lecture 2 开发基础设施与工具链",
          "Lab 04 实验管理实战",
        ]
      },
      {
        name: "第二章 测试与排障",
        videos: [
          "Lecture 3 故障排查与测试策略",
          "Lab 05 排障与测试实战",
        ]
      },
      {
        name: "第三章 数据管理与标注",
        videos: [
          "Lecture 4 数据管理：采集、存储、标注与版本化",
          "Lab 06 数据标注实战",
        ]
      },
      {
        name: "第四章 部署与持续学习",
        videos: [
          "Lecture 5 模型部署与 Web 服务化",
          "Lab 07 Web 部署实战",
          "Lecture 6 持续学习与线上监控",
          "Lab 08 模型监控实战",
        ]
      },
      {
        name: "第五章 基础模型与团队",
        videos: [
          "Lecture 7 基础大模型：GPT、CLIP、Stable Diffusion",
          "Lecture 8 机器学习团队与项目管理",
          "Lecture 9 技术伦理与 AI 伦理",
        ]
      },
    ]
  },
  {
    id: 9,
    title: "数据库系统：Berkeley CS186 深入原理",
    cover: "/photo/course/09.jpg",
    price: "免费",
    studyCount: 5941,
    category: "IT工程",
    level: "数据库",
    teacherId: 14,
    source: {
      type: "bilibili",
      bvid: "BV1iq4y1u7vj",
      label: "B 站 MySQL 全系列教程 · 199 集"
    },
    intro: "以 Berkeley CS186 数据库系统课的方法论为主线，配合 B 站 199 集 MySQL 全系列实战教程，从关系模型、SQL 执行计划、B+ 树索引、事务隔离、MVCC 一路讲到主从复制与分库分表，理论与工程双线并进。",
    chapters: [
      {
        name: "第一章 关系模型与 SQL 基础",
        videos: [
          "1-1 数据库发展史与关系模型",
          "1-2 关系代数与规范化",
          "1-3 SQL 基础查询语法",
          "1-4 聚合、连接与子查询",
        ]
      },
      {
        name: "第二章 存储引擎与索引",
        videos: [
          "2-1 InnoDB 存储结构与页布局",
          "2-2 B+ 树索引原理",
          "2-3 聚簇索引与二级索引",
          "2-4 联合索引与最左前缀",
          "2-5 覆盖索引与回表",
        ]
      },
      {
        name: "第三章 执行计划与优化器",
        videos: [
          "3-1 explain 执行计划详解",
          "3-2 优化器与代价模型",
          "3-3 索引失效的十种场景",
          "3-4 SQL 调优实战",
        ]
      },
      {
        name: "第四章 事务与并发控制",
        videos: [
          "4-1 事务四大特性 ACID",
          "4-2 隔离级别与并发问题",
          "4-3 MVCC 多版本并发控制",
          "4-4 锁机制与间隙锁",
          "4-5 死锁排查与处理",
        ]
      },
      {
        name: "第五章 高可用与运维",
        videos: [
          "5-1 主从复制原理与搭建",
          "5-2 分库分表方案设计",
          "5-3 慢查询日志与性能剖析",
          "5-4 数据备份与恢复演练",
        ]
      },
    ]
  },
  {
    id: 10,
    title: "Java 全栈开发：从语言核心到微服务",
    cover: "/photo/course/10.jpg",
    price: "免费",
    studyCount: 15620,
    category: "IT工程",
    level: "Java 生态",
    teacherId: 11,
    source: {
      type: "bilibili",
      bvid: "BV1Kb411W75N",
      label: "B 站 Java 基础全集 · 716 集"
    },
    intro: "以 Java 之父高斯林所奠定的语言设计哲学为线索，配套 B 站 716 集 Java 基础全集，系统讲解语法基础、面向对象、集合、IO、多线程、反射与泛型，为后续的 Spring 微服务与高并发打下地基。",
    chapters: [
      {
        name: "第一章 编程入门与计算机基础",
        videos: [
          "1-1 编程入门与资料结构",
          "1-2 冯诺依曼体系结构",
          "1-3 CPU 与 IT 行业三大定律",
          "1-4 持久化存储设备",
          "1-5 bit 与 byte",
          "1-6 内存与 IO 设备",
          "1-7 万维网与软件架构方式",
        ]
      },
      {
        name: "第二章 Java 语言概述",
        videos: [
          "2-1 Java 语言概述与基础阶段大纲",
          "2-2 Java 主要应用场景",
          "2-3 Java 基础图谱与项目说明",
        ]
      },
      {
        name: "第三章 基础语法与流程控制",
        videos: [
          "3-1 变量与数据类型",
          "3-2 运算符与表达式",
          "3-3 流程控制语句",
          "3-4 数组与常见算法",
        ]
      },
      {
        name: "第四章 面向对象核心",
        videos: [
          "4-1 类与对象",
          "4-2 封装、继承与多态",
          "4-3 抽象类与接口",
          "4-4 异常处理机制",
        ]
      },
      {
        name: "第五章 常用 API 与 IO",
        videos: [
          "5-1 String 与包装类",
          "5-2 集合框架体系",
          "5-3 泛型与增强 for",
          "5-4 IO 流与文件操作",
          "5-5 常用日期时间 API",
        ]
      },
      {
        name: "第六章 并发与进阶特性",
        videos: [
          "6-1 线程与线程安全",
          "6-2 同步机制与锁",
          "6-3 线程池与并发工具类",
          "6-4 反射与注解",
          "6-5 JDK 新特性纵览",
        ]
      },
    ]
  },
  {
    id: 11,
    title: "前端工程化：Vue3 + TypeScript 实战",
    cover: "/photo/course/11.jpg",
    price: "免费",
    studyCount: 8903,
    category: "IT工程",
    level: "前端工程",
    teacherId: 9,
    source: {
      type: "bilibili",
      bvid: "BV1Za4y1r7KE",
      label: "B 站 Vue3 全栈实战 · 71 集"
    },
    intro: "以 Google 前端大规模工程实践为参照，配套 B 站 71 集 Vue3 + TypeScript 实战教程，覆盖组合式 API、响应式原理、组件通信、Vite 构建、状态管理 Pinia 与前后端联调，形成可交付的企业级前端工程能力。",
    chapters: [
      {
        name: "第一章 Vue3 基础与工程初始化",
        videos: [
          "1-1 Vue3 开篇与环境搭建",
          "1-2 创建 Vue3 工程与目录结构",
          "1-3 编写根组件与第一个效果",
        ]
      },
      {
        name: "第二章 组合式 API 核心",
        videos: [
          "2-1 OptionsAPI 与 CompositionAPI 对比",
          "2-2 setup 概述与返回值",
          "2-3 setup 语法糖",
          "2-4 ref 创建基本类型响应式数据",
          "2-5 reactive 创建对象类型响应式数据",
          "2-6 ref 与 reactive 的选择",
          "2-7 toRefs 与 toRef",
        ]
      },
      {
        name: "第三章 响应式进阶",
        videos: [
          "3-1 computed 计算属性",
          "3-2 watch 监听基础",
          "3-3 watch 监听对象与数组",
          "3-4 watchEffect 与副作用管理",
          "3-5 自定义指令与生命周期",
        ]
      },
      {
        name: "第四章 组件化开发",
        videos: [
          "4-1 组件注册与通信",
          "4-2 插槽与作用域插槽",
          "4-3 依赖注入 provide/inject",
          "4-4 动态组件与异步组件",
        ]
      },
      {
        name: "第五章 工程化与生态整合",
        videos: [
          "5-1 Vite 构建原理与配置",
          "5-2 路由 Vue Router 实战",
          "5-3 状态管理 Pinia 实战",
          "5-4 HTTP 封装与拦截器",
          "5-5 TypeScript 类型体操入门",
        ]
      },
      {
        name: "第六章 联调与交付",
        videos: [
          "6-1 与后端 API 联调规范",
          "6-2 单元测试与组件测试",
          "6-3 打包部署与 CI/CD",
        ]
      },
    ]
  },
  {
    id: 12,
    title: "计算机视觉深度学习：Stanford CS231n",
    cover: "/photo/course/12.jpg",
    price: "免费",
    studyCount: 9317,
    category: "人工智能",
    level: "计算机视觉",
    teacherId: 12,
    source: {
      type: "youtube",
      playlistId: "PLkt2uSq6rBVctENoVBg1TpCC7OQi31AlC",
      label: "Stanford CS231n 官方播放列表 · Karpathy 主讲"
    },
    intro: "斯坦福 CS231n《计算机视觉中的深度学习》官方录像全集，卡帕斯用「从零手写训练循环」的方式讲透 CNN 架构、训练技巧与迁移学习，并配 3 个课程作业（线性分类器、CNN、从头训练）作为动手验收。",
    chapters: [
      {
        name: "第一章 图像分类与数据集",
        videos: [
          "Lecture 1 图像分类的挑战与数据集",
          "Lecture 2 卷积神经网络基础",
          "Lecture 3 训练 CNN：前向传播与梯度",
        ]
      },
      {
        name: "第二章 CNN 架构与训练技巧",
        videos: [
          "Lecture 4 CNN 架构演化",
          "Lecture 5 优化与超参选择",
          "Lecture 6 特征可视化与诊断",
          "Lecture 7 迁移学习与预训练模型",
        ]
      },
      {
        name: "第三章 高级视觉任务",
        videos: [
          "Lecture 8 检测与分割",
          "Lecture 9 语义分割与全卷积网络",
          "Lecture 10 视觉表示与自监督学习",
        ]
      },
      {
        name: "第四章 课程作业实战",
        videos: [
          "作业1 线性分类器实现",
          "作业2 卷积网络实现与训练",
          "作业3 从头训练与超参搜索",
        ]
      },
    ]
  },
  {
    id: 13,
    title: "机器学习基础：吴恩达专项课程",
    cover: "/photo/course/13.jpg",
    price: "免费",
    studyCount: 16742,
    category: "人工智能",
    level: "机器学习",
    teacherId: 13,
    source: {
      type: "youtube",
      playlistId: "PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI",
      label: "DeepLearning.AI 官方播放列表 · 专项全三门"
    },
    intro: "吴恩达与 DeepLearning.AI 联合出品的机器学习专项课程官方播放列表，涵盖监督学习、进阶学习算法、无监督学习与强化学习三大板块，是全球完课人数最多的机器学习系统课，配 Python + scikit-learn + TensorFlow 实操。",
    chapters: [
      {
        name: "第一章 机器学习导论与回归",
        videos: [
          "1-1 机器学习概览与监督/无监督之分",
          "1-2 回归模型与目标函数",
          "1-3 梯度下降训练模型",
          "1-4 多变量线性回归",
          "1-5 特征缩放与工程化",
        ]
      },
      {
        name: "第二章 分类与逻辑回归",
        videos: [
          "2-1 分类与逻辑回归",
          "2-2 代价函数与决策边界",
          "2-3 逻辑回归的梯度下降",
          "2-4 过拟合问题",
        ]
      },
      {
        name: "第三章 神经网络",
        videos: [
          "3-1 神经网络直觉与结构",
          "3-2 TensorFlow 实现与向量化",
          "3-3 神经网络训练与激活函数",
          "3-4 多分类与 Softmax",
          "3-5 反向传播原理（选学）",
        ]
      },
      {
        name: "第四章 模型建议与偏差方差",
        videos: [
          "4-1 应用机器学习的建议",
          "4-2 偏差与方差的诊断",
          "4-3 机器学习开发流程",
        ]
      },
      {
        name: "第五章 决策树与集成模型",
        videos: [
          "5-1 决策树原理",
          "5-2 决策树学习",
          "5-3 树集成与随机森林",
          "5-4 提升树与 XGBoost",
        ]
      },
      {
        name: "第六章 无监督学习与推荐系统",
        videos: [
          "6-1 聚类与 K-Means",
          "6-2 异常检测",
          "6-3 协同过滤与推荐系统",
          "6-4 基于内容的推荐与 PCA",
        ]
      },
      {
        name: "第七章 强化学习",
        videos: [
          "7-1 强化学习导论",
          "7-2 状态-动作值函数",
          "7-3 连续状态空间与策略",
        ]
      },
    ]
  },
  {
    id: 14,
    title: "全栈 MLOps：从模型到生产系统",
    cover: "/photo/course/14.jpg",
    price: "免费",
    studyCount: 6428,
    category: "人工智能",
    level: "全栈 MLOps",
    teacherId: 9,
    source: {
      type: "youtube",
      playlistId: "PL1T8fO7ArWlcWg04OgNiJy91PywMKT2lv",
      label: "Full Stack Deep Learning 2021 · 18 个视频"
    },
    intro: "伯克利 FSDL 2021 版本的完整 18 个视频，主题涵盖项目管理、基础设施、测试、迭代、监控、模型部署、持续学习与数据管理。相比 2022 版更适合作为 MLOps 流程的入门第一课，讲解节奏更缓、案例更完整。",
    chapters: [
      {
        name: "第一章 课程与项目视角",
        videos: [
          "Lecture 1 课程导论与 ML 项目的定义",
          "Lecture 2 项目管理要点",
          "Lecture 3 机器学习项目中的风险",
        ]
      },
      {
        name: "第二章 基础设施与迭代",
        videos: [
          "Lecture 4 基础设施与配置管理",
          "Lecture 5 实验管理与迭代效率",
          "Lecture 6 训练与推理的性能优化",
        ]
      },
      {
        name: "第三章 测试与监控",
        videos: [
          "Lecture 7 监控与数据依赖",
          "Lecture 8 线上监控与告警",
          "Lecture 9 测试机器学习系统",
        ]
      },
      {
        name: "第四章 部署与持续学习",
        videos: [
          "Lecture 10 部署策略与模型版本管理",
          "Lecture 11 持续学习与数据飞轮",
          "Lecture 12 数据管理与标注流程",
        ]
      },
    ]
  },
  {
    id: 15,
    title: "微服务与分布式系统实战",
    cover: "/photo/course/15.jpg",
    price: "免费",
    studyCount: 11056,
    category: "IT工程",
    level: "分布式计算",
    teacherId: 9,
    source: {
      type: "bilibili",
      bvid: "BV18E411x7eT",
      label: "B 站 Spring Cloud 微服务实战 · 150 集"
    },
    intro: "以 Google 大规模服务化经验为参照，配套 B 站 150 集 Spring Cloud 微服务实战教程，讲解服务拆分边界、注册发现、配置中心、网关、熔断限流、链路追踪与容器化部署，构建可上生产的服务治理体系。",
    chapters: [
      {
        name: "第一章 微服务架构理论",
        videos: [
          "1-1 微服务架构演进与拆分原则",
          "1-2 Spring Cloud 与 Alibaba 版本选型",
          "1-3 父工程与依赖管理",
        ]
      },
      {
        name: "第二章 工程结构与模块构建",
        videos: [
          "2-1 支付服务模块构建",
          "2-2 消费者与订单模块构建",
          "2-3 热部署与工程重构",
        ]
      },
      {
        name: "第三章 注册中心 Eureka",
        videos: [
          "3-1 Eureka 基础与架构原理",
          "3-2 Eureka Server 搭建",
          "3-3 服务注册与实例健康检查",
          "3-4 Eureka 集群原理与搭建",
        ]
      },
      {
        name: "第四章 组件化实战",
        videos: [
          "4-1 负载均衡 Ribbon",
          "4-2 服务网关 Gateway",
          "4-3 分布式配置中心 Config",
          "4-4 声明式调用 OpenFeign",
        ]
      },
      {
        name: "第五章 服务治理与可观测性",
        videos: [
          "5-1 熔断降级 Sentinel",
          "5-2 链路追踪 Sleuth + Zipkin",
          "5-3 消息驱动 Bus",
          "5-4 分布式事务 Seata",
        ]
      },
      {
        name: "第六章 部署与容器化",
        videos: [
          "6-1 Docker 镜像与服务编排",
          "6-2 Kubernetes 部署实践",
          "6-3 监控告警与日志采集",
          "6-4 压力测试与性能调优",
        ]
      },
    ]
  },
  {
    id: 16,
    title: "大数据与 Spark：离线与实时计算",
    cover: "/photo/course/16.jpg",
    price: "免费",
    studyCount: 9864,
    category: "IT工程",
    level: "分布式计算",
    teacherId: 9,
    source: {
      type: "bilibili",
      bvid: "BV1Qp4y1n7EN",
      label: "B 站 Hadoop3.x 大数据实战 · 178 集"
    },
    intro: "配套 B 站 178 集 Hadoop3.x 实战教程，系统讲解大数据的 5V 特征与生态体系、HDFS 存储原理、YARN 资源调度、MapReduce 编程模型，并以 Spark 作为迭代计算与实时流处理的落地路径，串起离线数仓到实时决策的完整链路。",
    chapters: [
      {
        name: "第一章 大数据认知与生态",
        videos: [
          "1-1 大数据的概念与 5V 特征",
          "1-2 大数据的应用场景",
          "1-3 大数据技术生态体系全景",
        ]
      },
      {
        name: "第二章 Hadoop 基础",
        videos: [
          "2-1 Hadoop 是什么与发展历史",
          "2-2 三大发行版本对比",
          "2-3 优势与 1.x/2.x/3.x 区别",
        ]
      },
      {
        name: "第三章 分布式存储 HDFS",
        videos: [
          "3-1 HDFS 架构与 Namenode",
          "3-2 DataNode 与副本机制",
          "3-3 读写流程与小文件问题",
          "3-4 HDFS 高可用配置",
        ]
      },
      {
        name: "第四章 资源调度 YARN",
        videos: [
          "4-1 YARN 架构与组件",
          "4-2 作业提交与执行流程",
          "4-3 资源队列与调度器",
        ]
      },
      {
        name: "第五章 计算引擎 MapReduce",
        videos: [
          "5-1 MapReduce 编程模型",
          "5-2 WordCount 完整实现",
          "5-3 Shuffle 与排序",
          "5-4 Combiner 与性能优化",
        ]
      },
      {
        name: "第六章 Spark 计算与实时处理",
        videos: [
          "6-1 Spark 架构与 RDD",
          "6-2 Spark SQL 与 DataFrame",
          "6-3 Spark Streaming 实时计算",
          "6-4 离线数仓与实时链路整合",
        ]
      },
    ]
  },
]

export const categories = ['全部', ...Object.keys(subjectTree)]
export const levels = ['全部', ...new Set(courses.map((c) => c.level))]

export const getCourse = (id) => courses.find((c) => c.id === Number(id))
export const getCoursesByTeacher = (teacherId) => courses.filter((c) => c.teacherId === Number(teacherId))

// 课程来源外链
export function sourceUrl(course) {
  const s = course?.source
  if (!s) return ''
  return s.type === 'youtube'
    ? `https://www.youtube.com/playlist?list=${s.playlistId}`
    : `https://www.bilibili.com/video/${s.bvid}`
}
