import request from '@/utils/request'

// 查询学生信息列表
export function listStudent(query) {
  return request({
    url: '/basicinfo/student/list',
    method: 'get',
    params: query,
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 查询学生信息详细
export function getStudent(id) {
  return request({
    url: '/basicinfo/student/' + id,
    method: 'get',
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 新增学生信息
export function addStudent(data) {
  return request({
    url: '/basicinfo/student',
    method: 'post',
    data: data,
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 修改学生信息
export function updateStudent(data) {
  return request({
    url: '/basicinfo/student',
    method: 'put',
    // data: data,baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 删除学生信息
export function delStudent(id) {
  return request({
    url: '/basicinfo/student/' + id,
    method: 'delete',
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 导出学生信息
export function exportStudent(query) {
  return request({
    url: '/basicinfo/student/export',
    method: 'get',
    params: query,
		// baseURL: process.env.VUE_APP_BASE_API3
  })
}