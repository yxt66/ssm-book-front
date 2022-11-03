<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="书名">
        <el-input placeholder="请输入要查询的书名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search"
          @click="getBorrow(keyword)">搜索</el-button
        >
        <el-button type="primary" size="small" @click="getBorrow()">查询所有借阅图书</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格组件
     -->
    <!-- <el-button type="primary" size="small " icon="el-icon-plus">添加</el-button> -->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="图书编号" width="80px">
      </el-table-column>
      <el-table-column prop="bookName" label="图书类型" width="width">
      </el-table-column>
      <el-table-column prop="price" label="图书价格" width="width">
      </el-table-column>
      <el-table-column prop="borrowDate" label="借阅时间" width="width">
      </el-table-column>
      <el-table-column prop="backDate" label="到期时间" width="width">
      </el-table-column>
      <el-table-column prop="memberName" label="借阅人" width="width">
      </el-table-column>
      <el-table-column prop="state_name" label="状态" width="100px">
        <template slot-scope="{ row }">
          <el-tag type="danger">{{ row.states_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="180px">
        <!-- 
          table插槽：row为 table:data中所有数据 row $index 固定写法
          此时相当于table column 子组件 给 template 父组件传值 
          $index为row的索引号默认从0开始
         -->
        <!-- <template slot-scope="{ row, $index }"> -->
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            :disabled="row.states_id == 3 ? false : true"
            @click="renewal"
            >催还</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteRecord(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name:'Borrow',
    data(){
      return {
        list:[],
        keyword:''
      }
    },
    methods:{
      renewal(){
        this.$confirm('是否催促归还图书','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(
          ()=>this.$message.success('催还成功')
        ).catch( ()=>this.$message.info('已取消催还'))
      },
      deleteRecord(row){
          this.$confirm('是否确认删除','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
          }).then(
            async ()=>{
            const id = row.id
            let result = await this.$API.book.reqdeleteRecord({id})
            if(result.code == 200){
              this.$message.success('删除成功')
              this.getBorrow()
            }else {
              this.$message.error('删除失败')
            }
           
      })
      },
      async getBorrow(keyword){
        const name = keyword
        let result = await this.$API.book.reqqueryRecord({name});
        this.list = result.data.rows;
        this.keyword = ''
      }
    },

     mounted(){
      this.getBorrow();
    }
}
</script>

<style>
</style>