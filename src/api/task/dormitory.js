import request from '@/utils/request'

// 查询宿舍考勤列表
export function listDormitory(query) {
  return request({
    url: '/task/dormitory/list',
    method: 'get',
    params: query
  })
}

// 查询宿舍考勤详细
export function getDormitory(id) {
  return request({
    url: '/task/dormitory/' + id,
    method: 'get'
  })
}

// 新增宿舍考勤
export function addDormitory(data) {
  return request({
    url: '/task/dormitory',
    method: 'post',
    data: data
  })
}

// 修改宿舍考勤
export function updateDormitory(data) {
  return request({
    url: '/task/dormitory',
    method: 'put',
    data: data
  })
}

// 删除宿舍考勤
export function delDormitory(id) {
  return request({
    url: '/task/dormitory/' + id,
    method: 'delete'
  })
}

// 导出宿舍考勤
export function exportDormitory(query) {
  return request({
    url: '/task/dormitory/export',
    method: 'get',
    params: query
  })
}