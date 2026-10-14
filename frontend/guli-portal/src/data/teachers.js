// 名师数据（镜像自原静态站 teacher_info.html 内容）
export const teachers = [
  {
    id: 1,
    name: '佟老师',
    title: '尚硅谷教学总监',
    avatar: '/photo/teacher/01.jpg',
    intro:
      '资深项目经理、技术讲师、SUN SCJP、SCWCD、原工信部移动云计算教育培训中心教学总监。十年软件开发经验：参与完成辽宁某高校远程教学管理系统、慧文信息门户系统、日本麦卡尔超市管理系统、崎玉市外来人口登记系统、深海视频会议管理系统、仙台市宫城县日常事务系统等项目的设计和开发。十年软件培训经验：曾在中国AOP全球外包排名第一的公司任Java、Oracle培训讲师；曾任花旗银行特约JavaEE培训讲师；某部队研究所JavaEE培训；曾受聘为北航、厦门大学移动云计算专业教学主任，并主讲Java、Android、iOS课程。'
  },
  {
    id: 2,
    name: '韩老师',
    title: '尚硅谷高级讲师',
    avatar: '/photo/teacher/02.jpg',
    intro:
      '行业老兵，IT教育风云人物。清华毕业，拥有九年大型项目开发和管理经验，曾任新浪网软件项目经理，使用PHP与JavaEE技术开发新浪网系统，北京点击科技公司高级软件工程师，用友软件股份有限公司U8事业部软件工程师。主持或参与《新浪邮件系统》、《橙红sns网站》、《点击科技协同软件群组服务器端》、《总参语音监控系统》、《英语学习机系统》、《用友erp系统》等项目。实战经验丰富，授课通俗易懂，多年来培训的学员已成功在用友、搜狐、淘宝、中软等知名企业就职。'
  },
  {
    id: 3,
    name: '李老师',
    title: '尚硅谷高级讲师',
    avatar: '/photo/teacher/03.jpg',
    intro:
      '从业十七年，曾任即时Linux研究院副院长、PHPChina技术总监等职，国内早期的UNIX/Linux从业者，中国UNIX用户协会成员，首批红旗Linux认证讲师。先后出版过多本计算机技术图书，国内多所大学外聘讲师。近年来致力于Linux/LAMP开源技术推广及职业教育，录制的Linux视频教程是无数从业者的入门宝典。'
  },
  {
    id: 4,
    name: '宋老师',
    title: '尚硅谷高级讲师',
    avatar: '/photo/teacher/04.jpg',
    intro:
      '东北师大理学学士，北京航空航天大学硕士，曾于北航软件开发环境国家重点实验室研究多项课题，对智能交通—浮动车海量数据挖掘及在线社交网络信息传播和控制问题有深入研究。先后担任过高级软件开发工程师，系统架构师，高级讲师。具备丰富的软件开发经验和教学经验，对以Java语言为基础的各种框架有深入研究。'
  },
  {
    id: 5,
    name: '陈老师',
    title: '尚硅谷前端讲师',
    avatar: '/photo/teacher/05.jpg',
    intro:
      '多年一线互联网前端开发经验，精通 HTML5、CSS3、JavaScript 及 Vue/React 全家桶，主导过多个千万级用户产品的前端架构设计，擅长把复杂的交互拆解为可落地的工程方案。'
  },
  {
    id: 6,
    name: '王老师',
    title: '尚硅谷大数据讲师',
    avatar: '/photo/teacher/06.jpg',
    intro:
      '大数据领域资深工程师，主导过多个 PB 级数据平台建设，精通 Hadoop、Spark、Flink 生态，乐于用真实业务场景串起枯燥的分布式原理。'
  },
  {
    id: 7,
    name: '赵老师',
    title: '尚硅谷 Python 讲师',
    avatar: '/photo/teacher/07.jpg',
    intro:
      'Python 技术布道者，曾任职于多家 AI 实验室，擅长把机器学习算法讲得通俗易懂，从爬虫到深度学习均有体系化课程沉淀。'
  },
  {
    id: 8,
    name: '刘老师',
    title: '尚硅谷架构师',
    avatar: '/photo/teacher/08.jpg',
    intro:
      '一线互联网公司技术专家，专注高并发、微服务与云原生架构，参与过多个双十一量级系统的稳定性建设，课程偏重实战与调优。'
  }
]

export const getTeacher = (id) => teachers.find((t) => t.id === Number(id))
