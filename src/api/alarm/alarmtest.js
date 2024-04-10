import request from '@/utils/request'



// 告警测试使用，传入rtspurl，保存为一张图像保存进camera数据
// 新增
export function testsavecamera(data) {
  return request({
    url: 'camera/alarmtestrtsp',
    method: 'post',
    data: data,
  })
}


// 告警测试使用，传入cameraid，获取对应图像  get

export function testgetimg(id) {
  return request({
	url:'/camera/alarmtestimg/'+id,
	method: 'get',
	responseType:"blob"
  })
}


// 告警测试使用，更新摄像头数据，lable，xy，time等信息
//修改
export function testupdatecamera(id,data) {
  return request({
	url:'/camera/alarmtestlable/'+id,
    method: 'put',
    data: data,
  })
}


// 告警测试结果信息
// GET /alarm/alarmtestgetalarms/{id}
// 告警测试使用，返回对应告警测试的的告警信息,传入摄像头数据
export function testlistalarm(id) {
  return request({
    url: '/alarm/alarmtestgetalarms/'+id,
    method: 'get',
  })
}




export function testalarmmp4(id) {
  return request({
    url: '/detection/getmp4/'+id,
    method: 'get',
  })
}