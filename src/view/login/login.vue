<style lang="stylus" scoped>
.login-box {
  // border:1px solid #eee;
  width: 360px;
  margin: 100px auto;

  .login-logo {
    font-size: 35px;
    text-align: center;
    margin-bottom: 25px;
    font-weight: 300;

    b {
      font-weight: 700;
      color: #444;
    }
  }

  .login-box-body {
    background: #fff;
    padding: 20px;
    border-top: 0;
    color: #666;

    p {
      margin: 0;
      text-align: center;
      padding: 0 20px 20px 20px;
      font-size: 12px;
      line-height: 1.42857143;
      font-weight: 400;
    }

    .size {
      font-size: 10px;
      color: #666;
    }

    .Account {
      font-size: 10px;
      color: #3c8dbc;
    }
  }
}
</style>
<template>
  <div class="login-box" @keydown.enter="submitForm('clients')">
    <div class="login-logo">
      <a href="###">
        <b>VUEX</b>
      </a>
    </div>
    <div class="login-box-body">
      <p>Login</p>
      <el-form :model="clients" ref="clients" class="demo-ruleForm" >
        <el-form-item label="" prop="appid" :rules="[
      { required: true, message: '用户名不能为空'},
    ]">
          <el-input type="text" v-model="clients.appid" auto-complete="off" placeholder="Appid"></el-input>
        </el-form-item>
        <el-form-item label="" prop="appkey" :rules="[
      { required: true, message: '密码不能为空'},
    ]">
          <el-input type="password" v-model="clients.appkey" auto-complete="off" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="rememberFlag" class="size">
            <span class="size">Remember me</span>
          </el-checkbox>
          <el-button class="fr" type="primary" @click="submitForm('clients')">Submit</el-button>
        </el-form-item>
      </el-form>
      <router-link to="/register">
        <span class="Account">New Account</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clients: {
        appid: localStorage.getItem("loginName"),
        appkey: ""
      },
      rememberFlag: localStorage.getItem('rememberFlag') == 'true' ? true : false,
    };
  },
  methods: {
    submitForm(formName) {
      //el自带的表单验证
      this.$refs[formName].validate(valid => {
        this.rememberFlag ? localStorage.setItem("loginName", this.clients.appid) : localStorage.removeItem('loginName');
        if (valid) {
          //通过验证后,发起登陆请求,继续验证账号密码是否正确
          this.axios({
            method: "post",
            url: "/api/accesstoken",
            data: { id: this.clients.appid, key: this.clients.appkey }
          }).then(res => {
            // this.$store.commit()
            //正确的话将返回的token保存到localhostData中
            var {appid,token,message,success} = res.data;
            if (success) {
              localStorage.setItem("appid", appid);
              localStorage.setItem("token", token);
            }
            if (this.$route.query.redirect) {
              this.$router.push({ path: this.$route.query.redirect });
            } else {
              this.$router.push("/");
            }
            this.$message({
              message: message,
              type: success ? 'success' : 'warning'
            });
          });
        } else {
          // console.log("error submit!!");
          // console.log(this.axios);
          return false;
        }
      });
    }
  },
  watch: {
    rememberFlag(){
      this.rememberFlag ? localStorage.setItem('rememberFlag',true) : localStorage.setItem('rememberFlag',false);
    }
  }
};
</script>



