<style lang="stylus" scoped>
.organization {
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
    width: 100%;
    padding-left: 10px;

    .text {
      font-size: 14px;
    }

    .item {
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
    }

    .clearfix:before, .clearfix:after {
      display: table;
      content: '';
    }

    .clearfix:after {
      clear: both;
    }
  }
}
</style>


<template>
  <div class="organization">
    <el-header class="bodyheader">
      <div>
        <h1>{{currentMenuName.menuName}}</h1>
        <p>{{currentMenuName.menuNameEN}}</p>
      </div>
      <!-- </usernav> -->
    </el-header>
    <el-row :gutter="20" class="inner">
      <el-col :span="8" v-for="item of organizational" :key="item.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{title(item)}}</span>
            <el-button style="float: right; padding: 3px 3px" type="primary" @click="dialogChange(title(item))">新增</el-button>
          </div>
          <div v-for="o in item" :key="o._id" class="text item">
            {{list(o)}}
            <el-button style="float: right; padding: 3px 3px; margin-top:3px;" type="danger" @click="organizationalDel(o)">删除</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <el-input placeholder="请输入内容" v-model="sinputText" clearable style="width:calc(100% - 20px);" v-if="dialogTitle!='请确认删除?'">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :type="dialogTitle!='请确认删除?' ? 'primary' : 'danger'" @click="dialogTitle!='请确认删除?' ? organizationalChange() : organizationaldel()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["currentMenuName"],
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      sinputText: "",
      isDel:{
        title:"",
        name:""
      }
      // amount:""
    };
  },
  methods: {
    // 得到卡片标题
    title(item) {
      for (var key in item[0]) {
        if (key == "department") return "部门";
        if (key == "position") return "职位";
        if (key == "competent") return "职称";
      }
    },
    // 得到不同卡片中列表内容
    list(item) {
      for (var key in item) {
        if (key == "department") return item[key];
        if (key == "position") return item[key];
        if (key == "competent") return item[key];
      }
    },
    dialogChange(val) {
      // 根据不同卡片修改弹窗内容
      this.sinputText = "";
      switch (val) {
        case "部门":
          this.dialogTitle = "新增部门";
          this.dialogVisible = true;
          // this.$store.dispatch("DEPARTMENTADD", this.sinputText);
          break;
        case "职位":
          this.dialogTitle = "新增职位";
          this.dialogVisible = true;
          // this.$store.dispatch("POSITIONADD", this.sinputText);
          break;
        case "职称":
          this.dialogTitle = "新增职称";
          this.dialogVisible = true;
          // this.$store.dispatch("COMPETENTADD", this.sinputText);
          break;
        default:
          break;
      }
    },
    organizationalChange() {
      // 根据不同卡片发送相应的请求
      switch (this.dialogTitle) {
        case "新增部门":
          this.$store.dispatch("ORGANIZATIONALADD", {
            key: "department",
            val: this.sinputText
          });
          break;
        case "新增职位":
          this.$store.dispatch("ORGANIZATIONALADD", {
            key: "position",
            val: this.sinputText
          });
          break;
        case "新增职称":
          this.$store.dispatch("ORGANIZATIONALADD", {
            key: "competent",
            val: this.sinputText
          });
          break;
        default:
          break;
      }
      this.dialogVisible = false;
    },
    organizationalDel(val) {
      //用于删除前检查部门中是否存在人员
      this.dialogTitle = "请确认删除?";
      this.$store.commit("FILTERSCHANGE");
      for (var key in val) {
        switch (key) {
          case "department":
            this.$store.commit("AddOrChangeFilters", {
              filter_name: "department",
              value: val[key]
            });
            this.isDel.title = val[key];
            this.isDel.name = key
            break;
          case "position":
            this.$store.commit("AddOrChangeFilters", {
              filter_name: "position",
              value: val[key]
            });
            this.isDel.title = val[key];
            this.isDel.name = key
            break;
          case "competent":
            // console.log(val[key]);
            this.$store.commit("AddOrChangeFilters", {
              filter_name: "competent",
              value: val[key]
            });
            this.isDel.title = val[key];
            this.isDel.name = key
            // console.log(this.$store.state.userinfo.amount);
            break;
          default:
            break;
        }
      }
      this.$store.dispatch("ALL");
      this.dialogVisible = true;
    },
    organizationaldel(){
      // 执行删除请求
      if(this.$store.state.userinfo.amount == 0){
        this.$store.dispatch("ORGANIZATIONALDEL", {
            key: this.isDel.name,
            val: this.isDel.title
          });
      }else{
        this.$message.error('操作失败, 删除的部门中已存在人员信息');
      }
      this.dialogVisible = false;
    }
  },
  computed: {
    organizational() {
      return this.$store.state.organizational;
    }
  }
};
</script>


