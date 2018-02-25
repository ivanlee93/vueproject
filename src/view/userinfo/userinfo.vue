<style lang="stylus" scoped>
.userlist {
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

    .usernav {
      height: 28px;

      .sinput {
        width: 200px;
      }

      .but {
        margin-right: 10px;
      }
    }
  }

  .usertable {
    width: 100%;
    height: 90%;
    position: absolute;
    // padding-bottom :50px;
  }

  .userpag {
    // width: 100%;
    height: 32px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>

<template>
  <div class="userlist">
    <el-header class="bodyheader">
      <div>
        <h1>{{currentMenuName.menuName}}</h1>
        <p>{{currentMenuName.menuNameEN}}</p>
      </div>
      <div class="fr usernav">
        <el-button class="but" @click="userAdd">新增用户</el-button>
        <el-input class="sinput" placeholder="请输入工号" prefix-icon="el-icon-search" v-model="sinputText" v-on:input="sinputChange()">
        </el-input>
      </div>
      <!-- </usernav> -->
    </el-header>
    <div class="usertable">
      <el-table class="el-card" :data="userlist" style="width: 100%;height:94%;" height="90%" v-loading="loading">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column sortable fixed prop="jobid" label="工号" width="80">
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="100">
        </el-table-column>
        <el-table-column prop="position" label="岗位" width="100">
        </el-table-column>
        <el-table-column prop="school" label="学校" width="100">
        </el-table-column>
        <el-table-column prop="major" label="专业" width="100">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="100">
        </el-table-column>
        <el-table-column prop="provicen" label="地址" width="500">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="195">
          <template slot-scope="scope">
            <el-button size="small" @click="viewDetails(scope.row.id)">查看详细信息</el-button>

            <el-button type="primary" @click="userSetorDel(scope.row.id)" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="userpag">
      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="amount" :page-size="14">
      </el-pagination>
    </div>
    <!-- <button @click="test">123</button> 测试方法 -->
    <userdialog :userdialog="userdialog"></userdialog>
  </div>

</template>

<script>
// import { Loading } from "element-ui";
import userdialog from "./userdialog.vue";
export default {
  props: ["currentMenuName"],
  data() {
    return {
      userdialog: {
        dialogFormVisible: false,
        dialogTitle: "",
        dialogDelBtn: "",
        dialogAddBtn: "",
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
      sinputText: ""
    };
  },
  methods: {
    // 页数改变的时候发送异步请求
    handleCurrentChange(val) {
      this.$store.dispatch("pageChange", val);
    },
    // 查看 userinfo 的详细信息方法
    viewDetails(id) {
      this.userdialog.dialogTitle = "查看详细信息";
      (this.userdialog.dialogDelBtn = ""),
        (this.userdialog.dialogAddBtn = ""),
        this.setData(id);
    },
    // 新增用户信息的方法
    userAdd() {
      this.userdialog.dialogTitle = "新增员工资料";
      this.userdialog.dialogAddBtn = "确定";
      this.userdialog.dialogDelBtn = "";
      this.userdialog.info = {};
      this.userdialog.dialogFormVisible = true;
      // console.log(2)
    },
    // 编辑用户信息的方法
    userSetorDel(id) {
      this.userdialog.dialogTitle = "编辑员工资料";
      this.userdialog.dialogAddBtn = "确定";
      this.userdialog.dialogDelBtn = "删除";
      this.setData(id);
    },
    // 更改data中信息的方法
    setData(id) {
      var vm = this;
      this.$store.state.userinfo.userlist.forEach(function(item) {
        if (item.id == id) {
          vm.userdialog.info.id = item.id; // ID
          vm.userdialog.info.name = item.name; // 姓名
          vm.userdialog.info.sex = item.sex; // 性别
          vm.userdialog.info.birthdate = item.birthdate; // 出生日期
          vm.userdialog.info.mobile = item.mobile; // 手机
          vm.userdialog.info.email = item.email; // 邮箱
          vm.userdialog.info.provicen = item.provicen; // 地址
          vm.userdialog.info.political = item.political; // 共青团员
          vm.userdialog.info.nation = item.nation; // 民族
          vm.userdialog.info.nativeplace = item.nativeplace; // 省份
          vm.userdialog.info.position = item.position; // 职位
          vm.userdialog.info.competent = item.competent; // 称职
          vm.userdialog.info.department = item.department; // 部门
          vm.userdialog.info.jobid = item.jobid; // 工号
          vm.userdialog.info.education = item.education; // 学历
          vm.userdialog.info.school = item.school; // 学校
          vm.userdialog.info.major = item.major; // 专业
          vm.userdialog.info.entry = item.entry; // 入职
          vm.userdialog.info.become = item.become; // 转正
          vm.userdialog.info.contractstart = item.contractstart; // 合同开始
          vm.userdialog.info.contractend = item.contractend; // 合同结束
          vm.userdialog.info.identity = item.identity; // 身份证
          vm.userdialog.info.employ = item.employ; // 合同类型
          vm.userdialog.info.marital = item.marital; // 婚姻
          // vm.userdialog.info.age = item.age;
          // console.log(new Date(item.birthdate))
        }
      });
      this.userdialog.dialogFormVisible = true;
    },
    sinputChange() {
      this.$store.commit(
        "AddOrChangeFilters",
        this.sinputText != ""
          ? { filter_name: "jobid", value: this.sinputText }
          : { filter_name: "jobid", value: "" }
      );
    }
  },
  created() {},
  computed: {
    // 获取state中的用户信息
    userlist() {
      return this.$store.state.userinfo.userlist;
    },
    // 得到loading加载的状态
    loading() {
      return this.$store.state.loading;
    },
    // 返回分页器的总数
    amount() {
      return Number(this.$store.state.userinfo.amount);
    }
  },
  watch: {
    //当分页发生改变时,重新获取数据
    "$store.state.userinfo.pageandsort.page"() {
      this.$store.dispatch("ALL");
    },
    "$store.state.userinfo.filters"() {
      this.$store.dispatch("ALL");
    }
  },
  updated() {},
  mounted() {},
  components: {
    //引入弹窗组件
    userdialog
  }
};
</script>