<style lang="stylus" scoped>
.el-inputTop {
  margin-top: 20px;
  width: 350px;
}

.el-dialogCenter {
  div {
    div {
      display: inline-block;
      width: 160px;
    }

    span {
      display: inline-block;
      width: 20px;
    }
  }

  text-align: center;
}

.el-dateW {
  width: 130px;
}
</style>

<template>
  <el-dialog :title="dialog.dialogTitle" :visible.sync="dialog.dialogVisible" width="450px">
    <div class="el-dialogCenter">
      <div>
        <div class="block">
          <el-date-picker v-model="dialog.start" type="date" placeholder="开始日期" value-format="yyyyMMdd">
          </el-date-picker>
        </div>
        <span>至</span>
        <div class="block">
          <el-date-picker v-model="dialog.end" type="date" placeholder="结束日期" value-format="yyyyMMdd">
          </el-date-picker>
        </div>
      </div>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dialog.title" class="el-inputTop">

      </el-input>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="del" v-if="dialog.dialogDanger=='删除'">{{dialog.dialogDanger}}</el-button>
      <el-button type="info" @click="dialog.dialogVisible = false">{{dialog.dialogInfo}}</el-button>
      <el-button type="success" @click="submit">{{dialog.dialogSuccess}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["dialog"],
  methods: {
    del() {
      this.$store.dispatch("DELWORKSCHEDULE", { id: this.dialog.id });
      this.dialog.dialogVisible = false;
    },
    submit() {
      var id = "";
      var str = "1234567890";
      for (var i = 0; i < 8; i++) {
        id += str[~~(Math.random() * str.length)];
      }
      if (this.dialog.dialogTitle == "新增") {
        this.$store.dispatch("ADDWORKSCHEDULE", {
          id: id,
          start: this.dialog.start,
          end: this.dialog.end,
          title: this.dialog.title
        });
      } else if (this.dialog.dialogTitle == "修改") {
        this.$store.dispatch("CHANGEWORKSCHEDULE", {
          id: this.dialog.id,
          start: this.dialog.start,
          end: this.dialog.end,
          title: this.dialog.title
        });
      }
      this.dialog.dialogVisible = false;
      this.dialog.start = "";
      this.dialog.end = "";
      this.dialog.title = "";
      this.$store.dispatch("ALLWORKSCHEDULE");
    }
  }
};
</script>

