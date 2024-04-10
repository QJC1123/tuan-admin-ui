<template>
	<div style="padding-top: 30px;">
		<el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="tab1">
		    <el-tab-pane name="first" >
				<div slot="label">
					<el-col :span="20">
						<span >所有告警</span>
					</el-col>
					<el-col :span="4">
					</el-col>
				</div>
				<div >
					<el-form :model="queryParams1" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" style="padding-top: 20px;padding-bottom: 10px;padding-left: 40px;zoom:0.93;padding-right: 60px;background-color: white;">
						<el-row>
							<el-form-item prop="alarmName" style="zoom: 0.9;">
								<div style="font-weight: 550;padding-left: 10px;">
									<span class="span1" style="font-size: 17px;">告警搜索</span>
									
									  <el-input
									    v-model="queryParams1.alarmName"
									    placeholder="请输入告警名称关键词"
									    clearable
									    @keyup.enter.native="handleQuery"
									  style="width:300px;padding-left: 30px;" 
									  />
									  <el-button style="background-color: #69c5b7;color: white;" @click="handleQuery">搜索</el-button>
									  <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<div class="row">
								<span style="font-size: 17px;font-weight: 550;zoom:0.9;">告警状态</span>
								<div class="content" style="padding-left: 20px;">
									<div v-for="(item,index) in alarmStatusList" :key="index" @click="alarmStatusVar=item"
									:class="['item',alarmStatusVar==item?'actvCss':'']">{{item}}</div>
								</div>
							</div>
						</el-row>
						<el-row  style="padding-top: 10px;">
							<div class="row">
								<span style="font-size: 17px;font-weight: 550;zoom:0.9;">告警级别</span>
								<div class="content" style="padding-left: 20px;">
									<div v-for="(item,index) in alarmLevelList" :key="index" @click="alarmLevelVar=item"
									:class="['item',alarmLevelVar==item?'actvCss':'']">{{item}}</div>
								</div>
							</div>
						</el-row>
						<el-row style="padding-top: 10px;">
							<div class="row">
								<span style="font-size: 17px;font-weight: 550;zoom:0.9;">告警类型</span>
								<div class="content" style="padding-left: 20px;">
									<div v-for="(item,index) in alarmTypeList" :key="index" @click="alarmTypeVar=item"
									:class="['item',alarmTypeVar==item?'actvCss':'']">{{item}}</div>
								</div>
							</div>
						</el-row>
						
					</el-form>
				</div>
				
			
				<div style="padding-top: 30px;"></div>
				<el-row >
					<el-row style="padding-top: 0px;zoom:0.87;padding-right: 20px;padding-bottom: 10px;">
						<el-button style="background-color: white;color: black;" icon ="el-icon-s-flag" @click="handleRenlin">认领</el-button>
						<el-button style="background-color: white;color: black;" icon ="el-icon-s-promotion" @click="handleFenpi">分派</el-button>
						<el-button style="background-color: white;color: black;" icon ="el-icon-s-release" @click="handleguanbi">关闭</el-button>
						<right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
					</el-row>
					
					<el-row>
						<el-table v-loading="loading" :data="ComDataList" style=""@selection-change="handleSelectionChange" :header-cell-style="{background:'#ffffff'}" >
							<el-table-column type="selection" width="55" align="right" />
						  <el-table-column label="告警状态" align="center" prop="alarmStatus" width="100px">
							  <template slot-scope="scope">
								  <div style="">
									  <status-indicator intermediary pulse v-if="scope.row.alarmStatus == '处理中'" ></status-indicator>
									  <status-indicator negative pulse v-if="scope.row.alarmStatus == '未处理'" ></status-indicator>
									  <status-indicator positive pulse v-if="scope.row.alarmStatus == '已处理'" ></status-indicator>
									  <span style="padding-left: 10px;">{{scope.row.alarmStatus}}</span>
								  </div>
							  </template>
						  </el-table-column>
						  <el-table-column label="告警级别" align="center" prop="alarmLevel" >
							  <template slot-scope="scope">
							  			{{ chklevel(scope.row.alarmLevel) }}
							  </template>
						  </el-table-column>
						  
						  <el-table-column label="告警类型" align="center" prop="alarmType" width="150px" />
						  <el-table-column label="告警名称" align="center" prop="alarmName" width="150px"/>
						  <el-table-column label="摄像头" align="center" prop="cameraName" width="150px"/>
						  <el-table-column label="所在区域" align="center" prop="alarmLocation" />
						  <el-table-column label="发生时间" align="center" prop="alarmTime" width="150px">
						    <!-- <template slot-scope="scope">
						      <span>{{ parseTime(scope.row.alarmTime, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
						    </template> -->
						  </el-table-column>
						  <el-table-column label="操作" align="center" width="280" fixed="right">
						    <template slot-scope="scope">
							  <el-button
							    size="mini"
							    type="text"
							    icon="el-icon-view"
							    @click="handleView(scope.row)"
							  >查看</el-button>
							  <el-button
							    size="mini"
							    type="text"
							    icon="el-icon-s-promotion"
								@click="handleFenpi(scope.row)"
							  >分派</el-button>
							  <el-button
							    size="mini"
							    type="text"
							    icon="el-icon-s-flag"
								@click="handleRenlin(scope.row)"
							  >认领</el-button>
						      <el-button
						        size="mini"
						        type="text"
						        icon="el-icon-s-release"
								@click="handleguanbi(scope.row)"
						      >关闭</el-button>
						    </template>
						  </el-table-column>
						</el-table>
					</el-row>
				</el-row>
				
				
				<pagination
				  v-show="total>0"
				  :total="total"
				  :page.sync="queryParams.pageNum"
				  :limit.sync="queryParams.pageSize"
				  @pagination="getList"
				/>
				
				<!-- 查看详情对话框 -->
				<el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body >
					<el-form ref="form" :model="form">
						<el-row>
							<el-col :span="14">
								<el-row>
									<el-form-item prop="alarmName">
									  <input type="text" v-model="form.alarmName" style="border: 0px; outline:none;padding-left: 20px;font-size: 17px;font-weight: 500;"/>
									</el-form-item>
								</el-row>
								<el-row style="padding-left: 20px;">
									<el-col :span="6">
										<el-col :span="9">
											<div style="background-color: #e6f9f4;width: 40px;height: 40px;padding-left: 5px;padding-top: 5px;zoom:1.1;border-radius: 15%;">
												<i class="el-icon-s-promotion" style="color: #33c7a3;zoom:2;">
												</i>
											</div>
										</el-col>
										<el-col :span="12">
											<div style="padding-top: 0px;" v-model="form.alarmId"><span>{{form.alarmId}}</span></div>
											<span style="color: gray;">告警编号</span>
										</el-col>
									</el-col>
									<el-col :span="6">
										<el-row >
											<el-col :span="9">
												<img src="@/assets/images/alarm1.png" v-if="form.alarmStatus == '未处理'" style="zoom:0.4" />
												<img src="@/assets/images/alarm2.png" v-if="form.alarmStatus == '处理中'" style="zoom:0.4"  />
												<img src="@/assets/images/alarm4.png" v-if="form.alarmStatus == '已处理'" style="zoom:0.4"/>
											</el-col>
											<el-col :span="12">
												<div style="padding-top: 0px;" v-model="form.alarmStatus"><span>{{form.alarmStatus}}</span></div>
												<span style="color: gray;">当前状态</span>
											</el-col>
										</el-row>
									</el-col>
									<el-col :span="6">
										<el-col :span="9">
											<div style="background-color: #f0effd;width: 40px;height: 40px;padding-left: 5px;padding-top: 5px;zoom:1.1;border-radius: 15%;">
												<i class="el-icon-time" style="color: #ada4dd;zoom:2;">
												</i>
											</div>
										</el-col>
										<el-col :span="14">
											<div style="padding-top: 0px;" v-model="form.alarmTime"><span>{{form.alarmTime}}</span></div>
											
										</el-col>
									</el-col>
									<el-col :span="6">
										<el-col :span="9">
											<div style="background-color: #e3edfd;width: 40px;height: 40px;padding-left: 5px;padding-top: 5px;zoom:1.1;border-radius: 15%;">
												<i class="el-icon-sold-out" style="color: #639bd4;zoom:2;">
												</i>
											</div>
										</el-col>
										<el-col :span="14">
											<div style="padding-top: 0px;" v-model="form.noiseReduction"><span>{{chknoise(form.noiseReduction )}}</span></div>
											<span style="color: gray;">去重降噪比</span>
										</el-col>
									</el-col>
								</el-row>
								<el-row style="padding-left: 20px;padding-top: 10px;">
									<el-col :span="6">
										<el-col :span="9">
											<div style="background-color: #feecee;width: 40px;height: 40px;padding-left: 8px;padding-top: 8px;zoom:1.1;border-radius: 15%;">
												<i class="el-icon-menu" style="color: #d7959f;zoom:1.6;">
												</i>
											</div>
										</el-col>
										<el-col :span="12">
											<div style="padding-top: 0px;" v-model="form.alarmType">
												<span>{{form.alarmType}}</span>
											</div>
											<span style="color: gray;">告警类型</span>
										</el-col>
									</el-col>
									<el-col :span="6">
										<el-col :span="9">
											<div style="background-color: #e4f7fc;width: 40px;height: 40px;padding-left: 5px;padding-top: 5px;zoom:1.1;border-radius: 15%;">
												<i class="el-icon-s-data" style="color: #3fc4e1;zoom:2;">
												</i>
											</div>
										</el-col>
										<el-col :span="12">
											<div style="padding-top: 0px;" v-model="form.alarmLevel"><span>{{ chklevel(form.alarmLevel) }}</span></div>
											<span style="color: gray;">告警级别</span>
										</el-col>
									</el-col>
									<el-col :span="6">
										<el-col :span="9">
											<div style="background-color: #e6f9f4;width: 40px;height: 40px;padding-left: 8px;padding-top: 8px;zoom:1.1;border-radius: 15%;">
												<i class="el-icon-rank" style="color: #7cd6c1;zoom:1.6;">
												</i>
											</div>
										</el-col>
										<el-col :span="14">
											<div style="padding-top: 0px;" v-model="form.alarmLocation"><span>{{form.alarmLocation}}</span></div>
											<span style="color: gray;">告警区域</span>
										</el-col>
									</el-col>
									<el-col :span="6">
										<el-col :span="9">
											<div style="background-color: #f0effd;width: 40px;height: 40px;padding-left: 8px;padding-top: 8px;zoom:1.1;border-radius: 15%;">
												<i class="el-icon-help" style="color: #ada4dd;zoom:1.6">
												</i>
											</div>
										</el-col>
										<el-col :span="14">
											<div style="padding-top: 0px;" v-model="form.cameraName"><span>{{form.cameraName}}</span></div>
											<span style="color: gray;">摄像头名称</span>
										</el-col>
									</el-col>
								</el-row>
								<el-row style="padding-top: 30px;padding-left: 20px;">
									<i class="el-icon-s-management" style="zoom:1.3;"></i>
									<span style="font-size: 16px;padding-left: 5px;">告警配置</span>
									
									<el-form class="" ref="form2" :model="form2" label-width="80px" style="background-color: white;" >
		
										<el-row style="padding-top: 20px;">
											<el-col :span="4">
												<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">数据源</span>
											</el-col>
											<el-col :span="6">
												<!-- <input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px;" v-model="form.cameraName" /> -->
											</el-col>
										</el-row>
										<el-row style="padding-top: 10px;">
											<el-col :span="4">
												<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">通知组</span>
											</el-col>
											<el-col :span="6">
												<input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px;" v-model="form.alarmDepartment" />
											</el-col>
										</el-row>
										<el-row style="padding-top: 10px;">
											<el-col :span="4">
												<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">通知频率</span>
											</el-col>
											<el-col :span="6">
												<!-- <input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px;" v-model="form.location" /> -->
											</el-col>
										</el-row>
										<el-row style="padding-top: 10px;">
											<el-col :span="4">
												<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">通知内容</span>
											</el-col>
											<el-col :span="6" style="padding-top: 5px;">
												<!-- <textarea cols="55" rows="5" style="font-size: 15px;font-weight: 540;"  v-model="form.description"></textarea> -->
											</el-col>
										</el-row>
										<el-row style="padding-top: 10px;">
											<el-col :span="4">
												<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">区域标注</span>
											</el-col>
											<el-col :span="6" style="padding-top: 5px;">
												<!-- <textarea cols="55" rows="5" style="font-size: 15px;font-weight: 540;"  v-model="form.description"></textarea> -->
											</el-col>
										</el-row>
									</el-form>
								</el-row>
							</el-col>
							
							<el-col :span="1" style="padding-left: 7px;">
								<div class="el-divider"
								style="display:inline-block;width: 1px;height: 600px;margin: 0 8px;vertical-align: middle;position: relative;"
								></div>
							</el-col>
							<el-col :span="9">
								<el-row>
									<i class="el-icon-s-management" style="zoom:1.3;"></i>
									<span style="font-size: 16px;padding-left: 5px;">事件回放</span>
									<!-- <span>{{form.detectionId}}</span> -->
								</el-row>
								<el-row style="">
									<template>
									    <div class='demo'>
									        <video-player class="video-player vjs-custom-skin" 
									                      ref="videoPlayer" 
									                      :playsinline="true" 
									                      :options="playerOptions">
									        </video-player>
									    </div>
									</template>
									
									<!-- <div class="video1" style="padding-top: 20px;">
										<video src="form.alarmVideoPath"
										    @error="videoErrorCallback"  controls style="width: 250px;"></video>
									</div> -->
								</el-row>
								<el-row style="padding-top: 30px;">
									<i class="el-icon-s-management" style="zoom:1.3;"></i>
									<span style="font-size: 16px;padding-left: 5px;">处理过程</span>
								</el-row>
								<el-row style="padding-top: 20px;">
									<div>
										<el-steps  finish-status="success" direction="vertical" >
										    <el-step  :title="item.label"  v-for="item in approvalProcessProject" :id="item.id">
												<template slot="description" v-if="item.id == 0" style="font-size: 14px;padding-top: 5px;padding-bottom: 10px;">
													<el-form :model="form" ref="form">
														<div style="font-size: 14px;">
															<el-row>
																<span>监控摄像头“{{form.cameraName}}”在“{{form.alarmLocation}}”检测到“{{form.alarmLevel}}” : “{{form.alarmName}}”,属于“{{form.alarmType}}”类型</span>
															</el-row>
														</div>
													</el-form>
												</template>
												<template slot="description" v-if="item.id == 1">
													<el-form :model="form" ref="form">
														<div style="font-size: 14px;">
															<el-row v-if="form.alarmDepartment">>
																<span>告警属于“{{form.alarmType}}”,已通知“{{form.alarmDepartment}}”,等待相关人员处理！</span>
															</el-row>
														</div>
													</el-form>
												</template>
												
												<template slot="description" v-if="item.id == 2 ">
													<el-form :model="form" ref="form">
														<div style="font-size: 14px;">
															<el-row v-if="form.alarmUser != null">
																<span>“{{form.alarmName}}”告警处理任务已被认领,由“{{form.alarmUser}}”负责处理！</span>
															</el-row>
														</div>
													</el-form>
												</template>
												<template slot="description" v-if="item.id == 3 ">
													<el-form :model="form" ref="form">
														<div style="font-size: 14px;">
															<el-row v-if="form.alarmStatus == '已处理'">
																<span>“{{form.alarmName}}”告警已解除！</span>
															</el-row>
														</div>
													</el-form>
												</template>
																			 
										    </el-step>       
										</el-steps>
									</div>
									
								</el-row>
							</el-col>
						</el-row>
					</el-form>
				</el-dialog>
				
				
				
				
				<!-- 分派对话框 -->
				<el-dialog :title="title1" :visible.sync="open1" width="900px" append-to-body style="zoom: 0.97;height: 800px;">
					<el-row style="padding-top: 0px;">
						<el-col :span="11">
							<div class="conbox">
							  <div class="titbox" style="zoom:1.2">
							    <el-input size="mini" placeholder="搜索成员、部门" suffix-icon="el-icon-search" v-model="filterText"></el-input>
							  </div>
							  <div class="wordbox" style="padding-top: 20px;">
							    <el-tree
							      @check="getData"
							      show-checkbox
							      class="filter-tree"
							      node-key="id"
							      :data="treedata"
							      :props="defaultProps"
							      :filter-node-method="filterNode"
								  default-expand-all
							      ref="tree"
							    ></el-tree>
							  </div>
							</div>
						</el-col>
						<el-col :span="1" style="padding-left: 7px;">
							<div class="el-divider"
							style="display:inline-block;width: 1px;height: 650px;margin: 0 8px;vertical-align: middle;position: relative;"
							></div>
							
						</el-col>
						<el-col :span="12">
							<div class="conbox">
							  <div class="titbox">
							    <h2>已选择用户（{{keyarr.length}}）</h2>
							  </div>
							  <div class="wordbox" style="padding-top: 20px;padding-left: 20px;zoom:1.1;height: 520px;">
							    <ul>
							      <li v-for="(item,index) in keyarr" :key="index" style="padding-top: 5px;">
							        <div class="inli">
							        <i class="el-icon-s-custom"></i>
							        <span style="padding-left: 5px;">{{item.label}}</span>
							        <i class="el-icon-close" @click="removeData(item)"></i>
							        </div>
							      </li>
							    </ul>
							  </div>
							</div>
							<div style="float: right;bottom: 0px;" class="dialog-footer">
							  <el-button type="primary" @click="submitForm">确 定</el-button>
							  <el-button @click="cancel">取 消</el-button>
							</div>
						</el-col>
					</el-row>
				</el-dialog>
			</el-tab-pane>
		    <el-tab-pane  name="second">
				<div slot="label" style="background-color: white;">
					<el-col :span="20" style="background-color: white;">
						<span >我的告警</span>
					</el-col>
					<el-col :span="4">
						<div style="padding-left: 450px;">
							<router-link :to="{ name: 'AlarmTest' }" >
									<el-button style="background-color: #69c5b7;color: white;float: right;" @click="handletest">进入智能告警测试</el-button>
							</router-link>
						</div>
					</el-col>
				</div>
				<el-row style="padding-top: 30px;">
					<el-table v-loading="loading" :data="ComDataList" style=""@selection-change="handleSelectionChange" :header-cell-style="{background:'#ffffff'}" >
						<el-table-column type="selection" width="55" align="right" />
					  <el-table-column label="告警状态" align="center" prop="alarmStatus" width="100px">
						  <template slot-scope="scope">
							  <div style="">
								  <status-indicator intermediary pulse v-if="scope.row.alarmStatus == '处理中'" ></status-indicator>
								  <status-indicator negative pulse v-if="scope.row.alarmStatus == '未处理'" ></status-indicator>
								  <status-indicator positive pulse v-if="scope.row.alarmStatus == '已处理'" ></status-indicator>
								  <span style="padding-left: 10px;">{{scope.row.alarmStatus}}</span>
							  </div>
						  </template>
					  </el-table-column>
					  <el-table-column label="告警级别" align="center" prop="alarmLevel" >
						  <template slot-scope="scope">
						  			{{ chklevel(scope.row.alarmLevel) }}
						  </template>
					  </el-table-column>
					  
					  <el-table-column label="告警类型" align="center" prop="alarmType" width="150px" />
					  <el-table-column label="告警名称" align="center" prop="alarmName" width="150px"/>
					  <el-table-column label="摄像头" align="center" prop="cameraName" width="150px"/>
					  <el-table-column label="所在区域" align="center" prop="alarmLocation" />
					  <el-table-column label="发生时间" align="center" prop="alarmTime" width="150px">
					    <!-- <template slot-scope="scope">
					      <span>{{ parseTime(scope.row.alarmTime, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
					    </template> -->
					  </el-table-column>
					  <el-table-column label="操作" align="center" width="280" fixed="right">
					    <template slot-scope="scope">
						  <el-button
						    size="mini"
						    type="text"
						    icon="el-icon-view"
						    @click="handleView(scope.row)"
						  >查看</el-button>
					      <el-button
					        size="mini"
					        type="text"
					        icon="el-icon-s-release"
							@click="handleguanbi(scope.row)"
					      >关闭</el-button>
					    </template>
					  </el-table-column>
					</el-table>
				</el-row>
			</el-tab-pane>
			
		    <!-- <el-tab-pane label="未分派告警" name="third">未分派告警</el-tab-pane> -->
			
			
		    
		  </el-tabs>
	</div>
	
	  
	  
	  
</template>




<script>
import { listEvent, getAlarmdetail, delEvent, addEvent, updateEvent,listEventby,listEventbypr,listAllAlarms} from '@/api/alarm/event.js';
import Editor from '@/components/Editor';
import { StatusIndicator } from 'vue-status-indicator';
import { getInfo } from "@/api/login";
import {testalarmmp4} from '@/api/alarm/alarmtest.js';

import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'



export default {
  name: "Event",
  components: {
    Editor,StatusIndicator,videoPlayer
  },
  
  props: ['data', 'defaultActive'],
  
  
  data() {
    return {
		
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
		                    src: ''             // url地址
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
		
		
		alarmStatusVar:"全部", 
		alarmStatusList:["全部","未处理","处理中","已处理"], // 
		alarmLevelVar:"全部",
		alarmLevelList:["全部","一级警情","二级警情","三级警情"],
		
		alarmTypeVar:"全部",
		alarmTypeList:["全部","危险行为","消防告警","交通告警","设施告警","后厨告警","缺勤缺岗告警","黑名单人员告警"],
		
		
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
		// 用户信息表格数据
		UserList: [],
		
		// 告警事件表格数据
		eventList:[],
		
		// 弹出层标题
		title: "",
		title1:"分派告警任务",
		// 是否显示弹出层
		open: false,
		open1: false,
		
		popoverVisible: false,
		active:0,
		
		//告警时间进度
		approvalProcessProject:[
		   {id:'0',label: " 告警检测"},
		   { id:'1',label: "告警通知"},
		   { id:'2',label: "告警处理"},
		   { id:'3',label: "告警解除"},
	   ],
		
		//tab
		activeName: 'first',
	
	//告警状态
	statuslist:[
		{
			value: '',
			label: '不限',
		},
		{
			value: '未处理',
			label:'未处理',
		},
		{
			value: '处理中',
			label:'处理中',
		},
		{
			value: '已处理',
			label: '已处理',
		},
		
	],
	
	//告警级别
	levelist: [
		{
				 value: '',
				 label: '不限'
		},
	 {
		 value: '1',
		 label: '一级警情'
	},
	 {
		 value: '2',
		 label: '二级警情'
	 },
	 {
		 value: '3',
		 label: '三级警情'
	 },
	 ], 
	 
	  //告警类型
	 typelist:[
		 {
			 value: '',
			 label:'不限',
		 },
		{
			value: '危险行为',
			label:'危险行为',
		},
		{
			value: '消防告警',
			label:'消防告警',
		},
		{
			value: '交通告警',
			label:'交通告警',
		},
		{
			value: '设施告警',
			label:'设施告警',
		},
		{
			value: '后厨告警',
			label:'后厨告警',
		},
		{
			value: '缺勤缺岗告警',
			label:'缺勤缺岗告警',
		},
		{
			value: '黑名单人员告警',
			label:'黑名单人员告警',
		}
	 ],
	 
	 
	 // tree数据(children的id第一位为父级id，用于在select中清除某一点，可找到其父级去掉全选)
	 input3: "",
	 
	 checkList: [], 
	 keyarr:[],
	 filterText: "",
	 
	 defaultProps: {
	   children: "children",
	   label: "label",
	 },
	 

	 //分派告警任务
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
	 							children:[
	 							{	id: '1-1-1-1',
									label:"警卫队长"},
	 							{
									id: '1-1-1-2',
									label:"普通执勤人员"}]},
	 						{
								id: '1-1-2',
								label:"监控部门",
	 							children:[
	 							{
									id: '1-1-2-1',
									label:"监控组长"},
	 							{
									id: '1-1-2-2',
									label:"普通监控人员"}]},],
	 				},
	 				{
						id: '1-2',
	 					label:"后勤部门",
	 					children:[
	 						{	id: '1-2-1',
								label:"设备后勤部",
	 							children:[
	 							{
									id: '1-2-1-1',
									label:"维修经理"},
	 							{
									id: '1-2-1-2',
									label:"普通维修人员"}]},
	 						{
								id: '1-2-2',
								label:"餐饮后勤部",
	 							children:[
	 							{
									id: '1-2-2-1',
									label:"食堂经理"},
	 							{
									id: '1-2-2-2',
									label:"普通食堂人员"}]},
	 						{
								id: '1-2-3',
								label:"宿舍后勤部",
	 							children:[
	 							{
									id: '1-2-3-1',
									label:"宿管经理"},
	 							{
									id: '1-2-3-2',
									label:"普通宿管人员"}]}],
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
	 
	 
      
	
	 
	 // 查询参数
	 queryParams: {
	   pageNum: 1,
	   pageSize: 10,
	   alarmUser:null,
	   alarmType: null,
	   alarmLevel: null,
	   alarmStatus: null,
	   alarmName:null,
	 },
	 //查询参数
	 queryParams1:{
	 	alarmType: null,
	 	alarmLevel: null,
	 	alarmStatus: null,
	 	alarmName:null,
	 },
	 // 表单参数
	 form: {},
	 // 表单校验
	 rules: {
	 },
     
	  
	  //告警事件详情
	  // form1:{
		 //  id:'1',
		 //  status:'处理中',
		 //  alarmLevel:'一级警情',
		 //  alarmType:"消防告警",
		 //  alarmName:'烟雾明火',
		 //  detectionId:'停车场-西-1',
		 //  alarmArea:'停车场',
		 //  alarmTime:'2023-04-01 11:23:11',
		 //  alarmper:"70%",
		 //  alarmjgtime:'20s',
		 //  alarmvediourl:"https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4",
		 //  alarmdept:'安保部门',
		 //  alarmperson:'维修工1',
		 //  alarmres:'处理完成',
	  // },
	  
	  //告警规则详情
	  form2:{
		  id:'1',
		  alarmorigin:'监控检测',
		  alarmdept:'安保部门',
		  alarmjgtime:'20s',
		  alarmLevel:'一级警情',
		  alarmType:"消防告警",
		  alarmName:'烟雾明火',
		  alarmpicture:'',
	  },
	  
     
    };
  },
  created() {
    this.getList();
  },
  computed: {
    ComDataList(){
      return this.eventList.filter((item) => {
      	if((this.alarmStatusVar=="全部"||this.alarmStatusVar==item.alarmStatus)&&
      	   (this.alarmTypeVar=="全部"||this.alarmTypeVar==item.alarmType)&&
      	   (this.alarmLevelVar=="全部"||this.alarmLevelVar==item.alarmLevel))
		   {
      	    return item // 把符合条件的数据返回,模板中通过this.ComDataList可直接动态读取数据
      	}
      })
    },
  },
  methods: {
	  
	  // 告警级别
	  chklevel(data) {
	    if (data === "1") 
	    {
	  	return '一级警情'
	    } else if (data === "2") {
	  	return '二级警情'
	    } 
	    else if (data === "3") {
	    return '三级警情'
	    } 
	  },
	  
	  // 告警级别
	  chknoise(data) {
		const data0 = parseFloat(data)
	    const data1 = data0*100
		
		const data2 = data1.toString()
		const data3 = data2+'%'
		return data3
	  },
	  // handleClick(tab, event) {
	  //   console.log(tab, event);
	  // },
	  
	  /** 查询告警事件列表 */
	  // getList() {
	  //   this.loading = true;
	  //   listEvent(this.queryParams.pageNum,this.queryParams.pageSize).then(response => {
	  //     this.eventList = response.data.records;
	  //     this.total = response.data.total;
	  //     this.loading = false;
	  //   });
	  // },
	  
    /** 分页查询告警事件列表 */
    getList() {
      this.loading = true;
      listAllAlarms(this.queryParams.pageNum,this.queryParams.pageSize,this.queryParams1).then(response => {
        this.eventList = response.data.records;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open1 = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id:null,
        alarmStatus:null,
        alarmLevel:null,
        alarmType:null,
        alarmName:null,
		cameraName:null,
        alarmLocation:null,
        alarmTime:null,
		alarmDepartment:null,
		alarmUser:null,
		alarmResult:null,
		alarmVideoPath:null,
		noiseReduction:null,
        // alarmjgtime:null,
      };
      this.resetForm("form");
    },
	
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
	
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
	
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
	
    /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = "告警事件详情";
    // },
	
    /** 查看按钮操作 */
    handleView(row) {
      this.reset();
      const id = row.id
	  this.form = row 
	  this.open = true;
	  this.title = "告警事件详情";
	  this.playerOptions.sources[0].src = process.env.VUE_APP_BASE_API_VIDEO + row.detectionId;
	  // this.playerOptions.sources[0].src = 'http://192.168.43.191:8081/detection/getmp4/'+row.detectionId;
	  this.form.alarmLevel = chklevel(row.alarmLevel) 
	 //  this.form.noiseReduction =  this.form.noiseReduction*100
	 // this.form.noiseReduction = this.form.noiseReduction.toString()+'%'
	  
	  
      // getAlarmdetail(id).then(response => {
      //   this.form = response.data;
      //   this.open = true;
      //   this.title = "告警事件详情";
      // });
    },
	
	
	//认领  修改负责人为我
	handleRenlin(row){
		
		this.reset();
		const id = row.id
		// getAlarmdetail(id).then(response => {
		//   this.form = response.data;
		// });
		this.$confirm('是否确认认领告警任务?', "警告",{
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		}).then(
			function(){
				getInfo().then(response=>{
					// this.form.alarmperson = response.data.user.id;
					this.form.alarmUser = response.data.user.name;
				})
				updateEvent(this.form.id ,this.form).then(response => {
				  // this.msgSuccess("修改成功");
				  this.getList();
				});
			}).then(()=>{
				this.getList();
				this.msgSuccess("认领成功");
			})
	},	
	
	
	
	//分派 修改负责人为某某
	handleFenpi(row){
		
		
		this.reset();
		this.open1 = true;
		// this.popoverVisible = true;
		const id = row.id
		// getAlarmdetail(id).then(response => {
		//   this.form = response.data;
		// });
		
		
		// ..修改form.alarmperson成某某
		// this.msgSuccess("修改成功");
		// this.getList();
		// updateEvent(this.form.id ,this.form).then(response => {
		//   this.msgSuccess("修改成功");
		//   this.getList();
		// });
	},
	
	/** 提交按钮 */
	submitForm() {
		
		this.msgSuccess("分派成功");
		// updateEvent(this.form.id ,this.form).then(response => {
		//   this.msgSuccess("分派成功");
		//   this.getList();
		//   this.open1 = false;
		// });
		
	},
	
	
	//关闭 修改状态为已处理  加上处理结果(管理员关闭)
	handleguanbi(row){
		
		this.reset();
		const id = row.id
		// getAlarmdetail(id).then(response => {
		//   this.form = response.data;
		// });
		this.$confirm('是否确认关闭告警通知?', "警告",{
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		}).then(
			function(){
				this.form.alarmStatus = "已处理";
				this.form.alarmResult ='被管理员强制关闭';
				this.msgSuccess("关闭成功");
				// updateEvent(this.form.id ,this.form).then(response => {
				//   this.msgSuccess("修改成功");
				//   this.getList();
				// });
			}).then(()=>{
				this.getList();
				this.msgSuccess("关闭成功");
			})
	},
	
	
	//关键词搜索
	filterNode(value, data) {
	    if (!value) return true;
	    return data.label.indexOf(value) !== -1;
	  },
	//分派用户选择
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
	
	

	
	
	
	// tree选择值修改时
	  // checkChange () {
	  //   this.typeValue = []
	  //   // 将tree选择的id赋值给select
	  //   this.$refs['tree'].getCheckedNodes().forEach(value => {
	  //     // 父级在select中不展示
	  //     if (value.id.indexOf('-') > 0) {
	  //       this.typeValue.push(value.id)
	  //     }
	  //   })
	  // },
	  // // 清空select
	  // clearTag () {
	  //   // 清空tree选择
	  //   this.$refs['tree'].setCheckedKeys([])
	  // },
	  // // 从select中单个移除时，保持tree选择值同步移除
	  // removeTag (data) {
	  //   // 获取tree目前选择的值
	  //   var chooseData = this.$refs['tree'].getCheckedKeys()
	  //   var deleteIndex = ''
	  //   // 找到chooseData中与清除的data相同的值
	  //   chooseData.forEach((value, index) => {
	  //     if (value === data) {
	  //       deleteIndex = index
	  //     }
	  //   })
	  //   // 从tree目前选择值中去掉
	  //   chooseData.splice(deleteIndex, 1)
	  //   // 若有全选情况，tree的选择值中有父级id，而select中无父级id，需用children的id找到父级id并去掉
	  //   // 查找其父级id是否在chooseData中（即原来此父级是否全选），若在则去掉
	  //   var findFatherData = chooseData.find(element => element === (data.split('-')[0]))
	  //   if (findFatherData) {
	  //     chooseData.splice(chooseData.indexOf(findFatherData), 1)
	  //   }
	  //   // 将修改后的值再赋给tree
	  //   this.$refs['tree'].setCheckedKeys(chooseData)
	  // },
	

	

	
	
	
	//分派 认领 关闭 属于修改
	/** 修改按钮操作 */
	// handleUpdate(row) {
	//   this.reset();
	//   const id = row.id
	//   getEvent(id).then(response => {
	//     this.form = response.data;
		
	//   });
	// },
	
   
	
    // submitForm() {
    //   this.$refs["form"].validate(valid => {
    //     if (valid) {
    //       if (this.form.id != null) {
    //         updateEvent(this.form.id ,this.form).then(response => {
    //           this.msgSuccess("修改成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       } else {
    //         addEvent(this.form).then(response => {
    //           this.msgSuccess("新增成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       }
    //     }
    //   });
    // },

    /** 删除按钮操作 */
    // handleDelete(row) {
    //   const ids = row.id || this.ids;
    //   this.$confirm('是否确认删除告警事件编号为"' + ids + '"的数据项?', "警告", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }).then(function() {
    //       return delEvent(ids);
    //     }).then(() => {
    //       this.getList();
    //       this.msgSuccess("删除成功");
    //     })
    // },
	
	// next() {
	//         if (this.active++ > 2) this.active = 0;
	// },
    /** 导出按钮操作 */
    // handleExport() {
    //   const queryParams = this.queryParams;
    //   this.$confirm('是否确认导出所有告警事件数据项?', "警告", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }).then(function() {
    //       return exportEvent(queryParams);
    //     }).then(response => {
    //       this.download(response.msg);
    //     })
    // }
  }
};
</script>

<style >


	.row{
	  width: 100%;
	  height: 40px;
	  display: flex;
	  align-items: center;
	  padding: 0px 10px;
	}
	.row > div{
	  flex-shrink: 0;
	}
	.row .content{
	  flex: 1;
	  display: flex;
	}
	.row .content .item{
	  border-radius: 3px;
	  color: #666;
	  padding: 5px 12px;
	  font-size: 14px;
	  cursor: pointer;
	  user-select: none;
	}
	.row .content .actvCss{
	  background: #69c5b7;
	  color: #fff;
	}
	
	
	.tab1__item {
	  background-color: white ;
	}
	
	.el-tabs__item {
	  background-color: white ;
	}
	
	.el-tabs__item:hover {
	  color: #69c5b7;
	  background-color: white ;
	}
	.el-tabs__item.is-active {
		color: #69c5b7;
	    background-color: white;
		/* border: 2px #69c5b7; */
		/* box-shadow: #69c5b7; */
	}
	
	.dotClass_table {
	  width:10px;
	  height:10px;
	  border-radius: 50%;
	  display: block;
	  margin-left: 40px;  
	  margin-top: 10px;
	}
	.dotClass1 {
	  width:10px;
	  height:10px;
	  border-radius: 50%;
	  display: block;
	  /* margin-left: 10px;  */
	}
	.radio1{
		border-color: white;
	}
.el-radio-button__inner {
	    font-size: 14px;
	    width: 130px;
	}
.radio3.el-radio-button__inner {
	    font-size: 14px;
	    width: 180px;
	}
	
	
	
	  .stepComponent{
	      background-color:#DFEBFF;
	      width: 100%-20px;
	      padding: 10px 10px 10px 10px;
	      margin: 10px 10px 10px 10px;
	  }
	  .stepsTitle{
	      margin: 10px 0px  10px  10px ;
	  }
	  .approvalProcess{
	      color: #9EADC4;
	      font-size: 14px;
	      /* width: 100%; */
	      background:#DFEBFF;
	      margin-left:20px;
	      margin-right:0px;
	      margin-top:10px;
	  }
	  .processing_content{
	    background-color: #D9E5F9;
	  }
	  .processing_content_detail{
	     margin-left: 10px;
	     margin-top: 3.5px;
	     margin-bottom: 3.5px;
		   width:150px;
	     display:inline-block;
	  }
	  .step-row{
	     min-width:500px;
	     margin-bottom:12px;
	     margin-top:12px;
	  }
	  
	  /* 把select的下拉框隐藏 */
	  .hiddenSel{
	    display: none;
	  }
	  
	  .unitSearch{
	      display: inline-block;
	      margin-right: -5px;
	      .el-input{
	        width:500px !important;
	      }
	      .el-input__inner{
	        width:500px !important;
	      }
	      .el-input--suffix .el-input__inner{
	        width:500px !important;
	      }
	      .el-input__icon{
	        height:100%;
	      }
	  }

	 

</style>
