import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = [
	'/login',
 '/auth-redirect', 
 '/bind',
	'/register',
	'/index',
	'/edb',
'/user/profile',


'/vedio/vedio/imdvideo',
'/vedio/vedio/vedio',
'/vedio/vedio/manage',

'/basicinfo/basicinfo/student',
'/basicinfo/basicinfo/teacher',
'/basicinfo/basicinfo/device',
'/basicinfo/basicinfo/car',


'/alarm/alarm/event',
'/alarm/alarm/detect',
'/alarm/alarm/analysis',
'/alarm/alarm/rule',
'/alarm/alarm/test',
'/alarm/alarm/alarmtemplate',


'/task/task/dorm',
'/task/task/event',
'/task/task/visit',
'/task/task/duty',

'/sysuser/sysuser/userinfo',
'/sysuser/sysuser/role',



'/sysmonitor/sysmonitor/monitor',
'/sysmonitor/sysmonitor/opelog',

]

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } 
	else{
		if(from.path === '/login'){
			next();
			return;
		}
		if(from.path === '/edb'){
			next();
			return;
		}
		if(to.path === '/index'){
			next();
			return;
		}
		if(to.path === '/alarm/alarm/rule'){
			next();
			return;
		}
		if(to.path === '/alarm/alarm/detect'){
			next();
			return;
		}
		if(to.path === '/alarm/alarm/event'){
			next();
			return;
		}
		if(to.path === '/alarm/alarm/analysis'){
			next();
			return;
		}
		if(to.path === '/alarm/alarm/alarmtemplate'){
			next();
			return;
		}
		if(to.path === '/alarm/alarm/test'){
			next();
			return;
		}
		if(to.path === '/task/task/dorm'){
			next();
			return;
		}
		
		
		
		
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => {
        // 拉取user_info
		//  const roles = res.roles
		  // if(res.data.roleId == 1){
		  // 	let roles = ["admin"]
		  // }
		
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
			router.addRoutes(accessRoutes) // 动态添加可访问路由表
			
			 if(from.path=="/edb"){
			// 如果是从自定义页面跳转过去,就跳转至动态路由的第一个路由
			   next();
			   return;
			}else{
				next();
				return;
				// next();
				// return;
				//next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
			}
          })
        }).catch(err => {
            store.dispatch('LogOut').then(() => {
              Message.error(err)
              next({ path: '/' })
            })
          })
      } else {
        // next()
		next();
		return;
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
