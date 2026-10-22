import request from '@/utils/request'

const api_name = '/admin/edu/teacher'

export default {
  // 全量讲师列表（课程表单下拉用）
  getList() {
    return request({
      url: api_name,
      method: 'get'
    })
  }
}
