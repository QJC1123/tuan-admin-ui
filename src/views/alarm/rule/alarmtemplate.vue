
<template>
	<div >
		<div>
			<div style="padding-top: 15px;" >
				<div >
					<el-row style="">
						<el-form class="" ref="form2" :model="form2" label-width="80px" style="font-size: 15px;font-weight: 350;" >
							<div style="background-color: white; padding-left: 20px;padding-bottom: 20px;">
								<!-- <el-button @click.native="getimgvr"></el-button>
								<div style="background-color: #000000;height: 100px;width: 200px;">
									<img :src="verifyCode" style="float:right;height:50px;width:50px">
								</div>
								 -->
								<el-row :gutter="0" style="padding-top: 20px;background-color: white;">
									<el-col :span="3" style="padding-top: 7px;">
										<i class="el-icon-info"  style="color:#6c7278 ;zoom: 1.1;"></i>
										<span style="font-size: 16px;font-weight: 350;color: #6c7278;line-height: 22px;padding-left: 10px;">告警名称</span>
									</el-col>
									<el-col :span="21">
										<el-input
										  placeholder="请输入告警通知规则名称"
										  clearable
										  v-model="form2.ruleName"
										  style="width:250px;padding-left: 5px;height: 10px;" 
										/>
									</el-col>
								</el-row>
								<el-row style="padding-top: 30px;background-color: white; ">
									<div>
										<el-col  :span="2" style="">
											<i class="el-icon-s-data" style="color:#6c7278 ;zoom: 1.1;"></i>
											<span style="font-size: 16px;font-weight: 350;color: #6c7278;padding-left: 8px;">告警级别</span>
										</el-col>
										<el-col :span="20" style="padding-left: 30px;">
											<el-radio-group v-model="form2.ruleLevel" style="font-size: 16px;font-weight: 350;">
												<el-radio
													 v-for="item in levelist"
													:key="item.value"
													:label="item.value"
													>{{item.label}}
												</el-radio>
											</el-radio-group>
										</el-col>
									</div>
								</el-row>
								
								<el-row style="padding-top: 20px;background-color: white; ">
									<el-col :span="2" >
										<i class="el-icon-menu" style="color:#6c7278 ;zoom: 1.1;"></i>
										<span style="font-size: 16px;font-weight: 350;color: #6c7278;padding-left: 8px;">告警类型</span>
									</el-col>
									<el-col :span="22" >
										<el-row>
											<el-radio-group v-model="form2.ruleType" style="padding-left: 20px;">
												<el-radio-button
												class="radio3"
												 v-for="item in typelist"
												:key="item.value"
												:label="item.value"
												border
												style="padding-left: 10px;width: 110px;"
												>{{item.label}}
											</el-radio-button>
											</el-radio-group>
										</el-row>
										<el-row>
											<!-- 区域入侵 -->
											<div v-if="form2.ruleType=='1'" style="padding-top: 20px;padding-left: 30px;">
												<el-radio-group v-model="form2.subruleType" >
													<el-radio-button
													 v-for="item in typelist1"
													:key="item.value"
													:label="item.value"
													>{{item.label}}
												</el-radio-button>
												</el-radio-group>
											</div>
											<!-- 异常行为 -->
											<div v-if="form2.ruleType=='2'" style="padding-top: 20px;padding-left: 140px;">
												<el-radio-group v-model="form2.subruleType" >
													<el-radio-button
													 v-for="item in typelist2"
													:key="item.value"
													:label="item.value"
													>{{item.label}}
												</el-radio-button>
												</el-radio-group>
											</div>
											<!-- 消防告警 -->
											<div v-if="form2.ruleType=='3'" style="padding-top: 20px;padding-left: 250px;">
												<el-radio-group v-model="form2.subruleType" >
													<el-radio-button
													 v-for="item in typelist3"
													:key="item.value"
													:label="item.value"
													>{{item.label}}
												</el-radio-button>
												</el-radio-group>
											</div>
											<!-- 交通检查 -->
											<div v-if="form2.ruleType=='4'" style="padding-top: 20px;padding-left: 250px;padding-left: 360px;">
												<el-radio-group v-model="form2.subruleType" >
													<el-radio-button
													 v-for="item in typelist4"
													:key="item.value"
													:label="item.value"
													>{{item.label}}
												</el-radio-button>
												</el-radio-group>
											</div>
											<!-- 设备管理 -->
											<div v-if="form2.ruleType=='5'" style="padding-top: 20px;padding-left: 250px;padding-left: 450px;">
												<el-radio-group v-model="form2.subruleType" >
													<el-radio-button
													 v-for="item in typelist5"
													:key="item.value"
													:label="item.value"
													>{{item.label}}
												</el-radio-button>
												</el-radio-group>
											</div>
											<!-- 后厨告警 -->
											<div v-if="form2.ruleType=='6'" style="padding-top: 20px;padding-left: 250px;padding-left: 450px;">
												<el-radio-group v-model="form2.subruleType" >
													<el-radio-button
													 v-for="item in typelist6"
													:key="item.value"
													:label="item.value"
													>{{item.label}}
												</el-radio-button>
												</el-radio-group>
											</div>
											<!-- 缺勤缺岗 -->
											<div v-if="form2.ruleType=='7'" style="padding-top: 20px;padding-left: 250px;padding-left: 690px;">
												<el-radio-group v-model="form2.subruleType" >
													<el-radio-button
													 v-for="item in typelist7"
													:key="item.value"
													:label="item.value"
													>{{item.label}}
												</el-radio-button>
												</el-radio-group>
											</div>
											
											<!-- 黑名单人员告警 -->
											<div v-if="form2.ruleType=='8'" style="padding-top: 20px;padding-left: 250px;padding-left: 800px;">
												<el-radio-group v-model="form2.subruleType" >
													<el-radio-button
													 v-for="item in typelist8"
													:key="item.value"
													:label="item.value"
													>{{item.label}}
												</el-radio-button>
												</el-radio-group>
											</div>
										</el-row>
									</el-col>
								</el-row>
							</div>
							
							<div style="padding-top: 30px;"></div>
							<div style="background-color: white;padding-left: 20px;">
								
								<el-row style="padding-top: 30px;">
									<el-col :span="2" >
										<i class="el-icon-s-tools" style="color:#6c7278 ;zoom: 1.1;"></i>
										<span style="font-size: 16px;font-weight: 350;color: #6c7278;padding-left: 8px;">检测配置</span>
									</el-col>
									<el-col :span="20" style="padding-left: 27px;">
										<el-row style="padding-bottom: 1%;padding-top: 50px;">
											<div style="float:left;width:2px;height:20px; background:#219AFF;"></div>
											<span style="padding-left: 5px;">事件计数</span>
											<el-switch
											  size="mini"
											  v-model="form2.condition1"
											  :active-value="1"
											  :inactive-value="0"
											style="zoom: .8;padding-left: 10px;padding-right:10px;"
											  @change="handleStatusChange(scope.row)"
											></el-switch>
										</el-row>
										<el-row>
											<el-col :span="21" style="font-size: 14px;" v-if="form2.condition1==1">
												<span>异常事件计数: 在</span>
												<el-input
												v-model="form2.alruletime1"
												placeholder="1/5/15..."
												clearable
												style="width: 100px"
												>
												</el-input>
												<el-select
												  v-model="form2.alruletime1dw"
												  clearable
												  style="width: 100px"
												>
												  <el-option
												    v-for="item in alruletime1dwlist"
												    :key="item.value"
												    :label="item.label"
												    :value="item.value"
												  />
												</el-select>
												<span>内，检测到异常事件计数大于</span>
												<el-input
												v-model="form2.alrulecount1"
												placeholder="5/10/15"
												clearable
												style="width: 100px"
												>
												</el-input>
												<span>次</span>
											</el-col>
										</el-row>
										
										<el-row style="padding-bottom: 1%;padding-top: 30px;">
											<div style="float:left;width:2px;height:20px; background:#219AFF;"></div>
											<span style="padding-left: 5px;">时间配置</span>
											<el-switch
											  size="mini"
											  v-model="form2.condition2"
											  :active-value="1"
											  :inactive-value="0"
											  style="zoom: .8;padding-left: 10px;padding-right:10px;"
											  @change="handleStatusChange(scope.row)"
											></el-switch>
										</el-row>
										<el-row>
											<el-col :span="21" style="font-size: 14px;" v-if="form2.condition2==1">
												<el-time-picker
												    is-range
												    v-model="form2.alruletime2"
												    range-separator="至"
												    start-placeholder="开始时间"
												    end-placeholder="结束时间"
												    placeholder="选择时间范围">
												  </el-time-picker>
											</el-col>
										</el-row>
										<el-row style="padding-bottom: 1%;padding-top: 30px;">
											<div style="float:left;width:2px;height:20px; background:#219AFF;"></div>
											<span style="padding-left: 5px;">区域配置</span>
											<el-switch
											  size="mini"
											  v-model="form2.condition3"
											  :active-value="1"
											  :inactive-value="0"
											style="zoom: .8;padding-left: 10px;padding-right:10px;"
											  @change="handleStatusChange(scope.row)"
											></el-switch>
										</el-row>
										<el-row :gutter="50">
											<div v-if="form2.condition3==1">
												<el-col :span="5">
													<el-row>
														<div class="conbox" style="padding-top: 7px;">
														  <div class="titbox" style="zoom:1.1">
														    <el-input size="mini" placeholder="搜索摄像头名称、区域" suffix-icon="el-icon-search" v-model="filterText"></el-input>
														  </div>
														  <div class="wordbox" style="padding-top: 20px;">
														    <el-tree
														      @check="getData(vediotreedata)"
														      show-checkbox
														      class="filter-tree"
														      node-key="id"
														      :data="vediotreedata"
														      :props="defaultProps"
														      :filter-node-method="filterNode"
															  default-expand-all
														      ref="tree"
														    ></el-tree>
														  </div>
														</div>
														
													</el-row>
													<el-row style="padding-top: 100px;">
														<div style="padding-left: 60px;">
															<el-row>
																<el-button  @click="draw" size="mini" type="primary">开始标注</el-button>
															</el-row>
															<el-row style="padding-top: 10px;">
																<el-button size="mini" :type="'warning'"  @click="startDraw" style="">绘制区域</el-button>
															</el-row>
															<el-row style="padding-top: 10px;">
																<el-button size="mini"  type="danger" :disabled="isDrawing" @click="clearAll">全部清除</el-button>
															</el-row>
															<el-row style="padding-top: 10px;">
																<el-button size="mini"  type="success" :disabled="isDrawing" @click="savePoints" style="width: 80px;">保  存</el-button>
															</el-row>
														</div>
													</el-row>
												</el-col>
												<el-col :span="19" >
													<el-row>
														<div style="display: flex;flex-direction: row;">
														   <span style="float: left;padding-top: 8px;">标签名称</span>
														  <el-input v-model="committag" placeholder="请输入" style="width: 200px;padding-left: 8px;" />
														  <span style="float: left;padding-top: 8px;padding-left: 50px;">危险区域滞留时间:</span>
														  <el-input v-model="wxtime" placeholder="请输入" style="width: 200px;padding-left: 8px;" />
														  <span style="float: left;padding-top: 8px;">秒</span>
														</div>
													</el-row>
													
													<el-row style="padding-top: 20px;">
														<div class="canvas-wrap" style="">
														  <canvas id="imgCanvas" ref="canvaxbox"></canvas>
														  <!--用来和鼠标进行交互操作的canvas-->
														  <canvas id="drawCanvas" ref="canvas" :style="{cursor: isDrawing?'crosshair': 'default'}"> </canvas>
														  <!--存储已生成的点线，避免被清空-->
														  <canvas id="saveCanvas" ref="canvasSave"></canvas>	  
														</div>
													</el-row>
												</el-col>
											</div>
										</el-row>
									</el-col>
								</el-row>
							</div>
							
							<div style="padding-top: 30px;"></div>
							<div style="background-color: white;padding-bottom:80px;">
								<el-row style="padding-top: 30px;padding-left: 20px;">
									<el-col :span="2" >
										<i class="el-icon-s-tools" style="color:#6c7278 ;zoom: 1.1;"></i>
										<span style="font-size: 16px;font-weight: 350;color: #6c7278;padding-left: 8px;">通知配置</span>
									</el-col>
									<el-col :span="20" style="padding-left: 27px;">
										<el-row style="padding-bottom: 1%;padding-top: 50px;">
											<div style="float:left;width:2px;height:20px; background:#219AFF;"></div>
											<span style="padding-left: 5px;">通知方式</span>
										</el-row>
										<el-row>
											<el-col :span="24" style="padding-left: 10px;padding-top: 10px;">
												<el-col :span="2">
													<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
												</el-col>
												<el-col :span="12">
													<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
													  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
													</el-checkbox-group>
												</el-col>
											</el-col>
										</el-row>
										<el-row style="padding-bottom: 1%;padding-top: 30px;">
											<div style="float:left;width:2px;height:20px; background:#219AFF;"></div>
											<span style="padding-left: 5px;">通知频率</span>
										</el-row>
										<el-row>
											<span>在告警任务被认领前，每隔</span>
											<el-input
											v-model="form2.alruletime3"
											placeholder="1/5/15..."
											clearable
											style="width: 100px"
											>
											</el-input>
											<span>分钟，发送一次告警通知</span>
										</el-row>
										<el-row style="padding-bottom: 1%;padding-top: 30px;">
											<div style="float:left;width:2px;height:20px; background:#219AFF;"></div>
											<span style="padding-left: 5px;">通知升级机制</span>
											<el-switch
											  size="mini"
											  v-model="form2.condition4"
											  :active-value="1"
											  :inactive-value="0"
											style="zoom: .8;padding-left: 10px;padding-right:10px;"
											  @change="handleStatusChange(scope.row)"
											></el-switch>
										</el-row>
										<el-row v-if="form2.condition4==1">
											<span>告警通知发送</span>
											<el-input
											v-model="form2.alruletime4"
											placeholder="1/5/15..."
											clearable
											style="width: 100px"
											>
											</el-input>
											<span>轮次后仍无人认领，升级告警通知至管理员</span>
										</el-row>
										<el-row style="padding-bottom: 1%;padding-top: 30px;">
											<div style="float:left;width:2px;height:20px; background:#219AFF;"></div>
											<span style="padding-left: 5px;">通知人员</span>
										</el-row>
										<el-row>
											<div style="">
												<el-row style="padding-top: 20px;padding-left: 30px; background-color: white;">
													<el-col :span="11">
														<div class="conbox">
														  <div class="titbox" style="zoom:1">
														    <el-input size="mini" placeholder="搜索成员、部门" suffix-icon="el-icon-search" v-model="filterText1"></el-input>
														  </div>
														  <div class="wordbox" style="padding-top: 20px;">
														    <el-tree
														      @check="getData1(treedata)"
														      show-checkbox
														      class="filter-tree"
														      node-key="id"
														      :data="treedata"
														      :props="defaultProps"
														      :filter-node-method="filterNode"
															  default-expand-all
														      ref="tree1"
															  @node-click="draw"
														    ></el-tree>
														  </div>
														</div>
													</el-col>
													<el-col :span="1" style="padding-left: 7px;">
														<div class="el-divider"
														style="display:inline-block;width: 1px;height: 400px;margin: 0 8px;vertical-align: middle;position: relative;"
														></div>
													</el-col>
													<el-col :span="12">
														<div class="conbox">
														  <div class="titbox">
															  <span style="font-size: 17px;">已选择用户（{{keyarr1.length}}）</span>
														  </div>
														  <div class="wordbox" style="padding-top: 20px;padding-left: 20px;zoom:1;height: 350px;">
														    <ul>
														      <li v-for="(item,index) in keyarr1" :key="index" style="padding-top: 5px;">
														        <div class="inli">
														        <i class="el-icon-s-custom"></i>
														        <span style="padding-left: 5px;">{{item.label}}</span>
														        <i class="el-icon-close" @click="removeData(item)"></i>
														        </div>
														      </li>
														    </ul>
														  </div>
														</div>
													</el-col>
													<div style="float: right;bottom: 0px;" class="dialog-footer">
													  <el-button type="primary" @click="submitForm">确 定</el-button>
													  <el-button @click="cancel">取 消</el-button>
													</div>
												</el-row>
											</div>
										</el-row>
									</el-col>
								</el-row>
							</div>
						</el-form>
					</el-row>
				</div>
			</div>
		</div>
			
	</div>
</template>

<script>
import getCodeImg from '@/api/login.js'
const cityOptions = ['微信公众号', '小程序', '短信', '邮箱'];

export default {
  name: 'AlarmTemplateCreate',
  components: {
  },
  data() {
    return {
		
		verifyCode:'',
		
		cameraform:
		{
		  cameraLable: "",
		  cameraLableTime: "",
		  cameraName: "",
		  cameraXy: "",
		  description: "",
		  filePath: "",
		  id: 0,
		  location: "",
		  rtspUrl: "",
		  schoolId: 0,
		  status: ""
		},
		
		//通知渠道
		checkAll: false,
		checkedCities: ['微信公众号', '小程序'],
		cities: cityOptions,
		isIndeterminate: true,
		//告警规则详情
		form2:{
			// 基本信息
			ruleName:'新告警规则模板',
			ruleLevel: '1' ,
			ruleType:'1',
			subruleType:'1',
			
			//检测配置
			condition1:0,
			alruletime1:'',
			alruletime1dw:'',
			alrulecount1:'',
			condition2:0,
			alruletime2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
			condition3:1,
			
			alarmpicture:'',
			
			//通知配置
			condition4:0,
			alruletime3:'',//间隔时间
			alruletime4:'',//轮
		
		},
		
		alruletime1list:[
				  {value:1,},
				  {value:15,},
				  {value:30,}
		],
		alruletime1dwlist:[
				  {value:'秒',},
				  {value:'分钟',},
				  {value:'时',},
				  {value:'日',},
				  {value:'周',}
		],
		
		//所选区域摄像头
		checkList: [],
		keyarr:[],
		filterText: "",
		
		keyarr1:[],
		checkList1: [],
		filterText1: "",
		
		vediotreedata:[
				{
					id: '1',
					label: '校门口',
					children:[
						{
							id: '1-1',
							label:"校门口-东-1",
							},
						{
							id: '1-2',
							label:"校门口-西-1",
						}
					]
					},
					{
						id: '2',
						label: '实验楼',
						children:[
							{
								id: '2-1',
								label:"实验楼-1F-东-1",
							},
							{
								id: '2-2',
								label:"实验楼-2F-西-2",
							}
						]
					},
					{
						id: '3',
						label: '湖边',
						children:[
							{
								id: '3-1',
								label:"湖边-东-1",
							},
							{
								id: '3-2',
								label:"湖边-西-2",
							}
						]
					}
		],
		
		
		selectRadio: 0, // 默认选中第一行数据
		
		imgUrl:'http://mms0.baidu.com/it/u=2281103194,2302460655&fm=253&app=120&f=JPEG&fmt=auto&q=75?w=640&h=446',
		isDrawing: false, // 是否正在绘制
		ratio: 1,
		imgWidth: 3020,
		imgHeight: 1080,
		wrapWidth: 300,
		wrapHeight: 300,
		canvasWidth: 300,
		canvasHeight: 300,
		drawingPoints: [],
		drawedPoints: [],
		imgCanvas: null,
		imgCtx: null,
		drawCanvas: null,
		drawCtx: null,
		saveCanvas: null,
		saveCtx: null,
		submitData: [],
		committag:'',
		wxtime:'',
		
		
		
		
      // 遮罩层
      loading: true,
      
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
	  current: 0,
	
	  
	  treedata:[
	  		{
	  				id: '1',
	  			label: '图安校园',
	  			children:[
	  				{
	  						id: '1-1',
	  					label:"安保部门",
	  					children:[
	  						{
	  								id: '1-1-1',
	  								label:"警卫部门",
	  						},
	  						{
	  								id: '1-1-2',
	  								label:"监控部门",
	  						},],
	  				},
	  				{
	  						id: '1-2',
	  					label:"后勤部门",
	  					children:[
	  						{	id: '1-2-1',
	  								label:"设备后勤部",
							},
	  						{
	  								id: '1-2-2',
	  								label:"餐饮后勤部",
	  							
	  						},
	  						{
	  								id: '1-2-3',
	  								label:"宿舍后勤部",
	  						}],
	  				},
	  				{
	  						id: '1-3',
	  					label:"教师部门",
	  					children:[
	  						{
	  								id: '1-3-1',
	  								label:"班主任"},
	  						{
	  								id: '1-3-2',
	  								label:"普通老师"},
	  					],
	  				},
	  				{
	  						id: '1-4',
	  					label:"在校学生",
	  				},
	  				{
	  						id: '1-5',
	  					label:"学生家长",
	  				},
	  			]
	  		},
	  ],
	  
	  
	  
	  //告警级别
	  levelist: [
	   {
	           value: '1',
	           label: '一级'
	       },
	       {
	           value: '2',
	           label: '二级'
	       },
	       {
	           value: '3',
	           label: '三级'
	       },
	   ], 
	   
	    //告警类型
	   typelist:[
		{
			value: '1',
			label: '区域入侵',
			
		},
	  	{
	  		value: '2',
	  		label: '异常行为',
			
	  	},
	  	{
	  		value: '3',
	  		label: '消防告警',
	  	},
	  	{
	  		value: '4',
	  		label: '交通告警',
	  	},
	  	{
	  		value: '5',
	  		label: '设施告警',
	  	},
	  	{
	  		value: '6',
	  		label: '后厨告警',
	  	},
	  	{
	  		value: '7',
	  		label: '缺勤缺岗',
	  	},
	  	{
	  		value: '8',
	  		label: '黑名单人员告警',
	  	}
	   ],
	   typelist1:[
	   	  	{
	   	  		value: '1',
	   	  		label: '危险区域滞留',
	   	  	},
	   	  	{
	   	  		value: '2',
	   	  		label: '围栏翻越',
	   	  	},
			{
				value: '3',
				label: '特定区域人员闯入',
			},
	   ],
	   typelist2:[
	   	  	{
	   	  		value: '1',
	   	  		label: '挥手求救',
	   	  	},
	   	  	{
	   	  		value: '2',
	   	  		label: '跌倒',
	   	  	},
	   			{
	   				value: '3',
	   				label: '抽烟',
	   			},
	   ],
	   typelist3:[
	   	  	{
	   	  		value: '1',
	   	  		label: '烟雾明火',
	   	  	},
	   	  	{
	   	  		value: '2',
	   	  		label: '消防设施异常',
	   	  	},
	   ],
	   typelist4:[
	   	  	{
	   	  		value: '1',
	   	  		label: '路面积水',
	   	  	},
	   	  	{
	   	  		value: '2',
	   	  		label: '车辆违停',
	   	  	},
	   ],
	   typelist5:[
	   	  	{
	   	  		value: '1',
	   	  		label: '监控设备异常',
	   	  	},
	   	  	{
	   	  		value: '2',
	   	  		label: '电梯异常',
	   	  	},
			{
				value: '3',
				label: '其他设备异常',
			},
	   ],
	   typelist6:[
	   	  	{
	   	  		value: '1',
	   	  		label: '口罩识别告警',
	   	  	},
	   	  	{
	   	  		value: '2',
	   	  		label: '厨师帽识别告警',
	   	  	},
	   			{
	   				value: '3',
	   				label: '老鼠识别告警',
	   			},
	   ],
	   
	   
	   typelist7:[
	   	  	{
	   	  		value: '1',
	   	  		label: '归寝异常告警',
	   	  	},
	   	  	{
	   	  		value: '2',
	   	  		label: '值班异常告警',
	   	  	}
	   ],
	   typelist8:[
	   	  	{
	   	  		value: '1',
	   	  		label: '访客异常告警',
	   	  	},
	   ],  
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.initCanvas()
    // this.getImage()
  },
  methods: {
	  // getimgvr(){
	  // 	axios.get('/system/getVerifiCodeImage', {responseType: 'blob'}).then((response) => {
	  // 		// console.log(response)
	  // 	    this.verifyCode = window.URL.createObjectURL(response)
	  // 	  })
	  // },

	    draw(){
			this.initCanvas()
			this.getImage()
		},
		
		initCanvas() { // 初始化canvas画布
		  let canvasWrap = document.getElementsByClassName('canvas-wrap')
		  this.wrapWidth = canvasWrap [0].clientWidth
		  this.wrapHeight = canvasWrap [0].clientHeight
		 
		  this.imgCanvas = document.getElementById('imgCanvas')
		  this.imgCtx = imgCanvas.getContext('2d')
		 
		  // 绘制canvas
		  this.drawCanvas = document.getElementById('drawCanvas')
		  this.drawCtx = drawCanvas.getContext('2d')
		 
		  // 保存绘制区域 saveCanvas
		  this.saveCanvas = document.getElementById('saveCanvas')
		  this.saveCtx = saveCanvas.getContext('2d')
		  // this.initImgCanvas()
		},
		
		initImgCanvas() {
		  // 图片加载绘制
		  let img = document.createElement('img')
		  img.src =  this.imgUrl
		  
		  img.onload = () => {
		      console.log(img.width,img.height)
			  this.imgWidth = img.width
			  this.imgHeight = img.height
			  console.log(this.imgWidth,this.imgHeight)
			  console.log('图片已加载')
			  // 计算宽高比
			  let ww = this.wrapWidth // 画布宽度
			  let wh = this.wrapHeight // 画布高度
			  let iw = this.imgWidth // 图片宽度
			  let ih = this.imgHeight // 图片高度
			  
			  console.log('iwiw',iw,ih)
			   
			  if (iw/ih < ww/wh) { // 以高为主
			    this.ratio = ih / wh
			    this.canvasHeight = wh
			    this.canvasWidth = wh * iw/ih
			  } else { // 以宽为主
			    this.ratio = iw / ww
			    this.canvasWidth = ww
			    this.canvasHeight = ww * ih/iw
			  }
			  
			  // 初始化画布大小
			  imgCanvas.width = this.canvasWidth
			  imgCanvas.height = this.canvasHeight
			  drawCanvas.width = this.canvasWidth
			  drawCanvas.height = this.canvasHeight
			  saveCanvas.width = this.canvasWidth
			  saveCanvas.height = this.canvasHeight
			  
			  console.log('cwce',this.canvasWidth, this.canvasHeight)
			  this.imgCtx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
			  this.renderDatas() // 渲染原有数据
		    }
		},
		
		startDraw() { // 绘制区域
		  if (this.isDrawing) return
		  this.isDrawing = true
		  // 绘制逻辑
		  drawCanvas.addEventListener("click", this.drawImageClickFn)
		  drawCanvas.addEventListener("dblclick", this.drawImageDblClickFn)
		  drawCanvas.addEventListener("mousemove", this.drawImageMoveFn)
		},
		
		clearAll() { // 清空所有绘制区域
		  this.saveCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		  this.drawedPoints = []
		},
		
		
		getImage() { // 请求图片
			// this.imgUrl = 'img/1.jpg',
			this.imgUrl='http://mms0.baidu.com/it/u=2281103194,2302460655&fm=253&app=120&f=JPEG&fmt=auto&q=75?w=640&h=446',
			// this.imgWidth = 3020
			// this.imgHeight = 1080
			this.imgUrl && this.initImgCanvas()
			// imgUrl: 'img/1.jpg',
			// isDrawing: false, // 是否正在绘制
			// ratio: 1,
			// imgWidth: 3020,
			// imgHeight: 1080,
			// wrapWidth: 300,
			// wrapHeight: 300,
			// canvasWidth: 300,
			// canvasHeight: 300,
			// drawingPoints: [],
			
		  // axios.post('/dsj/screenshot/', {
		  //   "source":"rtsp://admin:admin12345@10.10.42.251:554/cam/realmonitor?channel=1&subtype=0"
		  // }).then(res => {
		  //   this.imgUrl = res.data.img
		  //   this.imgWidth = res.data.width
		  //   this.imgHeight = res.data.height
		  //   this.imgUrl && this.initImgCanvas()
		  // })
		},
		
		// getImage() { // 请求图片
		//   axios.post('/dsj/screenshot/', {
		//     "source":"rtsp://admin:admin12345@10.10.42.251:554/cam/realmonitor?channel=1&subtype=0"
		//   }).then(res => {
		//     this.imgUrl = res.data.img
		//     this.imgWidth = res.data.width
		//     this.imgHeight = res.data.height
		//     this.imgUrl && this.initImgCanvas()
		//   })
		// },
		drawImageClickFn(e) {
		  let drawCtx = this.drawCtx
		  if (e.offsetX || e.layerX) {
		    let pointX = e.offsetX == undefined ? e.layerX : e.offsetX;
		    let pointY = e.offsetY == undefined ? e.layerY : e.offsetY;
		    let lastPoint = this.drawingPoints[this.drawingPoints.length-1] || []
		    if (lastPoint[0] !== pointX || lastPoint[1] !== pointY) {
		      this.drawingPoints.push([pointX, pointY])
		    }
		  }
		},
		drawImageMoveFn(e) {
		  let drawCtx = this.drawCtx
		  if (e.offsetX || e.layerX) {
		    let pointX = e.offsetX == undefined ? e.layerX : e.offsetX;
		    let pointY = e.offsetY == undefined ? e.layerY : e.offsetY;
		    // 绘制
		    drawCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		 
		    // 绘制点
		    drawCtx.fillStyle = 'blue'
		    this.drawingPoints.forEach((item, i) => {
		      drawCtx.beginPath();
		      drawCtx.arc(...item, 6, 0, 180)
		      drawCtx.fill(); //填充
		    })
		 
		    // 绘制动态区域
		    drawCtx.save()
		    drawCtx.beginPath();
		    this.drawingPoints.forEach((item, i) => {
		      drawCtx.lineTo(...item)
		    })
		    drawCtx.lineTo(pointX, pointY)
		    drawCtx.lineWidth = "3";
		    drawCtx.strokeStyle= "blue";
		    drawCtx.fillStyle = 'rgba(255, 0, 0, 0.3)'
		    drawCtx.stroke();
		    drawCtx.fill(); //填充
		    drawCtx.restore()
		  }
		},
		drawImageDblClickFn(e) {
		  let drawCtx = this.drawCtx
		  let saveCtx = this.saveCtx
		  if (e.offsetX || e.layerX) {
		    let pointX = e.offsetX == undefined ? e.layerX : e.offsetX;
		    let pointY = e.offsetY == undefined ? e.layerY : e.offsetY;
		    let lastPoint = this.drawingPoints[this.drawingPoints.length-1] || []
		    if (lastPoint[0] !== pointX || lastPoint[1] !== pointY) {
		      this.drawingPoints.push([pointX, pointY])
		    }
		  }
		  // 清空绘制图层
		  drawCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		  
		  // 绘制区域至保存图层
		  this.drawSaveArea(this.drawingPoints)
		 
		  this.drawedPoints.push(this.drawingPoints)
		  this.drawingPoints = []
		  this.isDrawing = false
		 
		  // 绘制结束逻辑
		  drawCanvas.removeEventListener("click", this.drawImageClickFn)
		  drawCanvas.removeEventListener("dblclick", this.drawImageDblClickFn)
		  drawCanvas.removeEventListener("mousemove", this.drawImageMoveFn)
		},
		drawSaveArea(points) {
		  if(!points instanceof Array || points.length === 0) return
		  this.saveCtx.save()
		  this.saveCtx.beginPath();
		  points.forEach((item, i) => {
		    this.saveCtx.lineTo(...item)
		  })
		  this.saveCtx.closePath()
		  this.saveCtx.lineWidth="2";
		  this.saveCtx.fillStyle = 'rgba(255,0, 255, 0.3)'
		  this.saveCtx.strokeStyle= "red";
		  this.saveCtx.stroke();
		  this.saveCtx.fill(); //填充
		  this.saveCtx.restore()
		},
		
		savePoints() { // 将画布坐标数据转换成提交数据
			let tag  = this.committag 
			let wxtime = this.wxtime
			// console.log(tag,wxtime)
		    // console.log(this.submitData)
		    let objectPoints = []
		  // "object": [{"polygon": {"x1":700,"y1":273,"x2":975,"y2":278,"x3":1107,"y3":368,"x4":718,"y4":354} }]
			  objectPoints = this.drawedPoints.map(area => {
				let tag  = this.committag 
				let polygon = {}
				area.forEach((point, i) => {
				  polygon[`x${i+1}`] = Math.round(point[0] * this.ratio)
				  polygon[`y${i+1}`] = Math.round(point[1] * this.ratio)
				})
				return {
					"area":polygon,
				}
			  })
			  
			  this.submitData = objectPoints
			  this.cameraform.cameraXy = JSON.stringify(objectPoints)
			  this.cameraform.cameraLable = tag
			  this.cameraform.cameraLableTime = wxtime
			 
			  console.log('最终提交数据', this.submitData)
			  console.log('转化后',this.cameraform.cameraXy,this.cameraform.cameraLable,this.cameraform.cameraLableTime)
			  
			this.msgSuccess("标注成功");
		},
		
		renderDatas() { // 将提交数据数据转换成画布坐标
		  this.drawedPoints = this.submitData.map(item => {
		    let polygon = item.polygon
		    let points = []
		    for(let i=1; i< Object.keys(polygon).length/2 + 1; i++) {
		      if (!isNaN(polygon[`x${i}`]) && !isNaN(polygon[`y${i}`])) {
		        points.push([polygon[`x${i}`]/this.ratio, polygon[`y${i}`]/this.ratio])
		      }
		    }
		    this.drawSaveArea(points)
		    return points
		  })
		},
	  

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        alruleLevel: null,
        alruleName: null,
        alruleType: null,
        alruleTime: null,
        alruleGroupId: null,
        alruleReceiver: null,
        alruleUpgrade: null,
        alruleUpgroupId: null,
        alruleUpreceive: null,
        alruleTemplateid: null,
        alruleStatus: 0
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    /** 提交规则按钮 */
    submitForm() {
		this.msgSuccess("新增规则成功");
		this.$router.back();
    },

	handleCheckAllChange(val) {
	        this.checkedCities = val ? cityOptions : [];
	        this.isIndeterminate = false;
	      },
	      handleCheckedCitiesChange(value) {
	        let checkedCount = value.length;
	        this.checkAll = checkedCount === this.cities.length;
	        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
	},

	//关键词搜索
	filterNode(value, data) {
	    if (!value) return true;
	    return data.label.indexOf(value) !== -1;
	  },
	getData() {
	  this.keyarr=[]
	  this.checkList = this.$refs.tree.getCheckedNodes();
	  console.log(this.checkList)
	  if(this.checkList.length!=0){
	    for (var i = 0; i < this.checkList.length; i++) {
	      if (!this.checkList[i].children) {
	      this.keyarr.push(this.checkList[i])
	      console.log(this.checkList[i])
	      }
	    }
	  }else{
	    this.keyarr=[]
	  }
	},
	getData1() {
	  this.keyarr1=[]
	  this.checkList1 = this.$refs.tree1.getCheckedNodes();
	  console.log(this.checkList1)
	  if(this.checkList1.length!=0){
	    for (var i = 0; i < this.checkList1.length; i++) {
	      if (!this.checkList1[i].children) {
	      this.keyarr1.push(this.checkList1[i])
	      console.log(this.checkList1[i])
	      }
	    }
	  }else{
	    this.keyarr1=[]
	  }
	},
	setCheckedNodes(arr) {
	  this.$refs.tree.setCheckedNodes(arr);
	},
	removeData(data) {
	  let checklist = this.keyarr;
	  console.log(this.keyarr)
	  for (var i = 0; i < checklist.length; i++) {
	    if (checklist[i].label === data.label) {
	      checklist.splice(i, 1);
	    }
	  }
	  console.log(this.keyarr)
	  this.keyarr = checklist;
	  this.setCheckedNodes(this.keyarr);
	},

  }
};
</script>
<style>

	.radio3.el-radio-button__inner {
		    font-size: 14px;
		    width: 180px;
		}

	.canvas-wrap {
	  /* width: 80vw; */
	  /* height: 45vw; */
	  width: 60vw;
	  height: 33.75vw;
	  margin: 0px auto;
	  background-color: #000;
	  border: 3px;
	  border-color: #333;
	  position: relative;
	}
	#imgCanvas, #drawCanvas, #saveCanvas {
	  background: rgba(255, 0, 255, 0);
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	}
	#drawCanvas {
	  z-index: 2;
	}

	
</style>

