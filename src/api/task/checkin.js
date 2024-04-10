import request from '@/utils/request'

checkin
// 学校分页查询
export function listCheckinby(pn,pagesize) {
  return request({
    url: '/checkin/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 学校分页模糊查询
export function listCheckinbypr(pn,pagesize,query) {
	
  return request({
    url: '/checkin/'+pn+'/'+pagesize,
    method: 'get',
	params:query,
  })
}



// 分页查询
export function listCheckin(pn,pagesize) {
  return request({
    url: '/checkin/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 查询详细
export function getCheckin(id) {
  return request({
    url: '/checkin/' + id,
    method: 'get',
  })
}

// 新增
export function addCheckin(data) {
  return request({
    url: '/checkin',
    method: 'post',
    data: data,
  })
}

// 修改
export function updateCheckin(id,data) {
  return request({
    url: '/checkin/'+id,
    method: 'put',
    data: data,
  })
}

// 删除
export function delCheckin(id) {
  return request({
    url: '/checkin/' + id,
    method: 'delete',
  })
}
