<style lang="stylus" scoped>
.personnel {
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

    ul li {
      width: 200px;
      margin-right: 30px;
      margin-bottom: 30px;
      float:left;
      cursor pointer;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
      text-align:center;
      span{
        font-size:13px;
        color:#777
      }
    }

    img {
      width: 60px;
      display: inline-block;
      border-radius:10px;
      
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
  <div class="personnel">
    <el-header class="bodyheader">
      <div>
        <h1>{{currentMenuName.menuName}}</h1>
        <p>{{currentMenuName.menuNameEN}}</p>
      </div>
      <!-- </usernav> -->
    </el-header>
    <div class="inner">
      <ul>
        <li v-for="item in processdata" @click="Submission(item.name)">
          <el-card :body-style="{ padding: '30px 50px',textAlign:'center'}">
            <img :src="item.src" />
            <div class="bottom clearfix" style="padding: 0px;"><span>{{item.name}}</span></div>
          </el-card>
        </li>
      </ul>
    </div>
    <processDialog :forms="forms" ></processDialog>
  </div>
</template>

<script>
import processDialog from './processDialog';
export default {
  props: ["currentMenuName"],
  data () {
    return {
      processdata:[
        {name:'请假申请',src:"../../../static/img/personnel/qingjia.png"},
        {name:'出差申请',src:"../../../static/img/personnel/chuchai.png"},
        {name:'外出申请',src:"../../../static/img/personnel/waichu.png"},
        {name:'加班申请',src:"../../../static/img/personnel/jiaban.png"},
        {name:'转正申请',src:"../../../static/img/personnel/zhuanzheng.png"},
        {name:'报销申请',src:"../../../static/img/personnel/baoxiao.png"},
        {name:'物品领用',src:"../../../static/img/personnel/wuping.png"},
        {name:'离职申请',src:"../../../static/img/personnel/lizhi.png"}
      ],
      forms:{
        dialogVisible:false,
        isState:""
      }
    }
  },
  methods: {
    Submission(name){
      switch (name) {
        case "请假申请":
          this.forms.isState = name;
          this.forms.dialogVisible = true;
          break;
        default:
          this.$message({
              message: '^_^ 功能开发中',
              type: 'warning'
            });
          break;
      }
    }
  },
  components: {
    processDialog
  },
  created () {
    this.$store.dispatch("ALL", "all");
  }
};
</script>

