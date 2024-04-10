import request from '@/utils/request'

// 查询设施信息列表
export function listDevice(query) {
  return request({
    url: '/basicinfo/device/list',
    method: 'get',
    params: query,
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 查询设施信息详细
export function getDevice(id) {
  return request({
    url: '/basicinfo/device/' + id,
    method: 'get',
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 新增设施信息
export function addDevice(data) {
  return request({
    url: '/basicinfo/device',
    method: 'post',
    data: data,
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 修改设施信息
export function updateDevice(data) {
  return request({
    url: '/basicinfo/device',
    method: 'put',
    data: data,
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 删除设施信息
export function delDevice(id) {
  return request({
    url: '/basicinfo/device/' + id,
    method: 'delete',
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 导出设施信息
export function exportDevice(query) {
  return request({
    url: '/basicinfo/device/export',
    method: 'get',
    params: query,
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}