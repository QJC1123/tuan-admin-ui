import request from '@/utils/request'

// 分页查询
export function listSchool(pn,pagesize) {
  return request({
    url: '/school/'+pn+'/'+pagesize,
    method: 'get',
	baseURL: process.env.VUE_APP_BASE_API2
  })
}

// 查询详细
export function getSchool(id) {
  return request({
    url: '/school/' + id,
    method: 'get',
	baseURL: process.env.VUE_APP_BASE_API2
  })
}

// 新增
export function addSchool(data) {
  return request({
    url: '/school',
    method: 'post',
    data: data,
	baseURL: process.env.VUE_APP_BASE_API2
  })
}

// 修改
export function updateSchool(id,data) {
  return request({
    url: '/school/'+id,
    method: 'put',
    data: data
  })
}

// 删除
export function delSchool(id) {
  return request({
    url: '/school/' + id,
    method: 'delete',
	baseURL: process.env.VUE_APP_BASE_API2
  })
}
