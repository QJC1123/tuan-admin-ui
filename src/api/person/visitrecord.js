import request from '@/utils/request'

// 查询访客记录列表
export function listVisitrecord(query) {
  return request({
    url: '/person/visitrecord/list',
    method: 'get',
    params: query
  })
}

// 查询访客记录详细
export function getVisitrecord(id) {
  return request({
    url: '/person/visitrecord/' + id,
    method: 'get'
  })
}

// 新增访客记录
export function addVisitrecord(data) {
  return request({
    url: '/person/visitrecord',
    method: 'post',
    data: data
  })
}

// 修改访客记录
export function updateVisitrecord(data) {
  return request({
    url: '/person/visitrecord',
    method: 'put',
    data: data
  })
}

// 删除访客记录
export function delVisitrecord(id) {
  return request({
    url: '/person/visitrecord/' + id,
    method: 'delete'
  })
}
