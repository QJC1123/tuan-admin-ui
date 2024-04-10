import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import ParentView from '@/components/ParentView';

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '/edb',
    component: (resolve) => require(['@/views/edb'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/index'], resolve),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  // {
  //   path: '/dict',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'type/data/:dictId(\\d+)',
  //       component: (resolve) => require(['@/views/system/dict/data'], resolve),
  //       name: 'Data',
  //       meta: { title: '字典数据', icon: '' }
  //     }
  //   ]
  // },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require(['@/views/monitor/job/log'], resolve),
        name: 'JobLog',
        meta: { title: '调度日志' }
      }
    ]
  },
  // {
  //   path: '/gen',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'edit/:tableId(\\d+)',
  //       component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
  //       name: 'GenEdit',
  //       meta: { title: '修改生成配置' }
  //     }
  //   ]
  // },
  
  {
  	path: '/basicinfo',
  	component: Layout,
  	meta: { title: '基础信息',icon:'dict' },
  	children: [
  	{
  	 path: 'basicinfo/student',
  	 component: () => import('@/views/basicinfo/student/index'),
  	 // name: 'ImdVideoWatch',
  	 meta: { title: '学生信息' }
  	},
  	{
  	 path: 'basicinfo/teacher',
  	 component: () => import('@/views/basicinfo/teacher/index'),
  	 // name: 'VideoWatch',
  	 meta: { title: '教职工信息' }
  	},
  	{
  	 path: 'basicinfo/device',
  	 component: () => import('@/views/basicinfo/device/index'),
  	 // name: 'VideoWatch',
  	 meta: { title: '设备信息' }
  	},
  	{
  	 path: 'basicinfo/car',
  	 component: () => import('@/views/basicinfo/car/index'),
  	 // name: 'VideoWatch',
  	 meta: { title: '车辆信息' }
  	},
  	{
  	 path: 'basicinfo/cook',
  	 component: () => import('@/views/basicinfo/cook/index'),
  	 // name: 'VideoWatch',
  	 meta: { title: '食堂卫生' }
  	},
   ]
  },
  {
  	path: '/vedio',
  	component: Layout,
  	meta: { title: '校园监控',icon:'eye-open' },
  	children: [
  	{
  	 path: 'vedio/imdvideo',
  	 component: () => import('@/views/vedio/imdvideo/index'),
  	 name: 'ImdVideoWatch',
  	 meta: { title: '实时监控' }
  	},
  	{
  	 path: 'vedio/vedio',
  	 component: () => import('@/views/vedio/vedio/index'),
  	 name: 'VideoWatch',
  	 meta: { title: '监控回放' }
  	},
	{
	 path: 'vedio/manage',
	 component: () => import('@/views/vedio/manage/index'),
	 name: 'Videomanage',
	 meta: { title: '监控设备' }
	}
   ]
  },
  {
  	path: '/alarm',
  	component: Layout,
  	meta: { title: '告警中心',icon:'radio' },
  	children: [
  	{
  	 path: 'alarm/event',
  	 component: () => import('@/views/alarm/event/index'),
  	 // name: 'ImdVideoWatch',
  	 meta: { title: '告警事件' }
  	},
  	{
  	 path: 'alarm/rule',
  	 component: () => import('@/views/alarm/rule/index'),
  	 // name: 'VideoWatch',
  	 meta: { title: '通知规则' }
  	},
	// {
	//  path: 'alarm/detect',
	//  component: () => import('@/views/alarm/detect/index'),
	 
	//  meta: { title: '检测配置' }
	// },
	{
		 path: 'alarm/test',
		 component: () => import('@/views/alarm/test/index'),
		 name: 'AlarmTest',
		 meta: { title: '告警测试' }
	},
	{
	 path: 'alarm/analysis',
	 component: () => import('@/views/alarm/analysis/index'),
	 
	 meta: { title: '告警分析' }
	},
	{
		path: 'alarm/alarmtemplate',
		component: () => import('@/views/alarm/rule/alarmtemplate'),
		name: 'AlarmTemplateCreate',
		meta: { title: '' }
	}
   ]
  },
  // {
  // 	path: '/alarm',
  // 	component: Layout,
  // 	children: [
  // 	{
  // 	 path: 'alarm/alarmtemplate',
  // 	 component: () => import('@/views/alarm/rule/alarmtemplate'),
  // 	 name: 'AlarmTemplateCreate',
  // 	}
  //  ]
  // },
  {
  	path: '/task',
  	component: Layout,
  	meta: { title: '安防任务',icon:'list' },
  	children: [
  	{
  	 path: 'task/dorm',
  	 component: () => import('@/views/task/dormitory/index'),
  	 // name: 'ImdVideoWatch',
  	 meta: { title: '归寝考勤' }
  	},
  	{
  	 path: 'task/event',
  	 component: () => import('@/views/task/event/index'),
  	 // name: 'VideoWatch',
  	 meta: { title: '隐患排查' }
  	},
	{
	 path: 'task/visit',
	 component: () => import('@/views/task/visit/index'),
	 // name: 'VideoWatch',
	 meta: { title: '访客管理' }
	},
	{
	 path: 'task/duty',
	 component: () => import('@/views/task/duty/index'),
	 // name: 'VideoWatch',
	 meta: { title: '值班考勤' }
	}
   ]
  },
  {
  	path: '/sysuser',
  	component: Layout,
  	meta: { title: '用户管理',icon:'user' },
  	children: [
  	{
  	 path: 'sysuser/userinfo',
  	 component: () => import('@/views/user/userinfo/index'),
  	 meta: { title: '用户信息' }
  	},
  	{
  	 path: 'sysuser/role',
  	 component: () => import('@/views/user/role/index'),
  	 // name: 'VideoWatch',
  	 meta: { title: '角色权限' }
  	},
   ]
  },
  {
  	path: '/sysmonitor',
  	component: Layout,
  	meta: { title: '系统管理',icon:'system' },
  	children: [
  	{
  	 path: 'sysmonitor/monitor',
  	 component: () => import('@/views/sysmonitor/monitor/index'),
  	 // name: 'ImdVideoWatch',
  	 meta: { title: '系统监控' }
  	},
  	{
  	 path: 'sysmonitor/opelog',
  	 component: () => import('@/views/sysmonitor/opelog/index'),
  	 // name: 'VideoWatch',
  	 meta: { title: '操作日志' }
  	},
   ]
  },
  
  
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
