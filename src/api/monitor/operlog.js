import request from '@/utils/request'
// import request_proxy from '@/utils/request-proxy'

// 查询操作日志列表
export function list(query) {
  return request({
    url: '/monitor/operlog/list',
    method: 'get',
    params: query,
	// baseURL: process.env.VUE_APP_BASE_API3,
	// target:'process.env.VUE_APP_BASE_API3,'
  })
}

// 删除操作日志
export function delOperlog(operId) {
  return request({
    url: '/monitor/operlog/' + operId,
    method: 'delete',
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/monitor/operlog/clean',
    method: 'delete',
	// baseURL: process.env.VUE_APP_BASE_API3
  })
}

// 导出操作日志
export function exportOperlog(query) {
  return request({
    url: '/monitor/operlog/export',
    method: 'get',
    params: query,
		
  })
}