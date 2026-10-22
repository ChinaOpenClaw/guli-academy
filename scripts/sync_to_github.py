#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MAD网课系统 → GitHub 仓库同步脚本

用 GitHub Trees API 一次性原子提交：
  1. 新增 backend/mad/*、frontend/mad-*/*、sql/mad_*.sql、docs/*、scripts/*
  2. 删除远端旧的 guli-* 路径
  3. 更新 README / 文档 / 图表索引

为什么不走 git push：沙箱网络下 git push 被代理拦截（502），GitHub API 直连正常。
"""
import base64
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request

REPO = "ChinaOpenClaw/guli-academy"
BRANCH = "main"
API = "https://api.github.com"
PROJ = "/Users/sang/Desktop/谷粒学院项目"
STAGE = os.path.join(PROJ, "oss-staging", "guli-academy")


def token():
    out = subprocess.run(
        ["security", "find-internet-password", "-s", "github.com", "-w"],
        capture_output=True, text=True,
    )
    t = out.stdout.strip()
    if not t:
        sys.exit("未找到 GitHub token")
    return t


TOK = token()


def api(method, path, body=None, raw=False):
    url = API + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", "token " + TOK)
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("User-Agent", "mad-sync")
    if data:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            txt = r.read().decode("utf-8")
            return txt if raw else json.loads(txt)
    except urllib.error.HTTPError as e:
        body_txt = e.read().decode("utf-8", "replace")
        sys.exit("HTTP %s %s\n%s" % (e.code, path, body_txt[:1200]))


def api_retry(method, path, body=None, tries=4):
    last = None
    for i in range(tries):
        try:
            return api(method, path, body)
        except SystemExit:
            raise
        except Exception as e:  # noqa
            last = e
            print("   retry %d/%d: %s" % (i + 1, tries, e))
    raise last


def remote_tree():
    d = api_retry("GET", "/repos/%s/git/trees/%s?recursive=1" % (REPO, BRANCH))
    return {t["path"]: t for t in d.get("tree", []) if t["type"] == "blob"}


def collect(local_root, remote_prefix, excludes=(), include_exts=None):
    """收集本地文件 → [(remote_path, absolute_path)]

    自动排除 IDE 目录/文件（.idea、*.iml）与构建产物。
    """
    skip_dirs = {"node_modules", "dist", "target", ".git", ".idea", ".DS_Store",
                 ".vscode", ".mvn", "bin", "out"}
    out = []
    for base, dirs, files in os.walk(local_root):
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        for f in files:
            if f in excludes or f.startswith("."):
                continue
            if f.endswith(".iml") or f.endswith(".DS_Store"):
                continue
            if include_exts and not f.endswith(include_exts):
                continue
            ap = os.path.join(base, f)
            rel = os.path.relpath(ap, local_root)
            out.append((remote_prefix + "/" + rel.replace(os.sep, "/"), ap))
    return out


def build_tree(files):
    """构造 GitHub tree 条目（含需要删除的旧路径）

    注意：Trees API 的 content 字段要传**原始内容**（UTF-8 文本），
    而不是 base64 —— 传 base64 会导致 GitHub 把 base64 字符串本身当正文存下来
    （即「双重编码」）。二进制文件（PNG/JPG）无法走 content 字段，
    必须先经 Blobs API 上传得到 sha，再在 tree 里引用该 sha。
    """
    entries = []
    for rp, ap in files:
        raw = open(ap, "rb").read()
        mode = "100755" if os.access(ap, os.X_OK) and not ap.endswith((".sh", ".py")) else "100644"
        try:
            text = raw.decode("utf-8")
            entries.append({"path": rp, "mode": mode, "type": "blob", "content": text})
        except UnicodeDecodeError:
            # 二进制：走 Blobs API
            sha = upload_blob(raw)
            entries.append({"path": rp, "mode": mode, "type": "blob", "sha": sha})
    return entries


_BLOB_CACHE = {}


def upload_blob(raw):
    """上传二进制文件到 GitHub，返回 blob sha（按内容缓存去重）"""
    import hashlib
    key = hashlib.sha1(b"blob %d\0" % len(raw) + raw).hexdigest()
    if key in _BLOB_CACHE:
        return _BLOB_CACHE[key]
    sha = api_retry("POST", "/repos/%s/git/blobs" % REPO, {
        "content": base64.b64encode(raw).decode(),
        "encoding": "base64",
    })["sha"]
    _BLOB_CACHE[key] = sha
    return sha


def main():
    print("== 1. 读取远端树 ==")
    remote = remote_tree()
    print("   远端文件数:", len(remote))

    print("== 2. 组装待提交文件 ==")
    files = []

    # --- 后端微服务（guli → mad 改名后的完整源码）---
    files += collect(
        os.path.join(PROJ, "workspace/backend/mad"),
        "backend/mad",
        excludes=("*.iml",),
    )

    # --- 前端 ---
    # 后台管理：排除 node_modules/dist，保留 src/build/config/static/package.json 等
    files += collect(
        os.path.join(PROJ, "workspace/frontend/mad-admin"),
        "frontend/mad-admin",
        excludes=("*.iml", "package-lock.json"),
    )
    # 前台门户
    files += collect(
        os.path.join(PROJ, "workspace/frontend/mad-portal"),
        "frontend/mad-portal",
        excludes=("*.iml", "package-lock.json"),
    )

    # --- SQL / 文档 / 配置 / 脚本（来自 oss-staging 暂存区）---
    files += collect(os.path.join(STAGE, "sql"), "sql")
    files += collect(os.path.join(STAGE, "docs"), "docs")
    files += collect(os.path.join(STAGE, "config"), "config")
    files += collect(os.path.join(STAGE, "scripts"), "scripts")

    # 根级文档
    for name in ("README.md", "ARCHITECTURE.md", "LICENSE", ".gitignore"):
        p = os.path.join(STAGE, name)
        if os.path.exists(p):
            files.append((name, p))

    # 去掉重复项（后出现的覆盖）
    seen = {}
    for rp, ap in files:
        seen[rp] = ap
    files = sorted(seen.items())
    print("   待提交文件数:", len(files))

    print("== 3. 标记远端待删除路径 ==")
    deletes = []
    for rp in remote:
        if rp.startswith("backend/guli/") or rp.startswith("frontend/guli-"):
            deletes.append(rp)
        elif rp.startswith("sql/guli_"):
            deletes.append(rp)
    # 本地不再存在的旧 mad 路径也一并清理
    newpaths = {rp for rp, _ in files}
    for rp in remote:
        if rp.startswith(("backend/mad/", "frontend/mad-", "docs/", "scripts/")) and rp not in newpaths:
            deletes.append(rp)
    deletes = sorted(set(deletes))
    print("   待删除路径数:", len(deletes))

    print("== 4. 提交 Trees API（原子）==")
    entries = build_tree(files)
    for d in deletes:
        entries.append({"path": d, "mode": "100644", "type": "blob", "sha": None})

    base_tree = api_retry("GET", "/repos/%s/git/ref/heads/%s" % (REPO, BRANCH))["object"]["sha"]
    print("   base tree:", base_tree)

    resp = api_retry("POST", "/repos/%s/git/trees" % REPO, {
        "base_tree": base_tree,
        "tree": entries,
    })
    new_sha = resp["sha"]
    print("   新 tree sha:", new_sha)

    print("== 5. 创建提交 ==")
    commit = api_retry("POST", "/repos/%s/git/commits" % REPO, {
        "message": "feat: MAD网课系统全面重构\n\n"
                   "- 全栈品牌更名 guli/谷粒 → MAD网课系统\n"
                   "- 补齐后台 admin 课程/分类/章节课时管理模块\n"
                   "- 讲师替换为金融/IT 领域真实名师（14 位）\n"
                   "- 课程接入真实 YouTube / B 站原课（16 门）\n"
                   "- banner 生图去水印，配套 16 封面 + 14 头像\n"
                   "- 数据库重建：mad_edu（14 讲师 / 16 课程 / 88 章节 / 395 课时）\n"
                   "- JDK17 兼容：--add-opens + JAXB 依赖 + logback 路径修复\n"
                   "- 同步技术文档、导图（drawio/svg）与 edraw 源文件",
        "tree": new_sha,
        "parents": [api_retry("GET", "/repos/%s/git/ref/heads/%s" % (REPO, BRANCH))["object"]["sha"]],
    })
    commit_sha = commit["sha"]
    print("   commit sha:", commit_sha)

    print("== 6. 更新分支引用 ==")
    api_retry("PATCH", "/repos/%s/git/refs/heads/%s" % (REPO, BRANCH), {
        "sha": commit_sha,
        "force": False,
    })
    print("   main ->", commit_sha)

    final = remote_tree()
    print("== 7. 校验 ==")
    print("   远端文件数:", len(final))
    for probe in ("README.md", "sql/mad_edu.sql", "backend/mad/mad-microservice-edu/pom.xml",
                  "frontend/mad-admin/src/views/edu/course/list.vue",
                  "frontend/mad-portal/public/photo/banner/mad-banner.png",
                  "docs/导图-系统架构.svg"):
        print("   %-62s %s" % (probe, "OK" if probe in final else "MISSING"))
    stale = [p for p in final if p.startswith(("backend/guli/", "frontend/guli-", "sql/guli_"))]
    print("   残留旧 guli 路径:", len(stale))
    for s in stale[:5]:
        print("     -", s)

    print("== 8. 内容完整性抽查（git blob sha 对比）==")
    checks = [
        ("README.md", os.path.join(STAGE, "README.md")),
        ("sql/mad_edu.sql", os.path.join(STAGE, "sql/mad_edu.sql")),
        ("scripts/start_backend.sh", os.path.join(STAGE, "scripts/start_backend.sh")),
        ("frontend/mad-admin/src/views/edu/course/list.vue",
         os.path.join(PROJ, "workspace/frontend/mad-admin/src/views/edu/course/list.vue")),
        ("frontend/mad-portal/public/photo/banner/mad-banner.png",
         os.path.join(PROJ, "workspace/frontend/mad-portal/public/photo/banner/mad-banner.png")),
    ]
    import hashlib
    for rp, ap in checks:
        raw = open(ap, "rb").read()
        local_sha = hashlib.sha1(b"blob %d\0" % len(raw) + raw).hexdigest()
        remote_sha = final.get(rp, {}).get("sha")
        ok = "MATCH" if local_sha == remote_sha else "DIFF"
        print("   %-58s %s" % (rp, ok))
        if ok == "DIFF":
            print("      local =", local_sha)
            print("      remote=", remote_sha)


if __name__ == "__main__":
    main()
