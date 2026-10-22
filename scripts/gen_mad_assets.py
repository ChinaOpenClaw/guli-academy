# -*- coding: utf-8 -*-
"""MAD网课系统 — 资源生成器
从 mad_data.py 统一数据源生成：
  1. src/data/teachers.js、src/data/courses.js、src/data/subjects.js
  2. 课程封面图 public/photo/course/*.jpg （PIL 绘制，天然无水印）
  3. 讲师头像 public/photo/teacher/*.jpg （PIL 绘制，几何抽象 + 姓名首字）
  4. mad_edu 建库 + 数据 SQL
"""
import os
import sys
import random
import json
import textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mad_data import TEACHERS, SUBJECTS, COURSES, BILI_START

ROOT = "/Users/sang/Desktop/谷粒学院项目"
PORTAL = os.path.join(ROOT, "workspace/frontend/mad-portal")
STAGE = os.path.join(ROOT, "oss-staging/guli-academy")

FONT_BOLD = "/System/Library/Fonts/STHeiti Medium.ttc"
FONT_LIGHT = "/System/Library/Fonts/STHeiti Light.ttc"

BRAND = (104, 203, 155)          # #68cb9b 品牌绿
DARK = (4, 11, 27)               # #040b1b 深底

# 分类主题色（主色, 副色）
THEME = {
    "金融投资": ((17, 40, 62), (46, 196, 182)),
    "IT工程":   ((12, 26, 56), (86, 132, 255)),
    "人工智能": ((36, 16, 66), (150, 96, 255)),
}


def font(path, size):
    return ImageFont.truetype(path, size)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


# ------------------------------------------------------------- 课程封面
def make_cover(course, out_path):
    W, H = 800, 450
    base, accent = THEME[course["category"]]
    img = Image.new("RGB", (W, H), base)
    d = ImageDraw.Draw(img, "RGBA")

    # 径向渐变底
    for y in range(H):
        t = y / H
        row = lerp(lerp(base, DARK, 0.25), DARK, t * 0.75)
        d.line([(0, y), (W, y)], fill=row)

    rnd = random.Random(course["id"] * 977)

    cat = course["category"]
    if cat == "金融投资":
        # K 线图
        n = 26
        for i in range(n):
            x = 40 + i * (W - 80) / n
            o = rnd.randint(60, 300)
            c = o + rnd.randint(-70, 70)
            top, bot = min(o, c), max(o, c)
            col = (120, 235, 170) if c >= o else (235, 110, 120)
            d.line([(x, top), (x, bot)], fill=col, width=4)
            d.rectangle([x - 5, top, x + 5, bot], fill=col)
        # 趋势线
        pts = [(40 + i * (W - 80) / 22, 330 - i * 9 + rnd.randint(-18, 18)) for i in range(23)]
        d.line(pts, fill=BRAND, width=3)
    elif cat == "IT工程":
        # 电路板网格
        for i in range(0, W, 40):
            d.line([(i, 0), (i, H)], fill=(255, 255, 255, 12), width=1)
        for i in range(0, H, 40):
            d.line([(0, i), (W, i)], fill=(255, 255, 255, 12), width=1)
        # 连线节点
        nodes = [(120 + rnd.randint(0, 560), 80 + rnd.randint(0, 260)) for _ in range(9)]
        for a in range(len(nodes) - 1):
            d.line([nodes[a], nodes[a + 1]], fill=accent + (150,), width=3)
        for nx, ny in nodes:
            d.ellipse([nx - 8, ny - 8, nx + 8, ny + 8], fill=accent)
            d.ellipse([nx - 14, ny - 14, nx + 14, ny + 14], outline=accent + (90,), width=2)
        # 右侧柱状
        for i in range(5):
            h = rnd.randint(40, 160)
            d.rectangle([W - 150 + i * 26, H - 60 - h, W - 132 + i * 26, H - 60], fill=accent + (120,))
    else:
        # 神经网络
        layers = [[(90, 120), (90, 230), (90, 340)],
                  [(270, 80), (270, 170), (270, 260), (270, 350)],
                  [(450, 120), (450, 230), (450, 340)],
                  [(630, 190), (630, 300)]]
        for li in range(len(layers) - 1):
            for a in layers[li]:
                for b in layers[li + 1]:
                    d.line([a, b], fill=accent + (55,), width=1)
        for li, layer in enumerate(layers):
            for (x, y) in layer:
                r = 20 - li * 2
                d.ellipse([x - r, y - r, x + r, y + r], fill=accent + (220,))
                d.ellipse([x - r - 8, y - r - 8, x + r + 8, y + r + 8], outline=accent + (80,), width=2)

    # 顶部标签条
    d.rectangle([0, 0, W, 6], fill=BRAND)
    # 底部遮罩（按实际内容高度自适应，保证文字可读）
    # 先计算标题行数
    title = course["title"]
    lines = textwrap.wrap(title, width=15)[:2]
    title_block = 56 * len(lines) + 46 + 40      # 标题行高 + 标签 + meta
    mask_top = H - title_block - 20
    for y in range(max(0, mask_top), H):
        a = int(215 * (y - mask_top) / max(1, (H - mask_top)))
        d.line([(0, y), (W, y)], fill=DARK + (a,))

    f_tag = font(FONT_BOLD, 24)
    f_t1 = font(FONT_BOLD, 42)
    f_meta = font(FONT_LIGHT, 20)

    tag = f"{course['category']} · {course['level']}"
    d.text((44, mask_top + 12), tag, font=f_tag, fill=BRAND)

    # 标题
    ty = mask_top + 48
    for ln in lines:
        d.text((44, ty), ln, font=f_t1, fill=(255, 255, 255))
        ty += 54

    # 来源标注
    styp, sid, slabel = course["source"]
    srcname = "YouTube 官方课程" if styp == "youtube" else "B 站正版合集"
    d.text((44, H - 44), f"{srcname} · {len(course['chapters'])} 章 · {slabel[:30]}", font=f_meta, fill=(170, 190, 210))

    img.save(out_path, "JPEG", quality=88, optimize=True)


# ------------------------------------------------------------- 讲师头像
def make_avatar(teacher, out_path):
    S = 400
    tid = teacher[0]
    rnd = random.Random(tid * 31337)
    # 按领域取色
    if teacher[3] == "金融投资":
        base, accent = (18, 46, 66), (72, 200, 168)
    else:
        base, accent = (24, 30, 66), (128, 122, 255)

    img = Image.new("RGB", (S, S), base)
    d = ImageDraw.Draw(img, "RGBA")
    for y in range(S):
        d.line([(0, y), (S, y)], fill=lerp(lerp(base, DARK, 0.2), DARK, y / S * 0.6))

    # 抽象几何构成
    for i in range(7):
        r = rnd.randint(50, 190)
        cx = rnd.randint(0, S)
        cy = rnd.randint(0, S)
        d.ellipse([cx - r, cy - r, cx + r, cy + r],
                  outline=accent + (rnd.randint(30, 90),), width=rnd.randint(2, 6))
    for i in range(5):
        x1 = rnd.randint(0, S)
        d.line([(x1, 0), (rnd.randint(0, S), S)], fill=accent + (40,), width=rnd.randint(2, 5))

    # 底部姓名首字/姓氏
    name = teacher[1]
    initial = name[0]
    d.ellipse([S / 2 - 88, S / 2 - 88, S / 2 + 88, S / 2 + 88], fill=(0, 0, 0, 120))
    d.ellipse([S / 2 - 84, S / 2 - 84, S / 2 + 84, S / 2 + 84], outline=accent + (170,), width=4)
    f_ini = font(FONT_BOLD, 120)
    bbox = d.textbbox((0, 0), initial, font=f_ini)
    d.text((S / 2 - (bbox[2] - bbox[0]) / 2 - bbox[0],
            S / 2 - (bbox[3] - bbox[1]) / 2 - bbox[1]),
           initial, font=f_ini, fill=(255, 255, 255))

    img.save(out_path, "JPEG", quality=90, optimize=True)


# ------------------------------------------------------------- JS 生成
def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def gen_teachers_js():
    lines = [
        "// MAD网课系统 · 讲师数据（金融投资 / IT工程 领域真实名师）",
        "// 头像由 PIL 几何绘制生成（public/photo/teacher/NN.jpg），无任何第三方水印",
        "export const teachers = [",
    ]
    for (tid, name, en, field, title, intro) in TEACHERS:
        lines.append("  {")
        lines.append(f"    id: {tid},")
        lines.append(f"    name: {js_str(name)},")
        lines.append(f"    enName: {js_str(en)},")
        lines.append(f"    field: {js_str(field)},")
        lines.append(f"    title: {js_str(title)},")
        lines.append(f"    avatar: {js_str(f'/photo/teacher/{tid:02d}.jpg')},")
        lines.append(f"    intro: {js_str(intro)}")
        lines.append("  },")
    lines.append("]")
    lines.append("")
    lines.append("export const getTeacher = (id) => teachers.find((t) => t.id === Number(id))")
    lines.append("export const getTeachersByField = (field) => teachers.filter((t) => t.field === field)")
    lines.append("export const teacherFields = [...new Set(teachers.map((t) => t.field))]")
    return "\n".join(lines) + "\n"


def gen_courses_js():
    lines = [
        "// MAD网课系统 · 课程数据（真实 YouTube / B 站 公开课）",
        "// source: { type: 'youtube' | 'bilibili', playlistId | bvid, label }",
        "// 全部播放源均已核验存在；章节标题按真实课程大纲整理。",
        "import { subjectTree } from './subjects'",
        "",
        "export const courses = [",
    ]
    for c in COURSES:
        styp, sid, slabel = c["source"]
        lines.append("  {")
        lines.append(f"    id: {c['id']},")
        lines.append(f"    title: {js_str(c['title'])},")
        lines.append(f"    cover: {js_str(f'/photo/course/{c['id']:02d}.jpg')},")
        lines.append(f"    price: {js_str(c['price'])},")
        lines.append(f"    studyCount: {c['studyCount']},")
        lines.append(f"    category: {js_str(c['category'])},")
        lines.append(f"    level: {js_str(c['level'])},")
        lines.append(f"    teacherId: {c['teacherId']},")
        lines.append("    source: {")
        lines.append(f"      type: {js_str(styp)},")
        if styp == "youtube":
            lines.append(f"      playlistId: {js_str(sid)},")
        else:
            lines.append(f"      bvid: {js_str(sid)},")
        lines.append(f"      label: {js_str(slabel)}")
        lines.append("    },")
        lines.append(f"    intro: {js_str(c['intro'])},")
        lines.append("    chapters: [")
        for (chname, vids) in c["chapters"]:
            lines.append("      {")
            lines.append(f"        name: {js_str(chname)},")
            lines.append("        videos: [")
            for v in vids:
                lines.append(f"          {js_str(v)},")
            lines.append("        ]")
            lines.append("      },")
        lines.append("    ]")
        lines.append("  },")
    lines.append("]")
    lines.append("")
    lines.append("export const categories = ['全部', ...Object.keys(subjectTree)]")
    lines.append("export const levels = ['全部', ...new Set(courses.map((c) => c.level))]")
    lines.append("")
    lines.append("export const getCourse = (id) => courses.find((c) => c.id === Number(id))")
    lines.append("export const getCoursesByTeacher = (teacherId) => courses.filter((c) => c.teacherId === Number(teacherId))")
    lines.append("")
    lines.append("// 课程来源外链")
    lines.append("export function sourceUrl(course) {")
    lines.append("  const s = course?.source")
    lines.append("  if (!s) return ''")
    lines.append("  return s.type === 'youtube'")
    lines.append("    ? `https://www.youtube.com/playlist?list=${s.playlistId}`")
    lines.append("    : `https://www.bilibili.com/video/${s.bvid}`")
    lines.append("}")
    return "\n".join(lines) + "\n"


def gen_subjects_js():
    lines = [
        "// MAD网课系统 · 课程分类树（与数据库 edu_subject 对应）",
        "export const subjectTree = {",
    ]
    for parent, children in SUBJECTS.items():
        lines.append(f"  {js_str(parent)}: {json.dumps(children, ensure_ascii=False)},")
    lines.append("}")
    lines.append("")
    lines.append("export const allSubjects = Object.entries(subjectTree).flatMap(([p, cs]) =>")
    lines.append("  cs.map((c) => ({ parent: p, child: c }))")
    lines.append(")")
    return "\n".join(lines) + "\n"


# ------------------------------------------------------------- SQL 生成
def gen_sql():
    out = []
    out.append("-- =====================================================================")
    out.append("-- MAD网课系统 · mad_edu 库初始化与数据脚本")
    out.append("-- 讲师：金融投资 / IT工程 领域真实名师（14 位）")
    out.append("-- 课程：16 门，全部来自真实 YouTube 播放列表 / B 站合集")
    out.append("-- 用法：mysql -u mad -p mad_edu < mad_edu.sql")
    out.append("-- =====================================================================")
    out.append("")
    out.append("DROP DATABASE IF EXISTS `mad_edu`;")
    out.append("CREATE DATABASE `mad_edu` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;")
    out.append("USE `mad_edu`;")
    out.append("")

    # 表结构
    out.append("""CREATE TABLE `edu_teacher` (
  `id` char(19) NOT NULL COMMENT '讲师ID',
  `name` varchar(20) NOT NULL COMMENT '讲师姓名',
  `intro` varchar(255) NOT NULL COMMENT '讲师资历,一句话说明讲师',
  `career` text COMMENT '讲师简介',
  `level` int(10) unsigned NOT NULL COMMENT '头衔 1高级讲师 2首席讲师',
  `avatar` varchar(255) DEFAULT NULL COMMENT '讲师头像',
  `sort` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除 1（true）已删除， 0（false）未删除',
  `gmt_create` datetime NOT NULL COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='讲师';

CREATE TABLE `edu_subject` (
  `id` char(19) NOT NULL COMMENT '课程类别ID',
  `title` varchar(30) NOT NULL COMMENT '类别名称',
  `parent_id` char(19) NOT NULL DEFAULT '0' COMMENT '父ID',
  `sort` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '排序字段',
  `gmt_create` datetime NOT NULL COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='课程科目';

CREATE TABLE `edu_course` (
  `id` char(19) NOT NULL COMMENT '课程ID',
  `teacher_id` char(19) NOT NULL COMMENT '课程讲师ID',
  `subject_id` char(19) NOT NULL COMMENT '课程专业ID',
  `subject_parent_id` char(19) NOT NULL COMMENT '课程专业父级ID',
  `title` varchar(100) NOT NULL COMMENT '课程标题',
  `price` decimal(10,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '课程销售价格，设置为0则可免费观看',
  `lesson_num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '总课时',
  `cover` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '课程封面图片路径',
  `buy_count` bigint(10) unsigned NOT NULL DEFAULT '0' COMMENT '销售数量',
  `view_count` bigint(10) unsigned NOT NULL DEFAULT '0' COMMENT '浏览数量',
  `version` bigint(20) unsigned NOT NULL DEFAULT '1' COMMENT '乐观锁',
  `status` varchar(10) NOT NULL DEFAULT 'Draft' COMMENT '课程状态 Draft未发布  Normal已发布',
  `gmt_create` datetime NOT NULL COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_title` (`title`),
  KEY `idx_subject_id` (`subject_id`),
  KEY `idx_teacher_id` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='课程';

CREATE TABLE `edu_course_description` (
  `id` char(19) NOT NULL COMMENT '课程ID',
  `description` text COMMENT '课程简介',
  `gmt_create` datetime NOT NULL COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='课程简介';

CREATE TABLE `edu_chapter` (
  `id` char(19) NOT NULL COMMENT '章节ID',
  `course_id` char(19) NOT NULL COMMENT '课程ID',
  `title` varchar(100) NOT NULL COMMENT '章节名称',
  `sort` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '显示排序',
  `gmt_create` datetime NOT NULL COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_course_id` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='章节';

CREATE TABLE `edu_video` (
  `id` char(19) NOT NULL COMMENT '视频ID',
  `course_id` char(19) NOT NULL COMMENT '课程ID',
  `chapter_id` char(19) NOT NULL COMMENT '章节ID',
  `title` varchar(150) NOT NULL COMMENT '节点名称',
  `video_source_id` varchar(100) DEFAULT NULL COMMENT '云端视频资源',
  `video_original_name` varchar(100) DEFAULT NULL COMMENT '原始文件名称',
  `sort` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '排序字段',
  `play_count` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '播放次数',
  `is_free` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可以试听：0收费 1免费',
  `duration` float NOT NULL DEFAULT '0' COMMENT '视频时长（秒）',
  `status` varchar(20) NOT NULL DEFAULT '' COMMENT '视频状态',
  `size` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '视频源文件大小（字节）',
  `version` bigint(20) unsigned NOT NULL DEFAULT '1' COMMENT '乐观锁',
  `gmt_create` datetime NOT NULL COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_course_id` (`course_id`),
  KEY `idx_chapter_id` (`chapter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='视频';""")
    out.append("")

    NOW = "'2026-10-22 10:00:00'"

    # 分类
    out.append("-- ---------------- 课程分类 ----------------")
    sid_map = {}
    sid = 1000
    rows = []
    for pi, (parent, children) in enumerate(SUBJECTS.items(), start=1):
        pid = str(sid); sid += 1
        sid_map[parent] = pid
        rows.append(f"('{pid}','{parent}','0',{pi},{NOW},{NOW})")
        for ci, ch in enumerate(children, start=1):
            cid = str(sid); sid += 1
            sid_map[(parent, ch)] = cid
            rows.append(f"('{cid}','{ch}','{pid}',{ci},{NOW},{NOW})")
    out.append("INSERT INTO `edu_subject`(`id`,`title`,`parent_id`,`sort`,`gmt_create`,`gmt_modified`) VALUES")
    out.append(",\n".join(rows) + ";")
    out.append("")

    # 讲师
    out.append("-- ---------------- 讲师（金融投资 / IT工程 真实名师）----------------")
    trows = []
    for (tid, name, en, field, title, intro) in TEACHERS:
        short = f"{en}（{field}）· {title}"
        trows.append(
            f"('{tid}','{name}','{short}','{intro}',"
            f"{2 if tid in (1,2,4,9) else 1},"
            f"'/photo/teacher/{tid:02d}.jpg',{tid},0,{NOW},{NOW})")
    out.append("INSERT INTO `edu_teacher`(`id`,`name`,`intro`,`career`,`level`,`avatar`,`sort`,`is_deleted`,`gmt_create`,`gmt_modified`) VALUES")
    out.append(",\n".join(trows) + ";")
    out.append("")

    # 课程
    out.append("-- ---------------- 课程 ----------------")
    crows = []
    drows = []
    for c in COURSES:
        # 课程 ID 与前端 courses.js 的 id 保持一致（1..16），
        # 保证门户学习中心 /edu/chapter/nested-list/{courseId} 可直接命中
        cid = str(c["id"])
        parent = c["category"]
        child = c["level"]
        pid = sid_map[parent]
        sid2 = sid_map.get((parent, child), pid)
        total_videos = sum(len(v) for _, v in c["chapters"])
        cover = f"/photo/course/{c['id']:02d}.jpg"
        crows.append(
            f"('{cid}','{c['teacherId']}','{sid2}','{pid}','{c['title']}',0.0000,{total_videos},"
            f"'{cover}',{c['studyCount']},{c['studyCount'] * 3},1,'Normal',{NOW},{NOW})")
        desc = c["intro"] + "<br/><br/>课程来源：" + c["source"][2]
        drows.append(f"('{cid}','{desc}',{NOW},{NOW})")
    out.append("INSERT INTO `edu_course`(`id`,`teacher_id`,`subject_id`,`subject_parent_id`,`title`,`price`,`lesson_num`,`cover`,`buy_count`,`view_count`,`version`,`status`,`gmt_create`,`gmt_modified`) VALUES")
    out.append(",\n".join(crows) + ";")
    out.append("")
    out.append("-- ---------------- 课程简介 ----------------")
    out.append("INSERT INTO `edu_course_description`(`id`,`description`,`gmt_create`,`gmt_modified`) VALUES")
    out.append(",\n".join(drows) + ";")
    out.append("")

    # 章节 + 视频
    out.append("-- ---------------- 章节 ----------------")
    chrows = []
    vrows = []
    vid = 1
    for c in COURSES:
        cid = str(c["id"])
        for ci, (chname, vids) in enumerate(c["chapters"], start=1):
            chid = str(vid); vid += 1
            chrows.append(f"('{chid}','{cid}','{chname}',{ci},{NOW},{NOW})")
            for vi, vtitle in enumerate(vids, start=1):
                v_id = str(vid); vid += 1
                # 视频来源：YouTube 播放列表序号 或 B 站分P页码
                if c["source"][0] == "youtube":
                    src = f"YT:{c['source'][1]}"
                else:
                    src = f"BI:{c['source'][1]}"
                vrows.append(
                    f"('{v_id}','{cid}','{chid}','{vtitle}','{src}',NULL,{vi},0,"
                    f"{1 if vi == 1 else 0},0,'Normal',0,1,{NOW},{NOW})")
    out.append("INSERT INTO `edu_chapter`(`id`,`course_id`,`title`,`sort`,`gmt_create`,`gmt_modified`) VALUES")
    out.append(",\n".join(chrows) + ";")
    out.append("")
    out.append("-- ---------------- 视频节点 ----------------")
    out.append("INSERT INTO `edu_video`(`id`,`course_id`,`chapter_id`,`title`,`video_source_id`,`video_original_name`,`sort`,`play_count`,`is_free`,`duration`,`status`,`size`,`version`,`gmt_create`,`gmt_modified`) VALUES")
    out.append(",\n".join(vrows) + ";")
    out.append("")

    out.append("-- =====================================================================")
    out.append("-- 校验查询")
    out.append("-- SELECT t.name, COUNT(c.id) AS 课程数 FROM edu_teacher t")
    out.append("--   LEFT JOIN edu_course c ON c.teacher_id = t.id GROUP BY t.id, t.name;")
    out.append("-- =====================================================================")
    return "\n".join(out) + "\n"


# ------------------------------------------------------------- 主流程
def main():
    # 1. 目录准备
    for d in [os.path.join(PORTAL, "src/data"),
              os.path.join(PORTAL, "public/photo/course"),
              os.path.join(PORTAL, "public/photo/teacher"),
              os.path.join(STAGE, "sql")]:
        os.makedirs(d, exist_ok=True)

    # 2. JS 数据
    with open(os.path.join(PORTAL, "src/data/teachers.js"), "w", encoding="utf-8") as f:
        f.write(gen_teachers_js())
    print("✓ teachers.js")
    with open(os.path.join(PORTAL, "src/data/courses.js"), "w", encoding="utf-8") as f:
        f.write(gen_courses_js())
    print("✓ courses.js")
    with open(os.path.join(PORTAL, "src/data/subjects.js"), "w", encoding="utf-8") as f:
        f.write(gen_subjects_js())
    print("✓ subjects.js")

    # 3. 图片
    for c in COURSES:
        p = os.path.join(PORTAL, "public/photo/course", f"{c['id']:02d}.jpg")
        make_cover(c, p)
    print(f"✓ {len(COURSES)} 张课程封面")
    for t in TEACHERS:
        p = os.path.join(PORTAL, "public/photo/teacher", f"{t[0]:02d}.jpg")
        make_avatar(t, p)
    print(f"✓ {len(TEACHERS)} 张讲师头像")

    # 4. SQL
    sql = gen_sql()
    with open(os.path.join(STAGE, "sql", "mad_edu.sql"), "w", encoding="utf-8") as f:
        f.write(sql)
    print(f"✓ mad_edu.sql ({len(sql)} 字符)")
    with open("/tmp/mad_edu.sql", "w", encoding="utf-8") as f:
        f.write(sql)
    print("✓ /tmp/mad_edu.sql")


if __name__ == "__main__":
    main()
