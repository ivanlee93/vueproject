import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: "/login",
    meta: {
      name: "登陆页面",
      nameEn: "login"
    },
    component: () => System.import("../view/login/login.vue"),
  }, {
    path: "/register",
    meta: {
      name: "注册页面",
      nameEn: "register"
    },
    component: () => System.import("../view/login/register.vue"),
  }, {
    path: "/",
    meta: {
      // id:"0",
      name: "系统主页",
      nameEn: "System home",
      auth: true
    },
    component: () => System.import("../view/home/home.vue"),
  }, {
    path: "/workschedule",
    meta: {
      id: "0",
      name: "工作日程",
      nameEn: "Works Chedule",
      auth: true
    },
    component: () => System.import("../view/workschedule/workschedule.vue"),
  }, {
    path: "/user/userinfo",
    meta: {
      id: "1-1",
      name: "基本信息",
      nameEn: "Essential Information",
      auth: true
    },
    component: () => System.import("../view/userinfo/userinfo.vue"),
  }, {
    path: "/user/advancedsearch",
    meta: {
      id: "1-2",
      name: "用户筛选",
      nameEn: "Detailed Information",
      auth: true
    },
    component: () => System.import("../view/userinfo/advancedsearch.vue"),
  }, {
    path: "/organization",
    meta: {
      id: "2",
      name: "组织架构",
      nameEn: "Organizational Structure",
      auth: true
    },
    component: () => System.import("../view/organization/organization.vue"),
  }, {
    path: "/other",
    meta: {
      id: "3",
      name: "其他设置",
      nameEn: "Other",
      auth: true
    },
    component: () => System.import("../view/other/other.vue"),
  }, {
    path: "/process/Submission",
    meta: {
      id: "3-1",
      name: "流程提交",
      nameEn: "Process Submission",
      auth: true
    },
    component: () => System.import("../view/personnel/processSubmission.vue"),
  }, {
    path: "/process/Management",
    meta: {
      id: "3-2",
      name: "流程管理",
      nameEn: "Process Management",
      auth: true
    },
    component: () => System.import("../view/personnel/processManagement.vue"),
  }, {
    path: "*",
    redirect: '/login'
  }],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    if (window.localStorage.getItem('token')) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
})

export default router;
