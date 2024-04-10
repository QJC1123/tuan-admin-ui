<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="类型" prop="riskType">
        <el-select v-model="queryParams.riskType" placeholder="请选择类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="riskLevel">
        <el-input
          v-model="queryParams.riskLevel"
          placeholder="请输入等级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上报时间" prop="riskReporttime">
        <el-date-picker clearable size="small"
          v-model="queryParams.riskReporttime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择上报时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="区域" prop="riskArea">
        <el-input
          v-model="queryParams.riskArea"
          placeholder="请输入区域"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理时间" prop="riskHandletime">
        <el-date-picker clearable size="small"
          v-model="queryParams.riskHandletime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择处理时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处理进展" prop="riskState">
        <el-input
          v-model="queryParams.riskState"
          placeholder="请输入处理进展"
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
          v-hasPermi="['tuan-task:event:add']"
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
          v-hasPermi="['tuan-task:event:edit']"
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
          v-hasPermi="['tuan-task:event:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tuan-task:event:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="eventList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="类型" align="center" prop="riskType" />
      <el-table-column label="等级" align="center" prop="riskLevel" />
      <el-table-column label="上报时间" align="center" prop="riskReporttime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.riskReporttime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域" align="center" prop="riskArea" />
      <el-table-column label="上报详细信息" align="center" prop="riskReportcontent" />
      <el-table-column label="上报图片地址" align="center" prop="riskReportphoto" />
      <el-table-column label="上报人姓名" align="center" prop="riskReportman" />
      <el-table-column label="直接处理人姓名" align="center" prop="riskHandleman" />
      <el-table-column label="处理时间" align="center" prop="riskHandletime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.riskHandletime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理图片地址" align="center" prop="riskHandlephoto" />
      <el-table-column label="升级处理人姓名" align="center" prop="riskRisehandleman" />
      <el-table-column label="处理进展" align="center" prop="riskState" />
      <el-table-column label="处理结果" align="center" prop="riskHandlecontent" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tuan-task:event:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tuan-task:event:remove']"
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

    <!-- 添加或修改隐患排查对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型" prop="riskType">
          <el-select v-model="form.riskType" placeholder="请选择类型">
            <el-option label="请选择" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="级别" prop="riskLevel">
			<el-select v-model="form.riskLevel" placeholder="请选择级别">
			  <el-option label="请选择" value="" />
			</el-select>
        </el-form-item>
        <el-form-item label="区域" prop="riskArea">
			<el-select v-model="form.riskArea" placeholder="请输入区域">
			  <el-option label="请选择" value="" />
			</el-select>
        </el-form-item>
        <el-form-item label="隐患描述">
          <editor v-model="form.riskReportcontent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="上报人" prop="riskReportman">
          <el-input v-model="form.riskReportman" type="textarea" placeholder="请输入内容" />
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
import { listEvent, getEvent, delEvent, addEvent, updateEvent, exportEvent } from "@/api/task/event";
import Editor from '@/components/Editor';

export default {
  name: "Event",
  components: {
    Editor,
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
      // 隐患排查表格数据
      eventList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        riskType: null,
        riskLevel: null,
        riskReporttime: null,
        riskArea: null,
        riskReportcontent: null,
        riskReportphoto: null,
        riskReportman: null,
        riskHandleman: null,
        riskHandletime: null,
        riskHandlephoto: null,
        riskRisehandleman: null,
        riskState: null,
        riskHandlecontent: null
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
    /** 查询隐患排查列表 */
    getList() {
      this.loading = true;
      listEvent(this.queryParams).then(response => {
        this.eventList = response.rows;
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
        riskType: null,
        riskLevel: null,
        riskReporttime: null,
        riskArea: null,
        riskReportcontent: null,
        riskReportphoto: null,
        riskReportman: null,
        riskHandleman: null,
        riskHandletime: null,
        riskHandlephoto: null,
        riskRisehandleman: null,
        riskState: null,
        riskHandlecontent: null
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
      this.title = "添加隐患排查";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getEvent(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改隐患排查";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateEvent(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEvent(this.form).then(response => {
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
      this.$confirm('是否确认删除隐患排查编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delEvent(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有隐患排查数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportEvent(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
