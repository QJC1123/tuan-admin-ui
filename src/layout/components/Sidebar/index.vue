<template>
	
    <div :class="{'has-logo':showLogo}" :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg }">
        <div>
			<Logo></Logo>
        	<!-- <img src='@/assets/logo/logo.png' class="sidebar-logo" style="zoom:0.45;padding-left:15%;padding-top: 6%;"> -->
        </div>
		<el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
			<el-menu
				:default-openeds="openeds"
			    :default-active="activeMenu"
			    :collapse="isCollapse"
			    :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg"
			    :text-color="settings.sideTheme === 'theme-dark' ? variables.menuText : 'rgba(255, 255, 255, 1.0)'"
			    :unique-opened="true"
			    :active-text-color="settings.theme"
			    :collapse-transition="false"
			    mode="vertical"
			>
			    <sidebar-item
			        v-for="(route, index) in sidebarRouters"
			        :key="route.path  + index"
			        :item="route"
			        :base-path="route.path"
			    />
			</el-menu>
            
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
    components: { SidebarItem, Logo },
	data(){
		return{
			   sidebarRouters : [
			            {
			              path: '',
			              redirect: 'index',
			              children: [
			                {
			                  path: 'index',
			                  name: '首页',
			                  meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
			                }
			              ]
			            },
			            {
			            	path: '/basicinfo',
			            	meta: { title: '基础信息',icon:'dict' },
			            	children: [
			            	{
			            	 path: 'basicinfo/student',
			            	 meta: { title: '学生信息' }
			            	},
			            	{
			            	 path: 'basicinfo/teacher',
			            	 meta: { title: '教职工信息' }
			            	},
			            	{
			            	 path: 'basicinfo/device',
			            	 meta: { title: '设备信息' }
			            	},
			            	{
			            	 path: 'basicinfo/car',
			            	 meta: { title: '车辆信息' }
			            	},
			             ]
			            },
			            {
			            	path: '/vedio',
			            	meta: { title: '校园监控',icon:'eye-open' },
			            	children: [
			            	{
			            	 path: 'vedio/imdvideo',
			            	 name: 'ImdVideoWatch',
			            	 meta: { title: '实时监控' }
			            	},
							{
							 path: 'vedio/manage',
							 meta: { title: '录像回放' }
							}
			             ]
			            },
			            {
			            	path: '/alarm',
			            	meta: { title: '告警中心',icon:'radio' },
			            	children: [
			            	{
			            	 path: 'alarm/event',
			            	 meta: { title: '告警事件' }
			            	},
			            	{
			            	 path: 'alarm/rule',
			            	 meta: { title: '告警规则' }
			            	},
							{
							 path: 'alarm/analysis',
							 meta: { title: '告警分析' }
							},
							{
							 path: 'alarm/test',
							 meta: { title: '告警测试' }
							},
			             ]
			            },
			            {
			            	path: '/task',
			            	meta: { title: '安防任务',icon:'list' },
			            	children: [
			            	{
			            	 path: 'task/dorm',
			            	 meta: { title: '归寝考勤' }
			            	},
							
			            	{
			            	 path: 'task/event',
			            	 meta: { title: '隐患排查' }
			            	},
							{
							 path: 'task/duty',
							 meta: { title: '值班考勤' }
							},
			            	{
			            	 path: 'task/visit',
			            	 meta: { title: '访客管理' }
			            	},
			            	
			             ]
			            },
			            {
			            	path: '/sysuser',
			            	meta: { title: '用户管理',icon:'user' },
			            	children: [
			            	{
			            	 path: 'sysuser/userinfo',
			            	 meta: { title: '用户信息' }
			            	},
			            	{
			            	 path: 'sysuser/role',
			            	 meta: { title: '角色权限' }
			            	},
			             ]
			            },
			            // {
			            // 	path: '/sysmonitor',
			            // 	meta: { title: '系统管理',icon:'system' },
			            // 	children: [
			            // 	{
			            // 	 path: 'sysmonitor/monitor',
			            // 	 meta: { title: '系统监控' }
			            // 	},
			            // 	{
			            // 	 path: 'sysmonitor/opelog',
			            // 	 meta: { title: '操作日志' }
			            // 	},
			            //  ]
			            // },
			          ]
		}
	},
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["sidebarRouters", "sidebar"]),
		
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    }
};
</script>
