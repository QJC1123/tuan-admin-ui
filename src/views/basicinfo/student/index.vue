<template>
	<div class="app-container" style="padding-left: 0px;height: 800px;">
		<div style="background-color: white;">
			<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
				label-width="68px" style="padding-top: 10px;">
				<el-form-item label="学号" prop="stuNo">
					<el-input v-model="queryParams.stuNo" placeholder="请输入学号" clearable
						@keyup.enter.native="handleQuery" />
				</el-form-item>
				<el-form-item label="姓名" prop="stuName">
					<el-input v-model="queryParams.stuName" placeholder="请输入姓名" clearable
						@keyup.enter.native="handleQuery" />
				</el-form-item>
				<el-form-item label="班级" prop="stuClass">
					<el-input v-model="queryParams.stuClass" placeholder="请输入班级" clearable
						@keyup.enter.native="handleQuery" />
				</el-form-item>

				<el-form-item>
					<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
					<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
				</el-form-item>
			</el-form>
		</div>


		<el-row :gutter="10" style="padding-top: 30px;">
			<el-col :span="1.5">
				<el-button type="success" plain icon="el-icon-plus" size="mini">导入</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
					@click="handleDelete">删除</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="warning" plain icon="el-icon-download" size="mini">导出</el-button>
			</el-col>

			<div>
				<right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
			</div>
		</el-row>

		<el-row style="padding-top: 10px;">
			<div style="padding-top: 10px;background-color: white;">
				<el-table :data="studentList1" @selection-change="handleSelectionChange"
					:header-cell-style="{background:'#ffffff'}">
					<el-table-column type="selection" width="55" align="center" />
					<el-table-column label="学号" align="center" prop="stuNo" width="130px" />
					<el-table-column label="姓名" align="center" prop="stuName" />
					<el-table-column label="性别" align="center" prop="stuSex" width="80px" />
					<el-table-column label="出生年月" align="center" prop="stuDate" />
			  <el-table-column label="学院" align="center" prop="stuDept" />
					<el-table-column label="专业" align="center" prop="stuDe" width="150px" />
					<el-table-column label="班级" align="center" prop="stuClass" />
					<el-table-column label="入学年月" align="center" prop="joinDate" />
					<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
						<template slot-scope="scope">
							<el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
								style="color: #5bcac7;">修改</el-button>
							<el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
								style="color: #5bcac7;">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-row>

		<div style="background-color: white;height: 8px;">
			<pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
				@pagination="getList" />
		</div>



	</div>
</template>

<script>
	import {
		listStudent,
		getStudent,
		delStudent,
		addStudent,
		updateStudent
	} from "@/api/basicinfo/student";

	export default {
		name: "Student",
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
				// 学生信息表格数据
				studentList: [],
				studentList1: [{
						stuNo: "2020332218701",
			 		stuName: "马一鸣",
						stuSex: "男",
						stuDate: "2001-8",
						stuDept: "信息学院",
						stuDe: "计算机科学与技术",
						stuClass: "计算机1班",
						joinDate: "2020-9",
					},
					{
						stuNo: "2020332218702",
						stuName: "高英",
						stuSex: "女",
						stuDate: "2001-11",
						stuDept: "信息学院",
						stuDe: "计算机科学与技术",
						stuClass: "计算机1班",
						joinDate: "2020-9",
					},
					{
						stuNo: "2020332218703",
						stuName: "郭建华",
						stuSex: "男",
						stuDate: "2001-12",
						stuDept: "信息学院",
			 		stuDe: "计算机科学与技术",
						stuClass: "计算机1班",
						joinDate: "2020-9",
					},
					{
						stuNo: "2020332218704",
						stuName: "张厚英",
						stuSex: "男",
						stuDate: "2002-5",
						stuDept: "信息学院",
						stuDe: "计算机科学与技术",
						stuClass: "计算机1班",
						joinDate: "2020-9",
					},
		 		{
						stuNo: "2020332218705",
						stuName: "周广仁",
						stuSex: "男",
			 		stuDate: "2002-3",
						stuDept: "信息学院",
						stuDe: "计算机科学与技术",
						stuClass: "计算机2班",
						joinDate: "2020-9",
					},
					{
						stuNo: "2020332218706",
						stuName: "张琳",
						stuSex: "男",
						stuDate: "2001-10",
						stuDept: "信息学院",
						stuDe: "计算机科学与技术",
						stuClass: "计算机1班",
						joinDate: "2020-9",
					},
					{
						stuNo: "2020332218707",
						stuName: "马钢",
			 		stuSex: "男",
						stuDate: "2001-6",
						stuDept: "信息学院",
						stuDe: "计算机科学与技术",
						stuClass: "计算机1班",
						joinDate: "2020-9",
					},
					{
						stuNo: "2020332218708",
						stuName: "田清",
						stuSex: "女",
						stuDate: "2001-1",
						stuDept: "信息学院",
						stuDe: "计算机科学与技术",
						stuClass: "计算机1班",
						joinDate: "2020-9",
					},
					{
						stuNo: "2020332218709",
						stuName: "白井权",
						stuSex: "男",
						stuDate: "2001-12",
						stuDept: "信息学院",
						stuDe: "计算机科学与技术",
						stuClass: "计算机1班",
						joinDate: "2020-9",
					},
					{
						stuNo: "2020332218710",
						stuName: "张一峰",
						stuSex: "男",
						stuDate: "2001-2",
						stuDept: "信息学院",
						stuDe: "计算机科学与技术",
						stuClass: "计算机1班",
						joinDate: "2020-9",
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
				rules: {}
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
			//   this.queryParams.pageNum = 1");
				// this.handleQuery();
			},
			// 多选框选中数据
			handleSelectionChange(selection) {
				this.ids = selection.map(item => item.id)
				this.single = selection.length !== 1
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
		
	};
</script>
