<template>
  <div class="app-container" style="padding-left: 0px;height: 800px;">
	<el-col :span="5">
		<el-row>
			<div style="background-color: white;width: 205px;text-align: center;height: 30px;padding-top: 5px;">
				<span >系统用户</span>
			</div>
		</el-row>
		<el-row style="padding-top: 15px;">
			<div style="padding-right: 30px;">
				<el-tree :data="treedata" :props="defaultProps" default-expand-all style="padding-left: 20px;padding-top: 10px;padding-bottom: 10px;"></el-tree>
			</div>
		</el-row>
	</el-col>
	<el-col :span="19">
		<div>
			<div style="background-color: white;">
				<el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" style="padding-top: 10px;padding-left: 10px;">
					<el-form-item label="" prop="carState">
						<el-row>
							
							<el-col :span="20">
								<el-input
								  v-model="queryParams1.name"
								  placeholder="请输入角色名称"
								  clearable
								  size="small"
								  @keyup.enter.native="handleQuery"
								/>
							</el-col>
							<el-col :span="4">
								<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
							</el-col>
						</el-row>
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
					<el-table v-loading="loading" :data="RoleList" @selection-change="handleSelectionChange" :header-cell-style="{background:'#ffffff'}">
					  <el-table-column type="selection" align="center" width="80px"/>
					  <el-table-column label="序号" align="center" prop="id" width="50px"/>
					  <el-table-column label="角色名" align="center" prop="name" />
					  <el-table-column label="角色描述" align="center" prop="description" style="height: 300px;" />
					  <!-- <el-table-column label="数据权限" align="center" prop="permission" /> -->
					  <el-table-column label="所属部门" prop="department" align="center" >
					   </el-table-column>
					   <el-table-column label="角色状态" prop="status" align="center" >
					    </el-table-column>
						
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
					  
					  <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
	</el-col>
	
	
    <!-- 添加或修改用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="角色名" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名" />
          </el-form-item>
          <el-form-item label="角色描述" prop="name">
            <el-input v-model="form.description" placeholder="请输入角色描述" />
          </el-form-item>
          <el-form-item label="所属部门" prop="department">
            <el-input v-model="form.department" placeholder="请输入所属部门" />
          </el-form-item>
          <el-form-item label="数据权限" prop="permission">
            <el-input v-model="form.permission" placeholder="请输入数据权限" />
          </el-form-item>
	  
	  <el-form-item label="角色状态" prop="roleId">
	  	<el-select v-model="form.status" placeholder="请选择状态" style="width: 300px;">
	  		<el-option
	  		  v-for="status in statuslist"
	  		  :key="status.value"
	  		  :label="status.label"
	  		  :value="status.value"
	  		/>
	  	</el-select>
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
	import getCodeImg from '@/api/login.js'
import { listRole, getRole, delRole, addRole, updateRole,listRoleby,listRolebypr } from "@/api/sysuser/sysrole.js";

export default {
  name: "sysrole",
  data() {
    return {
		verifyCode :'',
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
      RoleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
	  
	  statuslist:[
		  {
			  value:"0",
			  label:"停用",
		  },
		  {
			  value:"1",
			  label:"在线",
		  },
	  ],
	  
	  rolelist: [
	   {
		   value: '1',
		   label: '管理员'
		},
	   {
		   value: '2',
		   label: '学生'
		},
	   {
		   value: '3',
		   label: '普通执勤人员'
	   },
	   {
		   value: '4',
		   label: '班主任'
	   },
	   {
		   value: '5',
		   label: '普通维修人员'
	   },
	   {
		   value: '6',
		   label: '普通食堂人员'
	   },
	   {
		   value: '7',
		   label: '学生家长'
	   },
	   ], 
	  
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
		name:''
      },
	  queryParams1:{
		  name:'',
	  },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
	  treedata:[
		{
			label: '图安校园',
			children:[
				
				{
					label:"安保部门",
					children:[
						{label:"警卫部门",
							children:[
							{label:"警卫队长"},
							{label:"普通执勤人员"}]},
						{label:"监控部门",
							children:[
							{label:"监控组长"},
							{label:"普通监控人员"}]},
						],
				},
				{
					label:"后勤部门",
					children:[
						{label:"设备后勤部",
							children:[
							{label:"维修经理"},
							{label:"普通维修人员"}]},
						{label:"餐饮后勤部",
							children:[
							{label:"食堂经理"},
							{label:"普通食堂人员"}]},
						{label:"宿舍后勤部",
							children:[
							{label:"宿管经理"},
							{label:"普通宿管人员"}]}],
				},
				{
					label:"教师部门",
					children:[
						{label:"班主任"},
						{label:"普通老师"},
					],
				},
				{
					label:"在校学生",
				},
				{
					label:"学生家长",
				},
				{
					label:"管理层人员",
				},
			]
		},
	  ]
    };
  },
  created() {
	  this.getList();
  },
  methods: {
		

    /** 查询列表 */
    getList() {
      this.loading = true;
      listRole(this.queryParams.pageNum,this.queryParams.pageSize).then(response => {
        this.RoleList = response.data.records;
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
		name: null,
		description: null,
		permission: null,
		department: null,
		portraitPath: null,
		status: null
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
      this.title = "添加角色";
    },
    /** 修改按钮操作 */
	handleUpdate(row) {
	  this.reset();
	  const id = row.id
	  getRole(id).then(response => {
	    this.form = response.data;
	    this.open = true;
	    this.title = "修改角色信息";
	  });
	},
    /** 提交按钮 */
	submitForm() {
	  this.$refs["form"].validate(valid => {
	    if (valid) {
	      if (this.form.id != null) {
	        updateRole(this.form.id,this.form).then(response => {
	          this.msgSuccess("修改成功");
	          this.open = false;
	          this.getList();
	        });
	      } else {
	        addRole(this.form).then(response => {
	          this.msgSuccess("新增成功");
	          this.open = false;
	          this.getList();
	        });
	      }
	    }
	  });
	},
	// 角色状态修改
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
			updateRole(id,this.form).then(response => {
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
	  this.$confirm('是否确认删除角色名为"' + row.name + '"的数据项?', "警告", {
	      confirmButtonText: "确定",
	      cancelButtonText: "取消",
	      type: "warning"
	    }).then(function() {
	      return delRole(id);
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
