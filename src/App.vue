<style lang="stylus" scoped>
.index {
  background-color: #d2d6de;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.header {
  background-color: #3c8dbc;
  color: #fff;
  text-align: center;
  line-height: 50px;
  padding: 0;

  p {
    width: 200px;
    color: #fff;
  }

  .left {
    height: 100%;
    width: calc(100% - 240px);
    padding: 0 20px;

    a {
      padding: 0 15px;
      cursor: pointer;
      text-decoration: none;

      img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        margin-right: 10px;
        border-radius: 50%;
      }

      span {
        font-size: 12px;
        color: #fff;
      }
    }

    a:hover {
      background: rgba(0, 0, 0, 0.1);
      color: #f6f6f6;
    }
  }
}

.el-footer {
  background: #fff;
  line-height: 40px;
  color: #444;
  border-top: 1px solid #eee;
  font-size: 12px;

  strong {
    font-weight: 600;

    a {
      color: #3c8dbc;
    }
  }

  b {
    a {
      font-weight: 600;
      color: #3c8dbc;
    }
  }
}

.el-aside {
  background-color: #222d32;
  color: #333;

  ul {
    border: none;
  }

  // text-align: center;
  // line-height: 200px;
  .el-menu-vertical-demo {
    width: 100%;
  }
}

.el-main {
  background-color: #fff;
  color: #333;
  padding: 10px 10px 10px 10px;
}

// .bodyheader {
// background-color: #fff;
// // width: 500px;
// position: relative;
// // z-index 1;
// // box-sizing:none;
// padding: 10px 0 10px 10px;

// div {
// display: inline-block;
// // width: 500px;
// line-height: 18px;

// h1 {
// display: inline-block;
// font-size: 18px;
// font-weight: 500;
// margin-left: 1px;
// }

// p {
// display: inline-block;
// font-size: 12px;
// font-weight: 300;
// color: #777;
// margin-left: 3px;
// }
// }
// .mr{
// margin-right :10px;
// }
// }
.el-container {
  height: 100%;
}

.bodybox {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: auto;
}

::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <div class="index">
    <template v-if="$route.meta.nameEn ==='login'">
      <router-view/>
    </template>
    <template v-if="$route.meta.nameEn ==='register'">
      <router-view/>
    </template>
    <el-container v-if="$route.meta.nameEn !=='login' && $route.meta.nameEn !=='register'">
      <el-header height="50px" class="header">
        <router-link to="/">
          <p class="fl">人力资源</p>
        </router-link>
        <div class="fl left">Vuex
          <el-dropdown trigger="click" size="medium" class="fr" @command="handleCommand">
            <a href="###" class="fr">
              <img src="../static/img/home/defaultlogo.png" alt="User Image">
              <span>{{appid}}</span>
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="out">安全退出</el-dropdown-item>
              <el-dropdown-item command="infochange">个人信息修改</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="currentMenuNames.menuId" class="el-menu-vertical-demo" background-color="#222d32" text-color="#b8c7ce" active-text-color="#fff">
            <template v-for="(item,index) in menuList">
              <el-submenu :index="item.menuId" :key="index" v-if="item.children">
                <template slot="title">
                  <i :class="item.iconCls"></i>
                  <span>{{item.menuName}}</span>
                </template>
                <el-menu-item v-for="(child,key) in item.children" :index="child.menuId" :key="key" @click="routerGo(child)">{{child.menuName}}</el-menu-item>
              </el-submenu>
              <el-menu-item :index="item.menuId" v-if="!item.children" :key="index" @click="routerGo(item)">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.menuName}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-container height="100%">
          <el-main>
            <router-view :currentMenuName="currentMenuNames" :data="date" />
          </el-main>
          <el-footer height="40px">
            <strong>Copyright © 2017-2018
              <a href="#">
                李奕帆</a>
            </strong>
            All rights reserved. Powered by
            <b>
              <a href="https://cn.vuejs.org/">vue</a>
            </b>
            2.5.13
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          menuId: "0",
          menuName: "工作日程",
          menuNameEN: "Works Chedule",
          iconCls: "el-icon-date",
          comp: "",
          url: "/workschedule"
        },
        {
          menuId: "1",
          menuName: "用户信息",
          iconCls: "el-icon-location",
          comp: "",
          children: [
            {
              menuId: "1-1",
              menuName: "基本信息",
              menuNameEN: "Essential Information",
              comp: "",
              url: "/user/userinfo"
            },
            {
              menuId: "1-2",
              menuName: "用户筛选",
              menuNameEN: "Detailed Information",
              comp: "",
              url: "/user/advancedsearch"
            }
          ]
        },
        {
          menuId: "2",
          menuName: "组织架构",
          menuNameEN: "Organizational Structure",
          iconCls: "el-icon-share",
          comp: "",
          url: "/organization"
        },
        // {
        //   menuId: "3",
        //   menuName: "人事管理",
        //   menuNameEN: "Other",
        //   iconCls: "el-icon-tickets",
        //   comp: "",
        //   url: "/other"
        // },
        {
          menuId: "3",
          menuName: "行政流程",
          iconCls: "el-icon-tickets",
          comp: "",
          children: [
            {
              menuId: "3-1",
              menuName: "流程提交",
              menuNameEN: "Process Submission",
              comp: "",
              url: "/process/Submission"
            },
            {
              menuId: "3-2",
              menuName: "流程管理",
              menuNameEN: "Process Management",
              comp: "",
              url: "/process/Management"
            }
          ]
        }
      ],
      currentMenuNames: {
        menuId: "1-1",
        menuName: "基本信息",
        menuNameEN: "Essential Information"
      }
    };
  },
  mounted() {
    this.$Progress.finish();
  },
  methods: {
    // 路由跳转
    routerGo(menuList) {
      this.$router.push(menuList.url);
      // this.$store.commit("CURRENTMENUNAME",menuList);
      this.currentMenuNames.menuId = menuList.menuId;
      this.currentMenuNames.menuName = menuList.menuName;
      this.currentMenuNames.menuNameEN = menuList.menuNameEN;
      // this.$store.dispatch("ALL");
      // return menuList.menuId;
      // console.log(this.currentMenuName);
    },
    //登出按钮的登出方法
    handleCommand(command) {
      if (command === "out") {
        localStorage.removeItem("appid");
        localStorage.removeItem("token");
        this.$router.push("/login");
        this.$message({
          message: "您已安全退出",
          type: "success"
        });
      }
    }
  },
  computed: {
    appid(){
      return localStorage.getItem("appid");
    },
    userlist() {
      return this.$store.state.userinfo.userlist;
    },
    date() {
      // 查询工作日程数据
      // this.$store.dispatch("ALLWORKSCHEDULE");
      return this.$store.state.workschedule;
    }
  },
  created() {
    // 设置所有页面加载条
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      //  start the progress bar
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish();
    });

    //获取默认的数据
    // this.$store.dispatch("ALL"); //用户信息
    // this.$store.dispatch("ALLDEPARTMENT"); //部门信息
    // this.$store.dispatch("ALLPOSITION"); //职位信息
    // this.$store.dispatch("ALLCOMPETENT"); //职称信息
    // console.log(this.$route);
    // console.log(123);
  },
  watch: {
    $route(to, from) {
      // 页面刷新后 , 持久相关菜单信息
      this.currentMenuNames.menuId = to.meta.id;
      this.currentMenuNames.menuName = to.meta.name;
      this.currentMenuNames.menuNameEN = to.meta.nameEn;
      this.$store.commit("FILTERSCHANGE");
      this.$store.commit("SETCLIENTS",localStorage.getItem("appid")=='admin'?'100':localStorage.getItem("appid"));//设置登陆用的临时信息
      // // if (from.path != "/user/userinfo") {
      // //   this.$store.dispatch("ALL");
      // // }
      switch (to.path) {
        // case "/user":
        //   // this.$store.dispatch("ALL");
        //   this.currentMenuNames.menuId = to.meta.id;
        //   this.currentMenuNames.menuName = to.meta.name;
        //   this.currentMenuNames.menuNameEN = to.meta.nameEn;
        //   break;
        case "/workschedule":
          this.$store.dispatch("ALLWORKSCHEDULE");
          break;
        case "/user/userinfo":
          this.$store.dispatch("ALL");
          break;
        case "/":
          this.$store.dispatch("ALL", "all");
          break;
        case "/login":
          //访问登陆页面时检查是否已经登陆 , 如果已经登陆跳到首页
          if (window.localStorage.getItem("token"))
            return this.$router.push("/");
          break;
        case "/register":
          if (window.localStorage.getItem("token"))
            return this.$router.push("/");
          break;
        case "/organization":
          this.$store.dispatch("ALLDEPARTMENT"); //部门信息
          this.$store.dispatch("ALLPOSITION"); //职位信息
          this.$store.dispatch("ALLCOMPETENT"); //职称信息
          break;
        case "/user/advancedsearch":
          this.$store.dispatch("ALLDEPARTMENT"); //部门信息
          this.$store.dispatch("ALLPOSITION"); //职位信息
          this.$store.dispatch("ALLCOMPETENT"); //职称信息
          break;
        default:
          break;
      }
      // console.log(from)
    }
  }
};
</script>