import Vue from 'vue'
import App from "./App.vue"

//路由
import VueRouter from "vue-router"
import Login from "./pages/Login.vue"
import Index from "./pages/Index.vue"
import GoodsList from "./pages/GoodsList.vue"
import Category from "./pages/Category.vue"
import GoodsAdd from "./pages/GoodsAdd.vue"
import GoodsEdit from "./pages/GoodsEdit.vue"

//element-ui插件
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

// 导入仓库
import store from "./store"

//axios
import axios from "axios"
Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [{
  path: "/",
  redirect: "/admin/goods-list",
  meta: "商品列表"
}, {
  path: "/login",
  component: Login
}, {
  path: "/admin",
  component: Index,
  meta: "首页",
  children: [{
      path: "goods-list",
      component: GoodsList,
      meta: "商品列表",
    },
    {
      path: "goods-add",
      component: GoodsAdd,
      meta: "添加商品",
    },
    {
      path: "goods-edit/:id",
      component: GoodsEdit,
      meta: "编辑商品",
    },
    {
      path: "category",
      component: Category,
      meta: "栏目列表",
    }
  ]
}]

const router = new VueRouter({
  routes
})



router.beforeEach((to,from,next) => {
  // console.log(to);
  // console.log(from);
  axios({
    method:"get",
    url: "http://localhost:8899/admin/account/islogin",
    withCredentials: true
  }).then(res => {
    // console.log(res);
    const {code} = res.data
    // console.log(code);

    if (to.path == "/login") {
      if (code == "nologin") {
        next()
      } else {
        next("/admin/goods-list")
      }
    }else{
      if (code == "nologin"){
        next("/login")
      }else{
        next()
      }
    }
  })
  
  
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')