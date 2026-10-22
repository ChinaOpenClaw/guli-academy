<template>
  <div class="app-container">

    <el-alert
      title="MAD网课系统课程分类：金融投资 / IT工程 / 人工智能 三大方向，二级分类用于课程归类。"
      type="info"
      :closable="false"
      show-icon
      style="margin-bottom: 16px"/>

    <el-row :gutter="16">
      <el-col :span="12">
        <el-card shadow="never" class="tree-card">
          <div slot="header">
            <span class="card-title">分类树</span>
          </div>
          <el-tree
            :data="subjectTree"
            :props="{ label: 'title', children: 'children' }"
            default-expand-all
            node-key="id">
            <span slot-scope="{ data }" class="tree-node">
              <span>{{ data.title }}</span>
              <span class="tree-id">ID: {{ data.id }}</span>
            </span>
          </el-tree>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="never" class="tree-card">
          <div slot="header">
            <span class="card-title">课程归属统计</span>
          </div>
          <el-table :data="statRows" border fit size="small">
            <el-table-column prop="parent" label="一级分类" width="120"/>
            <el-table-column prop="child" label="二级分类" width="140"/>
            <el-table-column prop="count" label="课程数" width="80" align="center"/>
            <el-table-column prop="courseTitles" label="课程" show-overflow-tooltip/>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import subject from '@/api/edu/subject'
import courseApi from '@/api/edu/course'

export default {
  data() {
    return {
      subjectTree: [],
      courses: []
    }
  },

  computed: {
    statRows() {
      const rows = []
      this.subjectTree.forEach(parent => {
        ;(parent.children || []).forEach(child => {
          const matched = this.courses.filter(c => c.subjectId === child.id)
          rows.push({
            parent: parent.title,
            child: child.title,
            count: matched.length,
            courseTitles: matched.map(c => c.title).join('、') || '—'
          })
        })
      })
      return rows
    }
  },

  created() {
    this.loadData()
  },

  methods: {
    loadData() {
      subject.getNestedList().then(response => {
        if (response.success === true) {
          this.subjectTree = response.data.items || []
        }
      })
      courseApi.getPageList(1, 100, {}).then(response => {
        if (response.success === true) {
          this.courses = response.data.rows || []
        }
      })
    }
  }
}
</script>

<style scoped>
.tree-card {
  min-height: 420px;
}

.card-title {
  font-weight: 600;
  color: #2c7a5d;
}

.tree-node {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.tree-id {
  color: #c0c4cc;
  font-size: 12px;
}
</style>
