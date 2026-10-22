import request from '@/utils/request'

const api_name = '/admin/edu/subject'

export default {
  // 嵌套分类列表（两级：一级分类 → 二级分类）
  getNestedList() {
    return request({
      url: `${api_name}/list2`,
      method: 'get'
    })
  },

  // 嵌套分类列表（旧版结构）
  getNestedListV1() {
    return request({
      url: `${api_name}/list`,
      method: 'get'
    })
  }
}
