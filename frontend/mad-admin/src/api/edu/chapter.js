import request from '@/utils/request'

const api_name = '/admin/edu/chapter'

export default {
  // 新增章节
  save(chapter) {
    return request({
      url: api_name,
      method: 'post',
      data: chapter
    })
  },

  // 根据ID查询章节
  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },

  // 根据ID修改章节
  updateById(id, chapter) {
    return request({
      url: `${api_name}/${id}`,
      method: 'put',
      data: chapter
    })
  },

  // 根据ID删除章节
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },

  // 按课程获取章节-课时嵌套列表
  nestedListByCourseId(courseId) {
    return request({
      url: `${api_name}/nested-list/${courseId}`,
      method: 'get'
    })
  }
}
