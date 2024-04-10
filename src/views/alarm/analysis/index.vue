<template>
  <div class="dashboard-editor-container" style="background-color: #f5f9fa;padding-left: 0px;padding-right: 0px;">
		<el-row :gutter="16" style="padding-top: 20px;">
			<el-col :span="4">
				<el-row>
					<el-card style="height: 110px;">
						<el-row>
							<span style="font-size: 16px;">事件量</span>
							<i class="el-icon-info" style="float: right;color: darkgray;padding-top: 5px;"></i>
						</el-row>
						<el-row>
							<span style="font-weight: 550;font-size: 23px;color: rgb(40, 115, 251);;">50</span>
						</el-row>
						<el-row>
							<span style="font-size: 12px;">周期增加&nbsp;15</span>
						</el-row>
					</el-card>
				</el-row>
			</el-col>
			<el-col :span="4">
				<el-row>
					<el-card style="height: 110px;">
						<el-row>
							<span style="font-size: 16px;">总告警量</span>
							<i class="el-icon-info" style="float: right;color: darkgray;padding-top: 5px;"></i>
						</el-row>
						<el-row>
							<span style="font-weight: 550;font-size: 23px;color: rgb(133, 118, 241);;">46</span>
						</el-row>
						<el-row>
							<span style="font-size: 12px;">周期增加&nbsp;10</span>
						</el-row>
					</el-card>
				</el-row>
			</el-col>
			<el-col :span="4">
				<el-row>
					<el-card style="height: 110px;">
						<el-row>
							<span style="font-size: 16px;">主告警量</span>
							<i class="el-icon-info" style="float: right;color: darkgray;padding-top: 5px;"></i>
						</el-row>
						<el-row>
							<span style="font-weight: 550;font-size: 23px;color: rgb(240, 174, 29);;">40</span>
						</el-row>
						<el-row>
							<span style="font-size: 12px;">周期增加&nbsp;5</span>
						</el-row>
					</el-card>
				</el-row>
			</el-col>
			<el-col :span="4">
				<el-row>
					<el-card style="height: 110px;">
						<el-row>
							<span style="font-size: 16px;">平均响应时长</span>
							<i class="el-icon-info" style="float: right;color: darkgray;padding-top: 5px;"></i>
						</el-row>
						<el-row>
							<span style="font-weight: 550;font-size: 23px;color: rgb(87, 140, 251);;">15min</span>
						</el-row>
						<el-row>
							<span style="font-size: 12px;">周期增加&nbsp;2min</span>
						</el-row>
					</el-card>
				</el-row>
			</el-col>
			<el-col :span="4">
				<el-row>
					<el-card style="height: 110px;">
						<el-row>
							<span style="font-size: 16px;">平均处理时长</span>
							<i class="el-icon-info" style="float: right;color: darkgray;padding-top: 5px;"></i>
						</el-row>
						<el-row>
							<span style="font-weight: 550;font-size: 23px;color: rgb(250, 130, 143);;">1h30min</span>
						</el-row>
						<el-row>
							<span style="font-size: 12px;">周期增加&nbsp;15min</span>
						</el-row>
					</el-card>
				</el-row>
			</el-col>
			<el-col :span="4">
				<el-row>
					<el-card style="height: 110px;">
						<el-row>
							<span style="font-size: 16px;">压缩比</span>
							<i class="el-icon-info" style="float: right;color: darkgray;padding-top: 5px;"></i>
						</el-row>
						<el-row>
							<span style="font-weight: 550;font-size: 23px;color: rgb(28, 205, 160);;">83.82%</span>
						</el-row>
						<el-row>
							<span style="font-size: 12px;">周期减少&nbsp;10.04%</span>
						</el-row>
					</el-card>
				</el-row>
			</el-col>
			
		</el-row>
		<el-row :gutter="16" style="padding-top: 20px;">
			<el-col :span="12">
				<el-card style="height: 300px;">
					<template #header>
						<div class="card-header">
						  <span style="font-size: 16px;">告警智能分类分析</span>
						</div>
					</template>
					<div>
						<div id="chart1" style="zoom:0.9;height: 200px;"></div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card style="height: 300px;">
					<template #header>
						<div class="card-header">
						  <span style="font-size: 16px;">告警级别分析</span>
						</div>
					</template>
					<div>
						<div id="chart2" style="width:`220px;height: 200px;"></div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-row>
					<el-card style="height: 300px;">
						<template #header>
							<div class="card-header">
							  <span style="font-size: 16px;">告警状态分析</span>
							</div>
						</template>
						<div>
							<div id="chart3" style="width:`220px;height: 200px;"></div>
						</div>
					</el-card>
				</el-row>
			</el-col>
		</el-row>
		
		<el-row :gutter="16" style="padding-top: 20px;">
			<el-col :span="12">
				<el-card style="height: 300px;">
					<template #header>
						<div class="card-header">
						  <span style="font-size: 16px;">Top告警内容分析</span>
						</div>
					</template>
					<div >
						<el-table  :data="userList" style="border: 1px solid #ccc;" :header-cell-style="{background:'#dcecfd'}" >     <!-- #dcecfd -->
							<el-table-column label="序号" align="center" prop="id" >
							</el-table-column>
						  <el-table-column label="告警内容" align="center" prop="alarmName">
						  </el-table-column>
						  <el-table-column label="本周告警数" align="center" prop="alarmTime"/>
						  </el-table-column>
						</el-table>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card style="height: 300px;">
					<template #header>
						<div class="card-header">
						  <span style="font-size: 16px;">高发告警区域分析</span>
						</div>
					</template>
					<div>
						<div id="chart4" style="width:`220px;height: 200px;"></div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		
		<!-- <el-row :gutter="16" style="padding-top: 20px;">
			<el-col :span="12">
				<el-card style="height: 300px;">
					<template #header>
						<div class="card-header">
						  <span style="font-size: 16px;">告警压缩分析</span>
						</div>
					</template>
					
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card style="height: 300px;">
					<template #header>
						<div class="card-header">
						  <span style="font-size: 16px;">成员处理效率分析</span>
						</div>
					</template>
					<div >
						<div style="padding-bottom: 10px;"><line-chart :chart-data="lineChartData" style="padding-top: 5px;padding-right: 5px;zoom: .8;" /></div>
		
					</div>
				</el-card>
			</el-col>
			
		</el-row> -->
		
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



export default {
  name: '',
  components: {
    
  },
  data() {
    return {
		userList:[{
			id:1,
			alarmName:'跌倒',
			alarmTime:'12'
		},
		{
			id:2,
			alarmName:'抽烟',
			alarmTime:'8'
		},
		{
			id:3,
			alarmName:'挥手',
			alarmTime:'7'
		},
		{
			id:4,
			alarmName:'危险区域滞留',
			alarmTime:'5'
		},
		
		
		]
    }
  },
 mounted(){  
	this.myEcharts1();
 	this.myEcharts2();
	this.myEcharts3();
	this.myEcharts4();
 },
  methods: {
	myEcharts1(){
				  // 基于准备好的dom，初始化echarts实例
				  var myChart1 = this.$echarts.init(document.getElementById('chart1'));
				  
				  
				  var data = {
				      id: 'multipleBarsLines',
				      legendBar: ['上周', '本周'],
				      symbol: ' ', //数值是否带百分号        --默认为空 ''
				      // legendLine: ['环比', '同比'],
				      // xAxis: ['南门','东门','西门','北门','教学区','宿舍区','行政区','体育场'],
					  xAxis: ['危险区域滞留','围栏翻越','特定区域闯入','抽烟','挥手求救','跌倒','烟雾明火','地面积水','墙面渗水'],
				      yAxis: [
				          [8, 10, 10, 11, 4, 13,8,11,4],
				          [10, 7, 8, 8, 7, 9,7,8,2]
				      ],
				      barColor: ['#69c5b7', '#76ddcc'], //柱子颜色 必填参数
				      // lineColor: ['#fd6665', '#fba73b'], // 折线颜色
				  }
				  
				  var myData = (function test() {
				      let yAxis = data.yAxis || []
				      let lines = data.lines || []
				      let legendBar = data.legendBar || []
				      let legendLine = data.legendLine || []
				      var symbol = data.symbol || ' '
				      let seriesArr = []
				      let legendArr = []
				      yAxis && yAxis.forEach((item, index) => {
				          legendArr.push({
				              name: legendBar && legendBar.length > 0 && legendBar[index]
				          })
				          seriesArr.push({
				              name: legendBar && legendBar.length > 0 && legendBar[index],
				              type: 'bar',
				              barGap: '0.5px',
				              data: item,
				              barWidth: data.barWidth || 8,
				              label: {
				                  normal: {
				                      show: false,
				                      formatter: '{c}' + symbol,
				                      position: 'top',
				                      textStyle: {
				                          color: '#000',
				                          fontStyle: 'normal',
				                          fontFamily: '微软雅黑',
				                          textAlign: 'left',
				                          fontSize: 11,
				                      },
				                  },
				              },
				              itemStyle: { //图形样式
				                  normal: {
				                      barBorderRadius:0,
				                      borderWidth:1,
				                      borderColor:'#ddd',
				                      color: data.barColor[index]
				                  },
				              }
				          })
				      })
				  
				      lines && lines.forEach((item, index) => {
				          legendArr.push({
				              name: legendLine && legendLine.length > 0 && legendLine[index]
				          })
				          seriesArr.push({
				              name: legendLine && legendLine.length > 0 && legendLine[index],
				              type: 'line',
				              data: item,
				              itemStyle: {
				                  normal: {
				                      color: data.lineColor[index],
				                      lineStyle: {
				                          width: 2,//折线宽度
				                          type: 'solid',
				                      }
				                  }
				              },
				              label: {
				                  normal: {
				                      show: false, //折线上方label控制显示隐藏
				                      position: 'top',
				                  }
				              },
				              symbol: 'circle',
				              symbolSize: 5
				          })
				      })
				  
				      return {
				          seriesArr,
				          legendArr
				      }
				  })()
				  
				  
				  // 指定图表的配置项和数据
				  var option1= {
				      title: {
				          show: true,
				          text: data.title,
				          subtext: data.subTitle,
				          link: '1111'
				      },
				      tooltip: {
				          trigger: 'axis',
				          formatter: function(params) {
				              var time = '';
				              var str = '';
				              for (var i of params) {
				                  time = i.name.replace(/\n/g, '') + '<br/>';
				                  if (i.data == 'null' || i.data == null) {
				                      str += i.seriesName + '：无数据' + '<br/>'
				                  } else {
				                      str += i.seriesName + '：' + i.data + symbol + '%<br/>'
				                  }
				  
				              }
				              return time + str;
				          },
				          axisPointer: {
				              type: 'none'
				          },
				      },
				      legend: {
				          right: data.legendRight || '30%',
				          top: 0,
				          right:10,
				          itemGap: 16,
				          itemWidth: 10,
				          itemHeight: 10,
				          data: myData.legendArr,
				          textStyle: {
				              color: '#515151',
				              fontStyle: 'normal',
				              fontFamily: '微软雅黑',
				              fontSize: 12,
				          }
				      },
				      grid: {
				          x: 40,
				          y: 30,
				          x2: 0,
				          y2: 18,
				      },
				      xAxis: {
				          type: 'category',
				          data: data.xAxis,
				          axisTick: {
				              show: true,
				          },
				  
				          axisLine: {
				              show: true,
							  interval: 0,
							  
				          },
				          axisLabel: {       //轴标
				              show: true,
				              interval: 0,
							  // rotate: 45,
				              textStyle: {
				                  lineHeight:5,
				                  padding: [2, 2, 0, 2],
				                  height: 50,
				                  fontSize: 12,
				                  color:'#515151',
				              },
				              rich: {
				                  Sunny: {
				                      height: 50,
				                      // width: 60,
				                      padding: [0, 5, 0, 5],
				                      align: 'center',
				                  },
				              },
				              formatter: function(params, index) {
				                  var newParamsName = "";
				                  var splitNumber = 5;
				                  var paramsNameNumber = params && params.length;
				                  if (paramsNameNumber && paramsNameNumber <= 4) {
				                      splitNumber = 4;
				                  } else if (paramsNameNumber >= 5 && paramsNameNumber <= 7) {
				                      splitNumber = 4;
				                  } else if (paramsNameNumber >= 8 && paramsNameNumber <= 9) {
				                      splitNumber = 5;
				                  } else if (paramsNameNumber >= 10 && paramsNameNumber <= 14) {
				                      splitNumber = 5;
				                  } else {
				                      params = params && params.slice(0, 15);
				                  }
				  
				                  var provideNumber = splitNumber; //一行显示几个字
				                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber) || 0;
				                  if (paramsNameNumber > provideNumber) {
				                      for (var p = 0; p < rowNumber; p++) {
				                          var tempStr = "";
				                          var start = p * provideNumber;
				                          var end = start + provideNumber;
				                          if (p == rowNumber - 1) {
				                              tempStr = params.substring(start, paramsNameNumber);
				                          } else {
				                              tempStr = params.substring(start, end) + "\n";
				                          }
				                          newParamsName += tempStr;
				                      }
				  
				                  } else {
				                      newParamsName = params;
				                  }
				                  params = newParamsName
				                  return '{Sunny|' + params + '}';
				              },
				              color: '#687284',
				          },
				  
				      },
				      yAxis: {
						  name:"告警事件次数",
				          axisLine: {
				              show: true
				          },
				          axisTick: {
				              show: true
				          },
				          axisLabel: {
				              show: true
				          },
				          splitLine: {
				              show: true,
				              lineStyle: {
				                  color: '#F1F3F5',
				                  type: 'solid'
				              },
				              interval: 2
				          },
				          splitNumber: 4,
				      },
				      series: myData.seriesArr
				  };
		
				  // 使用刚指定的配置项和数据显示图表。
				  myChart1.setOption(option1);
	},
    myEcharts2(){
    			  // 基于准备好的dom，初始化echarts实例
    			  var myChart2 = this.$echarts.init(document.getElementById('chart2'));
    			  
    			  
    			  var dataArr = [
    			      {name: '一级警情', value:5},
    			      {name: '三级警情', value: 5},
    			      {name: '二级警情', value: 20},
    			  ]
    			  var data = dataArr
    			  var option2 = {
    			      // color: ['#F77474', '#2873fc', '#fecb33'],
					  color: ['#0bb0fc', '#73d3fc', '#c3e6fd'],
    			      tooltip : {
    			          trigger: 'item',
    			          formatter: "{a} <br/>{b} : {c} ({d}%)"
    			      },
    			      series: [
    			          {
    			              name: '告警级别占比分析',
    			              type: 'pie',
    			              radius: ['50%', '70%'],
    			              center: ['53%', '55%'],
    			              labelLine: {
    			                  normal: {
    			                      length: 12,
    			                      lineStyle: {
    			                          type: 'solid',
    			                          color: '#525b62'
    			                      }
    			                  }
    			  			
    			              },
    			              label: {
    			                  normal: {
    			                      formatter: (params)=>{
    			                          return params.name
    			                      },
    			                      borderWidth: 0,
    			                      borderRadius: 4,
    			                      padding: [0,0],
    			                      height: 20,
    			                      fontSize: 10,
    			                      align: 'center',
    			                      color: '#525b62',
    			                  }
    			              },
    			              data: data
    			          },
    			          
    			          {
    			              type: 'pie',
    			              radius: ['45', '46'],
    			              center: ['53%', '55%'],
    			              data: [100],
    			              label: {
    			                  show: false
    			              }
    			          }
    			      ]
    			  };
    			  // 使用刚指定的配置项和数据显示图表。
    			  myChart2.setOption(option2);
    },
	myEcharts3(){
				  // 基于准备好的dom，初始化echarts实例
				  var myChart3 = this.$echarts.init(document.getElementById('chart3'));
				  var dataArr = [
				      {name: '待处理', value: 5},
				      {name: '已完成', value: 5},
				      {name: '处理中', value: 20},
				  ]
				  var data = dataArr
				  var option3 = {
				      // color: ['#ff7f7f', '#95e3b2', '#fae15f'],
					  color: ['#0bb0fc', '#73d3fc', '#c3e6fd'],
				      tooltip : {
				          trigger: 'item',
				          formatter: "{a} <br/>{b} : {c} ({d}%)"
				      },
				      series: [
				          {
				              name: '告警状态占比分析',
				              type: 'pie',
				              radius: ['50%', '70%'],
				              center: ['53%', '55%'],
				              labelLine: {
				                  normal: {
				                      length: 12,
				                      lineStyle: {
				                          type: 'solid',
				                          color: '#525b62'
				                      }
				                  }
				  			
				              },
				              label: {
				                  normal: {
				                      formatter: (params)=>{
				                          return params.name
				                      },
				                      borderWidth: 0,
				                      borderRadius: 4,
				                      padding: [0,0],
				                      height: 20,
				                      fontSize: 10,
				                      align: 'center',
				                      color: '#525b62',
				                  }
				              },
				              data: data
				          },
				          
				          {
				              type: 'pie',
				              radius: ['45', '46'],
				              center: ['53%', '55%'],
				              data: [100],
				              label: {
				                  show: false
				              }
				          }
				      ]
				  };
				  // 使用刚指定的配置项和数据显示图表。
				  myChart3.setOption(option3);
	},
	myEcharts4(){
		  // 基于准备好的dom，初始化echarts实例
		  var myChart4 = this.$echarts.init(document.getElementById('chart4'));
		  var option4 = {
		    //  backgroundColor: '#00265f',
		      tooltip: {
		          trigger: 'axis',
		          axisPointer: { type: 'shadow'}
		      },
		      grid: {
		          left: '2%',
		  		top:'20px',
		          right: '3%',
		          bottom: '0px',
		         containLabel: true
		      },
		      xAxis: [{
		          type: 'category',
		  		data:['北门','南门','东门','西门','教学楼','行政楼','食堂','宿舍一区','宿舍二区','宿舍三区区','田径场','体育馆','实验楼','艺术楼'],
		          axisLine: {
		              show: true,
		           lineStyle: {
		                  color: "rgba(255,255,255,.1)",
		                  width: 1,
		                  type: "solid"
		              },
		          },
		          axisTick: {
		              show: false,
		          },
		  		axisLabel:  {
		                  interval: 0,
		                  rotate:0,
		                  show: true,
		                  splitNumber: 15,
		                  textStyle: {
		   					color: "#8b8b8bff",
		                      fontSize: '8',
		                  },
		              },
		      }],
		      yAxis: [{
		          type: 'value',
		          axisLabel: {
		             //formatter: '{value} %'
		  			show:true,
		  			 textStyle: {
		   					color: "#8b8b8bff",
		                      fontSize: '10',
		                  },
		          },
		          axisTick: {
		              show: false,
		          },
		          axisLine: {
		              show: true,
		              lineStyle: {
		                  color: "rgba(255,255,255,.1	)",
		                  width: 1,
		                  type: "solid"
		              },
		          },
		          splitLine: {
		              lineStyle: {
		                 color: "rgba(255,255,255,.1)",
		              }
		          }
		      }],
		      series: [
		  		{
		          type: 'bar',
		          data: [10, 20, 10, 3, 12, 23, 40,26, 20, 18,15, 12, 10,22,],
		          barWidth:'35%', //柱子宽度
		         barGap: 8, //柱子之间间距
		          itemStyle: {
		              normal: {
		                  color:'#1ccda0',
		                  opacity: 1,
		  				barBorderRadius: 5,
		              }
		          }
		      }
		  	]
		  };
		  myChart4.setOption(option4);
	},
	
  }
}
</script>

<style lang="scss" scoped>

</style>






