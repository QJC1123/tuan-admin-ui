<template>
  <div class="app-container" style="padding-left: 0px;height: 800px;">
	
	<div>
		<div style="background-color: white;">
				<el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" style="padding-top: 10px;padding-left: 10px;">
				
				  <el-form-item label="报修进度" prop="status">
					<el-input
					  v-model="queryParams1.status"
					  placeholder="请输入状态"
					  clearable
					  size="small"
					  @keyup.enter.native="handleQuery"
					/>
				  </el-form-item>
				  <el-form-item label="" prop="id" style="float: right;">
					<el-input
					  v-model="queryParams1.id"
					  placeholder="请输入设备编号"
					  clearable
					  size="small"
					  suffix-icon="el-icon-search"
					  style="width:250px"
					  @keyup.enter.native="handleQuery"
					  
					/>
				  </el-form-item>
		      <el-form-item>
		        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
		        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
		      </el-form-item>
				</el-form>
			</div>
			

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
		
		<div style="padding-top: 10px;">
			<div style="background-color: white;">
				<el-table v-loading="loading" :data="FDeviceList" @selection-change="handleSelectionChange">
				  <el-table-column type="selection" width="55" align="center" />
				  <!-- <el-table-column label="序号" align="center" prop="id"  width="55"/> -->
				 <el-table-column label="故障设备" align="center" prop="facilityName" width="100px"/>
				 <el-table-column label="设备类型" align="center" prop="facilityType" width="100px"/>
				 <el-table-column label="所属区域" align="center" prop="facilityLocation" width="100px"/>
				  <el-table-column label="报修详情" align="center" prop="description" width="150px"/>
				  <el-table-column label="报修进度" align="center" prop="status" width="100px"/>
				 <!-- 已报修 已维修 -->
				  <el-table-column label="上报人姓名" align="center" prop="reportUserName" width="100px"/>
				  <el-table-column label="上报时间" align="center" prop="reportTime" width="100px">
				  </el-table-column>
				  <el-table-column label="处理人姓名" align="center" prop="handlerUserName" width="100px"/>
				  <el-table-column label="处理时间" align="center" prop="handlerTime" width="100px">
				  </el-table-column>
				  <!-- <el-table-column label="图片"  prop="imagePath" align="center">
				  	<template slot-scope="scope")>
				  		<el-image :preview-src-list="scope.row.imagePath"></el-image>
				  	</template>
				  </el-table-column> -->
				  <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="150px">
				    <template slot-scope="scope">
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
	
	
    <!-- 添加或修改用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="设施名称" prop="facilityName">
            <el-input v-model="form.facilityName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="报修详情" prop="description">
            <el-input v-model="form.description" placeholder="请输入" />
          </el-form-item>
          <!-- <el-form-item label="报修图片" prop="imagePath">
			  <img src="form.imagePath" />
          </el-form-item> -->
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { listFDevice, getFDevice, delFDevice, addFDevice, updateFDevice,listFDeviceby,listFDevicebypr } from "@/api/task/device.js";


export default {
  name: "FDevice",
  data() {
    return {
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
      FDeviceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
	  
	  
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
		name:''
      },
	  queryParams1:{
		  id:'',
		  status:'',
		  
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
	  
  getCurrentTime() {
		  //获取当前时间并打印
		  var _this = this;
	  　　let yy = new Date().getFullYear();
	  　　let mm = new Date().getMonth()+1;
	  　　let dd = new Date().getDate();
	  　　let hh = new Date().getHours();
	  　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
	  　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
	  　　_this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
	  　　console.log(_this.gettime)  
		return _this.gettime
	  },
		  
		  
    /** 查询列表 */
    getList() {
      this.loading = true;
      listFDevicebypr(this.queryParams.pageNum,this.queryParams.pageSize,this.queryParams1).then(response => {
        this.FDeviceList = response.data.records;
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
		id:0,
		facilityName: null,
		status: null,
		reportUserName:null,
		reportTime:null,
		imagePath:null,
		handlerName:null,
		handlerTime:null,
		description:null,
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
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "故障设施上报";
    },
    /** 修改按钮操作 */
	handleUpdate(row) {
	  this.reset();
	  const id = row.id
	  getFDevice(id).then(response => {
	    this.form = response.data;
	    this.open = true;
	    this.title = "修改报修信息";
	  });
	},
    /** 提交按钮 */
	submitForm() {
		
		
		this.form.reportTime = getCurrentTime();
		
	  this.$refs["form"].validate(valid => {
	    if (valid) {
	      if (this.form.id != null) {
			  this.msgSuccess("修改成功");
			  this.open = false;
			  
	        updateFDevice(this.form.id,this.form).then(response => {
	          this.msgSuccess("修改成功");
	          this.open = false;
	          this.getList();
	        });
	      } else {
			  this.msgSuccess("新增成功");
			  this.open = false;
	        addFDevice(this.form).then(response => {
	          this.msgSuccess("新增成功");
	          this.open = false;
	          this.getList();
	        });
	      }
	    }
	  });
	},

	/** 删除按钮操作 */
	handleDelete(row) {
		const id = row.id;
	  this.$confirm('是否确认删除编号为"' + row.id + '"的报修记录?', "警告", {
	      confirmButtonText: "确定",
	      cancelButtonText: "取消",
	      type: "warning"
	    }).then(function() {
	      return delFDevice(id);
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
