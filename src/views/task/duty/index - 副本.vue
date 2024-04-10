<template>
  <div style="padding-top: 30px;padding-right: 20px;padding-left: 30px;">
	  <div >
		<el-row :gutter="20" style="padding-bottom: 30px;">
			<el-col :span="8">
				<el-row>
					<div style="height: 90px;background-color: white;">
						<el-row >
							<div style="padding-left: 40px;display: flex;flex-direction: row;">
								<div style="padding-top: 30px;">
									<span style="font-weight: 500;font-size: 16px;color:#8C939D;">迟到人数：</span>
								</div>
								<div style="padding-top: 10px;">
									<span style="font-weight: 650;font-size: 40px;color:#5ba8fd;">12</span>
								</div>
							</div>
						</el-row>
					</div>
				</el-row>
			</el-col>
			<el-col :span="8">
				<el-row>
					<div style="height: 90px;background-color: white;">
						<el-row >
							<div style="padding-left: 40px;display: flex;flex-direction: row;">
								<div style="padding-top: 30px;">
									<span style="font-weight: 500;font-size: 16px;color:#8C939D;">缺岗人数：</span>
								</div>
								<div style="padding-top: 10px;">
									<span style="font-weight: 650;font-size: 40px;color:#5ba8fd;">8</span>
								</div>
							</div>
						</el-row>
					</div>
				</el-row>
			</el-col>
			<el-col :span="8">
				<el-row>
					<div style="height: 90px;background-color: white;">
						<el-row >
							<div style="padding-left: 40px;display: flex;flex-direction: row;">
								<div style="padding-top: 30px;">
									<span style="font-weight: 500;font-size: 16px;color:#8C939D;">异常总人数：</span>
								</div>
								<div style="padding-top: 10px;">
									<span style="font-weight: 650;font-size: 40px;color:#5ba8fd;">20</span>
								</div>
							</div>
						</el-row>
					</div>
				</el-row>
			</el-col>
		</el-row>
		<el-row>
			<div>
				<el-form :inline="true"  label-width="68px" style="padding-top: 20px;padding-bottom: 10px;padding-left: 40px;zoom:0.93;padding-right: 60px;background-color: white;">
					<el-row>
						<el-form-item prop="alarmName" style="zoom: 0.9;">
							<div style="font-weight: 550;">
								<span class="span1" style="font-size: 17px;">员工姓名</span>
								  <el-input
								    v-model="tableData.name"
								    placeholder="请输入值班人员姓名"
								    clearable
								  style="width:300px;padding-left: 30px;" 
								  />
								  <el-button style="background-color: #69c5b7;color: white;" >搜索</el-button>
							</div>
						</el-form-item>
					</el-row>
					<el-row>
						<el-col span="12">
							<el-form-item prop="status"style="zoom:0.9">
								<div style="font-weight: 550;">
									<span style="font-size: 17px;">考勤状态</span>
									<el-radio-group  style="width: 500px;">
									    <el-radio-button
									    	 v-for="status in statuslist"
									    	:key="status.value"
									    	:label="status.value"
									    	style="padding-left: 30px;zoom:1."
									    	>{{status.label}}
									    </el-radio-button>
									</el-radio-group>
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					
				</el-form>
			</div>
		</el-row>
		<div >
			<el-table
			  :data="tableData"
			  height="100%"
			  style="padding-top: 20px;background-color: #f5f9fa;padding-bottom: 30px;"
			  :header-cell-style="{background:'#ffffff'}"
			>
			<el-table-column  label="" align="center" type="expand">
			  <template slot-scope="props">
			    <!-- 展开内容表 -->
			    <el-table
			      :data="props.row.childList"
			      row-key="subid"
				  style="zoom:0.96"
			    >
				  <el-table-column prop="subid" label="编号" align="center"/>
			      <el-table-column prop="longitude" label="定位经度"  align="center"/>
			      <el-table-column prop="latitude" label="定位纬度"  align="center"/>
			      <el-table-column prop="checkInTime" label="打卡时间" align="center" />
			      <el-table-column prop="status" label="打卡状态"  align="center">
					  <template slot-scope="scope">
						  <div style="">
							  <status-indicator intermediary pulse v-if="scope.row.status == '1'" ></status-indicator>
							  <status-indicator positive pulse v-if="scope.row.status == '0'" ></status-indicator>
							  <status-indicator negative pulse v-if="scope.row.status == '2'" ></status-indicator>
							  <span style="padding-left: 10px;" v-if="scope.row.status == '1'">迟到</span>
							  <span style="padding-left: 10px;" v-if="scope.row.status == '0'">正常</span>
							  <span style="padding-left: 10px;" v-if="scope.row.status == '2'">缺岗</span>
						  </div>
					  </template>
				  </el-table-column>
				  
				  
				  
			    </el-table>
			  </template>
			</el-table-column>
			  <el-table-column label="工号" prop="stunum" align="center"></el-table-column>
			  <el-table-column label="姓名" prop="name" align="center"width="90px"></el-table-column>
				<el-table-column label="性别" prop="sex" align="center" width="80px"></el-table-column>
			  <el-table-column label="部门" prop="dorm" align="center"></el-table-column>
				<el-table-column label="值班时间" prop="class" align="center"></el-table-column>
				<el-table-column label="联系电话" prop="phone" align="center"></el-table-column>
			  <el-table-column label="考勤异常次数" prop="alarm" align="center"></el-table-column>
			  <el-table-column label="" prop="" align="center" width="55"></el-table-column>
			</el-table>	  
		</div>  
	  </div>
	  
	  
  </div>
</template>
<script>
import { StatusIndicator } from 'vue-status-indicator';
export default {
	components:{StatusIndicator},
  data() {
    return {
      isIndeterminateAll: false,
      globelCheckedAll: false,
      tableData: [],
	  statuslist:[
		  
		  {
			  value:0,
			  label:"正常",
		  },
		  {
			  value:1,
			  label:"迟到",
		  },
		  {
			  value:2,
			  label:"缺岗",
		  }
	  ]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      for (let index = 0; index < 10; index++) {
        this.tableData.push({
          id: index + 1,
		  stunum:"2020221128736",
		  name:"张三",
          sex:'男',
		  dorm:"安保部门",
		  class:"8:00-18:00",
		  parent:"张五",
		  phone:"17845982309",
		  alarm:3,
          isChecked: false,
          isIndeterminate: false,
          childList: [
            {
              subid: '202303012320',
              longitude: '116.4094876191406',
              latitude: '39.88017896299985',
              checkInTime: '2023-03-01 23:20:12',
              status: 1,
            },
			{
			  subid: '202303012324',
			  longitude: '116.4094876191406',
			  latitude: '39.88017896299985',
			  checkInTime: '2023-03-02 23:20:12',
			  status: 1,
			},
            {
              subid: '202303012321',
              longitude: '116.4094876191406',
              latitude: '39.88017896299985',
              checkInTime: '2023-03-03 21:20:12',
              status: 0,
            },
			{
			  subid: '202303012322',
			  longitude: '116.4094876191406',
			  latitude: '39.88017896299985',
			  checkInTime: '— —',
			  status: 2,
			},
			{
			  subid: '202303012323',
			  longitude: '116.4094876191406',
			  latitude: '39.88017896299985',
			  checkInTime: '2023-03-05 20:20:56',
			  status: 0,
			},
			
          ]
        })
      }
    },
    // 手动更改全选按钮的状态
    updateCheckedAllBtnStatus(value) {
      // 如果是选了勾选
      if (value) {
        // 检查是否所有数据都手动勾选了
        let isAllChecked = this.tableData.every(v => v.isChecked)
        if (isAllChecked) {
          this.globelCheckedAll = true
          this.isIndeterminateAll = false
        } else {
          this.isIndeterminateAll = true
        }
      } else {
        // 检查是否所有数据取消勾选了
        let isAllCancelChecked = this.tableData.every(v => v.isChecked == false)
        if (isAllCancelChecked) {
          this.globelCheckedAll = false
          this.isIndeterminateAll = false
        } else {
          this.isIndeterminateAll = true
        }
      }
    },
    // 全选所有
    clickCheckAll(item) {
      // 此处console的item无效，仅为了eslint校验，而slot-scope="scope"又是必传
      console.log(item)
      this.tableData = this.tableData.map(val => {
        val.isChecked = this.globelCheckedAll
        val.childList = val.childList.map(i => {
          i.isChecked = this.globelCheckedAll
          return i
        })
        return val
      })
      this.updateCheckedAllBtnStatus(this.globelCheckedAll)
    },
    // 每行选择事件
    handleSelectionChange(val) {
      val.childList = val.childList.map(i => {
        i.isChecked = val.isChecked
        return i
      })
      val.isIndeterminate = false
      this.updateCheckedAllBtnStatus(val.isChecked)
    },

    // 每个小项选择事件-单选
    clickCheckItemFn(row, item) {
      // 如果是选了勾选
      if (item.isChecked) {
        this.isIndeterminateAll = true
        // 检查是否所有数据都手动勾选了
        let isAllChecked = row.childList.every(v => v.isChecked)
        if (isAllChecked) {
          row.isChecked = true
          row.isIndeterminate = false
        } else {
          row.isIndeterminate = true
        }
      } else {
        // 检查是否所有数据取消勾选了
        let isAllCancelChecked = row.childList.every(v => v.isChecked == false)
        if (isAllCancelChecked) {
          row.isChecked = false
          row.isIndeterminate = false
          this.isIndeterminateAll = false
        } else {
          row.isIndeterminate = true
        }
      }
    },

    // 单项操作-删除
    clickDelFn(row, index, item, itemIndex) {
      console.log(row, index, item, itemIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
img{
  width:50px;
  height: 50px;
}
</style>