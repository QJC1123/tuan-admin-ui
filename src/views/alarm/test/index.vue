<template>
   <div style="height: 800px;">
	  
		<el-row :gutter="20" style="padding-top: 30px;">
			<el-col :span="6" style="background-color: white;height: 950px;">
				<el-row style="padding-top: 30px;padding-left: 50px;">
					<div class="head-container">
						<i class="el-icon-collection" style="zoom: 1.3;"></i>
						<span style="font-size: 16px;font-weight: 350;padding-left: 10px;">告警测试配置面板</span>
					</div>
				</el-row>
				
				<el-row style="padding-top: 40px;">
					<el-form class="form1" ref="form1" :model="form1" label-width="80px" style="float: right;background-color: white;padding-left: 20px;" >
						
						<el-row >
							<el-row style="padding-left: 10px;">
								<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">RTSP视频流</span>
							</el-row>
							
							<!-- <el-input v-model="rtspurl"></el-input> -->
							<el-row style="padding-top: 10px;padding-left: 10px;">
								<div style="display: flex;flex-direction: row;">
									<el-input v-model="rtspurl" style=""></el-input>
									<!-- 
									<template>
										<input v-model="rtspurl">
										<el-input v-model="rtspurl" @input="change($event)"></el-input>
									</template>
									<el-input v-model="rtspurl"></el-input>
									<input  v-model="rtspurl">
									 -->
									<el-button type="success" @click.native="savecamera" size="mini">接入</el-button>
								</div>
								
								<!-- <el-autocomplete
								    class="inline-input"
								    ref="input"
								    v-model="rtspurl"
								    :fetch-suggestions="querySearch" 
								    placeholder="请选择或输入视频流地址" 
								    style="width:250px"
								    @mouseenter.native="isHover = true"
								    @mouseleave.native="isHover = false"
									
								    >
								    <i v-if="showsClear" class="el-icon-circle-close el-input__icon" slot="suffix" @click="handleIconClick"></i>
								    <i v-else class="el-icon-arrow-down el-input__icon" slot="suffix" @click="handleIconClick"></i>
								    <template slot-scope="{ item }">
								        <div @click="choose(item)">
								            <span style="float: left">{{ item.name }}</span>
								            <span style="margin-left:15px;color: #8492a6; font-size: 13px">({{ item.value }})</span>
								        </div>
								    </template>
								</el-autocomplete> -->
							</el-row>
							
							
							
							<el-row style="padding-top: 30px;padding-left: 10px;">
								<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">检测类型</span>
							</el-row>
							
							<el-row style="padding-left: 0px;">
								<el-row style="padding-left: 10px;">
									<div prop="level">
										<el-tag
										    :key="tag"
										    v-for="tag in dynamicTags"
										    closable
										    :disable-transitions="false"
										    @close="handleClose(tag)"
										  >
										    {{tag}}
										</el-tag>
									</div>
								</el-row>
								<el-row style="padding-top: 10px;">
									
									<el-select
										class="input-new-tag"
										v-if="inputVisible"
										v-model="inputValue"
										
										size="small"
										placeholder="请选择"
										clearable
										style="width: 200px"
									>
									  <el-option
									    v-for="item in typelist"
									    :key="item.value"
									    :label="item.label"
									    :value="item.value"
										@click.native ="handleInputConfirm(item)"
										@blur="handleInputConfirm"	
									  />
									</el-select>
									<el-button v-else class="button-new-tag" size="mini" @click="showInput"
									style="padding-left: -2px;"
									  >+ New Tag</el-button>
								</el-row>
							</el-row>
							
							
							<el-row style="padding-top: 40px;">
								<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;padding-left: 15px;">告警配置</span>
							</el-row>
							
							<el-row style="padding-left: 13px;padding-top: 10px;">
								<span style="padding-left: 5px;">事件计数</span>
								<el-switch v-model="condition1"
								style="zoom: .8;padding-left: 10px;padding-right:10px;"
								active-value="1"
								inactive-value="0"
								size="mini"
								@change="changestatus1"
								>
								</el-switch>
							</el-row>
							
							
							<el-row style="padding-left: 13px;padding-top: 10px;">
								<span style="padding-left: 5px;">区域配置</span>
								<el-switch v-model="condition2"
								style="zoom: .8;padding-left: 10px;padding-right:10px;"
								active-value="1"
								inactive-value="0"
								size="mini"
								@change="changestatus2"
								>
								</el-switch>
							</el-row>
							
							<el-row style="padding-left: 13px;padding-top: 10px;">
								<span style="padding-left: 5px;">通知配置</span>
								<el-switch v-model="condition3"
								style="zoom: .8;padding-left: 10px;padding-right:10px;"
								active-value="1"
								inactive-value="0"
								size="mini"
								@change="changestatus3"
								>
								</el-switch>
							</el-row>
							
							
							<el-row style="padding-top: 40px;">
								<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;padding-left: 10px;">告警检测进度</span>
							</el-row>
							
							<el-row style="padding-left: 10px;padding-top: 20px;">
								  <el-progress
								    :percentage=progressup
								    :indeterminate="true"
								    :duration="1"
								  ></el-progress>
							</el-row>
							
							<el-row style="padding-top: 150px;">
								<div style="float: right;bottom: 60px;" class="dialog-footer">
								  <el-button type="primary"  size="small" @click="operation">开始检测</el-button>
								  <el-button @click="resetQuery" size="small">重 置</el-button>
								</div>
							</el-row>
							
						</el-row>
						
					</el-form>
				</el-row>
			</el-col>
			
			
			<!-- <video src="http://47.120.7.93:8081/detection/getmp4/33"
			    @error="videoErrorCallback"  controls style="width: 250px;"></video> -->
				
			<!-- <video src="videourl" @error="videoErrorCallback" autoplay muted  controls style="width: 250px;"></video> -->
				
			
			
			<el-col :span="18" style="padding-left: 30px;">
				<el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="tab1">
					<el-tab-pane  name="first" label="告警配置" style="background-color: white;">
						<el-row style="padding-left: 30px;">
							<el-row style="padding-bottom: 1%;padding-top: 20px;">
								<i class="el-icon-s-tools" style="color:#6c7278 ;zoom: 1.1;"></i>
								<span style="font-size: 16px;font-weight: 350;color: #6c7278;padding-left: 8px;">事件计数</span>
							</el-row>
							<el-row>
								<el-col :span="21" style="padding-top: 10px;">
									<span>异常事件计数: 在</span>
									<el-input
									v-model="alruletime1"
									placeholder="1/5/15..."
									clearable
									style="width: 100px;zoom:0.8"
									v-bind:disabled="disabled1"
									>
									</el-input>
									<el-select
									  v-model="alruletime1dw"
									  clearable
									  style="width: 100px;zoom: 0.8;"
									  v-bind:disabled="disabled1"
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
									v-model="alrulecount1"
									placeholder="5/10/15"
									clearable
									style="width: 100px;zoom:0.8"
									v-bind:disabled="disabled1"
									>
									</el-input>
									<span>次</span>
								</el-col>
							</el-row>
							
						</el-row>
						
						<el-row style="padding-left: 30px;">
							<el-row style="padding-bottom: 1%;padding-top: 20px;">
								<i class="el-icon-s-tools" style="color:#6c7278 ;zoom: 1.1;"></i>
								<span style="font-size: 16px;font-weight: 350;color: #6c7278;padding-left: 8px;">区域配置</span>
							</el-row>
							
							<el-row style="padding-top: 10px;">
								<div style="display: flex;flex-direction: row;">
									<div>
										<span >标签名称</span>
									<el-input
									v-model="committag"
									placeholder="请输入"
									clearable
									style="width: 200px;zoom:0.8;padding-left: 10px;"
									v-bind:disabled="disabled2"
									></el-input>
									</div>
									<div style="padding-left: 20px;">
										<span>危险区域滞留时间</span>
										<el-input v-model="wxtime" placeholder="请输入" style="width: 200px;zoom:0.8;padding-left: 10px;" v-bind:disabled="disabled2"/>
										<span>秒</span>
									</div>
								</div>
							</el-row>
							<div style="padding-left: 500px;padding-top: 20px;">
								
								<!-- <el-button size="mini"  type="primary"  @click.native="getImage">加载图片</el-button> -->
							  <el-button size="mini" :type=" 'warning'" @click="startDraw">绘制区域</el-button>
							  <el-button size="mini"  type="danger" :disabled="isDrawing" @click="clearAll">全部清除</el-button>
							  <el-button size="mini"  type="success" :disabled="isDrawing" @click="savePoints">保存</el-button>
							</div>
						</el-row>
						<el-row style="padding-top: 20px;zoom:1">
							<div class="canvas-wrap" style="">
							  <canvas id="imgCanvas" ref="canvaxbox"></canvas>
							  <!--用来和鼠标进行交互操作的canvas-->
							  <canvas id="drawCanvas" ref="canvas" :style="{cursor: isDrawing?'crosshair': 'default'}"> </canvas>
							  <!--存储已生成的点线，避免被清空-->
							  <canvas id="saveCanvas" ref="canvasSave"></canvas>				  
							</div>
						</el-row>
						<el-row style="padding-top: 0px;padding-left: 30px;">
							<el-row style="padding-bottom: 1%;padding-top: 20px;">
								<i class="el-icon-s-tools" style="color:#6c7278 ;zoom: 1.1;"></i>
								<span style="font-size: 16px;font-weight: 350;color: #6c7278;padding-left: 8px;">通知配置</span>
							</el-row>
							<el-row style="padding-bottom: 50px;">
								<span>可选用户</span>
								<el-select
								  v-model="user"
								  clearable
								  style="width: 200px;padding-left: 10px;"
								  v-bind:disabled="disabled3"
								>
								  <el-option
								    v-for="item in userlist"
								    :key="item.value"
								    :label="item.label"
								    :value="item.value"
								  />
								</el-select>
							</el-row>
						</el-row>
					</el-tab-pane>
				    <el-tab-pane  name="second" label="检测结果" style="background-color: white;">
						<div style="background-color: white;">
							<el-row style="padding-top: 20px;padding-left: 30px;">
								<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;padding-left: 10px;">告警事件列表</span>
							</el-row>
							<el-row>
								<el-table v-loading="loading" :data="testalarmlist" style="padding-top: 15px;padding-left: 30px;padding-right: 20px;">
								  <el-table-column label="告警状态" align="center" prop="alarmStatus">
									  <template slot-scope="scope">
										  <div style="">
											  <status-indicator intermediary pulse v-if="scope.row.alarmStatus == '处理中'" ></status-indicator>
											  <status-indicator negative pulse v-if="scope.row.alarmStatus == '未处理'" ></status-indicator>
											  <status-indicator positive pulse v-if="scope.row.alarmStatus == '已处理'" ></status-indicator>
											  <span style="padding-left: 10px;">{{scope.row.alarmStatus}}</span>
										  </div>
									  </template>
								  </el-table-column>
								  <el-table-column label="告警类型" align="center" prop="alarmType" />
								  <el-table-column label="告警名称" align="center" prop="alarmName"/>
								  <el-table-column label="摄像头" align="center" prop="cameraName" />
								  <el-table-column label="所在区域" align="center" prop="alarmLocation" />
								  <el-table-column label="操作" align="center" width="150">
								    <template slot-scope="scope">
									  <el-button
									    size="mini"
									    type="text"
									    icon="el-icon-view"
									    @click="handleView(scope.row)"
									  >查看详情</el-button>
								    </template>
								  </el-table-column>
								</el-table>
							</el-row>
							<div >
								 
							</div>
							<el-row style="padding-top: 40px;padding-left: 30px;">
								<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;padding-left: 10px;">告警事件详情</span>
							</el-row>
							
							
							
							
							
							<el-row style="padding-top: 20px;">
								<div v-if="testalarmlist.length">
								     <div class="item" v-for="(item,index) in testalarmlist" :key="index"  >
								        <div style="zoom:0.8;padding-left: 40px;background-color: white;" >
											
											<el-card>
												<el-row>
													<el-col :span="14">
														<el-row>
															<input type="text" v-model="item.alarmName" style="border: 0px; outline:none;padding-left: 20px;font-size: 17px;font-weight: 500;"/>
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
																	<div style="padding-top: 0px;"><span>{{item.alarmId}}</span></div>
																	<span style="color: gray;" v-model="item.alarmId">告警编号</span>
																</el-col>
															</el-col>
															<el-col :span="6">
																<el-row >
																	<el-col :span="9">
																		<img src="@/assets/images/alarm1.png" v-if="item.alarmStatus == '未处理'" style="zoom:0.4" />
																		<img src="@/assets/images/alarm2.png" v-if="item.alarmStatus == '处理中'" style="zoom:0.4"  />
																		<img src="@/assets/images/alarm4.png" v-if="item.alarmStatus == '已处理'" style="zoom:0.4"/>
																	</el-col>
																	<el-col :span="12">
																		<div style="padding-top: 0px;" v-model="item.alarmStatus"><span>{{form1.status}}</span></div>
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
																	<div style="padding-top: 0px;" v-model="item.alarmTime"><span>{{item.alarmTime}}</span></div>
																	
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
																	<div style="padding-top: 0px;" v-model="item.noiseReduction"><span>{{chknoise(item.noiseReduction)}}</span></div>
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
																	<div style="padding-top: 0px;" v-model="item.alarmType"><span>{{item.alarmType}}</span></div>
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
																	<div style="padding-top: 0px;" v-model="item.alarmLevel"><span>{{chklevel(item.alarmLevel)}}</span></div>
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
																	<div style="padding-top: 0px;" v-model="item.alarmLocation"><span>{{item.alarmLocation}}</span></div>
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
																	<div style="padding-top: 0px;" v-model="item.cameraName"><span>{{item.cameraName}}</span></div>
																	<span style="color: gray;">摄像头名称</span>
																</el-col>
															</el-col>
														</el-row>
														<el-row style="padding-top: 30px;padding-left: 20px;">
															<i class="el-icon-s-management" style="zoom:1.3;"></i>
															<span style="font-size: 16px;padding-left: 5px;">告警配置</span>
															
															<el-form class="" ref="form2" :model="form2" label-width="80px" style="background-color: white;" >
													
																<el-row style="padding-top: 10px;">
																	<el-col :span="4">
																		<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">通知组</span>
																	</el-col>
																	<el-col :span="6">
																		<input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px;" v-model="item.alarmDepartment" />
																	</el-col>
																</el-row>
																<el-row style="padding-top: 10px;">
																	<el-col :span="4">
																		<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">通知频率</span>
																	</el-col>
																	<el-col :span="6">
																		<input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px;" v-model="alarmmin"/>
																	</el-col>
																</el-row>
																<!-- <el-row style="padding-top: 10px;">
																	<el-col :span="4">
																		<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">通知内容</span>
																	</el-col>
																	<el-col :span="6" style="padding-top: 5px;">
																		<textarea cols="55" rows="5" style="font-size: 15px;font-weight: 540;"  v-model="form.description"></textarea>
																	</el-col>
																</el-row> -->
																<!-- <el-row style="padding-top: 10px;">
																	<el-col :span="4">
																		<span style="font-size: 15px;font-weight: 350;color: #6c7278;line-height: 22px;">区域标注</span>
																	</el-col>
																	<el-col :span="6" style="padding-top: 5px;">
																		<textarea cols="55" rows="5" style="font-size: 15px;font-weight: 540;"  v-model="form.description"></textarea>
																	</el-col>
																</el-row> -->
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
														</el-row>
														<el-row style="">
															<div v-if="dis==1">
																<el-col :span="6">
																	<input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px;" v-model="item.detectionId" />
																</el-col>
															</div>
															
															<!-- <input type="text" style="border: 0px;outline: none;font-size: 15px;font-weight: 540;color: #1d2129;line-height: 22px;" v-model=" playerOptions.sources[0].src" /> -->
															<el-button @click="getalarmmp4(item.detectionId)">播放视频</el-button>
															
															
															<!-- <div class='demo'>
															        <video-player class="video-player vjs-custom-skin" 
															                      ref="videoPlayer" 
															                      :playsinline="true" 
															                      :options="playerOptions">
															        </video-player>
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
																			<el-form :model="form1" ref="form1">
																				<div style="font-size: 14px;">
																					<el-row>
																						<span>监控摄像头“{{item.cameraName}}”在“{{item.alarmLocation}}”检测到“{{item.alarmLevel}}” : “{{item.alarmName}}”,属于“{{item.alarmType}}”类型</span>
																					</el-row>
																				</div>
																			</el-form>
																		</template>
																		<template slot="description" v-if="item.id == 1">
																			<el-form :model="form1" ref="form1">
																				<div style="font-size: 14px;">
																					<el-row>
																						<span>告警属于“{{item.alarmType}}”,已通知“{{item.alarmDepartment}}”,等待相关人员处理！</span>
																					</el-row>
																				</div>
																			</el-form>
																		</template>
																		
																		<template slot="description" v-if="item.id == 2 ">
																			<el-form :model="form1" ref="form1">
																				<div style="font-size: 14px;">
																					<el-row>
																						<span>“{{item.alarmName}}”告警处理任务已被认领,由“{{item.alarmUser}}”负责处理！</span>
																					</el-row>
																				</div>
																			</el-form>
																				
																		</template>
																		
																		<template slot="description" v-if="item.id == 3">
																			<el-form :model="form1" ref="form1">
																				<div style="font-size: 14px;">
																					<el-row>
																						<span>“{{item.alarmName}}”告警已解除！</span>
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
											</el-card>
								        	<el-form style="border:1px solid #d5d5d5">
								        		
								        	</el-form>
								        </div>
										   
								     </div>
								</div>
								<div v-else class="nullCss">暂无数据</div>
								
								
							</el-row>
						</div>
					</el-tab-pane>
				  </el-tabs>
				  
				 <el-dialog :title="titlevideo" :visible.sync="openvideo" width="500px" append-to-body>
					  <div class='demo'>
					          <video-player class="video-player vjs-custom-skin" 
					                        ref="videoPlayer" 
					                        :playsinline="true" 
					                        :options="playerOptions">
					          </video-player>
					  </div>
				  </el-dialog>
			</el-col>
		</el-row>
    </el-row>
   </div>
</template>

<script>
import { listCamera, getCamera, delCamera, addCamera, updateCamera,listCameraby,listCamerabypr } from "@/api/vedio/camera.js";
import { StatusIndicator } from 'vue-status-indicator';
import {testsavecamera,testupdatecamera,testgetimg,testlistalarm,testalarmmp4} from "@/api/alarm/alarmtest.js"
import getCodeImg from '@/api/login.js'


import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'


	 
export default {
	components: {
	  StatusIndicator,
	  videoPlayer
	  
	},
	
	props:{
	    clearable: {
	        type: Boolean,
	        default: true,
	    }
	},
  data () {
    return {
		
		openvideo:false,
		titlevideo:'告警视频回放',
		
		dis:0,		
		detectionId:'',
		
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
							// src:'',
							
							src: require('@/assets/video/case2_car.mp4'),
							 // require('../assets/video/810020027.mp4'),
		                    // src: 'http://47.120.7.93:8081/detection/getmp4/'+this.detectionid ,
							// src:'http://47.120.7.93'+this.detectionid,
							// src:'http://47.120.7.93:8081/detection/getmp4/'+ this.detectionid,
							// src: VUE_APP_BASE_API5+this.detectionid,// url地址
							// src: VUE_APP_BASE_API5+this.detectionid,// url地址
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
		
		
		
		
		
		
		
		//告警时间进度
				approvalProcessProject:[
				   {id:'0',label: " 告警检测"},
				   { id:'1',label: "告警通知"},
				   { id:'2',label: "告警处理"},
				   { id:'3',label: "告警解除"},
		],
		
	alarmmin:'5分钟',
		
	//传入的rtspurl
	rtspurl:"",
	//返回的摄像头id
	cameraid:1,
	committag:'',
	wxtime:'',
	// 返回的结果
	testalarmlist:[],
	
	cameraform:{
		cameraLable:"",
		cameraLableTime:"",
		cameraName:"",
		cameraXy:"",
		description:"",
		filePath:"",
		id:"",
		location:"",
		rtspUrl:"",
		schoolId:"",
		status:"",
	},
		
	
	disabled1:true,
	disabled2:true,
	disabled3:true,
		// 关于画图begin
		imgUrl: '',
	  // imgUrl: 'http://mms0.baidu.com/it/u=2281103194,2302460655&fm=253&app=120&f=JPEG&fmt=auto&q=75?w=640&h=446',
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
	  // 关于画图end
	  
		
		condition1:0,
		condition2:0,
		alruletime1:'',
		alruletime1dw:'',
		alrulecount1:'',
		
		alruletime1dwlist:[
				  {value:'秒',},
				  {value:'分钟',},
				  {value:'时',},
				  {value:'日',},
				  {value:'周',}
		],
		
		
		userlist:[
			{value:'值班组1',}
			],
		
		
		//图片地址
		picurl:"http://mms0.baidu.com/it/u=2281103194,2302460655&fm=253&app=120&f=JPEG&fmt=auto&q=75?w=640&h=446",
		
		
		videourl:"",
		videourlist:'',
		
		
		
		eventList: [
				  {
					  id:'1',
					  status:'处理中',
					  alarmLevel:'一级警情',
					  alarmType:"消防告警",
					  alarmName:'烟雾明火',
					  detectionId:'停车场-西-1',
					  alarmArea:'停车场',
					  alarmTime:'2023-04-01 11:23:11'
				  }
		],
		
		ruleList1:[
		  {
			  alruleName: "烟雾明火",
			  alruleLevel: 1,
			  alruleStatus: 1,
			  alruleType: 2,
			  alruletime1:"1分钟",
			  alrulecount1:"1",
			  alruletime2:"5分钟",
			  alruletime3:"30分钟",
			  alruledec:"事件计数在1分钟之内，计数大于1,发送告警通知,每隔5分钟发送一次,直到任务被认领,若30分钟后仍无人认领,发送告警通知到管理员",
			  alruleGroupId: "安保部门,在校学生,学生家长,教学部门",
		  },],
		
		
		//告警事件详情
		form1:{
				  id:'1',
				  status:'处理中',
				  alarmLevel:'一级警情',
				  alarmType:"消防告警",
				  alarmName:'烟雾明火',
				  detectionId:'停车场-西-1',
				  alarmArea:'停车场',
				  alarmTime:'2023-04-01 11:23:11',
				  alarmper:"70%",
				  alarmjgtime:'20s',
				  alarmvediourl:"https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4",
				  alarmdept:'安保部门',
				  alarmperson:'维修工1',
				  alarmres:'处理完成',
		},
		
		activeName:"first",
		progressup:0,
		
		
		//标签
		dynamicTags: [
			'危险区域滞留', 
			'围栏翻越', 
		],
		inputVisible: false,
		inputValue: '',
		//标签
		
		
		isHover: false,
		url:'',
		videoTableData :[],
		
		Template:'',
		typelist:[
			{value:'危险区域滞留'},
			{value:'围栏翻越'},
			{value:'特定区域人员闯入'},
			{value:'抽烟'},
			{value:'跌倒'},
			{value:'挥手求救'},
			{value:'地面积水'},
			{value:'墙面渗水'},
			{value:'烟雾明火'},
			{value:'车辆违停'},
			{value:'后厨口罩告警'},
			{value:'后厨厨师帽告警'},
			{value:'后厨老鼠告警'},
		],
		templatelist:[
			{value:'自定义新模板'},
			{value:'默认模板-危险区域滞留'},
			{value:'默认模板-围栏翻越'},
			{value:'默认模板-特定区域人员闯入'},
			{value:'默认模板-抽烟'},
			{value:'默认模板-跌倒'},
			{value:'默认模板-挥手求救'},
			{value:'默认模板-地面积水'},
			{value:'默认模板-墙面渗水'},
			{value:'默认模板-烟雾明火'},
			{value:'默认模板-车辆违停'},
			{value:'默认模板-后厨口罩告警'},
			{value:'默认模板-后厨厨师帽告警'},
			{value:'默认模板-后厨老鼠告警'},
		],
		
		
		
		
		
		
		
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
		data:[{
          label: '东区',
          children: [{
            label: '行政楼',
            children: [{
              label: '行政楼-2楼-西-01'
            }]
          }]
        }, {
          label: '西区',
          children: [{
            label: '停车场',
            children: [{
              label: '停车场-西-01'
            }]
          }, {
            label: '操场',
            children: [{
              label: '操场-东-01'
            }]
          }]
        }, {
          label: '南区',
          children: [{
            label: '教学楼',
            children: [{
              label: '教学楼-2楼-东-01'
            }]
          }, {
            label: '体育馆',
            children: [{
              label: '体育馆-3楼-东-01'
            }]
          }]
        },
		{
		  label: '北区',
		  children: [{
		    label: '2号寝室楼',
		    children: [{
		      label: '2号寝室楼-3楼-西-01'
		    }]
		  }, {
		    label: '7号寝室楼',
		    children: [{
		      label: '7号寝室楼-6楼-西-01'
		    }]
		  }]
		}
		]
       
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
	mounted() {
		this.getvideoTableData (); 
		
		// 画图begin
		this.initCanvas();
		this.getImage();
		// 画图end

	},
	computed: {
	     showsClear () {
	         return this.clearable && this.url && this.isHover
	     },
	 },
  methods:{
	  
	  getalarmmp4(detectionId){
		  this.openvideo = true;
		  
		  const id = detectionId;
		  // this.playerOptions.sources[0].src = process.env.VUE_APP_BASE_API_VIDEO + id;
		  // id = 28;
		  // this.playerOptions.sources[0].src = 'http://47.120.7.93:8081/detection/getmp4/' + id;
		  this.playerOptions.sources[0].src = process.env.VUE_APP_BASE_API_VIDEO + id;
		  // src:'http://47.120.7.93:8081/detection/getmp4/'+ this.detectionid,
		  
		  // axios.get('/system/getVerifiCodeImage', {responseType: 'blob'}).then((response) => {
		  // 	// console.log(response)
		  //     // this.verifyCode = window.URL.createObjectURL(response)
		  // 	 this.imgUrl = window.URL.createObjectURL(response)
		  // 	 this.imgUrl && this.initImgCanvas()
		  //   })
		  
		 //  const id = this.detectionid;
			// testalarmmp4(id).then(response => {
		 //  	 this.videourl = window.URL.createObjectURL(response)
		 //  	 // this.imgUrl && this.initImgCanvas()
		 //  });
		 
	  },
	  
	  // <el-button @click="getalarmmp4"></el-button>
	  // <video src="videourl" @error="videoErrorCallback" autoplay muted  controls style="width: 250px;"></video>
	  
	  // getalarmmp4(){
		 //  'const id = this.detectionid;
		 //  axios.get('/detection/getmp4/'+id, {responseType: 'blob'}).then((response) => {
		  	
		 //  	 this.videoUrl = window.URL.createObjectURL(response)
		 //  	 // this.imgUrl && this.initImgCanvas()
		 //    })
	  // }
	  
	  
	  
	  
	  change(){
	         this.$forceUpdate();
	  },
	  
		// 画图begin
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
		  
		  
		  // {
		  		  
		  //   console.log('图片已加载')
		  //   this.imgCtx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
		  //   this.renderDatas() // 渲染原有数据
		  // }
		  
		  
		  
		//   let img = document.createElement('img')
		//   img.src =  this.imgUrl
		//   img.onload = () => {
			  
		//     console.log('图片已加载')
		//     this.imgCtx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
		//     this.renderDatas() // 渲染原有数据
		//   }
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
		
		
		// getImage() {
			
		// 	const id = this.cameraid
		// 	testgetimg(id).then(response => {
		// 		 this.imgUrl = window.URL.createObjectURL(response)
		// 		 this.imgUrl && this.initImgCanvas()
		// 	});
		// },
		
		// getimgvr(){
		// 	axios.get('/system/getVerifiCodeImage', {responseType: 'blob'}).then((response) => {
		// 		// console.log(response)
		// 	    this.verifyCode = window.URL.createObjectURL(response)
		// 	  })
		// },
		
		
		
		getImage() { 
			
			// axios.get('/system/getVerifiCodeImage', {responseType: 'blob'}).then((response) => {
			// 	// console.log(response)
			//     // this.verifyCode = window.URL.createObjectURL(response)
			// 	 this.imgUrl = window.URL.createObjectURL(response)
			// 	 this.imgUrl && this.initImgCanvas()
			//   })
			
			const id = this.cameraid
			testgetimg(id).then(response => {
				 this.imgUrl = window.URL.createObjectURL(response)
				 this.imgUrl && this.initImgCanvas()
			});
			
		},	
			// 请求图片
			// this.imgUrl = 'img/1.jpg',
			//this.imgUrl='http://mms0.baidu.com/it/u=2281103194,2302460655&fm=253&app=120&f=JPEG&fmt=auto&q=75?w=640&h=446',
			// this.imgWidth = 3020
			// this.imgHeight = 1080
			//this.imgUrl && this.initImgCanvas()
			
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
		
		// savePoints() { // 将画布坐标数据转换成提交数据
		// 	let tag  = this.committag 
		// 	console.log(tag)
		//   console.log(this.submitData)
		//   let objectPoints = []
		//   // "object": [{"polygon": {"x1":700,"y1":273,"x2":975,"y2":278,"x3":1107,"y3":368,"x4":718,"y4":354} }]
		//   objectPoints = this.drawedPoints.map(area => {
		// 	let tag  = this.committag 
		//     let polygon = {}
		//     area.forEach((point, i) => {
		//       polygon[`x${i+1}`] = Math.round(point[0] * this.ratio)
		//       polygon[`y${i+1}`] = Math.round(point[1] * this.ratio)
		//     })
		//     return {
		// 		"tag" : tag,
		// 		"area":polygon,
		//     }
		//   })
		//   console.log(tag)
		//   this.submitData = objectPoints
		//   console.log('最终提交数据', this.submitData)
		// },
		
		
		savePoints() { // 将画布坐标数据转换成提交数据
		
		    let label = this.dynamicTags
			let tag  = this.committag 
			let wxtime = this.wxtime
			let id = this.cameraid
			
			label = label.toString() 
			
			console.log(id,label,wxtime)
			
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
					"tag":tag,
					"area":polygon,
				}
			  })
			  
			  
			  
			  
			  this.submitData = objectPoints
			  
			  this.cameraform.id = this.cameraid
			  this.cameraform.cameraXy = JSON.stringify(objectPoints).replace(/[\\]/g,'');
			  this.cameraform.cameraLable = label
			  this.cameraform.cameraLableTime = wxtime
			  
			  
			  this.cameraform.cameraXy = this.cameraform.cameraXy.toString()
			  console.log(this.cameraform.cameraXy)
			  
			  
			  // let reg = /\\/g;
			  //使用replace方法将全部匹配正则表达式的转义符替换为空
			  
			  console.log('最终提交数据', this.submitData)
			  console.log('转化后',this.cameraform.cameraXy,this.cameraform.cameraLable,this.cameraform.cameraLableTime)
			
			
			testupdatecamera(id,this.cameraform).then(response => {
				this.msgSuccess("标注成功");
		    });
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
	
	// 画图end
	
	
	  
	  changestatus1(){
		  if(this.condition1 == 1){
			  this.disabled1=false;
		  }else{
			  this.disabled1=true;
		  }
	  },
	  //开启区域配置
	  getbiaozhu(){
		  this.getImage();
	  },
	  changestatus2(){
		  if(this.condition2 == 1){
			  this.disabled2=false;
			  this.getImage();
		  }else{
			  this.disabled2=true;
		  }
		 
	  },
	  changestatus3(){
	  		  if(this.condition3== 1){
	  			  this.disabled3=false;
	  		  }else{
	  			  this.disabled3=true;
	  		  }
	  },
	  
	  //rtsp保存为camera //返回摄像头id
	  savecamera(){
		  this.cameraform.rtspUrl = this.rtspurl;
		  // this.cameraform.rtspUrl = this.rtspurl.replace(/[\\]/g,'');
		  console.log(this.cameraform.rtspUrl)
		  testsavecamera(this.cameraform).then(response => {
			this.cameraid = response.data.id
			this.msgSuccess("接入成功");
		  });
	  },
	  
	  
	  // 根据cameraid获得图片地址
	  // getpicurl(){
		 //  this.progressup = 100; 
		 // const id = this.cameraid
		 // getrtsppic(id).then(response => {
		 //   this.picurl = response.data;
		 //   console.log(this.picurl)
		 // });
	  // },
	  
	  
	  
	  handleUpdate(row) {
	    this.reset();
	    const id = row.id
	    getUser(id).then(response => {
	      this.form = response.data;
	      this.open = true;
	      this.title = "修改用户信息";
	  	this.form.rolename = chkrole(form.roleId)
	    });
	  },
	  
	  
	  
	  
	  chktype(data) {
	    if (data === 1) 
	    {
	  	return '危险行为告警'
	    } 
	    else if (data === 2) 
	    {
	  	return '消防告警'
	    } 
	    else if (data === 3) {
	    		return '交通告警'
	    } 
	    else if (data === 4) {
	    		return '设施告警'
	    } 
	    else if (data === 5) {
	    		return '交通告警'
	    } 
	    else if (data === 6) {
	    		return '后厨告警'
	    } 
	    else if (data === 7) {
	    		return '缺勤缺岗告警'
	    } 
	    else {
	  	return '黑名单人员告警'
	    }
	  },
	  
	  // 告警级别
	  chklevel(data) {
	    if (data === 1) 
	    {
	  	return '一级警情'
	    } else if (data === 2) {
	  	return '二级警情'
	    } 
	    else if (data === 3) {
	    		return '三级警情'
	    } 
	  },
	  chknoise(data) {
	  		const data0 = parseFloat(data)
	    const data1 = data0*100
	  		
	  		const data2 = data1.toString()
	  		const data3 = data2+'%'
	  		return data3
	  },
	  
	  
	  chktatus(data){
	  	if(data===1)
	  	{
	  		return '运行中'
	  	}
	  	else if(data === 0){
	  		return '已关闭'
	  	}
	  },
	  
	  handleIconClick () {
	      if (this.showsClear) {
	          this.url = '';
	      } else {
	          this.$refs.input.focus();
	      }
	  },    
	  querySearch(queryString, cb) {
	      var videoTableData = this.videoTableData;
	      var results = queryString ? videoTableData.filter(this.createStateFilter(queryString)) : videoTableData;
	      cb(results);
	   },
	  createStateFilter(queryString) {
	    return (state) => {
	       return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) >=0);
	     };
	  },
	  
	  //获取列表数据
	  getvideoTableData (){
	    this.videoTableData = [{
	    name:'文件分享.mp4',
	    value:'dshgfdshfjdshghfhsd……'  
	    },
	    ]
	  },
	  
	  
	  
	  getCurVal(val) {
	        console.log(val);
	        this.value = val.target.value;
	      },
		  
		  
	
	  
	  
	  
	  
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
		const id = this.cameraid
		
		// this.detectionid =28;
		testlistalarm(id).then(response => {
			this.testalarmlist = response.data;
			this.loading = false;
			// this.detectionid = response.data.detectionid;
			console.log(this.detectionId)
			// this.videourlist = response.data.alarmVideoPath
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
	
	//重置
	resetQuery() {
	this.progressup=0;
	  this.resetForm("form1");
	  // this.handleQuery();
	},
	
	
	// 节点单击事件
	handleNodeClick(data) {
	  this.reset();
	  this.queryParams.cameraId = data.id
	  getCamera(this.queryParams.cameraId).then(response => {
	    this.form = response.data;
	    this.drawer = true
	    this.title = "监控设备详情";
	  });
	},
	
	//标签
	handleClose(tag) {
	        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
	      },
	
	      showInput() {
	        this.inputVisible = true
	        this.$nextTick((_) => {
	          this.$refs.saveTagInput.$refs.input.focus()
	        })
	      },
	
	      handleInputConfirm() {
	        let inputValue = this.inputValue
	        if (inputValue) {
	          this.dynamicTags.push(inputValue)
	        }
	        this.inputVisible = false
	        this.inputValue = ''
	      },
		  
		  //进度条
		  //开始检测 获取根据cameraid获取list信息
		  operation(){
			  this.progressup = 100;
			  const id = this.cameraid
			  testlistalarm(id).then(response => {
		          this.$modal.msgSuccess("检测完毕，请查看结果");
		          this.getList();
				  
		        });
		  },
		
				
		submitForm() {
			this.progressup = 100;
			
			
		  this.$refs["form"].validate(valid => {
		    if (valid) {
				this.$modal.msgSuccess("修改成功");
		      if (this.form.id != null) {
		        updateStudent(this.form).then(response => {
		          this.$modal.msgSuccess("修改成功");
		          this.open = false;
		          this.getList();
		        });
		      } else {
		        addStudent(this.form).then(response => {
		          this.$modal.msgSuccess("新增成功");
		          this.open = false;
		          this.getList();
		        });
		      }
		    }
		  });
		},
	
	
  }
}
</script>

<style>
	/* 画图begin */
	.tool-box {
	  width: 60vw;
	  height: 40px;
	  padding: 5px 30px;
	  margin: 20px auto 0;
	  box-sizing: border-box;
	  text-align: right;
	}
	.canvas-wrap {
	  /* // width: 80vw; */
	  /* // height: 45vw; */
	  width: 60vw;
	  height: 33.75vw;
	  margin: 0px auto;
	  /* background-color: #000;//#fff; */
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
	/* 画图end */
	
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


.input{
   border:0;
   border-bottom:1px solid #c0c0c0;
   outline:0;
   text-align:center; 
   width:100px;
   font-size:16px;
}

.rpge1{
	width: 500px;
	height: 800px;
}



.el-tag + .el-tag {
    /* margin-left: 10px; */
	margin-top: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
	margin-top: 10px;
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }







</style>