<!--date.vue -->
<template>
  <div class="date-panel">
    <date-panel ref="datePanel" :dateV="dateV" @pick="pick"></date-panel>
  </div>
</template>
<script>
// import DatePanel from "@/components/date-picker/src/panel/date.vue";
import DatePanel from "components/date-picker/src/panel/date.vue";

export default {
  props: {
    date: {
      default: new Date(),
      type: Date
    },
    dateV: {
      default: new Date(),
      type: Date
    },
    showTime: {
      default: false,
      type: Boolean
    }
  },
  components: {
    DatePanel
  },
  model: {
    // 作为组件，v-model 接收的字段
    prop: "date",
    event: "change"
  },
  mounted() {
    // 日期
    this.$refs.datePanel.value = this.date;
    // 是否包含时间
    this.$refs.datePanel.showTime = this.showTime;
    // visible控制是否显示日期面板
    this.$refs.datePanel.visible = true;
  },
  methods: {
    pick(date) {
      this.$refs.datePanel.value = date;
      this.$refs.datePanel.resetView && this.$refs.datePanel.resetView();
      this.$emit("change", date);
    }
  }
};
</script>
<style scoped>
/* 原生CSS的深度选择器<<< */
.date-panel >>> .el-picker-panel__footer {
  /* 隐藏.el-picker-panel的底部确定按钮 */
  display: none !important;
}
.date-panel >>> .el-picker-panel {
  box-shadow: none;
  /* border: 0; */
}
</style>
