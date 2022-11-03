<template>
  <div>
    <!--表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="书名">
        <el-input
          placeholder="请输入要查询的书名"
          v-model="searchbook"
          @keyup.native.enter="searchBook"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="searchBook"
          >搜索</el-button
        >
        <el-button type="primary" size="small" @click="getAllBook"
          >查询所有图书</el-button
        >
      </el-form-item>
    </el-form>
    
    <el-button
      type="primary"
      size="small "
      icon="el-icon-plus"
      @click="showDialog"
      v-show="token == 'admin' ? true : false"
      >添加</el-button
    >
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="图书编号" width="80px">
      </el-table-column>
      <el-table-column prop="typeName" label="图书类型" width="80px">
      </el-table-column>
      <el-table-column prop="name" label="图书名称" width="width">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80px">
      </el-table-column>
      <el-table-column prop="publish" label="出版社" width="width">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="width">
      </el-table-column>
      <el-table-column prop="stock" label="库存" width="80px">
      </el-table-column>
      <el-table-column prop="" label="操作" width="240px">
        <!-- <template slot-scope="{ row, $index }"> -->
        <template slot-scope="{ row }">
          <el-button
            v-if="token == 'admin' ? true : false"
            title="修改图书信息"
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updataBook(row)"
          ></el-button>
          <el-button
            v-if="token == 'admin' ? true : false"
            title="删除图书"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="delBook(row)"
          ></el-button>
          <el-button
            v-if="token == 'admin' ? false : true"
            title="借阅图书"
            type="primary"
            icon="el-icon-star-off"
            size="mini"
            @click="borbook(row)"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            title="查看详情"
            @click="selectBookById(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="pageNo"
      :total="total"
      :page-size="pageSize"
      :page-sizes="[3, 5, 10]"
      :pager-count="7"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper,sizes,total"
    >
    </el-pagination>
    <!-- 对话框 
    -->
    <el-dialog
      :title="bookInfo.id ? '修改图书' : '添加图书'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 60%" :model="bookInfo">
        <el-form-item label="图书类型" label-width="100px">
          <el-select v-model="bookInfo.typeId" placeholder="请选择图书类型">
            <el-option
              v-for="item in typeInfo"
              :key="item.typeId"
              :label="item.name"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图书名称" label-width="100px">
          <el-input
            v-model="bookInfo.name"
            autocomplete="off"
            placeholder="请输入图书名称"
            clearable
            :disabled="bookInfo.id ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item label="图书价格" label-width="100px">
          <el-input
            v-model="bookInfo.price"
            autocomplete="off"
            placeholder="请输入图书价格"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="图书出版社" label-width="100px">
          <el-input
            v-model="bookInfo.publish"
            autocomplete="off"
            placeholder="请输入图书出版社"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="图书作者" label-width="100px">
          <el-input
            v-model="bookInfo.author"
            autocomplete="off"
            placeholder="请输入图书作者"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="图书库存" label-width="100px">
          <el-input
            v-model="bookInfo.stock"
            autocomplete="off"
            placeholder="请输入图书库存"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBookOrUpdata">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 抽屉
         -->
    <el-drawer title="书籍详细信息" :visible.sync="show" direction="rtl">
      <el-row :gutter="10">
        <el-col :span="6">书名</el-col>
        <el-col :span="15">{{bookInfo.name}}</el-col>
        <el-col :span="6">图书类型</el-col>
        <el-col :span="15">{{bookInfo.typeName}}</el-col>
        <el-col :span="6">描述</el-col>
        <el-col :span="15">这本书很好看</el-col>
        <el-col :span="6">出版社</el-col>
        <el-col :span="15">{{bookInfo.publish}}</el-col>
        <el-col :span="6">作者</el-col>
        <el-col :span="15">{{bookInfo.author}}</el-col>
        <el-col :span="6">图片</el-col>
        <el-col :span="15"></el-col>
        <el-col :span="20">
          <!-- 轮播图 -->
          <template>
            <div class="block">
              <el-carousel height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <!-- <h3 class="small">{{ item }}</h3> -->
                  <img src="@/assets/login.png" class="book-img" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </template>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { reqAddBookOrUpdata, reqdelBook } from "@/api/book/book";
import { mapState } from "vuex";
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 3,
      total: 0,
      dialogFormVisible: false,
      bookInfo: {
        typeId: "",
        name: "",
        price: "",
        publish: "",
        author: "",
        stock: "",
      },
      typeInfo: [
        {
          typeId: 1,
          name: "童书",
        },
        {
          typeId: 2,
          name: "小说",
        },
        {
          typeId: 3,
          name: "科技",
        },
      ],
      searchbook: "",
      list: [],
      show: false,
      token: "",
    };
  },
  methods: {
    async getBookList() {
      const { pageNo, pageSize } = this;
      let result = {};
      if (this.searchbook != "") {
        const name = this.searchbook;
        result = await this.$API.book.reqqueryBookList({
          name,
          pageNo,
          pageSize,
        });
      } else {
        result = await this.$API.book.reqqueryBookList({ pageNo, pageSize });
      }
      this.list = result.data.rows;
      this.total = result.data.total;
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getBookList();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getBookList();
    },
    showDialog() {
      this.dialogFormVisible = true;
      //点击添加清空书籍信息防止用户点击取消书籍信息还在
      this.bookInfo = {
        typeId: "",
        name: "",
        price: "",
        publish: "",
        author: "",
        stock: "",
      };
    },
    async addBookOrUpdata() {
      if (
        this.bookInfo.typeId != "" &&
        this.bookInfo.name != '' &&
        this.bookInfo.price != '' &&
        this.bookInfo.publish != '' &&
        this.bookInfo.author != '' &&
        this.bookInfo.stock != ''
      ) {
        let result = await this.$API.book.reqAddBookOrUpdata(this.bookInfo);
        // this.$message.success(result.code==200?'添加成功':'添加失败');
        if (result.code == 200) {
          this.$message({
            type: "success",
            message: this.bookInfo.id ? "修改成功" : "添加成功",
          });

          this.getBookList(this.bookInfo.id ? this.pageNo : 1);
          this.dialogFormVisible = false;
        }
      } else {
        this.$message({
          message: "输入图书信息有误",
          type: "error",
        });
      }
    },
    updataBook(row) {
      this.dialogFormVisible = true;
      //采用浅拷贝
      this.bookInfo = { ...row };
      console.log(this.pageNo);
    },
    delBook(row) {
      //用模板字符串
      this.$confirm("此操作将永久删除该图书, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const id = row.id;
          let result = await reqdelBook({ id });
          if (result.code == 200) {
            this.$message.success("删除成功");
            this.getBookList(this.bookInfo.id ? this.pageNo : 1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async searchBook() {
      const name = this.searchbook;
      const pageNo = 1;
      const pageSize = 3;
      if (name != "") {
        let result = await this.$API.book.reqqueryBookList({
          name,
          pageNo,
          pageSize,
        });
        if (result.data.total > 0) {
          this.list = [];
          this.list = result.data.rows;
          this.total = result.data.total;
          console.log(this.list);
        } else {
          this.$message.warning("该图书暂未收录");
        }
      } else {
        this.$message.error("输入查询信息有误");
      }
    },
    getAllBook() {
      this.searchbook = "";
      this.pageNo = 1;
      this.pageSize = 3;
      this.getBookList();
    },
    // 抽屉显示和隐藏
    selectBookById(row) {
      this.show = true;
      this.bookInfo = row
    },
    // 读者借阅书籍
    borbook(row) {
      this.$confirm("是否确认借阅此书籍", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        console.log(row);
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let str2Date = strDate + 7;
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let book_id = row.id;
        let borrowDate = year + seperator1 + month + seperator1 + strDate;
        let backDate = year + seperator1 + month + seperator1 + str2Date;
        let member_id = 1;
        let result = await this.$API.book.reqborBook({
          book_id,
          borrowDate,
          backDate,
          member_id,
        })
        if(result.code == 200){
          this.$message.success('借阅成功,请在规定时间内归还')
        }else {
          this.$message.error('借阅失败,请重试')
        }
      });
    },
  },
  mounted() {
    this.getBookList();
    this.token = localStorage.getItem("TOKEN");
  },
};
</script>
 
<style scoped>
.el-row .el-col-6 {
  text-align: right;
  font-size: 16px;
}
.el-col {
  margin: 20px 10px;
}
.block {
  padding-left: 80px;
}
.book-img {
  width: 100%;
  height: 100%;
}
/* 深度选择器修改button的样式 */
>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>