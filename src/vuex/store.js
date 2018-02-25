import Vue from 'vue'
import Vuex from 'vuex'
import {
  Message
} from 'element-ui'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clients: {
      appid: '',
      name: '',
    },
    workschedule: {
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      },
      morendata: []
    },
    userinfo: {
      filters: [],
      userlist: [],

      pageandsort: {
        "page": 1,
        "pagesize": 14,
        "sortby": "jobid",
        "sortdirection": 1
      },
      amount: 0
    },
    organizational: {
      department: [],
      position: [],
      competent: [],
    },
    process: {
      leavelist: []
    },
    loading: true
  },
  mutations: {
    ALL(state, payload) {
      // 返回的用户信息更改到state中
      state.userinfo.userlist = payload.results;
      state.userinfo.amount = payload.amount;
      // console.log(moment);
    },
    AddOrChangeFilters(state, {
      filter_name,
      value
    }) {
      // commit传过来筛选条件的filter_name和value
      var isFilterNameExistFlag = false;
      // 判断state中的filters数组中是否存在filter_name
      state.userinfo.filters.forEach(item => item.hasOwnProperty(filter_name) && (isFilterNameExistFlag = true))
      if (!isFilterNameExistFlag) {
        // 如果不存在filter_name,添加进去
        state.userinfo.filters.push({
          [filter_name]: value
        })
      } else {
        // 如果存在则修改filter_name的value
        if (value != '') {
          // 判断value是否为空,不为空,则修改
          state.userinfo.filters = state.userinfo.filters.map(item => {
            item[filter_name] = value;
            return item;
          })
        } else {
          // 如果为空 , 删除这一项filter_name
          state.userinfo.filters = state.userinfo.filters.filter(item => {
            return Object.keys(item)[0] != filter_name;
          })
        }
      }
      // console.log(state.userinfo.filters);
    },
    SETCLIENTS(state, payload) {
      state.clients.appid = payload;
    },
    FILTERSCHANGE(state, payload) {
      // 跳转页面清空state中的筛选信息
      state.userinfo.userlist = [];
      state.userinfo.filters = [];
      state.userinfo.amount = 0;
    },
    USERLISTCHANGE(state, payload) {
      // 筛选条件空时清空state中的userlist
      state.userinfo.userlist = [];
      state.userinfo.amount = 0;
    },
    ALLDEPARTMENT(state, payload) {
      // 更改state的部门信息
      state.organizational.department = payload.results;
    },
    ALLPOSITION(state, payload) {
      // 更改state的职位信息
      state.organizational.position = payload.results;
    },
    ALLCOMPETENT(state, payload) {
      // 更改state的职称信息
      state.organizational.competent = payload.results;
    },
    pageChange(state, payload) {
      // 更改state的分页信息
      state.userinfo.pageandsort.page = payload
    },
    USERADD(state, payload) {
      // 添加state的用户信息
      state.userinfo.userlist.push(payload.results)
    },
    USERCHANGE(state, payload) {
      // state.userinfo.userlist.forEach(item => {
      //     if (item.id == payload.results[0].id){
      //         item=payload.results[0]
      //         console.log(item)
      //     }
      // })
      // 更改state的用户信息
      // console.log(payload)
      state.userinfo.userlist = state.userinfo.userlist.map(item => {
        if (item.id == payload.results[0].id) {
          return payload.results[0]
        }
        return item
      })
    },
    USERDEL(state, payload) {
      // 删除state指定的用户信息
      state.userinfo.userlist = state.userinfo.userlist.filter(item => {
        return item.id != payload.results.id;
      })
    },
    ORGANIZATIONALADD(state, {
      res,
      name
    }) {
      // 添加state中的组织架构信息
      state.organizational[name].push(res.results);
    },
    ORGANIZATIONALDEL(state, {
      key,
      val
    }) {
      // 删除state指定的组织架构信息
      state.organizational[key] = state.organizational[key].filter(item => {
        return item[key] != val
      })
    },
    SETDATE(state, payload) {
      state.workschedule.date = payload
    },
    ALLWORKSCHEDULE(state, payload) {
      // 添加state中的日程数据信息
      state.workschedule.morendata = payload;
      // console.log(state.workschedule.morendata)
    },
    ADDWORKSCHEDULE(state, payload) {
      // 在已有的state中的添加新增的日程数据信息
      state.workschedule.morendata.push(payload)
    },
    DELWORKSCHEDULE(state, payload) {
      state.workschedule.morendata = state.workschedule.morendata.filter(item => {
        return item.id != payload
      })
    },
    CHANGEWORKSCHEDULE(state, {
      id,
      start,
      end,
      title
    }) {
      // console.log(start, end, title)
      state.workschedule.morendata = state.workschedule.morendata.map(item => {
        if (item.id == id) {
          item.start = start;
          item.end = end;
          item.title = title;
          return item;
        }
        return item;
      })
    },
    ADDLEAVE(state, payload) {
      // console.log(payload);
      // state.process.processlist.push(payload)
    },
    ALLLEAVE(state, payload) {
      // console.log(payload)
      state.process.leavelist = payload;
    },
    DELLEAVE(state, payload){
      state.process.leavelist = state.process.leavelist.filter(item=>{
        return item._id != payload;
      })
    }
  },
  actions: {
    // 查询用户信息的异步
    ALL({
      commit,
    }, payload) {
      this.state.loading = true;
      // console.log(1);
      Vue.axios({
        method: 'post',
        url: '/api/all',
        data: {
          filters: this.state.userinfo.filters,
          pageandsort: payload == undefined ? this.state.userinfo.pageandsort : payload
        }
      }).then(res => {
        commit('ALL', res.data);
        this.state.loading = false;
      }).catch(err => {
        console.log("err");
      })
    },

    // 查询部门信息的异步
    ALLDEPARTMENT({
      commit
    }) {
      Vue.axios.get('/api/alldepartment').then(res => {
        commit('ALLDEPARTMENT', res.data);
      })
    },

    // 查询职位信息的异步
    ALLPOSITION({
      commit
    }) {
      Vue.axios.get('/api/allposition').then(res => {
        commit('ALLPOSITION', res.data);
      })
    },

    // 查询职位信息的异步
    ALLCOMPETENT({
      commit
    }) {
      Vue.axios.get('/api/allcompetent').then(res => {
        commit('ALLCOMPETENT', res.data);
      })
    },

    // 拉取分页信息的异步
    pageChange({
      commit
    }, payload) {
      commit('pageChange', payload)
    },

    // 增加用户信息的异步
    USERADD({
      commit
    }, payload) {
      Vue.axios({
        method: 'post',
        url: '/api/useradd',
        data: payload
      }).then(res => {
        Message({
          message: '用户添加成功',
          type: 'success'
        });
        commit('USERADD', res.data);
        // console.log(res);
      })
    },

    // 修改用户信息的异步
    USERCHANGE({
      commit
    }, payload) {
      Vue.axios({
        method: 'patch',
        url: '/api/userchange',
        data: payload
      }).then(res => {
        Message({
          message: '用户资料修改成功',
          type: 'success'
        });
        commit('USERCHANGE', res.data);
      })
      // console.log(payload)
    },

    // 删除用户的异步
    USERDEL({
      commit
    }, payload) {
      Vue.axios({
        method: 'DELETE',
        url: '/api/userdel',
        data: payload
      }).then(res => {
        Message({
          message: '用户删除成功',
          type: 'success'
        });
        commit('USERDEL', res.data);
      })
      // console.log(payload)
    },

    // 组织架构增加的异步
    ORGANIZATIONALADD({
      commit
    }, payload) {
      Vue.axios({
        method: 'post',
        url: '/api/organizationaladd',
        data: payload
      }).then(res => {
        commit('ORGANIZATIONALADD', {
          res: res.data,
          name: payload.key
        });
        // console.log(res);
      }).catch(err => {
        console.log("err");
      })
    },

    // 组织架构删除的异步
    ORGANIZATIONALDEL({
      commit
    }, payload) {
      Vue.axios({
        method: 'DELETE',
        url: '/api/organizationaldel',
        data: payload
      }).then(res => {
        commit('ORGANIZATIONALDEL', res.data.results);
        // console.log(res.data);
      })
    },

    // 查询工作日程数据的异步
    ALLWORKSCHEDULE({
      commit
    }) {
      Vue.axios.get('/api/allworkschedule?year=' + this.state.workschedule.date.year + '&month=' + this.state.workschedule.date.month).then(res => {
        commit('ALLWORKSCHEDULE', res.data.results);
        // console.log(res);
      })
    },

    // 增加工作日程的异步
    ADDWORKSCHEDULE({
      commit
    }, payload) {
      Vue.axios({
        method: 'post',
        url: '/api/addworkschedule',
        data: payload
      }).then(res => {
        commit('ADDWORKSCHEDULE', res.data.results);
        // console.log(res);
      }).catch(err => {
        console.log("err");
      })
    },

    // 删除工作日程的异步
    DELWORKSCHEDULE({
      commit
    }, payload) {
      Vue.axios({
        method: 'DELETE',
        url: '/api/delworkschedule',
        data: payload
      }).then(res => {
        commit('DELWORKSCHEDULE', res.data.results);
        // console.log(res);
      }).catch(err => {
        console.log("err");
      })
    },

    // 修改工作日程的异步
    CHANGEWORKSCHEDULE({
      commit
    }, payload) {
      Vue.axios({
        method: 'PATCH',
        url: '/api/changeworkschedule',
        data: payload
      }).then(res => {
        commit('CHANGEWORKSCHEDULE', res.data.results);
        // console.log(res.data.results);
      }).catch(err => {
        console.log("err");
      })
    },

    //添加请假单的异步
    ADDLEAVE({
      commit
    }, payload) {
      Vue.axios({
        method: 'post',
        url: '/api/addleave',
        data: payload
      }).then(res => {
        Message({
          message: '请假申请提交成功',
          type: 'success'
        });
        // commit('ADDLEAVE', res.data.results);
        // console.log(res);
      })
    },

    //查询所有请假单的异步
    ALLLEAVE({
      commit
    }, payload) {
      Vue.axios.get('/api/allleave').then(res => {
        commit('ALLLEAVE', res.data.results);
      })
    },

    //删除请假单的异步
    DELLEAVE({
      commit
    }, payload) {
      Vue.axios({
        method: 'post',
        url: '/api/delleave',
        data: payload
      }).then(res => {
        commit('DELLEAVE', res.data.results)
      })
    }
  }
})
