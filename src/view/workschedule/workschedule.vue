<style lang="stylus" scoped>
.workschedule {
  width: 100%;
  height: 100%;
  position: relative;

  .bodyheader {
    height: 5%;
    background-color: #fff;
    width: 1000px;
    position: relative;
    // z-index 1;
    // box-sizing:none;
    padding: 10px 0 10px 10px;

    .left {
      display: inline-block;
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

    .right {
      position: absolute;
      // display: inline-block;
      line-height: 18px;
      top: 0;
      right: 0;

      div {
        display: inline-block;
        line-height: 40px;
        margin-right: 10px;

        span {
          padding: 0 5px;
        }
      }
    }
  }

  .inner {
    width: 100%;
    // padding-left: 10px;
    border-collapse: collapse;

    .box {
      width: 1000px;
      // margin: 0px auto;
      position: relative;
    }

    .box .calendar {
      // position: relative;
      background: #fff;
      width: 100%;
      /* margin: 30px auto; */
      /* border: 1px solid #eee; */
      border-radius: 0 0px 10px 10px;
      color: rgb(138, 138, 138);
    }

    .box .calendar table {
      width: 100%;
      // border: 0px solid #eee;
    }

    .box .calendar table th {
      padding: 10px;
      text-align: center;
      height: 50px;
      border-bottom: 1px solid #eee;
    }

    .box .calendar table tr {
      // border: 1px solid #eee;
    }

    .box .calendar table td {
      border-bottom: 1px solid #eee;
      height: 100px;
      text-align: right;
      vertical-align: top;
      padding: 10px;
      font-size: 12px;
    }

    .box .calendar table td.cur {
      color: #ccc;
    }

    .box .schedule {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      margin-top: 70px;
      color: rgb(138, 138, 138);
    }

    .box .schedule .scheduleBox {
      /* border: none; */
      height: 121px;
      padding-left: 3px;
    }

    .box .schedule div table {
      /* border: none; */
      width: 100%;
      height: 70px;
      /* padding-top:20px; */
      position: relative;
      top: 30px;
    }

    .box .schedule div table td {
      height: 23px;
    }

    .box .schedule div table td > div {
      /* padding-left: 10px; */
      font-size: 11px;
      line-height: 20px;
      background: rgba(20, 158, 238, 0.555);
      color: #fff;
      border-radius: 3px;
      padding-left: 3px;
    }
  }
}
</style>

<template>
  <div class="workschedule">
    <el-header class="bodyheader">
      <div class="left">
        <h1>{{currentMenuName.menuName}}</h1>
        <p>{{currentMenuName.menuNameEN}}</p>
      </div>
      <div class="right">
        <div>
          <el-button round @click="jian">
            <i class="el-icon-arrow-left"></i>
          </el-button>
          <span>{{data.date.year}}-{{data.date.month.toString().length == 1 ? `0${data.date.month}` : data.date.month}}</span>
          <el-button round @click="jia">
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
        <el-button @click="setdialog">新增</el-button>
      </div>
      <!-- </usernav> -->
    </el-header>
    <div class="inner">
      <div class="box">
        <div class="calendar">
          <table>
            <thead>
              <th>周日</th>
              <th>周一</th>
              <th>周二</th>
              <th>周三</th>
              <th>周四</th>
              <th>周五</th>
              <th>周六</th>
            </thead>
            <tbody>
              <tr v-for="(item,index) in calendar.length / 7">
                <td v-for="td in 7" :class="{cur:calendar[(td - 1) + index * 7].cur}">{{calendar[(td - 1) + index * 7].day}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="schedule">
          <div class="scheduleBox" v-for="(item,index) in schedule">
            <table>
              <tr v-for="tr in item">
                <td v-for="td in tr" :colspan="td.colspan" :style="{width : (997 / 7 * td.colspan)+'px'}">
                  <div @dblclick="setdialog(td.id)">{{td.title}}</div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <workdialog :dialog="dialog"></workdialog>
  </div>
</template>

<script>
import workdialog from "./workdialog";
export default {
  props: ["currentMenuName", "data"],
  data() {
    return {
      dialog: {
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
    calendar() {
      var calendarArr = [];
      var benyueDay = new Date(
        this.data.date.year,
        this.data.date.month,
        0
      ).getDate();
      //本月有多少天
      var benyueWeek = new Date(
        this.data.date.year,
        this.data.date.month - 1
      ).getDay();
      //本月第一天星期几
      var shangyueDay = new Date(
        this.data.date.year,
        this.data.date.month - 1,
        0
      ).getDate();
      //上个月有多少天

      var pmonth = this.data.date.month == 1 ? 12 : this.data.date.month - 1;
      //得到上一月
      var nmonth = this.data.date.month == 12 ? 1 : this.data.date.month + 1;
      //得到下一月
      var pyear =
        this.data.date.month == 1
          ? this.data.date.year - 1
          : this.data.date.year;
      //得到上一年
      var nyear =
        this.data.date.month == 12
          ? this.data.date.year + 1
          : this.data.date.year;
      //得到下一年

      function fulldayFix(shu) {
        //用于修正日期显示 , 月和日数只有一位数的时候 , 前面补0
        //比如 201722 修正为20170202
        return shu.toString().length > 1
          ? shu.toString()
          : "0" + shu.toString();
      }

      while (benyueWeek--) {
        //往日历数组中添加上个月剩余的尾数
        //拿到benyueWeek本月第一天星期几然后循环减减 , 比如 1号(星期四) 则往前减得到上个月末尾的日期(29,30,31)
        calendarArr.unshift({
          day: shangyueDay,
          fullday: `${pyear}${fulldayFix(pmonth)}${fulldayFix(shangyueDay)}`,
          cur: true
        });
        shangyueDay--;
      }
      var day = 1;
      while (benyueDay--) {
        //本月的总天数 , 拿day初始值遍历++(相当于1号开始), 添加到数组中
        calendarArr.push({
          //往日历数组中添加上个月剩余的尾数
          day: day,
          fullday: `${this.data.date.year}${fulldayFix(
            this.data.date.month
          )}${fulldayFix(day)}`,
          cur: false
        });
        day++;
      }

      var xiaGeYueKaiTou =
        calendarArr.length <= 35
          ? 35 - calendarArr.length
          : 42 - calendarArr.length;
      //calendarArr的长度如果小于35相当于本月只有5周 , 否则就是6周(5周恒定为35天铺满整个日历,6周恒定为42天铺满整个日历)
      //得到下个月开头的日期就是35或42减去calendarArr的长度得到
      var day = 1;
      while (xiaGeYueKaiTou--) {
        //往日历数组中添加下个月开头的日期
        calendarArr.push({
          day: day,
          fullday: `${nyear}${fulldayFix(nmonth)}${fulldayFix(day)}`,
          cur: true
        });
        day++;
      }
      // console.log(morendata);
      //最终返回一个完整的日历数组 , 后面可以用来渲染到DOM上门
      return calendarArr;
    },

    schedule() {
      //工作的数据数组
      //这些数据是一个多维数组
      var scheduleArr = [];
      for (var i = 0; i < this.calendar.length / 7; i++) {
        //遍历calendar返回的数组长度 / 7 得到当月是(5或6周)
        //相当于日历界面中的每一大行
        scheduleArr.push([]);
        //得到当月周数以空数组形式添加到大的数组中
        for (var j = 0; j < 3; j++) {
          //这条遍历指的是每一大行中最多可以添加多少行数据
          //这里最大为3行
          // console.log(j);
          scheduleArr[i].push([]);
          //得到行数以空数组形式添加到大的数组中
          for (var ii = 0; ii < 7; ii++) {
            //这条遍历指的是每一大行中多少列 , 一个星期为 7 天
            //这里为 7 ;

            scheduleArr[i][j].push({
              //这里是指每一大行(周)中的每一个列(天)中的数据
              colspan: 1,
              fullday: this.calendar[i * 7 + ii].fullday,
              xingqi: ii
            });
            // console.log(this.calendar[i*7+ii].fullday);
          }
        }
      }
      var self = this;
      //遍历data的外部工作数据(从每一个数据中去遍历scheduleArr的内部工作数据(每一个大周))
      this.$store.state.workschedule.morendata.forEach(function(item) {
        // if(item.start)
        if (item.start < self.calendar[0].fullday) {
          item.start = self.calendar[0].fullday;
        }

        var startTime = new Date(
          item.start.substr(0, 4),
          item.start.substr(4, 2) - 1,
          item.start.substr(6, 2)
        ); //得到数据开始时间的new Date对象
        var endTime = new Date(
          item.end.substr(0, 4),
          item.end.substr(4, 2) - 1,
          item.end.substr(6, 2)
        ); //得到数据结束时间的new Date对象
        var timeDay = (endTime - startTime) / 86400000 + 1; //得到new Date对象后就可以计算工作数据为几天

        if (timeDay < 0) {
          return;
        }
        // console.log(item);
        var flag = true; //锁头
        scheduleArr.forEach(function(week, weekidx) {
          //遍历scheduleArr的工作数据
          for (var i = 0; i < 3; i++) {
            //遍历tr(就是每一个大周中每一天中的那三行tr)
            for (var j = 0; j < 7; j++) {
              //遍历td(就是每一天的td)
              // console.log(week[i][j])
              if (week[i][j]) {
                if (
                  week[i][j].fullday == item.start &&
                  flag &&
                  !week[i][j].title
                ) {
                  //判断每一天数据中的开始时间是否等同morendata中的开始时间 , 如果是 , 添加morendata中的数据
                  var nowTimeDay =
                    timeDay + week[i][j].xingqi <= 7
                      ? timeDay
                      : 7 - week[i][j].xingqi;
                  //nowTimeDay 计算工作数据长度是否跨度了当前的大周 , 如果跨过保留开始时间的日期到大周结束的日期 , 如果没跨过 , 恢复当前长度
                  // console.log(nowTimeDay);

                  //判断当前这一天是否有数据 , 有才能执行下面的代码 , 防止相同的天数显示被覆盖
                  week[i][j].id = item.id;
                  week[i][j].title = item.title;
                  week[i][j].colspan = nowTimeDay;
                  week[i].splice(j + 1, nowTimeDay - 1);

                  flag = false; //关锁

                  //下面是数据跨周的关键代码
                  var rest = timeDay - nowTimeDay;
                  // 工作数据总长度 减去 计算后nowTimeDay长度 得到 跨周后,剩余的工作数据长度
                  var count = 0; //记录跨了多少周
                  // console.log(rest > 0)
                  while (rest > 0) {
                    //如果有剩余的工作数据长度 , 代表跨周 , 进行遍历
                    count++; //得到跨周的次数
                    var nextTimeDay = rest >= 7 ? 7 : rest;

                    if (scheduleArr.length <= count + weekidx) return;

                    //计算跨周后剩余的长度是否大于 7 , 避免超出大周的天数
                    for (var ii = 0; ii < 3; ii++) {
                      //遍历跨周后的tr
                      if (scheduleArr[count + weekidx][ii][0].title) {
                        //判断跨周后是否有title , 如果有打断小循环执行下一次
                        continue;
                      }
                      //添加跨周后的字段
                      scheduleArr[count + weekidx][ii][0].id = item.id;
                      scheduleArr[count + weekidx][ii][0].title = item.title;
                      scheduleArr[count + weekidx][ii][0].colspan = nextTimeDay;
                      scheduleArr[count + weekidx][ii].splice(
                        1,
                        nextTimeDay - 1
                      );
                      break;
                    }
                    rest -= 7; //剩余的工作数据长度减去7 , 如果还大于0 ,下次循环继续跨周处理
                    // console.log(nextTimeDay);
                  }
                }
              }
            }
          }
        });
      });

      // console.log(data);
      return scheduleArr;
    }
  },
  methods: {
    jian() {
      // 日期视图加
      this.$store.commit("SETDATE", {
        year:
          this.data.date.month == 1
            ? this.data.date.year - 1
            : this.data.date.year,
        month: this.data.date.month == 1 ? 12 : this.data.date.month - 1
      });
    },
    jia() {
      // 日期视图减
      this.$store.commit("SETDATE", {
        year:
          this.data.date.month == 12
            ? this.data.date.year + 1
            : this.data.date.year,
        month: this.data.date.month == 12 ? 1 : this.data.date.month + 1
      });
    },
    setdialog(id) {
      // console.log(typeof(id));
      if (typeof id == "object") {
        this.dialog.dialogVisible = true;
        this.dialog.dialogTitle = "新增";
        this.dialog.dialogInfo = "取 消";
        this.dialog.dialogSuccess = "新 增";
        this.dialog.dialogDanger = "";
        this.dialog.title = "";
        this.dialog.start = "";
        this.dialog.end = "";
        this.dialog.id = "";
      } else {
        var vm = this;
        this.dialog.dialogVisible = true;
        this.dialog.dialogTitle = "修改";
        this.dialog.dialogInfo = "取 消";
        this.dialog.dialogSuccess = "修 改";
        this.dialog.dialogDanger = "删除";
        this.$store.state.workschedule.morendata.forEach(function(item) {
          if (item.id == id) {
            vm.dialog.title = item.title;
            vm.dialog.start = item.start;
            vm.dialog.end = item.end;
            vm.dialog.id = item.id;
            // console.log(vm.dialog.title);
          }
        });
      }
    }
  },
  components: {
    workdialog
  }
};
</script>


