<style lang="stylus" scoped>
.el-table::before{
  width:0
}
</style>

<template>
  <div>
    <el-dialog :title="forms.isState" :visible.sync="forms.dialogVisible">
      <el-form :model="formdata.leave" v-if="forms.isState=='请假申请'" >
        <el-form-item label="请假类型">
          <el-select v-model="formdata.leave.leavetype" placeholder="请选择活动区域">
            <el-option label="年假" value="年假"></el-option>
            <el-option label="事假" value="事假"></el-option>
            <el-option label="病假" value="病假"></el-option>
            <el-option label="调休" value="调休"></el-option>
            <el-option label="产假" value="产假"></el-option>
            <el-option label="陪产假" value="陪产假"></el-option>
            <el-option label="婚假" value="婚假"></el-option>
            <el-option label="例假" value="例假"></el-option>
            <el-option label="丧假" value="丧假"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="formdata.leave.starttime" value-format="timestamp" format="yyyy 年 MM 月 dd 日" style="width: 80%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="formdata.leave.endtime" value-format="timestamp" format="yyyy 年 MM 月 dd 日" style="width: 80%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="请假时长">
          <el-input v-model="formdata.leave.totaltime" style="width: 80%;" :placeholder="totaltimes"></el-input>
        </el-form-item>
        <el-form-item label="请假事由">
          <el-input type="textarea" v-model="formdata.leave.leavereason" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
      <el-table v-if="forms.isState=='请假申请管理'" :data="leavelist">
        <el-table-column property="name" label="申请人" width="80"></el-table-column>
        <el-table-column property="leavetype" label="类型" width="80"></el-table-column>
        <el-table-column property="starttime" label="开始时间" width="100" :formatter="dateFormat"></el-table-column>
        <el-table-column property="endtime" label="结束时间" width="100" :formatter="dateFormat"></el-table-column>
        <el-table-column property="totaltime" label="请假时长" width="80"></el-table-column>
        <el-table-column  label="操作" width="100%">
          <template slot-scope="scope">
            <el-button size="small" @click="viewLeave(scope.row)">查看/编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer" style="padding:0;" v-if="forms.isState=='请假申请'">
        <span class="fl">当前申请人:{{selectapplicant}}</span>
        <el-button @click="forms.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addprocess">确 定</el-button>
      </span>
      <el-dialog title="编辑" :visible.sync="innerVisible" append-to-body>
        <el-form :model="formdata.leave" v-if="forms.isState=='请假申请管理'">
          <el-form-item label="请假类型">
            <el-select v-model="formdata.leave.leavetype" placeholder="请选择活动区域">
              <el-option label="年假" value="年假"></el-option>
              <el-option label="事假" value="事假"></el-option>
              <el-option label="病假" value="病假"></el-option>
              <el-option label="调休" value="调休"></el-option>
              <el-option label="产假" value="产假"></el-option>
              <el-option label="陪产假" value="陪产假"></el-option>
              <el-option label="婚假" value="婚假"></el-option>
              <el-option label="例假" value="例假"></el-option>
              <el-option label="丧假" value="丧假"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="formdata.leave.starttime" value-format="timestamp" format="yyyy 年 MM 月 dd 日" style="width: 80%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="formdata.leave.endtime" value-format="timestamp" format="yyyy 年 MM 月 dd 日" style="width: 80%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="请假时长">
            <el-input v-model="formdata.leave.totaltime" style="width: 80%;" :placeholder="totaltimes"></el-input>
          </el-form-item>
          <el-form-item label="请假事由">
            <el-input type="textarea" v-model="formdata.leave.leavereason" style="width: 80%;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="padding:0;" v-if="forms.isState=='请假申请管理'">
        <span class="fl">申请人:{{formdata.name}}</span>
        <el-button @click="forms.dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="delprocess(formdata._id)">删 除</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["forms"],
  data() {
    return {
      formdata: {
        _id:"",
        name:"",
        applicant: "",
        leave: {
          leavetype: "",
          starttime: "",
          endtime: "",
          totaltime: "",
          leavereason: ""
        }
      },
      innerVisible:false
    };
  },
  computed: {
    totaltimes() {
      var totaltime =
        this.formdata.leave.endtime - this.formdata.leave.starttime;
      var day = Math.floor(totaltime / 86400000)+"天"; //计算后的时间戳转天数
      if (
        this.formdata.leave.endtime != "" &&
        this.formdata.leave.starttime != ""
      ) {
        this.formdata.leave.totaltime = day;
      }
      return "请选择时间(此处显示单位为天)";
    },
    selectapplicant() {
      //得到申请人姓名
      this.$store.state.userinfo.userlist.forEach(item => {
        if (item.jobid == this.$store.state.clients.appid) {
          return (this.formdata.applicant = item.name);
        }
      });
      return this.formdata.applicant;
    },
    leavelist() {
      //得到所有请假单列表
      return this.$store.state.process.leavelist;
    }
  },
  methods: {
    addprocess() {
      if (this.forms.isState == "请假申请") {
        //添加请假单
        this.$store.dispatch("ADDLEAVE", {
          jobid: this.$store.state.clients.appid,
          name: this.formdata.applicant,
          ...this.formdata.leave
        });
        this.forms.dialogVisible = false;
        this.formdata.leave.leavetype='';
        this.formdata.leave.starttime='';
        this.formdata.leave.endtime='';
        this.formdata.leave.totaltime='';
        this.formdata.leave.leavereason='';
      }
    },
    dateFormat(row, column) {
      //得到每一行的日期列的数据
      var date = row[column.property];
      if (date == undefined) return "";
      //进行格式转化
      return this.$moment(Number(date)).format("YYYY-MM-DD");
    },
    viewLeave(data) {
      this.innerVisible=true;
      this.formdata.leave = data;
      this.formdata._id = data._id;
      this.formdata.name = data.name;
    },
    delprocess(id){
      this.$store.dispatch("DELLEAVE",{"id":id});
      this.innerVisible = false;
    }
  }
};
</script>


