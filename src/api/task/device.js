import request from '@/utils/request'



// 学校分页查询
export function listFDeviceby(pn,pagesize) {
  return request({
    url: '/faultfacility/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 学校分页模糊查询
export function listFDevicebypr(pn,pagesize,query) {
  return request({
    url: '/faultfacility/'+pn+'/'+pagesize,
    method: 'get',
	params:query,
  })
}



// 分页查询
export function listFDevice(pn,pagesize) {
  return request({
    url: '/faultfacility/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 查询详细
export function getFDevice(id) {
  return request({
    url: '/faultfacility/' + id,
    method: 'get',
  })
}

// 新增
export function addFDevice(data) {
  return request({
    url: '/faultfacility',
    method: 'post',
    data: data,
  })
}

// 修改
export function updateFDevice(id,data) {
  return request({
    url: '/faultfacility/'+id,
    method: 'put',
    data: data,
  })
}

// 删除
export function delFDevice(id) {
  return request({
    url: '/faultfacility/' + id,
    method: 'delete',
  })
}
