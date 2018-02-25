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

    .btn {
      width: 100%;
    }
  }
}
</style>
<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="###">
        <b>VUEX</b>
      </a>
    </div>
    <div class="login-box-body">
      <p>Register</p>
      <el-form :model="clients2" :rules="rules2" ref="clients2" class="demo-ruleForm">
        <el-form-item label="" prop="appid">
          <el-input type="text" v-model="clients2.appid" auto-complete="off" placeholder="Appid"></el-input>
        </el-form-item>
        <el-form-item label="" prop="appkey">
          <el-input type="password" v-model="clients2.appkey" auto-complete="off" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item label="" prop="appkeys">
          <el-input type="password" v-model="clients2.appkeys" auto-complete="off" placeholder="Retype Password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('clients2')">Agree to Terms of Service and Submit Registration</el-button>
        </el-form-item>
      </el-form>
      <router-link to="/login">
        <span class="Account">Already have an account? Login</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.clients2.appkeys !== "") {
          this.$refs.clients2.validateField("appkeys");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.clients2.appkey) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      clients2: {
        appid: "",
        appkey: "",
        appkeys: ""
      },
      rules2: {
        appid: [{ validator: checkid, trigger: "blur" }],
        appkey: [{ validator: validatePass, trigger: "blur" }],
        appkeys: [{ validator: validatePass2, trigger: "blur" }]
      },
      checked: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          this.axios({
            method: "post",
            url: "/api/sigunp",
            data: {
              id: this.clients2.appid,
              key: this.clients2.appkey
            }
          })
            .then(res => {
              var { message, success } = res.data;
              // commit('CHANGEWORKSCHEDULE', res.data.results);
              console.log(success)
              this.$message({
                message: message,
                type: success ? 'success' : 'warning'
              });
            })
            .catch(err => {
              console.log("err");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>



