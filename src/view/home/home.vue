<style lang="stylus" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;

  .bodyheader {
    height: 5%;
    background-color: #fff;
    // width: 500px;
    position: relative;
    // z-index 1;
    // box-sizing:none;
    padding: 10px 0 10px 10px;

    div {
      display: inline-block;
      // width: 500px;
      line-height: 18px;

      h1 {
        display: inline-block;
        font-size: 18px;
        font-weight: 500;
        margin-left: 1px;
      }

      p {
        display: inline-block;
        font-size: 12px;
        font-weight: 300;
        color: #777;
        margin-left: 3px;
      }
    }
  }

  .inner {
    width: calc(100% - 20px);
    height: calc(95% - 20px);
    padding: 0 10px;

    // background-color :#eee;
    .right, .left {
      height: 196px;
      position: relative;
    }

    .userinfo {
      height: 100%;
      box-sizing: border-box;

      .top {
        box-sizing: border-box;
        padding: 20px;
        width: 100%;
        height: 45%;
        border-bottom: 1px solid #eee;

        div:nth-child(1) {
          height: 100%;
          width: 20%;

          img {
            height: 100%;
          }
        }

        div:nth-child(2) {
          height: 100%;
          width: 80%;
          line-height: 100%;

          p:nth-child(1) {
            margin: 5px;
            font-size: 22px;
            font-weight: bold;
            color: #409eff;
          }

          p:nth-child(2) {
            margin: 5px;
            font-size: 13px;
            color: #878d99;
          }
        }
      }

      .bottom {
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        height: 55%;

        p {
          margin: 2px 10px;
          font-size: 12px;
          color: #5a5e66;
          line-height: 25px;

          span {
            display: inline-block;
            width: 100px;
          }
        }
      }
    }

    .numinfo {
      width: 100%;
      height: 73px;

      div:nth-child(1) {
        width: 30%;
        text-align: center;
        line-height: 75px;
        color: #fff;
      }

      div:nth-child(2) {
        width: 70%;
        text-align: center;
        // line-height: 75px;
      }

      .left_1 {
        background-color: rgb(64, 158, 255);

        i {
          font-size: 26px;
        }
      }

      .left_2 {
        background-color: rgb(103, 194, 58);

        i {
          font-size: 26px;
        }
      }

      .left_3 {
        background-color: rgb(235, 158, 5);

        i {
          font-size: 26px;
        }
      }

      h3 {
        font-size: 24px;
        margin-top: 13px;
        margin-bottom: 5px;
        font-weight: 700;
      }

      span {
        font-size: 12px;
        margin-top: 3px;
        color: #c8c8c8;
      }

      .right_1>h3 {
        color: rgb(64, 158, 255);
      }

      .right_2>h3 {
        color: rgb(103, 194, 58);
      }

      .right_3>h3 {
        color: rgb(235, 158, 5);
      }
    }

    .quick {
      width: 100%;
      height: 110px;
      margin-top: 10px;

      .header {
        color: #303133;
        font-size: 12px;
        padding: 10px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
      }

      .body {
        box-sizing: border-box;
        padding: 20px;
      }
    }

    .recententry {
      .header {
        color: #303133;
        font-size: 12px;
        padding: 10px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
      }

      .ul li {
        width: 25%;
        height: 30px;
        margin:10px 0
        div:nth-child(1) {
          width: 30px;
          img {
            width: 100%;
          }
        }

        div:nth-child(2) {
          margin-left:10px;
          line-height:30px;
          font-size:14px;
        }
      }
    }
  }
}
</style>


<template>
  <div class="home">
    <el-header class="bodyheader">
      <div>
        <h1>{{currentMenuName.menuName}}</h1>
        <p>{{currentMenuName.menuNameEN}}</p>
      </div>
    </el-header>
    <div class="inner">
      <el-row :gutter="20">
        <el-col :span="8" class="left">
          <div class="el-card userinfo">
            <div class="top">
              <div class="fl"><img src="../../../static/img/home/defaultlogo.png"></div>
              <div class="fl">
                <p>Lee</p>
                <p>系统管理员</p>
              </div>
            </div>
            <div class="bottom">
              <p>
                <span>上次登录时间：</span>
                <span>2018.02.14</span>
              </p>
              <p>
                <span>上次登录IP：</span>
                <span>127.0.0.1</span>
              </p>
              <p>
                <span>用户组：</span>
                <span>管理员</span>
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="16" class="right">
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="el-card numinfo">
                <div class="fl left_1">
                  <i class="fa fa-fw fa-user"></i>
                </div>
                <div class="fl right_1">
                  <h3>{{admin}}</h3>
                  <span>管理员总数</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="el-card numinfo">
                <div class="fl left_2">
                  <i class="fa fa-fw fa-users"></i>
                </div>
                <div class="fl right_2">
                  <h3>{{permanent}}</h3>
                  <span>正式员工总数</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="el-card numinfo">
                <div class="fl left_3">
                  <i class="fa fa-fw fa-users"></i>
                </div>
                <div class="fl right_3">
                  <h3>{{probation}}</h3>
                  <span>实习员工总数</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="el-card quick">
                <div class="header">
                  <span>快捷操作</span>
                </div>
                <div class="body">
                  <el-button type="primary" plain @click="addUser()">添加用户</el-button>
                  <el-button type="primary" plain @click="addWork()">添加日程</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="10" class="el-card recententry">
          <div class="header">
            <span>最近入职（6个月内）</span>
          </div>
          <div style="padding:10px; overflow:hidden;">
            <ul class="ul" >
              <li v-for="item in recententry" class="fl">
                <div class="fl"><img src="../../../static/img/home/defaultlogo.png" alt=""></div>
                <div class="fl">{{item.name}}</div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <userdialog :userdialog="userdialog"></userdialog>
    <workdialog :dialog="workdialog"></workdialog>
  </div>
</template>

<script>
import userdialog from "../userinfo/userdialog";
import workdialog from "../workschedule/workdialog";
export default {
  props: ["currentMenuName"],
  data() {
    return {
      userdialog: {
        //快捷操作新增用户的临时数据
        dialogFormVisible: false,
        dialogTitle: "新增员工资料",
        dialogDelBtn: "",
        dialogAddBtn: "确定",
        info: {
          id: "",
          name: "",
          sex: "",
          birthdate: "",
          mobile: "",
          email: "",
          provicen: "",
          political: "",
          nation: "",
          nativeplace: "",
          position: "",
          competent: "",
          department: "",
          jobid: "",
          education: "",
          school: "",
          major: "",
          entry: "",
          become: "",
          contractstart: "",
          contractend: "",
          identity: "",
          employ: "",
          marital: ""
        }
      },
      workdialog: {
        //快捷操作新增日程的临时数据
        dialogVisible: false,
        dialogTitle: "",
        dialogInfo: "",
        dialogSuccess: "",
        dialogDanger: "删除",
        id: "",
        title: "",
        start: "",
        end: ""
      }
    };
  },
  computed: {
    permanent() {
      // 得到实习员工的总数
      var sum = [];
      sum = this.$store.state.userinfo.userlist.filter(item => {
        return item.competent != "实习";
      });
      return sum.length;
    },
    probation() {
      // 得到正式员工的总数
      var sum = [];
      sum = this.$store.state.userinfo.userlist.filter(item => {
        return item.competent == "实习";
      });
      return sum.length;
    },
    admin() {
      // 得到管理员的总数
      var sum = [];
      sum = this.$store.state.userinfo.userlist.filter(item => {
        return item.competent == "系统管理员";
      });
      return sum.length;
    },
    recententry(){
      var recententry = [];
      var statedate = Date.parse(new Date()); 
      // 得到当前时间
      var enddate = Date.parse(this.$moment(statedate).subtract(6, 'month')); 
      // 得到当前时间减去月数
      recententry = this.$store.state.userinfo.userlist.filter(item => {
        return item.entry > enddate
      });
      return recententry;
    }
  },
  methods: {
    addUser() {
      this.userdialog.dialogFormVisible = true;
    },
    addWork() {
        this.workdialog.dialogVisible = true;
        this.workdialog.dialogTitle = "新增";
        this.workdialog.dialogInfo = "取 消";
        this.workdialog.dialogSuccess = "新 增";
        this.workdialog.dialogDanger = "";
        this.workdialog.title = "";
        this.workdialog.start = "";
        this.workdialog.end = "";
        this.workdialog.id = "";
    },
    dateFormat(date) {
      return this.$moment(Number(date)).format("YYYY-MM-DD");
    }
  },
  // created () {
  //   this.$store.dispatch("ALL","all");
  // },
  components: {
    userdialog,
    workdialog
  }
};
</script>


