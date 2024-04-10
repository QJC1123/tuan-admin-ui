import request from '@/utils/request'

// 查询寝室考勤列表
export function listDomitory(query) {
  return request({
    url: '/person/domitory/list',
    method: 'get',
    params: query
  })
}

// 查询寝室考勤详细
export function getDomitory(id) {
  return request({
    url: '/person/domitory/' + id,
    method: 'get'
  })
}

// 新增寝室考勤
export function addDomitory(data) {
  return request({
    url: '/person/domitory',
    method: 'post',
    data: data
  })
}

// 修改寝室考勤
export function updateDomitory(data) {
  return request({
    url: '/person/domitory',
    method: 'put',
    data: data
  })
}

// 删除寝室考勤
export function delDomitory(id) {
  return request({
    url: '/person/domitory/' + id,
    method: 'delete'
  })
}
