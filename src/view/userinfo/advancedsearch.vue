<style lang="stylus" scoped>
.block {
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
    }
  }

  .bodyinner {
    width: 100%;
    height: calc(20% - 20px);

    // position: absolute;

    // padding-bottom :50px;
    .el-row {
      padding: 10px;
      border-bottom: 1px solid #eaeefb;

      .col {
        font-size: 14px;
      }
    }
  }

  .innerlist {
    height: 70%;

    // overflow: auto;
    .innertable {
      // overflow: hidden;
      height: 100%;
      overflow: auto;
    }
  }

  .statistics{
    position: absolute;
    bottom:0;
    left:5px;
  }
}
</style>


<template>
  <div class="block">
    <el-header class="bodyheader">
      <div>
        <h1>{{currentMenuName.menuName}}</h1>
        <p>{{currentMenuName.menuNameEN}}</p>
      </div>
      <div class="fr usernav">
      </div>
      <!-- </usernav> -->
    </el-header>
    <div class="bodyinner">
      <el-row>
        <el-col :span="2" class="col">部门</el-col>
        <el-col :span="22">
          <el-checkbox-group v-model="department" @change="departmentChange">
            <el-checkbox class="checkbox" v-for="item in organizational.department" :label="item.department" :key="item.department"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" class="col">职位</el-col>
        <el-col :span="22">
          <el-checkbox-group v-model="position" @change="positionChange">
            <el-checkbox class="checkbox" v-for="item in organizational.position" :label="item.position" :key="item.position"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" class="col">职称</el-col>
        <el-col :span="22">
          <el-checkbox-group v-model="competent" @change="competentChange">
            <el-checkbox class="checkbox" v-for="item in organizational.competent" :label="item.competent" :key="item.competent"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>

    </div>
    <div class="innerlist">
      <el-table :data="userlist.userlist" stripe style="width: 1280px" height="100%" v-loading="loading">
        <el-table-column sortable fixed prop="jobid" label="工号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="100">
        </el-table-column>
        <el-table-column prop="position" label="职位" width="100">
        </el-table-column>
        <el-table-column prop="competent" label="职称" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200">
        </el-table-column>
        <el-table-column prop="entry" label="入职日期" width="150" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="become" label="转正日期" width="150" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="contractstart" label="合同开始" width="150" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="contractend" label="合同结束" width="150" :formatter="dateFormat">
        </el-table-column>
      </el-table>
    </div>
    <div class="statistics">
      <span >当前共找到 {{userlist.amount}} 条数据</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentMenuName"],
  data() {
    return {
      department: [],
      position: [],
      competent: []
    };
  },
  methods: {
    departmentChange(val) {
      this.$store.commit(
        "AddOrChangeFilters",
        val.length > 0
          ? {
              filter_name: "department",
              value: val
            }
          : {
              filter_name: "department",
              value: ""
            }
      );
      // console.log(val)
    },
    positionChange(val) {
      this.$store.commit(
        "AddOrChangeFilters",
        val.length > 0
          ? {
              filter_name: "position",
              value: val
            }
          : {
              filter_name: "position",
              value: ""
            }
      );
      // console.log(val);
    },
    competentChange(val) {
      this.$store.commit(
        "AddOrChangeFilters",
        val.length > 0
          ? {
              filter_name: "competent",
              value: val
            }
          : {
              filter_name: "competent",
              value: ""
            }
      );
      // console.log(val);
    },
    // 表格中显示的日期进行格式装换
    dateFormat(row,column){
        //得到每一行的日期列的数据
        var date = row[column.property];
        if(date == undefined) return "";
        //进行格式转化
        return this.$moment(Number(date)).format("YYYY-MM-DD");
    }
  },
  computed: {
    userlist() {
      return this.$store.state.userinfo;
    },
    organizational() {
      return this.$store.state.organizational;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  watch: {
    "$store.state.userinfo.filters"() {
      // console.log(1);
      // console.log(this.data.date)
      this.$store.state.userinfo.filters.length == 0 ? this.$store.commit("USERLISTCHANGE") : this.$store.dispatch("ALL","all");
    }
  }
};
</script>
