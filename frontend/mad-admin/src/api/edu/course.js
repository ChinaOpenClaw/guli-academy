import request from '@/utils/request'

const api_name = '/admin/edu/course'

export default {
  // 分页课程列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  // 所有课程列表（下拉选择用）
  getList() {
    return request({
      url: api_name,
      method: 'get'
    })
  },

  // 根据ID删除课程
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },

  // 新增课程基本信息（返回 courseId）
  saveCourseInfo(courseInfoForm) {
    return request({
      url: `${api_name}/save-course-info`,
      method: 'post',
      data: courseInfoForm
    })
  },

  // 根据ID查询课程基本信息（含简介）
  getCourseInfoById(id) {
    return request({
      url: `${api_name}/course-info/${id}`,
      method: 'get'
    })
  },

  // 更新课程基本信息
  updateCourseInfoById(id, courseInfoForm) {
    return request({
      url: `${api_name}/update-course-info/${id}`,
      method: 'put',
      data: courseInfoForm
    })
  },

  // 根据ID获取课程发布信息
  getCoursePublishInfoById(id) {
    return request({
      url: `${api_name}/course-publish-info/${id}`,
      method: 'get'
    })
  },

  // 发布课程
  publishCourseById(id) {
    return request({
      url: `${api_name}/publish-course/${id}`,
      method: 'put'
    })
  }
}
