import request from '@/utils/request'

// 查询车辆信息列表
export function listCar(query) {
  return request({
    url: '/basicinfo/car/list',
    method: 'get',
    params: query,
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 查询车辆信息详细
export function getCar(id) {
  return request({
    url: '/basicinfo/car/' + id,
    method: 'get',
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 新增车辆信息
export function addCar(data) {
  return request({
    url: '/basicinfo/car',
    method: 'post',
    data: data,
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 修改车辆信息
export function updateCar(data) {
  return request({
    url: '/basicinfo/car',
    method: 'put',
    data: data,
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 删除车辆信息
export function delCar(id) {
  return request({
    url: '/basicinfo/car/' + id,
    method: 'delete',
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 导出车辆信息
export function exportCar(query) {
  return request({
    url: '/basicinfo/car/export',
    method: 'get',
    params: query,
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}