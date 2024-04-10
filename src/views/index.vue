<template>
  <div class="dashboard-editor-container" style="background-color: #f5f9fa;padding-left: 0px;padding-right: 0px;">
		<el-row :gutter="16">
			<el-col :span="6">
				<el-row>
					<div style="height: 100px;background-color: white;">
						<el-row >
							<el-col :span="15" style="padding-left: 40px;">
								<el-row style="padding-top:5px;">
									<span style="font-weight: 650;font-size: 40px;color:#5ba8fd">18</span>
								</el-row>
								<el-row>
									<span style="font-weight: 500;font-size: 16px;color:#8C939D;">归寝异常数</span>
								</el-row>
							</el-col>
							<el-col :span="5" style="padding-top: 30px;padding-left: 27px;">
								<img src="../assets/images/index1.png" style="zoom:0.5"/>
							</el-col>
						</el-row>
						
					</div>
				</el-row>
			</el-col>
			<el-col :span="6">
				<el-row>
					<div style="height: 100px;background-color: white;">
						<el-row >
							<el-col :span="15" style="padding-left: 40px;">
								<el-row style="padding-top: 5px;">
									<span style="font-weight: 650;font-size: 40px;color: #fcc57a">5</span>
								</el-row>
								<el-row>
									<span style="font-weight: 500;font-size: 16px;color:#8C939D;">故障设备数</span>
								</el-row>
							</el-col>
							<el-col :span="5" style="padding-top: 35px;padding-left: 25px;">
								<img src="../assets/images/index2.png" style="zoom:0.5"/>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-col>
			
			<el-col :span="6">
				<el-row>
					<div style="height: 100px;background-color: white;">
						<el-row >
							<el-col :span="15" style="padding-left: 40px;">
								<el-row style="padding-top: 5px;">
									<span style="font-weight: 650;font-size: 40px;color: #53cc60">15</span>
								</el-row>
								<el-row>
									<span style="font-weight: 500;font-size: 16px;color:#8C939D;">值班缺岗数</span>
								</el-row>
							</el-col>
							<el-col :span="5" style="padding-top: 35px;padding-left: 25px;">
								<img src="../assets/images/index3.png" style="zoom:0.5"/>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-col>
			<el-col :span="6">
				<el-row>
					<div style="height: 100px;background-color: white;">
						<el-row >
							<el-col :span="15" style="padding-left: 40px;">
								<el-row style="padding-top: 5px;">
									<span style="font-weight: 650;font-size: 40px;color: #2ec99f">20</span>
								</el-row>
								<el-row>
									<span style="font-weight: 500;font-size: 16px;color:#8C939D;">告警处置数</span>
								</el-row>
							</el-col>
							<el-col :span="5" style="padding-top: 35px;padding-left: 25px;">
								<img src="../assets/images/index4.png" style="zoom:0.5"/>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-col>
			
		</el-row>
		<el-row :gutter="16" style="padding-top: 20px;">
			<el-col :span="9">
				<el-card style="height: 240px;">
					<template #header>
						<el-row style="display: flex;flex-direction: row;">
							<div class="card-header">
							  <span style="font-size: 16px;">待办事项</span>
							</div>
							<div style="padding-left:310px;zoom: 0.9;padding-top: 5px;">
								<el-tag >更多</el-tag>
							</div>
							
						</el-row>
					</template>
					<el-row style="display: flex;flex-direction: row;padding-top: 10px;">
						<span style="font-weight: 540;">【访客申请】&nbsp;您有一份访客申请待审核</span>
						<span style="font-weight: 400;padding-left: 100px;">昨天</span>
					</el-row>
					<el-row style="display: flex;flex-direction: row;padding-top: 7px;">
						<span style="font-weight: 540;">【访客申请】&nbsp;您有一份访客申请待审核</span>
						<span style="font-weight: 400;padding-left: 100px;">昨天</span>
					</el-row>
					<el-row style="display: flex;flex-direction: row;padding-top: 7px;">
						<span style="font-weight: 540;">【访客申请】&nbsp;您有一份访客申请待审核</span>
						<span style="font-weight: 400;padding-left: 100px;">昨天</span>
					</el-row>
					<el-row style="display: flex;flex-direction: row;padding-top: 7px;">
						<span style="font-weight: 540;">【访客申请】&nbsp;您有一份访客申请待审核</span>
						<span style="font-weight: 400;padding-left: 100px;">昨天</span>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="9">
				<el-card style="height: 240px;">
					<template #header>
						<el-row style="display: flex;flex-direction: row;">
							<div class="card-header">
							  <span style="font-size: 16px;">隐患排查</span>
							</div>
							<div style="padding-left:310px;zoom: 0.9;padding-top: 5px;">
								<el-tag >更多</el-tag>
							</div>
							
						</el-row>
					</template>
					<el-row style="display: flex;flex-direction: row;padding-top: 10px;">
						<span style="font-weight: 540;">【日常巡查】&nbsp;王五已提交安全巡查清单</span>
						<span style="font-weight: 400;padding-left: 100px;">昨天</span>
					</el-row>
					<el-row style="display: flex;flex-direction: row;padding-top: 7px;">
						<span style="font-weight: 540;">【隐患上报】&nbsp;王五已提交隐患设施工单</span>
						<span style="font-weight: 400;padding-left: 100px;">昨天</span>
					</el-row>
					<el-row style="display: flex;flex-direction: row;padding-top: 7px;">
						<span style="font-weight: 540;">【日常巡查】&nbsp;张三已提交安全巡查清单</span>
						<span style="font-weight: 400;padding-left: 100px;">昨天</span>
					</el-row>
					<el-row style="display: flex;flex-direction: row;padding-top: 7px;">
						<span style="font-weight: 540;">【隐患上报】&nbsp;张三已提交隐患设施工单</span>
						<span style="font-weight: 400;padding-left: 100px;">昨天</span>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-row>
					<el-card style="height: 240px;">
						<template #header>
							<div class="card-header">
							  <span style="font-size: 16px;">安防应用</span>
							  <!-- <el-button class="button" type="text">操作按钮</el-button> -->
							</div>
						</template>
						<div style="zoom:0.8;padding-left: 30px;">
							  <el-row  style="padding-top: 10px;">
								  <el-col span="8">
									  <el-row>
										  <img src="../assets/images/serve1.png" style="zoom:0.5"/>
									  </el-row>
									  <el-row>
										  <span style="font-size: 13px;font-weight: 500;padding-left: 1px;">隐患排查</span>
									  </el-row>
								  </el-col>
								  <el-col span="8">
										  <el-row>
											  <img src="../assets/images/serve2.png" style="zoom:0.5"/>
										  </el-row>
										  <el-row>
											  <span style="font-size: 13px;font-weight: 500;padding-left: 1px;">寝室考勤</span>
										  </el-row>
								  </el-col>
								  <el-col span="8">
										  <el-row>
											  <img src="../assets/images/serve3.png" style="zoom:0.5"/>
										  </el-row>
										  <el-row>
											  <span style="font-size: 13px;font-weight: 500;padding-left: 1px;">访客登记</span>
										  </el-row>
								  </el-col>
							  </el-row>
							  <el-row style="padding-top: 30px;">
								  <el-col span="8" style="padding-top: 8px;">
										  <el-row>
											  <img src="../assets/images/serve4.png" style="zoom:0.5"/>
										  </el-row>
										  <el-row>
											  <span style="font-size: 13px;font-weight: 500;padding-left: 1px;">告警处理</span>
										  </el-row>
								  </el-col>
								  <el-col span="8">
										  <el-row>
											  <img src="../assets/images/serve5.png" style="zoom:0.45"/>
										  </el-row>
										  <el-row>
											  <span style="font-size: 13px;font-weight: 500;padding-left: 10px;">添加</span>
										  </el-row>
								  </el-col>
							  </el-row>
						</div>
						
					</el-card>
				</el-row>
			</el-col>
		</el-row>
		
		<el-row :gutter="16" style="padding-top: 30px;">
			<el-col :span="9">
				<el-card style="height: 340px;">
					<template #header>
						<div class="card-header">
						  <span style="font-size: 16px;">访客管理</span>
						</div>
					</template>
					<div >
						<div style="padding-bottom: 10px;zoom: 0.9;"><line-chart :chart-data="lineChartData" style="padding-top: 5px;padding-right: 5px;zoom: .8;" /></div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="9">
				<el-card style="height: 340px;">
					<template #header>
						<div class="card-header">
						  <span style="font-size: 16px;">食堂评分</span>
						</div>
					</template>
					<div style="width: 200px;">
						<div id="cookchart" style="width: 400px;height:250px;"></div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-row>
					<el-card style="height: 340px;">
						<template #header>
							<div class="card-header">
							  <span style="font-size: 16px;">访客管理</span>
							  <!-- <el-button class="button" type="text">操作按钮</el-button> -->
							</div>
						</template>
						<div>
							<el-row style="text-align: center;padding-bottom: 10px;padding-top: 30px;">
								<span style="font-weight: 550;">当前值班安排</span>
							</el-row>
							<el-row>
								<el-card>
									<el-col :span="11">
										<div style="text-align: center;padding-top: 20px;">
											<el-row>
												<span style="font-weight: 500;color: darkgray;">开始</span>
											</el-row>
											<el-row>
												<span style="font-weight: 550;font-size: 18px;">周二</span>
											</el-row>
											<el-row>
												<span style="font-weight: 650;font-size: 16px;">03月10日</span>
											</el-row>
											<el-row>
												<span style="font-weight: 550;color: darkgray;">8：00</span>
											</el-row>
										</div>
									</el-col>
									<el-col :span="1" style="padding-left: 7px;">
										<div class="el-divider"
										style="display:inline-block;width: 1px;height: 150px;margin: 0 8px;vertical-align: middle;position: relative;"
										></div>
									</el-col>
									<el-col :span="11">
										<div style="text-align: center;padding-top: 20px;">
											<el-row>
												<span style="font-weight: 500;color: darkgray;">结束</span>
											</el-row>
											<el-row>
												<span style="font-weight: 550;font-size: 18px;">周三</span>
											</el-row>
											<el-row>
												<span style="font-weight: 650;font-size: 16px;">03月11日</span>
											</el-row>
											<el-row>
												<span style="font-weight: 550;color: darkgray;">8：00</span>
											</el-row>
										</div>
									</el-col>
								</el-card>
							</el-row>
						</div>
						
					</el-card>
				</el-row>
			</el-col>
		</el-row>
		
		
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->

    
  </div>
</template>

<script>
	
import index1 from '@/assets/images/index1.png'
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
	 index1:index1,
	  // img:require('@/assets/images/index1.png'),
      lineChartData: lineChartData.newVisitis
    }
  },
   mounted() {
    	this.myEcharts();
    },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
	myEcharts(){
			  // 基于准备好的dom，初始化echarts实例
			  var myChart = this.$echarts.init(document.getElementById('cookchart'));
	
			  // 指定图表的配置项和数据
			  var option = {
  title: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
	  top:"10%",
    left: '2%',
    right: '8%',
    bottom: '1%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.3],
	splitLine:{show: false},
	max:100,
  },
  yAxis: {
    type: 'category',
    data: ['食堂六', '食堂五', '食堂四', '食堂三', '食堂二', '食堂一'],
	splitLine:{show: false},
	
  },
  series: [
    {
      type: 'bar',
      data: [60, 74, 85, 89, 90, 95],
	   barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
	  barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
	  itemStyle:{
		  normal:{
			  color:'#69c5b7',
			  
		  }
	  },
	  barWidth: '30%',
    }
  ]
};
			  // 使用刚指定的配置项和数据显示图表。
	  myChart.setOption(option);
	  }
	
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

</style>






