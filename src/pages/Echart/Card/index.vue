<template>
  <div>
    <!-- 采用ele布局 el-row网格布局 span默认24
      gutter 每个col 之间距离的设置-->
    <el-row :gutter="10">
      <el-col :span="6">
        <!-- 卡片的颜色 -->
        <!-- <el-card style="background-color: powderblue;"> -->
          <el-card>
          <Detail title="总藏书量" count="1,031,000" >
              <!-- 作用域插槽 -->
              <template slot="slot-content">
                 <span>增幅:&nbsp;&nbsp;0.01%
                     <svg t="1652456512685" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3725" width="16" height="16"><path d="M703.280488 365.511671c-4.329609 10.697643-13.921058 17.040095-25.236777 17.040095L544.234145 382.551766 544.234145 835.109955c0 17.838274-14.398942 32.296567-32.232099 32.296567-17.838274 0-32.236192-14.458293-32.236192-32.296567L479.765855 382.551766l-134.206608 0c-11.314697 0-20.906146-6.342452-25.234731-17.040095-4.330632-10.69969-2.081405-22.148439 5.92085-30.334889l166.241208-170.104189c5.333472-5.459339 11.773138-8.1711 19.315928-8.1711 7.543813 0 13.982456 2.742461 19.316951 8.201799l166.241208 170.068374C705.358823 343.358115 707.610096 354.813005 703.280488 365.511671z" p-id="3726" fill="#1afa29"></path></svg>
                 </span>
                  <span>减幅:&nbsp;&nbsp;0.01%
                      <svg t="1652456681866" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4756" width="16" height="16"><path d="M697.359638 689.069835l-166.241208 170.145122c-5.335519 5.459339-11.773138 8.191566-19.316951 8.191566-7.54279 0-13.982456-2.732228-19.315928-8.191566l-166.241208-170.145122c-8.002254-8.18645-10.251481-19.718087-5.92085-30.417777 4.329609-10.697643 13.921058-17.203824 25.234731-17.203824l134.206608 0 0-452.229708c0-17.838274 14.397918-32.296567 32.236192-32.296567 17.833157 0 32.232099 14.458293 32.232099 32.296567l0 452.229708L678.04371 641.448234c11.31572 0 20.908192 6.506181 25.236777 17.203824C707.610096 669.351748 705.358823 680.883385 697.359638 689.069835z" p-id="4757" fill="#d81e06"></path></svg>
                  </span>
              </template>
              <template slot="slot-footer">
                  <span>
                      较上周新增图书1,512
                  </span>
              </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- <el-card style="background-color: #d5e5a3"> -->
          <el-card>
          <Detail title ="访问量" count="223,000">
            <template slot="slot-content">
              <LineChart></LineChart>
            </template>
            <template slot="slot-footer">
                  <span>
                      日访问量:12,345
                  </span>
              </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- <el-card style="background-color: #ff8f5e"> -->
          <el-card>
          <Detail title="在线读者量" count="100,000">
            <template slot="slot-content">
              <BarChart/>
            </template>
            <template slot="slot-footer">
                  <span>
                      周在线读者量:123,708
                  </span>
              </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- <el-card style="background-color: #fac958"> -->
          <el-card>
          <Detail title="总借书量" count="100,000">
            <template slot="slot-content">
              <Progress/>
            </template>
            <template slot="slot-footer">
                   <span>增幅:&nbsp;&nbsp;0.01%
                     <svg t="1652456512685" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3725" width="16" height="16"><path d="M703.280488 365.511671c-4.329609 10.697643-13.921058 17.040095-25.236777 17.040095L544.234145 382.551766 544.234145 835.109955c0 17.838274-14.398942 32.296567-32.232099 32.296567-17.838274 0-32.236192-14.458293-32.236192-32.296567L479.765855 382.551766l-134.206608 0c-11.314697 0-20.906146-6.342452-25.234731-17.040095-4.330632-10.69969-2.081405-22.148439 5.92085-30.334889l166.241208-170.104189c5.333472-5.459339 11.773138-8.1711 19.315928-8.1711 7.543813 0 13.982456 2.742461 19.316951 8.201799l166.241208 170.068374C705.358823 343.358115 707.610096 354.813005 703.280488 365.511671z" p-id="3726" fill="#1afa29"></path></svg>
                 </span>
                  <span>减幅:&nbsp;&nbsp;0.01%
                      <svg t="1652456681866" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4756" width="16" height="16"><path d="M697.359638 689.069835l-166.241208 170.145122c-5.335519 5.459339-11.773138 8.191566-19.316951 8.191566-7.54279 0-13.982456-2.732228-19.315928-8.191566l-166.241208-170.145122c-8.002254-8.18645-10.251481-19.718087-5.92085-30.417777 4.329609-10.697643 13.921058-17.203824 25.234731-17.203824l134.206608 0 0-452.229708c0-17.838274 14.397918-32.296567 32.236192-32.296567 17.833157 0 32.232099 14.458293 32.232099 32.296567l0 452.229708L678.04371 641.448234c11.31572 0 20.908192 6.506181 25.236777 17.203824C707.610096 669.351748 705.358823 680.883385 697.359638 689.069835z" p-id="4757" fill="#d81e06"></path></svg>
                  </span>
              </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineChart from './LineChart'
import BarChart from './BarChart'
import Progress from './ProgressChart'
export default {
  name: "Card",
  components: {
    Detail,
    LineChart,
    BarChart,
    Progress
  },
};
</script>

<style scoped>
/* .el-card ::v-deep {
  
} */
.el-card:hover{
   transform: scale(1.04);
}
</style>