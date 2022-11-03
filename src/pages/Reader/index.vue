<template>
  <div>
    <el-card style="margin: 20px 0">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="读者名">
          <el-input placeholder="请输入要查询的读者"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <!-- Table -->
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="编号" width="80px">
        </el-table-column>
        <el-table-column prop="name" label="读者名" width="100px">
        </el-table-column>
                <el-table-column prop="tel" label="手机号码" width="150px">
        </el-table-column>
          <el-table-column prop="regdate" label="注册时间" width="150px">
        </el-table-column>
        <el-table-column prop="idNumber" label="身份证号" width="200px">
        </el-table-column>
        <el-table-column prop="" label="操作" width="200px">
          <template slot-scope="">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--page  -->
      <!-- <el-pagination
        :total="total"
        :current-page="pageNo"
        :pager-count="5"
        :page-size="pageSize"
        layout="prev, pager, next, jumper,total"
        style="margin-top: 20px"
        
      >
      </el-pagination> -->
    </el-card>
  </div>
</template>

<script>
export default {
    name:"Reader",
    data(){
      return {
        list:[]
      }
    },
    methods:{
      async selectMember(){
        let result = await this.$API.book.reqselectMember({})
        console.log(result)
        this.list = result.data
      }
    },
    mounted(){
      this.selectMember()
    }
};
</script>

<style>
</style>