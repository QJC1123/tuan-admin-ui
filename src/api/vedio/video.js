

import request from '@/utils/request'

// 

//根据摄像头和时间查MP4
export function getVideomp4bydate(cameraid,date) {
  return request({
	url:'/video/getmp4/'+cameraid+'/'+date,
  method: 'get',
  })
}