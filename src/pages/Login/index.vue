<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登 &nbsp; 录 &nbsp; 界 &nbsp; 面</h3>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input
          ref="userName"
          v-model="loginForm.userName"
          placeholder="用户名"
          name="userName"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter.native="userLogin"
        />
        <el-tag type="danger" size="medium">账号：admin/editor</el-tag>
        <el-tag type="success" size="medium">密码：123456</el-tag>
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view"></i>
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="userLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
// import crypto from 'crypto'

export default {
  // components: { layout },
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
      },
      capsTooltip: false,
      passwordType: "password",
      loading: false,
      loginRules: {
        userName: [
          {
            required: true,
            trigger: "blur",
            message: "请填写用户名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请填写密码",
          },
          { type: "string", min: 6, message: "密码至少为6位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    showPwd(e) {
      // console.log(e)
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      const el = e.target;
      this.passwordType === ""
        ? el.setAttribute("style", "color: #409EFF")
        : el.setAttribute("style", "color: #c0c4cc");
    },
    userLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          let result = await this.$API.mock.reqUserLogin(this.loginForm);
          console.log(result)
          if (result.code == 200) {
            localStorage.setItem('TOKEN',result.token) 
            this.$message.success('登录成功')
            this.$router.push("/home");
          }else {
            this.$message.error('用户名或密码错误 ')
          }
        } 
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    // color: black;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background: url(~@/assets/login.png);
  width: 100%;
  
  background-size: 100% 100%;
  overflow: hidden;
  height: 750px;
  // width: 100%;
  // background-color: $bg;
  // overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 5px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 16px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .code {
    position: absolute;
    right: 0px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
