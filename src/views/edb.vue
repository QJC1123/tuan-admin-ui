<template>
	<div >
		<div style="width: 100%;">
		  <div :class="{'fixed-header':fixedHeader}" >
		    <navbar style="background-color: #f5ffff" />
		  </div>
		</div>
		<div>
			<el-row :gutter="20">
				<el-col span="18" style="padding-left: 40px;padding-top: 35px;">
					<el-row :gutter="10">
						<el-col style="width: 200px;">
							<el-card
							style="background: linear-gradient(179deg, rgb(198, 95, 250) 0%, rgb(127, 102, 254) 100%); box-shadow: rgba(127, 102, 254, 0.2) 0px 4px 16px 0px; height: 320px;"
							>
							<div style="padding-top: 30px;padding-left:10px;">
								<el-row>
									<i class="el-icon-office-building" style="color: white;zoom:2.5"></i>
									<i class="el-icon-arrow-right" style="color: white;zoom:1.5;float:right;padding-top: 5px;"></i>
								</el-row>
								<el-row style="padding-top: 30px;">
									<span style="font-size: 18px;font-weight: 550;color: white;">已接入学校</span>
								</el-row>
								<el-row style="padding-top: 30px;">
									<span style="font-size: 24px;font-weight: 600;color: white;zoom:2">2</span>
								</el-row>
									<span style="font-size: 12px;font-weight: 400;color: white;">在线</span>
									<span style="font-size: 12px;font-weight: 400;color: white;">1</span>
									<span style="font-size: 12px;font-weight: 400;color: white;padding-left: 20px;">离线</span>
									<span style="font-size: 12px;font-weight: 400;color: white;">1</span>
							</div>
							</el-card>
						</el-col>
						<el-col style="width: 200px;">
							<el-card
							style="background: linear-gradient(179deg, rgb(77, 184, 255) 0%, rgb(115, 102, 255) 100%);box-shadow: rgba(127, 102, 254, 0.2) 0px 4px 16px 0px;height: 320px; "
							>
							<div style="padding-top: 30px;padding-left:10px;">
								<el-row>
									<i class="el-icon-cpu" style="color: white;zoom:2.5"></i>
									<i class="el-icon-arrow-right" style="color: white;zoom:1.5;float:right;padding-top: 5px;"></i>
								</el-row>
								
								<el-row style="padding-top: 30px;">
									<span style="font-size: 18px;font-weight: 550;color: white;">RTSP服务器</span>
								</el-row>
								<el-row style="padding-top: 30px;">
									<span style="font-size: 24px;font-weight: 600;color: white;zoom:2">1</span>
								</el-row>
									<span style="font-size: 12px;font-weight: 400;color: white;">在线</span>
									<span style="font-size: 12px;font-weight: 400;color: white;">1</span>
								
							</div>
							</el-card>
						</el-col>
						<el-col style="width: 200px;">
							<el-card
							style="background: linear-gradient(0deg, rgb(37, 162, 245) 2%, rgb(87, 217, 195) 98%);box-shadow: rgba(127, 102, 254, 0.2) 0px 4px 16px 0px;height: 320px;"
							>
							<div style="padding-top: 30px;padding-left:10px;">
								<el-row>
									<i class="el-icon-view" style="color: white;zoom:2.5"></i>
									<i class="el-icon-arrow-right" style="color: white;zoom:1.5;float:right;padding-top: 5px;"></i>
								</el-row>
								<el-row style="padding-top: 30px;">
									<span style="font-size: 18px;font-weight: 550;color: white;">所有监控点</span>
								</el-row>
								<el-row style="padding-top: 30px;">
									<span style="font-size: 24px;font-weight: 600;color: white;zoom:2">50</span>
								</el-row>
									<span style="font-size: 12px;font-weight: 400;color: white;">在线</span>
									<span style="font-size: 12px;font-weight: 400;color: white;">45</span>
									<span style="font-size: 12px;font-weight: 400;color: white;padding-left: 20px;">离线</span>
									<span style="font-size: 12px;font-weight: 400;color: white;">5</span>
							</div >
							
							</el-card>
						</el-col>
						<el-col style="width: 200px;">
							<el-card
							style="background: linear-gradient(0deg, rgb(28, 199, 156) 0%, rgb(143, 219, 66) 100%); box-shadow: rgba(127, 102, 254, 0.2) 0px 4px 16px 0px; height: 320px;"
							>
							<div style="padding-top: 30px;padding-left:10px;">
								<el-row>
									<i class="el-icon-user" style="color: white;zoom:2.5"></i>
									<i class="el-icon-arrow-right" style="color: white;zoom:1.5;float:right;padding-top: 5px;"></i>
								</el-row>
								<el-row style="padding-top: 30px;">
									<span style="font-size: 18px;font-weight: 550;color: white;">用户</span>
								</el-row>
								<el-row style="padding-top: 30px;">
									<span style="font-size: 24px;font-weight: 600;color: white;zoom:2">40</span>
								</el-row>
									<span style="font-size: 12px;font-weight: 400;color: white;">在线</span>
									<span style="font-size: 12px;font-weight: 400;color: white;">32</span>
									<span style="font-size: 12px;font-weight: 400;color: white;padding-left: 20px;">离线</span>
									<span style="font-size: 12px;font-weight: 400;color: white;">8</span>
							</div>
							
							</el-card>
						</el-col>
						<el-col style="width: 200px;">
							<el-card
							style="background: linear-gradient(0deg, rgb(245, 137, 81) 1%, rgb(255, 198, 26) 99%);box-shadow: rgba(127, 102, 254, 0.2) 0px 4px 16px 0px; height: 320px;"
							>
							<div style="padding-top: 30px;padding-left:10px;">
								<el-row>
									<i class="el-icon-bell" style="color: white;zoom:2.5"></i>
									<i class="el-icon-arrow-right" style="color: white;zoom:1.5;float:right;padding-top: 5px;"></i>
								</el-row>
								<el-row style="padding-top: 30px;">
									<span style="font-size: 18px;font-weight: 550;color: white;">最新告警</span>
								</el-row>
								<el-row style="padding-top: 30px;">
									<span style="font-size: 24px;font-weight: 600;color: white;zoom:2">10</span>
								</el-row>
									<span style="font-size: 12px;font-weight: 400;color: white;">未读</span>
									<span style="font-size: 12px;font-weight: 400;color: white;">5</span>
							</div>
							
							</el-card>
						</el-col>
						
					</el-row>
					<el-row style="padding-top: 40px;">
						<span style="font-size: 20px;font-weight: 700px;zoom: 1.2;padding-left: 10px;">学校总览</span>
						<i class="el-icon-menu" style="zoom:2;float: right;padding-top: 3px;"></i>
					</el-row>
					<el-row>
						<el-row :gutter="20" style="padding-top: 20px;">
							<el-col span="8">
								<el-card  @click.native="chooseSchool" class="card1">
									<el-row>
										<i class="el-icon-school" style="zoom:2"></i>
									</el-row>
									<el-row style="padding-top: 6px;">
										<span style="font-size: 20px;font-weight: 500;">图安校园</span>
									</el-row>
									<el-row style="padding-top: 30px;">
										<i class="el-icon-user" ></i>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">用户总数</span>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">30</span>
									</el-row>
									<el-row style="padding-top: 10px;">
										<i class="el-icon-coordinate" ></i>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控区域</span>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">15</span>
									</el-row>
									<el-row style="padding-top: 10px;">
										<i class="el-icon-coordinate" ></i>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控点数</span>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">30</span>
										<div style="background-color: #faeceb;color: #eb766f;width: 50px;text-align: center;float: right;">离线 3</div>
									</el-row>
									<el-row style="padding-top: 10px;">
										<i class="el-icon-bell" ></i>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">告警消息</span>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">8</span>
										<div style="background-color: #fff9e0;color: #f49918;width: 50px;text-align: center;float: right;">未读 3</div>
									</el-row>
									<el-row style="padding-top: 10px;">
										<i class="el-icon-house" ></i>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">接入时间</span>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">2023-03-01 11:23:34</span>
										
									</el-row>
									
								</el-card>
							</el-col>
							<el-col span="8">
								<el-card class="card1">
									<el-row>
										<i class="el-icon-school" style="zoom:2"></i>
									</el-row>
									<el-row style="padding-top: 6px;">
										<span style="font-size: 20px;font-weight: 500;">平安校园</span>
									</el-row>
									<el-row style="padding-top: 30px;">
										<i class="el-icon-user" ></i>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">用户总数</span>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">10</span>
									</el-row>
									<el-row style="padding-top: 10px;">
										<i class="el-icon-coordinate" ></i>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控区域</span>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">8</span>
									</el-row>
									<el-row style="padding-top: 10px;">
										<i class="el-icon-coordinate" ></i>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控点数</span>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">10</span>
										<div style="background-color: #faeceb;color: #eb766f;width: 50px;text-align: center;float: right;">离线 2</div>
									</el-row>
									<el-row style="padding-top: 10px;">
										<i class="el-icon-bell" ></i>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">告警消息</span>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">2</span>
										<div style="background-color: #fff9e0;color: #f49918;width: 50px;text-align: center;float: right;">未读 2</div>
									</el-row>
									<el-row style="padding-top: 10px;">
										<i class="el-icon-house" ></i>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">接入时间</span>
										<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">2023-03-02 13:33:57</span>
									</el-row>
								</el-card>
							</el-col>
							
							<el-col span="8">
								<el-card style="height: 280px;" class="card1">
									<div style="padding-top: 90px;padding-left: 70px;">
										<i class="el-icon-plus" style="zoom:1.5;padding-top: 5px;"></i>
										<span style="zoom:1.5;padding-left:5px;">添加学校</span>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</el-row>
				</el-col>
				<el-col span="4"style="padding-top: 35px;padding-left: 30px;">
					<el-card style="height: 700px;width: 280px;">
						<el-row>
							<el-row style="padding-top: 20px;">
								<i class="el-icon-bell" style="zoom:1.5"></i>
								<span style="font-size: 18px;font-weight: 500;padding-left: 10px;">告警消息</span>
								<i class="el-icon-arrow-right" style="zoom:1.3;float: right;padding-top: 5px;"></i>
							</el-row>
							<el-row style="padding-top: 30px;padding-left: 2px;">
								<i class="el-icon-warning" style="color: #ba0000;"></i>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控检测到围栏翻越</span>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">23/03/29</span>
							</el-row>
							<el-row style="padding-top: 10px;padding-left: 2px;">
								<i class="el-icon-warning" style="color: #ba0000;"></i>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">报修上报消防栓损坏</span>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">23/03/22</span>
							</el-row>
							<el-row style="padding-top: 10px;padding-left: 2px;">
								<i class="el-icon-warning" style="color: #ba0000;"></i>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">归寝考勤检测到两人..</span>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">23/03/20</span>
							</el-row>
							<el-row style="padding-top: 10px;padding-left: 2px;">
								<i class="el-icon-warning" style="color: #ba0000;"></i>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控检测到存在明火</span>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">23/03/20</span>
							</el-row>
							<el-row style="padding-top: 10px;padding-left: 2px;">
								<i class="el-icon-warning" style="color: #ba0000;"></i>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控检测到周界入侵</span>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">23/03/16</span>
							</el-row>
							<el-row style="padding-top: 10px;padding-left: 2px;">
								<i class="el-icon-warning" style="color: #ba0000;"></i>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">访客出现黑名单人员</span>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">23/03/15</span>
							</el-row>
							<el-row style="padding-top: 10px;padding-left: 2px;">
								<i class="el-icon-warning" style="color: #ba0000;"></i>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控检测到危险区域..</span>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">23/03/13</span>
							</el-row>
							<el-row style="padding-top: 10px;padding-left: 2px;">
								<i class="el-icon-warning" style="color: #ba0000;"></i>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控检测到厨师帽未..</span>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">23/03/09</span>
							</el-row>
							<el-row style="padding-top: 10px;padding-left: 2px;">
								<i class="el-icon-warning" style="color: #ba0000;"></i>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控检测到聚众打架</span>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">23/03/07</span>
							</el-row>
							<el-row style="padding-top: 10px;padding-left: 2px;">
								<i class="el-icon-warning" style="color: #ba0000;"></i>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;">监控检测到围栏翻越</span>
								<span style="font-size: 14px;font-weight: 400;padding-left: 5px;float: right;">23/03/05</span>
							</el-row>
						</el-row>
					</el-card>
				</el-col>
			</el-row>
		</div>
		
	</div>
	
  
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from '@/layout/components'
import ResizeMixin from '@/layout/mixin/ResizeHandler.js'
import { mapState } from 'vuex'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    variables() {
      return variables;
    }
  },
  methods: {
	chooseSchool(){
		this.$router.push('/index');
	},
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  
  .card1:hover{
	  background-color:#ffffff!important;
	  border: 1px solid #409EFF;
  }
</style>
