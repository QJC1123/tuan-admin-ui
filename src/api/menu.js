import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get',
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}