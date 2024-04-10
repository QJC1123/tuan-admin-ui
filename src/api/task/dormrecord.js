import request from '@/utils/request'

// 查询考勤记录列表
export function listDormrecord(query) {
  return request({
    url: '/task/dormrecord/list',
    method: 'get',
    params: query
  })
}

// 查询考勤记录详细
export function getDormrecord(id) {
  return request({
    url: '/task/dormrecord/' + id,
    method: 'get'
  })
}

// 新增考勤记录
export function addDormrecord(data) {
  return request({
    url: '/task/dormrecord',
    method: 'post',
    data: data
  })
}

// 修改考勤记录
export function updateDormrecord(data) {
  return request({
    url: '/task/dormrecord',
    method: 'put',
    data: data
  })
}

// 删除考勤记录
export function delDormrecord(id) {
  return request({
    url: '/task/dormrecord/' + id,
    method: 'delete'
  })
}

// 导出考勤记录
export function exportDormrecord(query) {
  return request({
    url: '/task/dormrecord/export',
    method: 'get',
    params: query
  })
}