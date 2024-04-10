<template>
  <div class="app-container" style="padding-left: 0px;height: 800px;">
	<div style="background-color: white;">
		<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" style="padding-top: 10px;padding-left: 10px;">
			<el-form-item label="车牌号" prop="carNo">
			  <el-input
			    v-model="queryParams.carNo"
			    placeholder="请输入车牌号"
			    clearable
			    size="small"
			    @keyup.enter.native="handleQuery"
			  />
			</el-form-item>
			<el-form-item label="停车位" prop="carStop">
			  <el-input
			    v-model="queryParams.carStop"
			    placeholder="请输入停车位"
			    clearable
			    size="small"
			    @keyup.enter.native="handleQuery"
			  />
			</el-form-item>
			<el-form-item label="状态" prop="carState">
			  <el-input
			    v-model="queryParams.carState"
			    placeholder="请输入停车状态"
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
		  >导入</el-button>
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
		<el-col :span="1.5">
		  <el-button
		    type="warning"
		    plain
		    icon="el-icon-download"
		    size="mini"
		  >导出</el-button></el-col>
		  
		<div >
			<right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
		</div>
	</el-row>
	
	<el-row style="padding-top: 10px;">
		<div style="background-color: white;">
			<el-table :data="carList1" @selection-change="handleSelectionChange" :header-cell-style="{background:'#ffffff'}">
			  <el-table-column type="selection" width="55" align="center" />
			  <el-table-column label="车牌号" align="center" prop="carNum" width="140px"  />
			  <el-table-column label="车辆类型" align="center" prop="carType" width="100px"  />
			  <el-table-column label="停车位" align="center" prop="carStop" width="140px"/>
			  <el-table-column label="进场时间" align="center" prop="carjtime" width="170px" />
			  <el-table-column label="停留时间" align="center" prop="carltime" />
			  <el-table-column label="状态" align="center" prop="carState" width="80px"  />
			  <el-table-column label="车主姓名" align="center" prop="carName" width="80px"  />
			  <el-table-column label="车主联系电话" align="center" prop="carPhone" width="140px"  />
			  <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="140px">
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
	</el-row>
	
	<div style="background-color: white;height: 8px;">
		<pagination
		  :total="total"
		  :page.sync="queryParams.pageNum"
		  :limit.sync="queryParams.pageSize"
		  @pagination="getList"
		/>
	</div>
	

  </div>
</template>

<script>


export default {
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
      total: 10,
      // 表格数据
      carList:[],
	  carList1:[
		  {
			carNum:"川AW898J",
			carType:"员工用车",
			carStop:"停车场-西-B17",
			carjtime:"2023-03-12 11:23:02",
			carltime:"10h15min",
			carState:"正常",
			carName:"陈舒",
			carPhone:"17845592347",
		  },
		  {
			  carNum:"川AW827B",
			  carType:"员工用车",
			  carStop:"停车场-西-B11",
			  carjtime:"2023-03-11 14:23:02",
			  carltime:"6h35min",
			  carState:"正常",
			  carName:"刘超杰",
			  carPhone:"17845527347",
		  },
		  {
			  carNum:"浙CW9178",
			  carType:"校方用车",
			  carStop:"停车场-东-A11",
			  carjtime:"2023-03-10 18:03:22",
			  carltime:"3h10min",
			  carState:"正常",
			  carName:"赵乡林",
			  carPhone:"13845527349",
		  },
		  {
			  carNum:"浙AW9274",
			  carType:"校方用车",
			  carStop:"停车场-东-C01",
			  carjtime:"2023-03-10 17:03:22",
			  carltime:"11h10min",
			  carState:"正常",
			  carName:"赵乡林",
			  carPhone:"13845527349",
		  },
		  {
			  carNum:"浙AW8741",
			  carType:"校方用车",
			  carStop:"停车场-东-C02",
			  carjtime:"2023-03-10 17:00:22",
			  carltime:"12h03min",
			  carState:"正常",
			  carName:"赵乡林",
			  carPhone:"13845527349",
		  },
		  {
			  carNum:"浙JW1841",
			  carType:"外来车辆",
			  carStop:"停车场-西-C02",
			  carjtime:"2023-03-09 11:00:22",
			  carltime:"3h03min",
			  carState:"正常",
			  carName:"王琳凯",
			  carPhone:"17845527320",
		  },
		  {
			  carNum:"赣AW1841",
			  carType:"外来车辆",
			  carStop:"停车场-西-D01",
			  carjtime:"2023-03-08 12:00:22",
			  carltime:"3h03min",
			  carState:"正常",
			  carName:"李想",
			  carPhone:"13645527326",
		  },
		  {
		  			  carNum:"沪CW1841",
		  			  carType:"外来车辆",
		  			  carStop:"停车场-东-B16",
		  			  carjtime:"2023-03-08 12:00:22",
		  			  carltime:"2h17min",
		  			  carState:"正常",
		  			  carName:"吴磊",
		  			  carPhone:"13845527225",
		  },
		  {
		  			  carNum:"沪AW1841",
		  			  carType:"外来车辆",
		  			  carStop:"停车场-东-A29",
		  			  carjtime:"2023-03-07 09:00:21",
		  			  carltime:"3h43min",
		  			  carState:"正常",
		  			  carName:"吴晓龙",
		  			  carPhone:"13845527217",
		  },
		  {
		  			  carNum:"甘AW1841",
		  			  carType:"外来车辆",
		  			  carStop:"停车场-西-D19",
		  			  carjtime:"2023-03-06 09:20:22",
		  			  carltime:"1h12min",
		  			  carState:"正常",
		  			  carName:"郑文宇",
		  			  carPhone:"17845527281",
		  },
		  
	  ],
	  
	  
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        stuNo: null,
        stuName: null,
        stuSex: null,
        stuAge: null,
        stuClass: null,
        stuPhoto: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询学生信息列表 */
    // getList() {
    //   this.loading = true;
    //   listStudent(this.queryParams).then(response => {
    //     this.studentList = response.rows;
    //     this.total = response.total;
    //     this.loading = false;
    //   });
    // },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        stuNo: null,
        stuName: null,
        stuSex: null,
        stuAge: null,
        stuClass: null,
        stuPhoto: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    // handleQuery() {
    //   this.queryParams.pageNum = 1;
    //   this.getList();
    // },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      // this.handleQuery();
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
      this.title = "添加学生信息";
    },
    /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset();
    //   const id = row.id || this.ids
    //   getStudent(id).then(response => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改学生信息";
    //   });
    // },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
			this.$modal.msgSuccess("修改成功");
          // if (this.form.id != null) {
          //   updateStudent(this.form).then(response => {
          //     this.$modal.msgSuccess("修改成功");
          //     this.open = false;
          //     this.getList();
          //   });
          // } else {
          //   addStudent(this.form).then(response => {
          //     this.$modal.msgSuccess("新增成功");
          //     this.open = false;
          //     this.getList();
          //   });
          // }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除学生信息编号为"' + ids + '"的数据项？').then(function() {
        // return delStudent(ids);
      }).then(() => {
        // this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
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
