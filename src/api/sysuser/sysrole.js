import request from '@/utils/request'



// 学校分页查询
export function listRoleby(pn,pagesize) {
  return request({
    url: '/role/bycondition/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 学校分页模糊查询
export function listRolebypr(pn,pagesize,query) {
	
  return request({
    url: '/role/bycondition/'+pn+'/'+pagesize,
    method: 'get',
	params:query,
  })
}



// 分页查询
export function listRole(pn,pagesize) {
  return request({
    url: '/role/'+pn+'/'+pagesize,
    method: 'get',
	// target: process.env.VUE_APP_BASE_API2
  })
}

// 查询详细
export function getRole(id) {
  return request({
    url: '/role/' + id,
    method: 'get',
	// target: process.env.VUE_APP_BASE_API2
  })
}

// 新增
export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data: data,
	// target: process.env.VUE_APP_BASE_API2
  })
}

// 修改
export function updateRole(id,data) {
  return request({
    url: '/role/'+id,
    method: 'put',
    data: data,
	// target: process.env.VUE_APP_BASE_API2
  })
}

// 删除
export function delRole(id) {
  return request({
    url: '/role/' + id,
    method: 'delete',
	// baseURL: process.env.VUE_APP_BASE_API2
  })
}
