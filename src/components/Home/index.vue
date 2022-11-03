<template>
  <el-container style="height: 900px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '2']">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-s-operation"> </i>
            <router-link to="/home/echart"
              >图书后台管理系统</router-link
            ></template
          >
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>功能管理</template>
          <el-menu-item-group>
            <div v-if="this.userInfo.userName == 'admin' ? true : false">
              <el-menu-item index="2-1">
                <router-link to="/home/userlist">管理员管理</router-link>
              </el-menu-item>
              <el-menu-item index="2-3">
                <router-link to="/home/borrow">借阅管理</router-link>
              </el-menu-item>
              <el-menu-item index="2-4">
                <router-link to="/home/booktype">图书类型管理</router-link>
              </el-menu-item>
              <el-menu-item index="2-5">
                <router-link to="/home/reader">读者管理</router-link>
              </el-menu-item>
            </div>
            <el-menu-item index="2-2">
                <router-link to="/home/booklist">图书列表</router-link>
              </el-menu-item>
            <div v-if="this.userInfo.userName == 'admin' ? false : true">
              <el-menu-item index="2-6">
              <router-link to="/home/record">借阅记录</router-link>
            </el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ this.userInfo.userName }}</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userInfo: "",
    };
  },
  methods: {
    logout() {
      this.$confirm("是否确认退出登录", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("TOKEN");
          this.$message.success("退出登录成功");
          this.$router.push("/login");
        })
        .catch();
    },
  },
  async mounted() {
    //根据token获取用户信息
    let result = await this.$API.mock.reqgetUserInfo(
     localStorage.getItem("TOKEN")
    );
    console.log(result);
    this.userInfo = result.userInfo;
  },
};
</script>

<style>
a {
  /* 去掉a标签的默认颜色和下划线 */
  text-decoration: none;
  color: inherit;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>