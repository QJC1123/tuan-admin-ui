import request from '@/utils/request'

// 查询教职工信息列表
export function listTeacher(query) {
  return request({
    url: '/basicinfo/teacher/list',
    method: 'get',
    params: query,
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 查询教职工信息详细
export function getTeacher(id) {
  return request({
    url: '/basicinfo/teacher/' + id,
    method: 'get',
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 新增教职工信息
export function addTeacher(data) {
  return request({
    url: '/basicinfo/teacher',
    method: 'post',
    data: data,
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 修改教职工信息
export function updateTeacher(data) {
  return request({
    url: '/basicinfo/teacher',
    method: 'put',
    data: data,
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 删除教职工信息
export function delTeacher(id) {
  return request({
    url: '/basicinfo/teacher/' + id,
    method: 'delete',
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 导出教职工信息
export function exportTeacher(query) {
  return request({
    url: '/basicinfo/teacher/export',
    method: 'get',
    params: query,
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}