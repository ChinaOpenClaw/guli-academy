import request from '@/utils/request'

const api_name = '/admin/edu/video'

export default {
  // 新增课时
  save(videoForm) {
    return request({
      url: `${api_name}/save-video-info`,
      method: 'post',
      data: videoForm
    })
  },

  // 根据ID查询课时
  getById(id) {
    return request({
      url: `${api_name}/video-info/${id}`,
      method: 'get'
    })
  },

  // 更新课时
  updateById(id, videoForm) {
    return request({
      url: `${api_name}/update-video-info/${id}`,
      method: 'put',
      data: videoForm
    })
  },

  // 根据ID删除课时
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  }
}
