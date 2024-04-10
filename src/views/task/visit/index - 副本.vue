<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="姓名" prop="visName">
        <el-input
          v-model="queryParams.visName"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预约时间" prop="visTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.visTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择预约时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="visState">
        <el-input
          v-model="queryParams.visState"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['task:visit:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['task:visit:edit']"
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
          v-hasPermi="['task:visit:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['task:visit:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="visitList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="姓名" align="center" prop="visName" />
      <el-table-column label="预约时间" align="center" prop="visTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.visTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请理由" align="center" prop="visReason" />
      
      
			<el-table-column label="审核状态" prop="visState" align="center">
					  <template slot-scope="scope">
						{{ chkState(scope.row.visState) }}
					  </template>
			 </el-table-column>
      <!-- <el-table-column label="审核意见" align="center" prop="visComment" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['task:visit:edit']"
          >修改</el-button> -->
		  
		  <el-button
		    size="mini"
		    type="text"
		    icon="el-icon-edit"
		  	:disabled="scope.row.visState === 1 || scope.row.visState === 2"
		    @click="handleUpdate(scope.row)"
		    v-hasPermi="['person:visitrecord:edit']"
		  >审核</el-button>
		  
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['task:visit:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
	
	<!-- <el-dialog title="访客审核" :visible.sync="showChkStateDialog">
		<el-form>
		  <el-form-item>
			<el-radio-group v-model="check.visState">
			  <el-radio :label="1">通过</el-radio>
			  <el-radio :label="2">拒绝</el-radio>
			</el-radio-group>
		  </el-form-item>
		  
		  <el-form-item prop="visComment">
			<el-input
			  type="textarea"
			  v-model="prom.visComment"
			  style="width:400px"
			  placeholder="请输入审核意见"
			></el-input>
			
		  </el-form-item>
			
		</el-form>
		  <div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
		  </div>
	</el-dialog> -->

    <!-- 添加或修改访客记录对话框 -->
	
	
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="visName">
          <el-input v-model="form.visName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="预约时间" prop="visTime">
          <el-date-picker clearable size="small"
            v-model="form.visTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择预约时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请理由" prop="visReason">
          <el-input v-model="form.visReason" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <!-- <el-form-item label="照片" prop="visPhoto">
          <el-input v-model="form.visPhoto" placeholder="请输入照片" />
        </el-form-item> -->
       <!-- <el-form-item label="状态" prop="visState">
          <el-input v-model="form.visState" placeholder="请输入状态" />
        </el-form-item> -->
        <el-form-item label="审核意见" prop="visComment">
          <el-input v-model="form.visComment" type="textarea" placeholder="请输入内容" />
        </el-form-item>
		<!-- <el-form-item>
			<el-radio-group v-model="check.visState">
			  <el-radio :label="1">通过</el-radio>
			  <el-radio :label="2">拒绝</el-radio>
			</el-radio-group>
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
import { listVisit, getVisit, delVisit, addVisit, updateVisit, exportVisit } from "@/api/task/visit";

export default {
  name: "Visit",
  components: {
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
      // 访客记录表格数据
      visitList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
	  showChkStateDialog:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        visName: null,
        visTime: null,
        visReason: null,
        visPhoto: null,
        visState: null,
        visComment: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
	  // 审核状态
	  chkState(data) {
	    if (data === 0) {
	  	return '待审核'
	    } else if (data === 1) {
	  	return '已审核'
	    } else {
	  	return '已拒绝'
	    }
	  },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询访客记录列表 */
    getList() {
      this.loading = true;
      listVisit(this.queryParams).then(response => {
        this.visitList = response.rows;
        this.total = response.total;
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
        visName: null,
        visTime: null,
        visReason: null,
        visPhoto: null,
        visState: null,
        visComment: null
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
      this.title = "添加访客记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getVisit(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "审核访客申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateVisit(this.form).then(response => {
              this.msgSuccess("修改成功");
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
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除访客记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delVisit(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有访客记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportVisit(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
