<template>
  <div class="app-container" style="padding-left: 0px;height: 800px;">
	
	<div>
		<!-- <div style="background-color: white;">
			<el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" style="padding-top: 10px;padding-left: 10px;">
				
			</el-form>
		</div> -->
		
		<el-row :gutter="10" style="padding-top: 30px;">
			<el-col :span="1.5">
			  <el-button
			    type="success"
			    plain
			    icon="el-icon-plus"
			    size="mini"
				@click="handleAdd"
			  >新增</el-button>
			</el-col>
			<el-col :span="1.5">
			  <el-button
			    type="danger"
			    plain
			    icon="el-icon-delete"
			    size="mini"
			    :disabled="multiple"
			    @click="handleDelete"
			  >删除</el-button>
			</el-col>
			<div >
				<right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
			</div>
		</el-row>
		
		
		<!-- v-loading="loading" -->
		<div style="padding-top: 10px;">
			<div style="background-color: white;">
				<!-- <el-table v-loading="loading" :data="CameraList" @selection-change="handleSelectionChange" :header-cell-style="{background:'#ffffff'}"> -->
				<el-table v-loading="loading" :data="tablelist" @selection-change="handleSelectionChange" :header-cell-style="{background:'#ffffff'}">
				  <el-table-column type="selection" align="center" />
				  <el-table-column label="序号" align="center" prop="id" width="50px"/>
				  <!-- <el-table-column label="设备编号" prop="cameraid">
				  </el-table-column> -->
				   <!-- <el-table-column v-for="(item,index) in idlist" :key="index" :label="item.sid" label="设备编号" align="center"  >
						<template slot-scope="scope">
							<span>{{item.sid}}</span>
						</template>
				   </el-table-column> -->
				  <el-table-column label="摄像头名称" align="center" prop="cameraName" />
				  <el-table-column label="所属范围" align="center" prop="location" width="100px" />
				  <el-table-column label="描述" align="center" prop="description" />
				  <el-table-column label="状态" prop="status" align="center" >
				   </el-table-column>
					<el-table-column label="通道数" align="center"width="80px">
						 <template slot-scope="scope" v-model="channel">
							 <span>{{channel}}</span>
						 </template>
					</el-table-column>
				   <!-- <el-table-column label="查看录像" prop="filePath" align="center" >
				    </el-table-column>
					<el-table-column label="查看实时监控" prop="rtspUrl" align="center" >
					 </el-table-column> -->
					
				  <!-- <el-table-column label="角色状态" align="center" prop="status"/> -->
				  
				  <!-- <el-table-column label="角色状态" align="center" width="100" prop="status">
				    <template slot-scope="scope">
				      <el-switch
				        v-model="scope.row.status"
				        active-value="0"
				        inactive-value="1"
				        @change="handleStatusChange(scope.row)"
				      ></el-switch>
				    </template>
				  </el-table-column> -->
				  
				  <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="250px">
				    <template slot-scope="scope">
						
						<el-button
						  size="mini"
						  type="text"
						  icon="el-icon-caret-right"
						  @click="handleViewmp4(scope.row)"
							style="color: #5bcac7;"
						>查看录像</el-button>
						<!-- <el-button
						  size="mini"
						  type="text"
						  @click="handleViewrtsp(scope.row)"
							style="color: #5bcac7;"
						>查看监控</el-button> -->
				      <el-button
				        size="mini"
				        type="text"
				        icon="el-icon-edit"
				        @click="handleUpdate(scope.row)"
						style="color: #5bcac7;"
				      >修改</el-button>
				      <el-button
				        size="mini"
				        type="text"
				        icon="el-icon-delete"
				        @click="handleDelete(scope.row)"
						style="color: #5bcac7;"
				      >删除</el-button>
				    </template>
				  </el-table-column>
				</el-table>
			</div>
		</div>
		
		<div style="background-color: white;height: 40px;">
			<pagination
			  v-show="total>0"
			  :total="total"
			  :page.sync="queryParams.pageNum"
			  :limit.sync="queryParams.pageSize"
			  @pagination="getList"
			/>
		</div>
	</div>
	
	
    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="设备名称" prop="cameraName">
            <el-input v-model="form.cameraName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="所属区域" prop="location">
            <el-input v-model="form.location" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="设备描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="设备状态" prop="status">
            <el-input v-model="form.status" placeholder="请输入" />
          </el-form-item>
		  <el-form-item label="录像地址" prop="filePath">
		    <el-input v-model="form.filePath" placeholder="请输入" />
		  </el-form-item>
		  <el-form-item label="RTSP地址" prop="rtspUrl">
		    <el-input v-model="form.rtspUrl" placeholder="请输入" />
		  </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
	
	<!-- 查看录像 -->
	<el-dialog :title="title" :visible.sync="open1" width="500px" append-to-body >
	  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
		 <!-- <el-form-item prop="id">
		    
		  </el-form-item> -->
		  
	      <el-form-item label="选择时间" >
			  <div style="display: flex;flex-direction: row;">
				  <div class="block">
				      <el-date-picker
				        v-model="mp4date"
				        type="datetime"
				        placeholder="选择日期时间"
				        style="zoom: 0.9;width: 170px;"
				  	  value-format="yyyy-MM-dd_HH"
				      >
				      </el-date-picker>
				    </div>
					<div style="padding-left: 160px;">
						<el-button @click="handleViewmp4bydate" size="mini">查询</el-button>
					</div>
				    
			  </div>
	      </el-form-item>
		  <div>
			  
			  <template>
			      <div class='demo' v-if="disshow==0">
			          <video-player class="video-player vjs-custom-skin" 
			                        ref="videoPlayer" 
									width="100%"
									height="100%"
			                        :playsinline="true" 
			                        :options="playerOptions">
			          </video-player>
			      </div>
			  </template>
			  <template>
			      <div class='demo' v-if="disshow==1">
			          <video-player class="video-player vjs-custom-skin" 
			                        ref="videoPlayer" 
									width="100%"
									height="100%"
			                        :playsinline="true" 
			                        :options="playerOptions1">
			          </video-player>
			      </div>
			  </template>
			  
			  
			  
				<!-- <video
				controls
				preload="auto"
				width="100%"
				class="video"
				>
				<source src="videourl" type="video/mp4"></source>
				</video> -->
			<!-- 26/2023-04-12_00 -->
			<!-- http://10.99.41.158:8081/video/getmp4/2/2023-03-16_21 -->
			<!-- <source src="http://10.99.41.158:8081/video/getmp4/2/2023-03-16_21" type="video/mp4"> --></source>
		  </div>
		  <!-- <el-form-item label="录像地址" prop="filePath">
		    <el-input v-model="form.filePath" placeholder="请输入数据权限" />
		  </el-form-item> -->
	    </el-form>
	  
	</el-dialog>
	
	<!-- 查看rtsp监控 -->
	<el-dialog :title="title" :visible.sync="open2" width="500px" append-to-body >
	  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
	      <el-form-item prop="id">
	      </el-form-item>
		  
		  <!-- <div>
			  <video
				  :src="videourl"
				  controls
				  autoplay
				  class="video"
				  width="100%"
				></video>
				<el-form-item label="RTSP地址" prop="rtspUrl">
				  <el-input v-model="form.rtspUrl" placeholder="请输入数据权限" />
				</el-form-item>
		  </div> -->
	    </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="submitForm">确 定</el-button>
	    <el-button @click="cancel">取 消</el-button>
	  </div>
	</el-dialog>
	
	
	
  </div>
</template>

<script>
import { listCamera, getCamera, delCamera, addCamera, updateCamera,listCameraby,listCamerabypr ,
 listVideo, getVideo, delVideo, addVideo, updateVideo,
listVideobypr,getVideomp4byvid,saveVideomp4bycid
} from "@/api/vedio/camera.js";

import getVideomp4bydate from "@/api/vedio/video.js"
// import { listVideo, getVideo, delVideo, addVideo, updateVideo,listVideo,listVideobypr,getVideomp4bydate,getVideomp4bycid,saveVideomp4bycid} from "@/api/vedio/video.js";

import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'



export default {
  name: "cmmanage",
  components: {
    videoPlayer
  },
  data() {
    return {
		
		disshow:0,
		
		
		playerOptions: {
		                playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
		                autoplay: false,  // 如果为true,浏览器准备好时开始回放
		                muted: false,     // 默认情况下将会消除任何音频。
		                loop: false,      // 是否视频一结束就重新开始。
		                preload: 'auto',  // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
		                language: 'zh-CN',
		                aspectRatio: '16:9',  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
		                fluid: true,  // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
		                sources: [{
		                    type: "video/mp4",  // 类型
		                    src: 'videourl'             // url地址
		                }],
		                poster: '',  // 封面地址
		                notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
		                controlBar: {
		                    timeDivider: true,           // 当前时间和持续时间的分隔符
		                    durationDisplay: true,       // 显示持续时间
		                    remainingTimeDisplay: false, // 是否显示剩余时间功能
		                    fullscreenToggle: true       // 是否显示全屏按钮
		                }
		            },
					
					
			playerOptions1: {
			                playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
			                autoplay: false,  // 如果为true,浏览器准备好时开始回放
			                muted: true,     // 默认情况下将会消除任何音频。
			                loop: false,      // 是否视频一结束就重新开始。
			                preload: 'auto',  // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
			                language: 'zh-CN',
			                aspectRatio: '16:9',  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
			                fluid: true,  // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
			                sources: [{
			                    type: "video/mp4",  // 类型
			                    src: require('@/assets/video/case1_car.mp4')             // url地址
			                }],
			                poster: '',  // 封面地址
			                notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
			                controlBar: {
			                    timeDivider: true,           // 当前时间和持续时间的分隔符
			                    durationDisplay: true,       // 显示持续时间
			                    remainingTimeDisplay: false, // 是否显示剩余时间功能
			                    fullscreenToggle: true       // 是否显示全屏按钮
			                }
			            },
		
		videourl:'',
		fid:'',
	mp4date:'',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      CameraList: [],
	  idlist:[
		  {
			  id:1,
			  cameraid:"34020000001110000022"
		  },
		  {
			 id:2, 
		  	cameraid:"34020000001110000033"
		  },
		  {
			id:3,
			cameraid:"34020000001110000043"
		  },
	  ],
	  tablelist:[],
	  channel:1,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
	  open1: false,
	  open2: false,
	  // statuslist:[
		 //  {
			//   value:"0",
			//   label:"停用",
		 //  },
		 //  {
			//   value:"1",
			//   label:"在线",
		 //  },
	  // ],
	  
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
	  queryParams1:{
		  location:'',
		  cameraLable:'', 
		  schoolId:'1',
	  },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
	  
    };
  },
  created() {
	  this.getList();
  },
  methods: {

	  
    /** 查询列表 */
    getList() {
		
		// this.loading = true;
		// this.CameraList = [{
		// 		id:1,
		// 		cameraName:"校门口-1",
		// 		location:"校门口",
		// },
		// {
		// 		id:2,
		// 		cameraName:"校门口-2",
		// 		location:"校门口",
		// }]
		
		// this.tablelist = this.CameraList
		// this.idlist.forEach((item,i)=>{
		// 	this.tablelist[i].cameraid = item.sid
		// })
		
		// this.total = response.data.total;
		// this.loading = false;
		
		

      listCamera(this.queryParams.pageNum,this.queryParams.pageSize,this.queryParams1).then(response => {
        this.CameraList = response.data.records;
		this.tablelist = this.CameraList
		this.idlist.forEach((item,i)=>{
			this.tablelist[i].cameraid = item.sid
		})
        this.total = response.data.total;
        this.loading = false;
      });
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
		schoolId: null,
		cameraName: null,
		location: null,
		description: null,
		status: null,
		filePath:null,
		rtspUrl:null,
		cameraLable:null,
		cameraXy:null,
		cameraLableTime:null
      };
      this.resetForm("form");
    },
	
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
	  this.queryParams.pageSize = 10;
      this.getList();
    },
	

	
	
    /** 重置按钮操作 */
    // resetQuery() {
    //   this.resetForm("queryForm");
    //   this.handleQuery();
    // },
	
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加监控设备";
    },
	
    /** 修改按钮操作 */
	handleUpdate(row) {
	  this.reset();
	  const id = row.id
	  getCamera(id).then(response => {
	    this.form = response.data;
	    this.open = true;
	    this.title = "修改监控设备信息";
	  });
	},
	
	
	// 查看日期监控
	handleViewmp4(row){
		this.fid = '';
		this.reset();
		const id = row.id;
		this.open1 = true;
		this.title = "监控录像";
		this.form.id = id;
		this.fid = row.id;
		// http://10.99.41.158:8081/+url
	},
	
	
	/** 根据日期查询录像视频 */
	handleViewmp4bydate() {
		
		this.disshow  = 1;
		// const id = this.form.id;
		
		const id = this.fid;
		const date = this.mp4date;
		// this.videourl = response.data;
		// this.videourl = 'http://10.99.41.158:8081/'+this.videourl;
		//this.videourl = 'http://10.99.41.158:8081/'+this.videourl;
		// this.videourl = VUE_APP_BASE_API0+'video/getmp4/' +id+'/'+'date'
		
		getVideomp4bydate(id,date).then(response => {
		  this.videourl = 'http://47.120.7.93:8081/video/getmp4/'+id+'/'+'date'
		});
	},
	

	// 查看实时监控
	handleViewrtsp(row){
		this.reset();
		const id = row.id;
		this.open2 = true;
		this.title = "实时监控";
		
		
		// getCamera(id).then(response => {
		//   this.form = response.data;
		//   // this.rtspurl = response.data.rtspUrl;
		// });
	},
	

	
	
	/** 查询监控 */
	// handleViewmp4bydate() {
		
	// 	const id = this.form.id;
	// 	const date = this.form.date;
	// 	console.log(date)
		
	// 	getVideomp4bydate(id,date).then(response => {
	// 	  this.videourl = response.data; //返回地址?
	// 	  this.videourl = 'http://10.99.41.158:8081/'+this.videourl;
	// 	});
		
	// },
	
	
	
	
    /** 提交按钮 */
	submitForm() {
	  this.$refs["form"].validate(valid => {
	    if (valid) {
	      if (this.form.id != null) {
			  this.msgSuccess("修改成功");
	        updateCamera(this.form.id,this.form).then(response => {
	          
	          this.open = false;
	          this.List();
	        });
	      } else {
			  this.msgSuccess("新增成功");
	        addCamera(this.form).then(response => {
	          this.open = false;
	          this.getList();
	        });
	      }
	    }
	  });
	},
	
	// 状态修改
	handleStatusChange(row) {
	  let text = row.status === "0" ? "启用" : "停用";
	  this.$confirm('确认要"' + text + '""' + row.name + '"角色吗?', "警告", {
	      confirmButtonText: "确定",
	      cancelButtonText: "取消",
	      type: "warning",
	    }).then(function() {
			this.reset();
			const id = row.id
			getRole(id).then(response => {
			  this.form = response.data;
			});
			this.form.status = !row.status
			updateCamera(id,this.form).then(response => {
			  this.msgSuccess("修改成功");
			  this.open = false;
			  this.getList();
			})
			
	    }).then(() => {
	      this.msgSuccess(text + "成功");
	    }).catch(function() {
	      row.status = row.status === "0" ? "1" : "0";
	    });
	},
	
	/** 删除按钮操作 */
	handleDelete(row) {
		const id = row.id;
	  this.$confirm('是否确认删除序号为"' + row.id + '"的监控设备?', "警告", {
	      confirmButtonText: "确定",
	      cancelButtonText: "取消",
	      type: "warning"
	    }).then(function() {
	      return delCamera(id);
	    }).then(() => {
	      this.getList();
	      this.msgSuccess("删除成功");
	    })
	},
	
	
    /** 导出按钮操作 */
    // handleExport() {
    //   this.download('basic/student/export', {
    //     ...this.queryParams
    //   }, `student_${new Date().getTime()}.xlsx`)
    // }

	

	
	
  }
};
</script>
