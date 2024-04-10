<template>
   <div style="height: 800px;">
		<el-row :gutter="20" style="padding-top: 30px;">
			<el-col :span="5" >
				<el-row>
					<div class="head-container">
					  <el-input
					    v-model="queryParams1.location"
					    placeholder="请输入区域名称"
					    clearable
					    size="small"
					    prefix-icon="el-icon-search"
					    style="margin-bottom: 20px"
						@keyup.enter.native="handleQuery"
					  />
					</div>
				</el-row>
				<el-row>
					<div class="head-container">
						<el-tree :data="treedata" 
						:props="treedata" @node-click="handleNodeClick" style="padding-top: 20px;padding-left: 20px;padding-right: 20px;padding-bottom: 5px;" >
						</el-tree>
						<!-- <el-tree :data="treedata1"
						default-expand-all
						:props="treedata1" @node-click="handleNodeClick1" style="padding-top: 0px;padding-left: 20px;padding-right: 20px;padding-bottom: 20px;" >
						</el-tree> -->
					</div>
				</el-row>
				
				<!-- default-expand-all  -->
				
				<el-row style="padding-top: 70px;">
					<div class="mydraw" style="background-color: white;">
						<div 
						:visible.sync="drawer"
						:append-to-body="true"
						:modal = "false"
						>
						<el-form class="form1" ref="form" :model="form" label-width="80px" style="float: right;background-color: white;padding-left: 20px;" >
							<el-row style="padding-top: 20px;">
								<span style="font-size: 15px;font-weight: 500;color: #1d2129;line-height: 22px;">监控设备详情</span>
							</el-row>
							<el-row style="padding-top: 20px;">
								<el-col :span="10">
									<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">设备名称</span>
								</el-col>
								<el-col :span="6">
									<input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px; background-color: transparent;" v-model="form.cameraName" />
								</el-col>
							</el-row>
							<el-row style="padding-top: 10px;">
								<el-col :span="10">
									<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">设备状态</span>
								</el-col>
								<el-col :span="6">
									<input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px;background-color: transparent;" v-model="form.status" />
								</el-col>
							</el-row>
							<el-row style="padding-top: 10px;">
								<el-col :span="10">
									<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">所在区域</span>
								</el-col>
								<el-col :span="6">
									<input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px;background-color: transparent;" v-model="form.location" />
								</el-col>
							</el-row>
							<el-row style="padding-top: 10px;">
								<el-col :span="10">
									<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">设备描述</span>
								</el-col>
							</el-row>
							<el-row style="padding-top: 10px;">
								<textarea cols="20" rows="5" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;background-color: transparent;"  v-model="form.description"></textarea>
								<!-- <input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px;" v-model="form.description" /> -->
							</el-row>
						</el-form>
							
						</div>
						
						<!-- <el-drawer
						    v-model="drawer"
							:with-header="false"
						    :direction="direction"
						    :before-close="handleClose"
							:visible.sync="drawer"
							:append-to-body="true"
							:modal = "false"
							 width="100%"
							 >
							<div >
								
							</div>
						  </el-drawer> -->
					</div>
				</el-row>
			</el-col>
			<el-col :span="19">
				<el-row >
					<el-col :span="11" style="padding-left: 20px;">
						<div class="grid-content bg-purple">
						<el-button-group >
						<el-button :type="classtype1"  @click="selecttype('classtype1',1,24)">单屏</el-button>
						<el-button :type="classtype2"  @click="selecttype('classtype2',4,12)">四分屏</el-button>
						<el-button :type="classtype3"  @click="selecttype('classtype3',9,8)">九分屏</el-button>
						<el-button :type="classtype4"  @click="selecttype('classtype4',16,6)">十六分屏</el-button>
						<el-button > 
						   <div class="btn-fullscreen" @click="handleFullScreen">
						            <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
						                <i class="el-icon-rank"></i>
						            </el-tooltip>
						  </div>
						</el-button>
						</el-button-group>
						</div>
					</el-col>
					 
					
				</el-row>
				<el-row >
					<el-container class="center">
					    <el-main >
					    <el-row  :gutter="10" >
					        <el-col   v-for="(n,index) in fornum" :xs="24" :sm="24" :md="clonum" :lg="clonum" :xl="clonum"  :class="videoclass" :key="index" >
					          <div class="player-wrapper" element-loading-text="加载中..." element-loading-background="#000">
					            <div class="video-wrapper" :style="videoclass" :id="`videoid${n}`">
					              <div class="video-inner live hide-waiting" style="position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;">
					                <div class="alt table-c">
					                  <div class="talbetop">
					                    <table>
					                      <tr>
											  <td>无信号</td>
											 <!-- <div v-if="showvideo==0">
												  <td>无信号</td>
											  </div>
											  <div v-if="showvideo==1">
												 <video-player class="video-player vjs-custom-skin"
														styl="padding-top:50px;width:90px"
													   ref="videoPlayer" 
													    object-fit:fill;    
													   :options="playerOptions">
												 </video-player> 
											  </div> -->
					                      </tr>
					                    </table>
					                    <div v-show="true" class="selectchannel"  @click="dialogFormVisible=true"> 选择通道</div>
					                  </div>
					                </div>
					              </div>
					            </div>
					          </div>
					        </el-col>
					    </el-row>
					    </el-main>
					</el-container>
				</el-row>
				
			</el-col>
			
		</el-row>
	   
    </el-row>
      

  <el-dialog title="地址" :visible.sync="dialogFormVisible">
        选择通道
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog> 
   </div>
</template>

<script>
import { 
	listCamera, getCamera, delCamera, addCamera, updateCamera,listCameraby,listCamerabypr } from "@/api/vedio/camera.js";
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'


// const drawer = ref(false)
	
export default {
	components: {
	  videoPlayer
	},
  data () {
    return {
		
		
		showvideo:0,
		playerOptions: {
		                playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
		                autoplay: true,  // 如果为true,浏览器准备好时开始回放
		                muted: true,     // 默认情况下将会消除任何音频。
		                loop: false,      // 是否视频一结束就重新开始。
		                preload: 'auto',  // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
		                language: 'zh-CN',
		                aspectRatio: '16:9',  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
		                fluid: true,  // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
		                sources: [{
		                    type: "video/mp4",  // 类型
		                    src: require('@/assets/video/case2_car.mp4')            // url地址
		                }],
		                poster: '',  // 封面地址
		                notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
		                controlBar: {
		                    timeDivider: false,           // 当前时间和持续时间的分隔符
		                    durationDisplay: false,       // 显示持续时间
		                    remainingTimeDisplay: false, // 是否显示剩余时间功能
		                    fullscreenToggle: false       // 是否显示全屏按钮
		                }
		},
		
		
		direction:"ltr",
		drawer : false,
		tabledata : [],
		loading:true,
		cameraList:[],
		total:0,
		queryParams1:{
			location:''
		},
		queryParams:{
			pageNum:1,
			pageSize:10,
		},
		
		title:'',
		form:{},
		
		
		
       fullscreen: false,
       fornum:4,
       clonum:12,
       dialogFormVisible:false,
       videoclass:"padding-bottom:75%; position: relative; margin: 0px auto; overflow: hidden;",
        classtype1:'',
        classtype2:'primary',
        classtype3:'',
        classtype4:'',
        items:[false,false,false,false],
		value1: '',
		treedata:[],
		
		
    }
  },
  created(){
	  
		this.getList();
	  
            let that = this
            window.onresize = function(){
                if(!that.checkFull()){
         //  alert(that.videoclass)
                    // 退出全屏后要执行的动作
                    console.log("退出全屏")
          that.fullscreen = false;
           //alert(that.fornum)
           for(let n=1;n<=that.fornum;n++){
             //alert('videoid'+n)
            // alert(document.getElementById('videoid'+n))
              document.getElementById('videoid'+n).style = "padding-bottom: 40.25%; position: relative; margin: 0px auto; overflow: hidden;";
           }
         // that.videoclass="padding-bottom: 43.25%; position: relative; margin: 0px auto; overflow: hidden;",
           //document.getElementById('videoid1').style = "padding-bottom: 42.25%; position: relative; margin: 0px auto; overflow: hidden;";
          // document.getElementById('videoid2').style = "padding-bottom: 42.25%; position: relative; margin: 0px auto; overflow: hidden;";
          // document.getElementById('videoid3').style = "padding-bottom: 42.25%; position: relative; margin: 0px auto; overflow: hidden;";
           //document.getElementById('videoid4').style = "padding-bottom: 42.25%; position: relative; margin: 0px auto; overflow: hidden;";
         // that.tableclass="table-c"
        }
        else{
          for(let n=1;n<=that.fornum;n++){
            // alert('videoid'+n)
            // alert(document.getElementById('videoid'+n))
              document.getElementById('videoid'+n).style = "padding-bottom: 52.25%; position: relative; margin: 0px auto; overflow: hidden;";
           }
          //document.getElementById('videoid1').style='padding-bottom: 54.25%; position: relative; margin: 0px auto; overflow: hidden;';
          //document.getElementById('videoid2').style='padding-bottom: 54.25%; position: relative; margin: 0px auto; overflow: hidden;';
          //document.getElementById('videoid3').style='padding-bottom: 54.25%; position: relative; margin: 0px auto; overflow: hidden;';
          //document.getElementById('videoid4').style='padding-bottom: 54.25%; position: relative; margin: 0px auto; overflow: hidden;';
       }
      }
    },
  methods:{
     showselect(item1){
      this.items=[];
     // alert(this.items.length)
      for(let i=0;i<this.fornum;i++){
        if(item1==i){
         // alert(item1)
          this.items[i] = true;
        }else{
          this.items[i]=false;
        }
       }
    },
     selecttype(item,fnum,clo) {
     //  alert( this.items[0])
       this.items=[];
      for(let i=0;i<fnum;i++){
        this.items[i]=false;
      }
      this.fornum = fnum;
      this.clonum = clo;

      if(item==='classtype1'){
        this.classtype1='primary'
        this.classtype2=''
        this.classtype3=''
        this.classtype4=''
      }
      else if(item==='classtype2'){
        this.classtype1=''
        this.classtype2='primary'
        this.classtype3=''
        this.classtype4=''
      }
        else if(item==='classtype3'){
        this.classtype1=''
        this.classtype2=''
        this.classtype3='primary'
        this.classtype4=''
      }
      else if(item==='classtype4'){
        this.classtype1=''
        this.classtype2=''
        this.classtype3=''
        this.classtype4='primary'
      }
    },
      checkFull(){
      //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      //火狐浏览器
      var isFull = document.mozFullScreen||
      document.fullScreen ||
      //谷歌浏览器及Webkit内核浏览器
      document.webkitIsFullScreen ||
      document.webkitRequestFullScreen ||
      document.mozRequestFullScreen ||
      document.msFullscreenEnabled
      if(isFull === undefined) {
          isFull = false
          }
          return isFull;
    },

// 全屏事件
    handleFullScreen(){
        let element = document.documentElement;
        let that=this;
       // alert(this.fullscreen)
        if (this.fullscreen) {
         
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            // alert("ddd")
            //that.videoclass='padding-bottom: 42.25%; position: relative; margin: 0px auto; overflow: hidden;';
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
           // this.videoclass='';
         // this.tableclass='table-c'
           
          //this.tableclass='alt'
         }
        this.fullscreen = !this.fullscreen;       
    },
	
	//getlist
	getList() {
	  this.loading = true;
	  listCamera(this.queryParams.pageNum,this.queryParams.pageSize,this.queryParams1).then(response => {
	    this.cameraList = response.data.records;
	    this.total = response.data.total;
	    this.loading = false;
		
		const tree = [];
		let loclist = [];
		let list = this.cameraList;
		
		for (let i = 0; i < list.length; i++) {
			let loc = list[i].location
			let name = list[i].cameraName
			let id = list[i].id
			let flag = 0
			for (let j=0; j<loclist.length;j++){ //看在不在一级菜单里
				if(loc == loclist[j]){
					flag = 1
				}
			}
			if (flag == 0) //如果当前的loc不在一级里  loc加入一级菜单  tree加入新节点
			{
				loclist.push(loc)
				const subnode = {
					id:id,
					label:name
				}
				const sublist=[]
				sublist.push(subnode)
				const node = {
					label:loc,
					children:sublist
				}
				tree.push(node)
			}
			else{ //遍历找到tree中的节点 loc在一级菜单  tree中children加入新name
			for (let i=0;i<loclist.length;i++)
			{
				if(tree[i].label == loc)
				{
					const subnode = {
						id:id,
						label:name
					}
					tree[i].children.push(subnode)
				}
			}	
			}
		}
		this.treedata = tree
		})
	},
	
	/** 搜索按钮操作 */
	handleQuery() {
	  this.queryParams.pageNum = 1;
	  this.queryParams.pageSize = 10;
	  this.getList();
	},
	
	// 表单重置
	reset() {
	  this.form = {
		id:null,
		schoolId:null,
		cameraName:null,
		location:null,
		description:null,
		status:null,
		filePath:null,
	  };
	  this.resetForm("form");
	},
	
	
	// 节点单击事件
	handleNodeClick(data) {
		
		this.showvideo=1;
		
	  this.reset();
	  this.queryParams.cameraId = data.id
	   getCamera(this.queryParams.cameraId).then(response => {
	    this.form = response.data;
	    this.drawer = true
	    this.title = "监控设备详情";
	  });
	},
	
	
  }
}
</script>

<style>

 body {
   overflow-x: hidden;
    /* overflow-y: hidden; */
    

 }
html,body{
  height:100% ;margin:0;
   overflow-x: hidden;
}
.video-wrapper{
  position: relative; top: 0px; bottom: 0px; left: 0px; right: 0px;
}
.alt {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000;
    color: #fff;
    text-align: center;
}
.alt table{
  width: 100%;
  height: 100%;
}
.talbetop{
  width: 100%;
  height: 100%;
  position:relative;
}
.selectchannel{
  position:absolute;right:5px;top:5px;
}
.video-close {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
    font-size: 12px;
    background-color: hsla(0,0%,50%,.5);
    padding: 2px 5px;
    cursor: pointer;
    border-radius: 2px;
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}


.table-c table{border-right:2px solid #fff;border-bottom:2px solid #fff;} 
.table-c table td{border-left:2px solid #fff;border-top:2px solid #fff} 
/* 
css 注释： 
只对table td设置左与上边框； 
对table设置右与下边框； 
为了便于截图，我们将css 注释说明换行排版 
*/ 
.player-wrapper{
  padding-bottom: 10px;
}











</style>