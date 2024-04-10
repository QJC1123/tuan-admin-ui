<template>
  <div class="app-container" style="padding-left: 0px;height: 800px;">
	<div style="background-color: white;">
		<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" style="padding-top: 10px;padding-left: 10px;">
<el-form-item label="设备类型" prop="devType">
        <el-select v-model="queryParams.devType" placeholder="请选择类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备状态" prop="devState">
        <el-input
          v-model="queryParams.devState"
          placeholder="请输入状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="devNo" style="float: right;">
        <el-input
          v-model="queryParams.devNo"
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
			<el-table :data="deviceList1" @selection-change="handleSelectionChange" :header-cell-style="{background:'#ffffff'}">
			  <el-table-column type="selection" width="55" align="center" />
			  <el-table-column label="编号" align="center" prop="devNo" />
			  <el-table-column label="设备名称" align="center" prop="devName" />
			  <el-table-column label="设备类型" align="center" prop="devType" />
			  <el-table-column label="生产日期" align="center" prop="devDate" />
			  <el-table-column label="所在地点" align="center" prop="devPlace" />
			  <el-table-column label="检察人员" align="center" prop="devStaff" />
			  <el-table-column label="最近检查日期" align="center" prop="devTime" />
			  <el-table-column label="状态" align="center" prop="devState" />
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
import { listDevice, getDevice, delDevice, addDevice, updateDevice} from "@/api/basicinfo/device";

export default {
  name: "Device",
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
      deviceList:[],
	  deviceList1:[
		  {
			  devNo:'S12731-1F-01',
			  devName:'墙式消火栓',
			  devType:'消防设施',
			  devDate:'2020-1-23',
			  devPlace:'行政楼1楼',
			  devState:'正常',
			  devStaff:'赵湘林',
			  devTime:'2023-03-01',
		  },
		  {
			  devNo:'S12731-2F-01',
			  devName:'烟感报警器',
			  devType:'消防设施',
			  devDate:'2020-1-23',
			  devPlace:'行政楼2楼',
			  devState:'正常',
			  devStaff:'赵湘林',
			  devTime:'2023-03-01',
		  },
		  {
			  devNo:'S12731-GL-01',
			  devName:'灭火器',
			  devType:'消防设施',
			  devDate:'2020-8-7',
			  devPlace:'后勤楼1楼',
			  devState:'正常',
			  devStaff:'刘和创',
			  devTime:'2023-03-02',
		  },
		  {
			  devNo:'S12332-CT-01',
			  devName:'灭火器',
			  devType:'消防设施',
			  devDate:'2021-11-23',
			  devPlace:'餐厅1楼',
			  devState:'正常',
			  devStaff:'刘和创',
			  devTime:'2023-03-02',
		  },
		  {
			  devNo:'S12732-3F-01',
			  devName:'摄像头',
			  devType:'监控设施',
			  devDate:'2020-10-17',
			  devPlace:'行政楼3楼',
			  devState:'正常',
			  devStaff:'孙洪',
			  devTime:'2023-03-02',
		  },
		  {
			  devNo:'S12738-3F-01',
			  devName:'硬盘录像机',
			  devType:'监控设施',
			  devDate:'2020-1-25',
			  devPlace:'行政楼3楼',
			  devState:'正常',
			  devStaff:'孙洪',
			  devTime:'2023-03-05',
		  },
		  {
			  devNo:'S12432-3F-01',
			  devName:'摄像头',
			  devType:'监控设施',
			  devDate:'2020-10-17',
			  devPlace:'实验楼1楼',
			  devState:'正常',
			  devStaff:'刘超杰',
			  devTime:'2023-03-02',
		  },
		  {
			  devNo:'S12432-3F-01',
			  devName:'摄像头',
			  devType:'监控设施',
			  devDate:'2020-10-17',
			  devPlace:'实验楼1楼',
			  devState:'正常',
			  devStaff:'刘超杰',
			  devTime:'2023-03-02',
		  },
		  {
			  devNo:'S13432-1F-01',
			  devName:'乘客',
			  devType:'电梯设施',
			  devDate:'2010-8-17',
			  devPlace:'实验楼1楼',
			  devState:'正常',
			  devStaff:'李想',
			  devTime:'2023-03-02',
		  },
		  {
			  devNo:'S13432-1F-02',
			  devName:'货梯',
			  devType:'电梯设施',
			  devDate:'2010-10-10',
			  devPlace:'实验楼1楼',
			  devState:'正常',
			  devStaff:'李想',
			  devTime:'2023-03-02',
		  }
	
		  
		
		  
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
