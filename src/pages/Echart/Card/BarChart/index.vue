<template>
  <div class="bar-chart" ref="barChart"></div>
</template>

<script>
//柱状图
import * as echarts from "echarts";
export default {
  name: "BarChart",
  mounted() {
    //初始化echarts实例
    //注意：ref不能line-Chart 还有导包要么as 要么require否则init报错
    // let echarts = require('echarts')
    let barChart = echarts.init(this.$refs.barChart);
    //配置数据
    barChart.setOption({
      xAxis: {
        //隐藏xy轴
        show: false,
        type:'category'
      },
      yAxis: {
        show: false,
      },
      //系列
      series: [
        {
          type: 'bar',
          data: [1,3,4,2,5,6,2,4,3],
          color:'cyan'
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      //显示提示信息
      tooltip:{

      }
    });
  },
};
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 100%;
}
</style>
