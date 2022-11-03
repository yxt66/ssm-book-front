<template>
  <div class="line-chart" ref="lineChart"></div>
</template>

<script>
//折线图
import * as echarts from "echarts";
export default {
  name: "LineChart",
  mounted() {
    //初始化echarts实例
    //注意：ref不能line-Chart 还有导包要么as 要么require否则init报错
    // let echarts = require('echarts')
    let lineChart = echarts.init(this.$refs.lineChart);
    //配置数据
    lineChart.setOption({
      xAxis: {
        //隐藏xy轴
        show: false,
        //折线散点
        type: "category",
      },
      yAxis: {
        show: false,
      },
      //系列
      series: [
        {
          type: "line",
          data: [1, 5,3,5,7, 3, 5,],
          //拐点样式设置为0就看不见
          itemStyle: {
            opacity: 0,
          },
          //线条颜色
          lineStyle:{
              color:"purple"
          },
          //填充颜色 设置为渐变色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.line-chart {
  width: 100%;
  height: 100%;
}
</style>
