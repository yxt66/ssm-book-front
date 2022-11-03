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
        min:0,
        max:100
      },
      yAxis: {
        show: false,
        //y轴均分
        type:'category',
        
      },
      //系列
      series: [
        {
          type: 'bar',
          data: [79],
          color:'#33ab3d',
          // 设置柱状图宽度
          barWidth:10,
          //设置柱状图背景颜色
          showBackground:true,
          // backgroundStyle:'#eee' 
          //文本
          label:{
            show:true,
            //替换文本内容
            formatter:'|',
            //调整文本位置
            position:'right'
          }
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
