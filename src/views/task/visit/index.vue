<template>
  <div class="app-container" style="padding-left: 0px;height: 800px;">
	
	<div>
		<div style="background-color: white;">
				<el-form :model="queryParams1" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" style="padding-top: 20px;">
				  <el-form-item label="姓名" prop="name">
				    <el-input
				      v-model="queryParams1.name"
				      placeholder="请输入姓名"
				      clearable
				      size="small"
				      @keyup.enter.native="handleQuery"
				    />
				  </el-form-item>
				  <!-- <el-form-item label="预约时间" prop="visitTime">
				    <el-date-picker clearable size="small"
				      v-model="queryParams1.visitTime"
				      type="date"
				      value-format="yyyy-MM-dd"
				      placeholder="选择预约时间">
				    </el-date-picker>
				  </el-form-item> -->
				  <el-form-item label="状态" prop="status">
				    <el-input
				      v-model="queryParams1.status"
				      placeholder="请输入状态"
				      clearable
				      size="small"
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
				<el-table v-loading="loading" :data="visitList" @selection-change="handleSelectionChange">
				  <el-table-column type="selection" width="55" align="center" />
				  <el-table-column label="序号" align="center" prop="id" />
				  <el-table-column label="姓名" align="center" prop="name" />
				  <el-table-column label="预约时间" align="center" prop="visitTime" width="180px">
				  </el-table-column>
				  <el-table-column label="申请理由" align="center" prop="appointReason" />
				  <el-table-column label="车位预约" align="center" prop="carNumber" />
				   <el-table-column label="联系电话" align="center" prop="phone" />
					<el-table-column label="状态" prop="status" align="center">
					 </el-table-column>
				  <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				    <template slot-scope="scope">
				  <el-button
				    size="mini"
				    type="text"
				  	:disabled= "scope.row.status === '通过' || scope.row.status === '拒绝'"
				    @click="handleUpdate(scope.row)"
					style="color: #5bcac7;"
				  >审核</el-button>
				      <el-button
				        size="mini"
				        type="text"
						style="color: #5bcac7;"
				        @click="handleDelete(scope.row)"
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
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入" />
          </el-form-item>
		  <el-form-item label="车位预约" prop="carNumber">
		    <el-input v-model="form.carNumber" placeholder="请输入" />
		  </el-form-item>
		  <el-form-item label="联系电话" prop="phone">
		    <el-input v-model="form.phone" placeholder="请输入" />
		  </el-form-item>
          <el-form-item label="预约时间" prop="visitTime">
            <el-input v-model="form.visitTime" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="申请理由" prop="appointReason">
            <el-input v-model="form.appointReason" placeholder="请输入" />
          </el-form-item>
		  <el-form-item label="审核意见" >
			  <div style="display: flex;flex-direction: row;">
				  <div>
				  	<input type="checkbox"  @click = "checkbox1()">
				  </div>
				  <div style="padding-left: 3px;">
				  	<span>通过</span>
				  </div>
				  <div style="padding-left: 40px;">
				  	<input type="checkbox"  @click = "checkbox2()">
				  </div>
				  <div style="padding-left: 3px;">
				  	<span>拒绝</span>
				  </div>
			  </div>
		  </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>


import { listVisit, getVisit, delVisit, addVisit, updateVisit, exportVisit,listVisitbypr,listVisitby } from "@/api/task/visit";

export default {
  name: "Visit",
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
      visitList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
	  
	  
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
	  queryParams1:{
		  id:'',
		  name:'',
		  phone:'',
		  schoolId:1,
		  status:'',
		  visitTime:'',
		  carNumber:'',
		  appointReason:'',
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
		  
		  
		checkbox1(){
			this.form.status = '审核通过'
		},
		checkbox2(){
			this.form.status = '审核拒绝'
		},
		
		
  //   /** 查询列表 */
    getList() {
      this.loading = true;
      listVisitbypr(this.queryParams.pageNum,this.queryParams.pageSize,this.queryParams1).then(response => {
        this.visitList = response.data.records;
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
		id:null,
		name:null,
		phone:null,
		schoolId:null,
		status:null,
		visitTime:null,
		carNumber:null,
		appointReason:null,
		
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
      this.title = "新增访客信息";
    },
    /** 修改按钮操作 */
	handleUpdate(row) {
	  this.reset();
	  const id = row.id
	  getVisit(id).then(response => {
	    this.form = response.data;
	    this.open = true;
	    this.title = "审核访客预约";
	  });
	},
    /** 提交按钮 */
	submitForm() {
	  this.$refs["form"].validate(valid => {
	    if (valid) {
	      if (this.form.id != null) {
	        updateVisit(this.form.id,this.form).then(response => {
	          this.msgSuccess("审核完成");
	          this.open = false;
	          this.getList();
	        });
	      } else {
	        addVisit(this.form).then(response => {
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
	  this.$confirm('是否确认删除编号为"' + row.id + '"的来访预约申请?', "警告", {
	      confirmButtonText: "确定",
	      cancelButtonText: "取消",
	      type: "warning"
	    }).then(function() {
	      return delVisit(id);
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
