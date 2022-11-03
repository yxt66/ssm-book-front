<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="书名" >
        <el-input placeholder="请输入要查询的书名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search"
         >搜索</el-button
        >
        <el-button type="primary" size="small" >查询所有借阅图书</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格组件
      -->
    <!-- <el-button
      type="primary"
      size="small "
      icon="el-icon-plus"
 
      >添加</el-button
    > -->
    <el-table :data="list" style="width: 100%" border >
      <el-table-column type="index" label="图书编号" width="width">
      </el-table-column>
      <el-table-column prop="name" label="图书名称" width="width">
      </el-table-column>
      <el-table-column prop="price" label="图书价格" width="width">
      </el-table-column>
      <el-table-column prop="publish" label="出版社" width="width">
      </el-table-column>
      <el-table-column prop="borrowDate" label="借阅时间" width="width">
      </el-table-column>
      <el-table-column prop="backDate" label="到期时间" width="width">
      </el-table-column>

      <el-table-column prop="states_name" label="状态" width="width">
        <template slot-scope="{row}">
            <!-- <el-tag type="success">已归还</el-tag> -->
            <el-tag type="warning">{{row.states_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="180px">
        <!-- 
          table插槽：row为 table:data中所有数据 row $index 固定写法
          此时相当于table column 子组件 给 template 父组件传值 
          $index为row的索引号默认从0开始
         -->
        <!-- <template slot-scope="{ row, $index }"> -->
          <template slot-scope="{row}"> 
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
           :disabled="row.states_id == 3?false:true"
            @click="renewal(row)">续费</el-button
          >
          <el-button
            type="info"
            icon="el-icon-delete"
            size="mini"
             :disabled="row.states_id == 3?false:true"
             @click="returnBook(row)"
            >归还</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name:'Record',
    data(){
      return {
        list:[]
      }
    },
    methods:{
      async getqueryReaderRecord(){
        let result = await this.$API.book.reqqueryReaderRecord({"id":1});
        this.list=result.data.rows
      },
      async renewal(row){
        
        this.$confirm('是否确认续费?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'}).then(async ()=>{
            const id = row.id
            let result = await this.$API.book.requpdateStates({id})
            if(result.code == 200){
              this.$message.success('续费成功')
              this.getqueryReaderRecord();    
            }else {
              this.$message.error('续费失败')
            }
  
          }).catch(()=>{
            this.$message.info('已取消续费')
          })

      },
      returnBook(row){
         this.$confirm('是否确认归还?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'}).then(async ()=>{
            const id = row.id
            let result = await this.$API.book.reqreturnBook({id})
            if(result.code == 200){
              this.$message.success('归还成功')
              this.getqueryReaderRecord();    
            }else {
              this.$message.error('归还失败')
            }
  
          }).catch(()=>{
            this.$message.info('已取消归还')
          })
      }
    },
    async mounted(){
     this.getqueryReaderRecord();
    }
}
</script>

<style>

</style>