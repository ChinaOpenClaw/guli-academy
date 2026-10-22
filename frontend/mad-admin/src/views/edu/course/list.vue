<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.title" placeholder="课程名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.teacherId" clearable placeholder="授课讲师" filterable>
          <el-option v-for="t in teacherList" :key="t.id" :label="t.name" :value="t.id"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.subjectParentId" clearable placeholder="一级分类" @change="onParentChange">
          <el-option v-for="s in subjectList" :key="s.id" :label="s.title" :value="s.id"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.subjectId" clearable placeholder="二级分类">
          <el-option v-for="s in currentSubjects" :key="s.id" :label="s.title" :value="s.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 统计卡片 -->
    <el-row :gutter="16" style="margin-bottom: 18px">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-num">{{ total }}</div>
          <div class="stat-label">课程总数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-num">{{ teacherList.length }}</div>
          <div class="stat-label">名师数量</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-num">{{ subjectList.length }}</div>
          <div class="stat-label">一级分类</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-num">{{ publishedCount }}</div>
          <div class="stat-label">已发布课程</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="封面" width="120" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.cover" class="cover-thumb" alt="封面">
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" min-width="220" show-overflow-tooltip/>

      <el-table-column label="分类" width="180">
        <template slot-scope="scope">
          <el-tag size="mini" type="info">{{ subjectName(scope.row.subjectParentId) }}</el-tag>
          <el-tag size="mini" style="margin-left:4px">{{ subjectName(scope.row.subjectId) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="讲师" width="110">
        <template slot-scope="scope">
          {{ teacherName(scope.row.teacherId) }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" width="80" align="center"/>

      <el-table-column label="价格" width="90" align="center">
        <template slot-scope="scope">
          <span v-if="Number(scope.row.price) === 0" class="free-tag">免费</span>
          <span v-else>¥ {{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'Normal' ? 'success' : 'warning'" size="mini">
            {{ scope.row.status === 'Normal' ? '已发布' : '未发布' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column label="操作" width="260" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/course/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <router-link :to="'/edu/course/content/'+scope.row.id">
            <el-button type="success" size="mini" icon="el-icon-tickets">章节</el-button>
          </router-link>
          <el-button v-if="scope.row.status !== 'Normal'" type="warning" size="mini" icon="el-icon-upload2" @click="publishCourse(scope.row.id)">发布</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

  </div>
</template>

<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import teacherListApi from '@/api/edu/teacherList'

export default {

  data() {
    return {
      listLoading: true,
      list: null,
      total: 0,
      page: 1,
      limit: 8,
      searchObj: {},
      subjectList: [], // 一级分类
      allSubjects: [], // 全部（含二级）
      teacherList: []
    }
  },

  computed: {
    currentSubjects() {
      if (!this.searchObj.subjectParentId) return []
      const parent = this.allSubjects.find(s => s.id === this.searchObj.subjectParentId)
      return parent ? parent.children || [] : []
    },
    publishedCount() {
      return this.list ? this.list.filter(c => c.status === 'Normal').length : 0
    }
  },

  created() {
    this.fetchData()
    this.loadSubjects()
    this.loadTeachers()
  },

  methods: {
    loadSubjects() {
      subject.getNestedList().then(response => {
        if (response.success === true) {
          this.subjectList = response.data.items || []
          this.allSubjects = this.flattenSubjects(this.subjectList)
        }
      })
    },

    flattenSubjects(list) {
      const result = []
      ;(list || []).forEach(s => {
        result.push(s)
        ;(s.children || []).forEach(c => result.push(c))
      })
      return result
    },

    loadTeachers() {
      teacherListApi.getList().then(response => {
        if (response.success === true) {
          this.teacherList = response.data.items || []
        }
      })
    },

    subjectName(id) {
      const hit = this.allSubjects.find(s => s.id === id)
      return hit ? hit.title : '-'
    },

    teacherName(id) {
      const hit = this.teacherList.find(t => t.id === id)
      return hit ? hit.name : '-'
    },

    onParentChange() {
      // 切换一级分类时清空二级分类，避免查询条件冲突
      this.searchObj.subjectId = ''
    },

    fetchData(page = 1) {
      this.page = page
      this.listLoading = true
      course.getPageList(this.page, this.limit, this.searchObj).then(response => {
        if (response.success === true) {
          this.list = response.data.rows
          this.total = response.data.total
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },

    resetData() {
      this.searchObj = {}
      this.fetchData()
    },

    publishCourse(id) {
      this.$confirm('发布后该课程将在前台可见, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return course.publishCourseById(id)
      }).then(() => {
        this.fetchData()
        this.$message({ type: 'success', message: '发布成功!' })
      }).catch(response => {
        if (response === 'cancel') {
          this.$message({ type: 'info', message: '已取消' })
        }
      })
    },

    removeDataById(id) {
      this.$confirm('此操作将永久删除该课程及其章节课时, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return course.removeById(id)
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
.cover-thumb {
  width: 96px;
  height: 54px;
  object-fit: cover;
  border-radius: 4px;
  background: #f0f2f5;
}

.free-tag {
  color: #67c23a;
  font-weight: 600;
}

.stat-card {
  text-align: center;
}

.stat-num {
  font-size: 28px;
  font-weight: 700;
  color: #2c7a5d;
  line-height: 1.4;
}

.stat-label {
  color: #909399;
  font-size: 13px;
}
</style>
