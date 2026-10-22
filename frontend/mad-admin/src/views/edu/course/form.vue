<template>
  <div>
    <div class="app-container">
      <el-form label-width="120px">

        <el-form-item label="课程名称">
          <el-input v-model="course.title" placeholder="请输入课程名称"/>
        </el-form-item>

        <el-form-item label="授课讲师">
          <el-select v-model="course.teacherId" filterable placeholder="请选择讲师" style="width: 100%">
            <el-option v-for="t in teacherList" :key="t.id" :label="t.name" :value="t.id">
              <span>{{ t.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 12px">{{ t.intro }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select v-model="course.subjectParentId" placeholder="请选择一级分类" style="width: 100%" @change="onParentChange">
            <el-option v-for="s in subjectList" :key="s.id" :label="s.title" :value="s.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="course.subjectId" placeholder="请选择二级分类" style="width: 100%">
            <el-option v-for="s in currentSubjects" :key="s.id" :label="s.title" :value="s.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="课程价格">
          <el-input-number v-model="course.price" :min="0" :precision="2" :step="100" controls-position="right"/>
          <span class="tip">填 0 表示免费公开课</span>
        </el-form-item>

        <el-form-item label="课时总数">
          <el-input-number v-model="course.lessonNum" :min="0" :max="999" controls-position="right"/>
        </el-form-item>

        <el-form-item label="课程封面">
          <pan-thumb :image="course.cover"/>
          <el-button type="primary" icon="upload" @click="imagecropperShow=true">更换封面</el-button>

          <image-cropper
            v-show="imagecropperShow"
            :width="450"
            :height="253"
            :key="imagecropperKey"
            :url="BASE_API+'/admin/oss/file/upload'"
            :max-size="2048"
            field="file"
            @close="close"
            @crop-upload-success="cropSuccess"/>
        </el-form-item>

        <el-form-item label="课程简介">
          <el-input
            v-model="course.description"
            :rows="10"
            type="textarea"
            placeholder="介绍课程大纲、适合人群、实战项目与学习收获"/>
        </el-form-item>

        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
          <el-button @click="$router.push({ path: '/edu/course' })">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import teacherListApi from '@/api/edu/teacherList'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      course: {
        title: '',
        teacherId: '',
        subjectId: '',
        subjectParentId: '',
        price: 0,
        lessonNum: 0,
        cover: '/photo/course/01.jpg',
        description: ''
      },
      subjectList: [],
      allSubjects: [],
      teacherList: [],
      saveBtnDisabled: false,
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.BASE_API
    }
  },

  computed: {
    currentSubjects() {
      if (!this.course.subjectParentId) return []
      const parent = this.allSubjects.find(s => s.id === this.course.subjectParentId)
      return parent ? parent.children || [] : []
    }
  },

  created() {
    this.loadSubjects()
    this.loadTeachers()
    if (this.$route.params && this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },

  methods: {
    loadSubjects() {
      subject.getNestedList().then(response => {
        if (response.success === true) {
          this.subjectList = response.data.items || []
          this.allSubjects = []
          this.subjectList.forEach(s => {
            this.allSubjects.push(s)
            ;(s.children || []).forEach(c => this.allSubjects.push(c))
          })
        }
      })
    },

    loadTeachers() {
      teacherListApi.getList().then(response => {
        if (response.success === true) {
          this.teacherList = response.data.items || []
        }
      })
    },

    onParentChange() {
      this.course.subjectId = ''
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.course.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    saveData() {
      course.saveCourseInfo(this.course).then(() => {
        this.$message({ type: 'success', message: '保存成功!' })
      }).then(() => {
        this.$router.push({ path: '/edu/course' })
      }).catch(() => {
        this.saveBtnDisabled = false
      })
    },

    fetchDataById(id) {
      course.getCourseInfoById(id).then(response => {
        if (response.success === true) {
          const item = response.data.item
          this.course = Object.assign({}, this.course, item, {
            price: Number(item.price),
            lessonNum: item.lessonNum || 0
          })
        }
      })
    },

    updateData() {
      course.updateCourseInfoById(this.course.id, this.course).then(() => {
        this.$message({ type: 'success', message: '修改成功!' })
      }).then(() => {
        this.$router.push({ path: '/edu/course' })
      }).catch(() => {
        this.saveBtnDisabled = false
      })
    },

    cropSuccess(data) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.course.cover = data.url
    },

    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    }
  }
}
</script>

<style scoped>
.tip {
  color: #909399;
  font-size: 12px;
  margin-left: 12px;
}
</style>
