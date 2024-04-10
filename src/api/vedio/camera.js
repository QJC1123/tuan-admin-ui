import request from '@/utils/request'

// 学校分页查询
export function listCameraby(pn,pagesize) {
  return request({
    url: '/camera/bycondition/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 学校分页模糊查询
export function listCamerabypr(pn,pagesize,query) {
  return request({
    url: '/camera/bycondition/'+pn+'/'+pagesize,
    method: 'get',
	params:query,
  })
}



// 分页查询
export function listCamera(pn,pagesize) {
  return request({
    url: '/camera/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 查询详细
export function getCamera(id) {
  return request({
    url: '/camera/' + id,
    method: 'get',
  })
}

// 新增
export function addCamera(data) {
  return request({
    url: '/camera',
    method: 'post',
    data: data,
  })
}

// 修改
export function updateCamera(id,data) {
  return request({
    url: '/camera/'+id,
    method: 'put',
    data: data,
  })
}

// 删除
export function delCamera(id) {
  return request({
    url: '/camera/' + id,
    method: 'delete',
  })
}




// 
//根据摄像头和时间查MP4
export function getVideomp4bydate(cameraid,date) {
  return request({
	url:'/video/getmp4/'+cameraid+'/'+date,
  method: 'get',
  })
}


// 保存mp4到摄像头
export function saveVideomp4bycid(cameraid,data) {
  return request({
    url: '/video/savemp4/'+cameraid,
    method: 'post',
    data: data,
  })
}


//获取摄像头所有视频
export function getVideomp4byvid(videoid) {
  return request({
	url:'/video/getmp4/'+videoid,
  method: 'get',
  })
}



// 学校分页查询
export function listVideoby(pn,pagesize) {
  return request({
    url: '/video/bycondition/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 学校分页模糊查询
export function listVideobypr(pn,pagesize,query) {
  return request({
    url: '/video/bycondition/'+pn+'/'+pagesize,
    method: 'get',
	params:query,
  })
}



// 分页查询
export function listVideo(pn,pagesize) {
  return request({
    url: '/video/'+pn+'/'+pagesize,
    method: 'get',
  })
}

// 查询详细
export function getVideo(id) {
  return request({
    url: '/video/' + id,
    method: 'get',
  })
}

// 新增
export function addVideo(data) {
  return request({
    url: '/video',
    method: 'post',
    data: data,
  })
}

// 修改
export function updateVideo(id,data) {
  return request({
    url: '/video/'+id,
    method: 'put',
    data: data,
  })
}

// 删除
export function delVideo(id) {
  return request({
    url: '/video/' + id,
    method: 'delete',
  })
}
