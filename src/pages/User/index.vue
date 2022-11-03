<template>
  <div>
    <el-card style="margin: 20px 0">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input placeholder="请输入要查询的管理员" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search"
            @click="getUserList(keyword)">搜索</el-button
          >
          <el-button type="primary" size="small" icon="el-icon-plus"
            @click="edit">添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <!-- Table -->
      <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="编号" width="80px">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="100px">
        </el-table-column>
        <el-table-column prop="" label="操作" width="200px">
          <template slot-scope="{row}">
            <el-button type="warning" icon="el-icon-edit" size="mini"
              @click="edit(row)"></el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              @click="delUser(row)"></el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--page  -->
      <el-pagination :total="total" :current-page="pageNo" :pager-count="5" :page-size="pageSize" layout="prev, pager, next, jumper,total"
                      style="margin-top:20px;"
                      @current-change="handleCurrentChange"
                     >

      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      :title="userInfo.id?'修改用户':'添加用户'"
      :visible.sync="dialogVisible"
      width="600px"
      >
      <el-form :model="userInfo" style="width:70%">
        <el-form-item label="用户名" label-width="100px" >
          <el-input  v-model="userInfo.userName"  :disabled="userInfo.id?true:false" clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input type="password" v-model="userInfo.password" show-password 
                    clearable
          ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" style="text-align:left">
        <el-button @click="dialogVisible = false" style="margin-left: 120px">取 消</el-button>
        <el-button type="primary" @click="AddOrEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqDelUser } from '@/api/book/book';
export default {
  name: "UserList",
  data() {
    return {
      pageNo:1,
      pageSize:3,
      total:0,
      userlist: [],
      userInfo:{
        userName:'',
        password:''
      },
      keyword:'',
      dialogVisible:false,
     
    };
  },
  methods: {
    async getUserList(keyword) {
      if(keyword == ''){
             const {pageNo,pageSize} =this;
             let result = await this.$API.book.reqqueryUserList({pageNo,pageSize});
             this.userlist = result.data.rows;
             this.total = result.data.total;
      }else {
            const {pageNo,pageSize} =this;
            const userName = this.keyword;
             let result = await this.$API.book.reqqueryUserList({pageNo,pageSize,userName});
             if(result.data.total != 0){
                this.userlist = result.data.rows;
                this.total = result.data.total;
                this.keyword='';
             }else {
               this.$message.info('此管理员不存在');
               this.keyword=''
               this.getUserList('')
             }     
      }
     
    },
    handleCurrentChange(pageNo){
      this.pageNo=pageNo;
      this.getUserList();
    },
    edit(row){  
     this.dialogVisible=true;
     this.userInfo={...row};
     console.log(this.userInfo)
    },
    showDialog(){
      this.dialogVisible=true
    },
    async AddOrEdit(){
      this.dialogVisible=false;
      let result = await this.$API.book.reqAddOrEditUser(this.userInfo);
      if(result.code == 200){
        this.$message.success(this.userInfo.id?'修改成功':'添加成功');
        this.getUserList();
      }
    },
    delUser(row){
       this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async ()=>{
           const id = row.id
        let result = await reqDelUser({id});
          if(result.code == 200){
            this.$message.success('删除成功');
            this.getUserList(this.userInfo.id?this.pageNo:1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    
  },
  mounted() {
    this.getUserList();
  },
};
</script>

<style scoped>
</style>