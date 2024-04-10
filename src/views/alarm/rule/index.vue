<template>
  <div class="app-container" style="height: 800px;">
    <el-row :gutter="10" class="mb8" style="padding-bottom: 20px;">
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
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
	  		  <router-link :to="{ name: 'AlarmTemplateCreate' }" >
	  			  <el-button
	  			    type="warning"
	  			    plain
	  			    icon="el-icon-plus"
	  			    size="mini"
	  			  >新建告警配置</el-button>
	  		  </router-link>
	  </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

	<!-- <el-table v-loading="loading" :data="ruleList" @selection-change="handleSelectionChange"> -->
   
	<el-row>
		<el-table :data="ruleList1" @selection-change="handleSelectionChange"  :header-cell-style="{'text-align':'center','background-color':'white'}">
	
		<el-table-column type="selection" width="55" align="center" />
		<el-table-column label="规则状态" align="center" prop="alruleStatus" width="100" >
		  <template slot-scope="scope">
			  <div style="">
				  <status-indicator  pulse v-if="scope.row.alruleStatus == '0' " ></status-indicator>
				  <status-indicator positive pulse v-if="scope.row.alruleStatus == '1'" ></status-indicator>
				  <span style="padding-left: 10px;">
					  {{chktatus(scope.row.alruleStatus)}}
				  </span>
			  </div>
		  </template>
		</el-table-column>
		<el-table-column label="规则名称" align="center" prop="alruleName" width="90"  />
		<el-table-column label="告警级别" prop="alruleLevel" align="center" >
		  <template slot-scope="scope">
			{{ chklevel(scope.row.alruleLevel) }}
		  </template>
		 </el-table-column>
		<el-table-column label="告警类型" prop="alruleType" align="center" width="120">
		  <template slot-scope="scope">
			{{ chktype(scope.row.alruleType) }}
		  </template>
		 </el-table-column>
		 <el-table-column label="规则描述" align="left" width="350" prop="alruledec"  show-overflow-tooltip="true">
		 </el-table-column>
		 <el-table-column label="通知组/人" prop="alruleGroupId" align="left" width="150"  show-overflow-tooltip="true">
		  </el-table-column>
		  
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="200px" >
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            
			style="color: #5bcac7;"
          >配置</el-button>
		  <!-- @click="handleUpdate(scope.row)" -->
		  <el-button
		    type="text"
			v-if="scope.row.alruleStatus==1"
			icon="el-icon-s-tools"
			@click="handleStatusChange(scope.row)"
			style="color: #5bcac7;"
		  >停用</el-button>
		  <el-button
		    type="text"
			v-if="scope.row.alruleStatus==0"
			@click="handleStatusChange(scope.row)"
			style="color: #5bcac7;"
		  >启动</el-button>
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
	</el-row>	
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改告警通知配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="告警级别" prop="alruleLevel">
          <el-input v-model="form.alruleLevel" placeholder="请输入告警级别" />
        </el-form-item>
        <el-form-item label="告警名称" prop="alruleName">
          <el-input v-model="form.alruleName" placeholder="请输入告警名称" />
        </el-form-item>
        <el-form-item label="告警类型" prop="alruleType">
          <el-select v-model="form.alruleType" placeholder="请选择告警类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="间隔时间" prop="alruleTime">
          <el-input v-model="form.alruleTime" placeholder="请输入间隔时间" />
        </el-form-item>
        <el-form-item label="告警通知组" prop="alruleGroupId">
          <el-input v-model="form.alruleGroupId" placeholder="请输入告警通知组" />
        </el-form-item>
        <el-form-item label="告警通知人" prop="alruleReceiver">
          <el-input v-model="form.alruleReceiver" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="告警升级" prop="alruleUpgrade">
          <el-input v-model="form.alruleUpgrade" placeholder="请输入告警升级" />
        </el-form-item>
        <el-form-item label="告警升级通知组" prop="alruleUpgroupId">
          <el-input v-model="form.alruleUpgroupId" placeholder="请输入告警升级通知组" />
        </el-form-item>
        <el-form-item label="告警升级通知人" prop="alruleUpreceive">
          <el-input v-model="form.alruleUpreceive" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="通知模板id" prop="alruleTemplateid">
          <el-input v-model="form.alruleTemplateid" placeholder="请输入通知模板id" />
        </el-form-item>
        <el-form-item label="使用状态">
          <el-radio-group v-model="form.alruleStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
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
// import { listRule, getRule, delRule, addRule, updateRule, exportRule } from "@/api/alarm/rule";
import { StatusIndicator } from 'vue-status-indicator';


export default {
  name: "Rule",
  components: {
    StatusIndicator
  },
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
      // 告警通知配置表格数据
      ruleList: [],
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
			  alruledec:"事件计数在3分钟之内，计数大于10,发送告警通知,每隔5分钟发送一次,直到任务被认领,若10分钟后仍无人认领,发送告警通知到管理员",
			  alruleGroupId: "安保部门,在校学生,学生家长,教学部门",
		  },
		  {
		  			  alruleName: "特殊区域人员闯入",
		  			  alruleLevel: 1,
		  			  alruleStatus: 1,
		  			  alruleType: 1,
		  			  alruletime1:"1分钟",
		  			  alrulecount1:"1",
		  			  alruletime2:"5分钟",
		  			  alruletime3:"30分钟",
		  			  alruledec:"在时间21:00以后，人员闯入区域，发送告警通知,每隔5分钟发送一次,直到任务被认领,若30分钟后仍无人认领,发送告警通知到管理员",
		  			  alruleGroupId: "安保部门",
		  			  
		  },
		  {
		  			  alruleName: "车辆违停",
		  			  alruleLevel: 2,
		  			  alruleStatus: 1,
		  			  alruleType: 3,
		  			  alruletime1:"1分钟",
		  			  alrulecount1:"1",
		  			  alruletime2:"5分钟",
		  			  alruletime3:"30分钟",
		  			  alruledec:"车辆停放位置不符合标注区域，发送告警通知,每隔15分钟发送一次,直到任务被认领,若30分钟后仍无人认领,发送告警通知到管理员",
		  			  alruleGroupId: "安保部门",
		  			  
		  },
		  {
		  			  alruleName: "抽烟",
		  			  alruleLevel: 2,
		  			  alruleStatus: 1,
		  			  alruleType: 1,
		  			  alruletime1:"1分钟",
		  			  alrulecount1:"1",
		  			  alruletime2:"5分钟",
		  			  alruletime3:"30分钟",
		  			  alruledec:"事件计数在10分钟之内，计数大于20,发送告警通知,每隔15分钟发送一次,直到任务被认领,若30分钟后仍无人认领,发送告警通知到管理员",
		  			  alruleGroupId: "安保部门",
		  			  
		  },
		  {
		  			  alruleName: "地面积水",
		  			  alruleLevel: 3,
		  			  alruleStatus: 1,
		  			  alruleType: 3,
		  			  alruletime1:"1分钟",
		  			  alrulecount1:"1",
		  			  alruletime2:"5分钟",
		  			  alruletime3:"30分钟",
		  			  alruledec:"事件计数在50分钟之内，计数大于40,发送告警通知,每隔30分钟发送一次,直到任务被认领,若60分钟后仍无人认领,发送告警通知到管理员",
		  			  alruleGroupId: "安保部门",
		  			  
		  },
		  {
		  			  alruleName: "墙面渗水",
		  			  alruleLevel: 3,
		  			  alruleStatus: 1,
		  			  alruleType: 4,
		  			  alruletime1:"1分钟",
		  			  alrulecount1:"1",
		  			  alruletime2:"5分钟",
		  			  alruletime3:"30分钟",
		  			  alruledec:"事件计数在50分钟之内，计数大于40,发送告警通知,每隔30分钟发送一次,直到任务被认领,若60分钟后仍无人认领,发送告警通知到管理员",
		  			  alruleGroupId: "设备后勤部",
		  			  
		  },
		  {
		  			  alruleName: "危险区域滞留",
		  			  alruleLevel: 1,
		  			  alruleStatus: 1,
		  			  alruleType: 2,
		  			  alruletime1:"1分钟",
		  			  alrulecount1:"1",
		  			  alruletime2:"5分钟",
		  			  alruletime3:"30分钟",
		  			  alruledec:"危险区域滞留时间超过5秒，发送告警通知,每隔5分钟发送一次,直到任务被认领,若15分钟后仍无人认领,发送告警通知到管理员",
		  			  alruleGroupId: "安保部门",
		  			  
		  },
		  {
		  			  alruleName: "烟雾明火",
		  			  alruleLevel: 1,
		  			  alruleStatus: 0,
		  			  alruleType: 2,
		  			  alruletime1:"1分钟",
		  			  alrulecount1:"1",
		  			  alruletime2:"5分钟",
		  			  alruletime3:"30分钟",
		  			  alruledec:"事件计数在1分钟之内，计数大于1,发送告警通知,每隔5分钟发送一次,直到任务被认领,若30分钟后仍无人认领,发送告警通知到管理员",
		  			  alruleGroupId: "安保部门,在校学生,学生家长,教学部门",
		  			  
		  },
		  {
		  			  alruleName: "烟雾明火",
		  			  alruleLevel: 1,
		  			  alruleStatus: 0,
		  			  alruleType: 2,
		  			  alruletime1:"1分钟",
		  			  alrulecount1:"1",
		  			  alruletime2:"5分钟",
		  			  alruletime3:"30分钟",
		  			  alruledec:"事件计数在1分钟之内，计数大于1,发送告警通知,每隔5分钟发送一次,直到任务被认领,若30分钟后仍无人认领,发送告警通知到管理员",
		  			  alruleGroupId: "安保部门,在校学生,学生家长,教学部门",
		  			  
		  },
		  {
		  			  alruleName: "烟雾明火",
		  			  alruleLevel: 1,
		  			  alruleStatus: 0,
		  			  alruleType: 2,
		  			  alruletime1:"1分钟",
		  			  alrulecount1:"1",
		  			  alruletime2:"5分钟",
		  			  alruletime3:"30分钟",
		  			  alruledec:"事件计数在1分钟之内，计数大于1,发送告警通知,每隔5分钟发送一次,直到任务被认领,若30分钟后仍无人认领,发送告警通知到管理员",
		  			  alruleGroupId: "安保部门,在校学生,学生家长,教学部门",
		  			  
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
        alruleStatus: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
	  levelist: [
	   {
	           value: '1',
	           label: '严重'
	       },
	       {
	           value: '2',
	           label: '警告'
	       },
	       {
	           value: '3',
	           label: '提醒'
	       },
	   ],  
	    altypelist:[
	  			{
	  				value: '1',
	  				label: '消防安全'
	  			},
	  			{
	  				value: '2',
	  				label: '危险行为'
	  			},
	  			{
	  				value: '3',
	  				label: '设施故障'
	  			},
	  		   {
	  			   value: '4',
	  			   label: '后厨安全'
	  		   },
	  		   {
	  			   value: '5',
	  			   label: '车辆违停'
	  		   },
	  		    {
	  				value: '6',
	  				label: '考勤异常'
	  		    },
	  			{
	  				value: '7',
	  				label: '陌生人告警'
	  			},
	  			  
	  		],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询告警通知配置列表 */
    getList() {
		this.ruleList = ruleList1 
    //   this.loading = true;
    //   listRule(this.queryParams).then(response => {
		  // console.log(this.queryParams)
    //     this.ruleList = response.rows;
    //     this.total = response.total;
    //     this.loading = false;
    //   });
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
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加告警通知配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
	  this.open = true;
	  this.title = "修改告警通知配置";
      // getRule(id).then(response => {
      //   this.form = response.data;
      //   this.open = true;
      //   this.title = "修改告警通知配置";
      // });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
			  
			this.msgSuccess("修改成功");
			this.open = false;
			this.getList();
            // updateRule(this.form).then(response => {
            //   this.msgSuccess("修改成功");
            //   this.open = false;
            //   this.getList();
            // });
          } else {
			
			this.msgSuccess("新增成功");
			this.open = false;
			this.getList();
			
            // addRule(this.form).then(response => {
            //   this.msgSuccess("新增成功");
            //   this.open = false;
            //   this.getList();
            // });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除告警通知配置编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          // return delRule(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
	// 状态修改
	handleStatusChange(row) {
	  let text = row.alruleStatus === "0" ? "启用" : "停用";
	  const ids = row.id || this.ids;
	  this.$confirm('是否确认'+text+'告警通知配置编号为"' + ids + '"的数据项?', "警告", {
	      confirmButtonText: "确定",
	      cancelButtonText: "取消",
	      type: "warning"
	    }).then(function() {
	      // return delRule(ids);
	    }).then(() => {
	      this.getList();
	      this.msgSuccess(text+"成功");
	    });
	},


	// 告警类型
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
	
	getGroupname(data){
		if(data===105)
		{
			return '消防部门'
		}
		else if(data === 1){
			return '图安校园'
		}
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
	
	
	
	
	
	
	
  }
};
</script>

<style>
	.radio{
		background-color: white;
	}
	


   ::v-deep .el-radio__label{
      color: #aaffff;
      margin-right:10px    
      }

   ::v-deep .el-radio__input.is-checked + .el-radio__label {
       color: #2E2E2E !important;
   }

   ::v-deep .el-radio__input.is-checked .el-radio__inner {
       background: #585858 !important;
       border-color: #585858 !important;
   }

</style>

