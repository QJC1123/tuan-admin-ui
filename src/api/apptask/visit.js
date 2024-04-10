import request from '@/utils/request'


// 学校分页查询
export function listVisitby(pn,pagesize) {
  return request({
    url: '/visitor/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 学校分页模糊查询
export function listVisitbypr(pn,pagesize,query) {
	
  return request({
    url: '/visitor/'+pn+'/'+pagesize,
    method: 'get',
	params:query,
  })
}



// 分页查询
export function listVisit(pn,pagesize) {
  return request({
    url: '/visitor/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 查询详细
export function getVisit(id) {
  return request({
    url: '/visitor/' + id,
    method: 'get',
  })
}

// 新增
export function addVisit(data) {
  return request({
    url: '/visitor',
    method: 'post',
    data: data,
  })
}

// 修改
export function updateVisit(id,data) {
  return request({
    url: '/visitor/'+id,
    method: 'put',
    data: data,
  })
}

// 删除
export function delVisit(id) {
  return request({
    url: '/visitor/' + id,
    method: 'delete',
  })
}
