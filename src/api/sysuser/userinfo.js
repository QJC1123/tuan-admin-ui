import request from '@/utils/request'

// 学校分页查询
export function listUserby(pn,pagesize) {
  return request({
    url: '/user/bycondition/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 学校分页模糊查询
export function listUserbypr(pn,pagesize,param) {
  return request({
    url: '/user/bycondition/'+pn+'/'+pagesize,
    method: 'get',
	params:param
  })
}

// 分页查询
export function listUser(pn,pagesize) {
  return request({
    url: '/user/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 查询详细
export function getUser(id) {
  return request({
    url: '/user/' + id,
    method: 'get',
	// baseURL: process.env.VUE_APP_BASE_API2
  })
}

// 新增
export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data: data,
	// baseURL: process.env.VUE_APP_BASE_API2
  })
}

// 修改
export function updateUser(id,data) {
  return request({
    url: '/user/'+id,
    method: 'put',
    data: data,
	// baseURL: process.env.VUE_APP_BASE_API2
  })
}

// 删除
export function delUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete',
	// baseURL: process.env.VUE_APP_BASE_API2
  })
}
