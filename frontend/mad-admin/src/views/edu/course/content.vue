<template>
  <div class="app-container">

    <div class="page-head">
      <el-button icon="el-icon-arrow-left" size="small" @click="$router.push({ path: '/edu/course' })">返回课程列表</el-button>
      <span class="page-head-title">章节与课时管理</span>
    </div>

    <el-form :inline="true" style="margin: 16px 0">
      <el-form-item label="选择课程">
        <el-select v-model="courseId" filterable placeholder="请选择课程" style="width: 320px" @change="fetchData">
          <el-option v-for="c in courseList" :key="c.id" :label="c.title" :value="c.id"/>
        </el-select>
      </el-form-item>
      <el-button :disabled="!courseId" type="primary" icon="el-icon-plus" @click="openChapterDialog()">新增章节</el-button>
    </el-form>

    <el-alert
      v-if="!courseId"
      :closable="false"
      title="请先选择课程，再进行章节与课时编排"
      type="info"
      show-icon
      style="margin-bottom: 16px"/>

    <el-table
      v-loading="listLoading"
      :data="chapterList"
      :tree-props="{ children: 'children' }"
      border
      fit
      row-key="id"
      default-expand-all>

      <el-table-column prop="title" label="章节 / 课时名称" min-width="280"/>

      <el-table-column label="类型" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.children" size="mini" type="success">课时</el-tag>
          <el-tag v-else size="mini" type="warning">章节</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="视频来源" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.videoSourceId">
            <el-tag v-if="isYoutube(scope.row.videoSourceId)" size="mini" type="danger">YouTube</el-tag>
            <el-tag v-else size="mini" type="info">B 站</el-tag>
            <span class="src-code">{{ scope.row.videoSourceId }}</span>
          </span>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column label="试听" width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.free" size="mini" type="success">免费</el-tag>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column prop="sort" label="排序" width="70" align="center"/>

      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.children" type="primary" size="mini" icon="el-icon-edit" @click="openVideoDialog(scope.row)">编辑课时</el-button>
          <el-button v-else type="primary" size="mini" icon="el-icon-edit" @click="openChapterDialog(scope.row)">编辑章节</el-button>
          <el-button v-if="!scope.row.children" type="success" size="mini" icon="el-icon-plus" @click="openVideoDialog(null, scope.row.id)">加课时</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 章节弹窗 -->
    <el-dialog :title="chapterDialog.title" :visible.sync="chapterDialog.visible" width="460px">
      <el-form label-width="80px">
        <el-form-item label="章节名">
          <el-input v-model="chapterForm.title" placeholder="例如：第一章 金融市场的功能与风险"/>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="chapterForm.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="chapterDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveChapter">确定</el-button>
      </div>
    </el-dialog>

    <!-- 课时弹窗 -->
    <el-dialog :title="videoDialog.title" :visible.sync="videoDialog.visible" width="560px">
      <el-form label-width="100px">
        <el-form-item label="课时名称">
          <el-input v-model="videoForm.title" placeholder="例如：第1讲 课程导论与金融市场的角色"/>
        </el-form-item>
        <el-form-item label="视频来源">
          <el-radio-group v-model="sourceType" @change="onSourceTypeChange">
            <el-radio-button label="youtube">YouTube 播放列表</el-radio-button>
            <el-radio-button label="bilibili">B 站 BV 号</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="sourceType === 'youtube'" label="播放列表ID">
          <el-input v-model="videoForm.videoSourceId" placeholder="例如：PL8FB14A2200B87185"/>
          <div class="tip">填写 YouTube 播放列表 ID，前台按 index 定位第 N 条</div>
        </el-form-item>
        <el-form-item v-if="sourceType === 'bilibili'" label="BV 号">
          <el-input v-model="bvid" placeholder="例如：BV1qK4y1p7wG"/>
          <div class="tip">填写 B 站 BV 号，前台按章节内序号定位分P</div>
        </el-form-item>
        <el-form-item label="是否试听">
          <el-switch v-model="videoForm.free" active-text="免费" inactive-text="收费"/>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="videoForm.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="videoDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveVideo">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import courseApi from '@/api/edu/course'
import chapterApi from '@/api/edu/chapter'
import videoApi from '@/api/edu/video'

export default {
  data() {
    return {
      courseId: '',
      courseList: [],
      chapterList: [],
      listLoading: false,
      sourceType: 'youtube',
      bvid: '',
      pendingFetch: false,
      chapterDialog: { visible: false, title: '新增章节' },
      videoDialog: { visible: false, title: '新增课时' },
      chapterForm: { id: '', title: '', sort: 0, courseId: '' },
      videoForm: { id: '', title: '', chapterId: '', courseId: '', videoSourceId: '', sort: 0, free: true }
    }
  },

  created() {
    this.loadCourses()
    // 从课程列表点「章节」跳转过来时，路由带 courseId，自动选中并加载
    const routeId = this.$route.params && this.$route.params.id
    if (routeId) {
      this.courseId = routeId
      // 课程下拉数据是异步的，等列表到达后再拉章节
      this.pendingFetch = true
    }
  },

  methods: {
    loadCourses() {
      courseApi.getPageList(1, 100, {}).then(response => {
        if (response.success === true) {
          this.courseList = response.data.rows || []
          if (this.pendingFetch) {
            this.pendingFetch = false
            this.fetchData()
          }
        }
      })
    },

    fetchData() {
      if (!this.courseId) return
      this.listLoading = true
      chapterApi.nestedListByCourseId(this.courseId).then(response => {
        if (response.success === true) {
          this.chapterList = response.data.items || []
        }
        this.listLoading = false
      })
    },

    isYoutube(source) {
      return String(source || '').toUpperCase().indexOf('YT:') === 0
    },

    openChapterDialog(row) {
      if (row) {
        this.chapterDialog.title = '编辑章节'
        this.chapterForm = { id: row.id, title: row.title, sort: row.sort || 0, courseId: this.courseId }
      } else {
        this.chapterDialog.title = '新增章节'
        this.chapterForm = { id: '', title: '', sort: this.chapterList.length + 1, courseId: this.courseId }
      }
      this.chapterDialog.visible = true
    },

    saveChapter() {
      if (!this.chapterForm.title) {
        this.$message.warning('请输入章节名')
        return
      }
      const req = this.chapterForm.id
        ? chapterApi.updateById(this.chapterForm.id, this.chapterForm)
        : chapterApi.save(this.chapterForm)
      req.then(() => {
        this.$message({ type: 'success', message: '保存成功!' })
        this.chapterDialog.visible = false
        this.fetchData()
      })
    },

    openVideoDialog(row, chapterId) {
      if (row) {
        this.videoDialog.title = '编辑课时'
        this.videoForm = Object.assign({}, row, {
          chapterId: row.chapterId || chapterId || this.courseId,
          courseId: this.courseId
        })
        const src = this.videoForm.videoSourceId || ''
        if (String(src).toUpperCase().indexOf('YT:') === 0) {
          this.sourceType = 'youtube'
          this.videoForm.videoSourceId = src.substring(3)
        } else if (String(src).toUpperCase().indexOf('BI:') === 0) {
          this.sourceType = 'bilibili'
          this.bvid = src.substring(3)
          this.videoForm.videoSourceId = ''
        } else {
          this.sourceType = 'youtube'
          this.videoForm.videoSourceId = src
        }
      } else {
        this.videoDialog.title = '新增课时'
        this.sourceType = 'youtube'
        this.bvid = ''
        this.videoForm = {
          id: '', title: '', chapterId: chapterId || '', courseId: this.courseId,
          videoSourceId: '', sort: 0, free: true
        }
      }
      this.videoDialog.visible = true
    },

    onSourceTypeChange() {
      this.videoForm.videoSourceId = ''
      this.bvid = ''
    },

    saveVideo() {
      if (!this.videoForm.title) {
        this.$message.warning('请输入课时名称')
        return
      }
      if (this.sourceType === 'youtube') {
        if (!this.videoForm.videoSourceId) {
          this.$message.warning('请输入 YouTube 播放列表 ID')
          return
        }
        this.videoForm.videoSourceId = 'YT:' + this.videoForm.videoSourceId
      } else {
        if (!this.bvid) {
          this.$message.warning('请输入 B 站 BV 号')
          return
        }
        this.videoForm.videoSourceId = 'BI:' + this.bvid
      }
      const req = this.videoForm.id
        ? videoApi.updateById(this.videoForm.id, this.videoForm)
        : videoApi.save(this.videoForm)
      req.then(() => {
        this.$message({ type: 'success', message: '保存成功!' })
        this.videoDialog.visible = false
        this.fetchData()
      })
    },

    removeItem(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return row.children ? chapterApi.removeById(row.id) : videoApi.removeById(row.id)
      }).then(() => {
        this.fetchData()
        this.$message({ type: 'success', message: '删除成功!' })
      }).catch(response => {
        if (response === 'cancel') {
          this.$message({ type: 'info', message: '已取消删除' })
        }
      })
    }
  }
}
</script>

<style scoped>
.page-head {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.page-head-title {
  margin-left: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #2c7a5d;
}

.src-code {
  margin-left: 6px;
  font-size: 11px;
  color: #909399;
}

.tip {
  color: #909399;
  font-size: 12px;
  line-height: 1.6;
}
</style>
