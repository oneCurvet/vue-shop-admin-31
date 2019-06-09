import Vue from 'vue'
import App from "./App.vue"

//路由
import VueRouter from "vue-router"
import Login from "./pages/Login.vue"
import Index from "./pages/Index.vue"
import GoodsList from "./pages/GoodsList.vue"
import Category from "./pages/Category.vue"
//element-ui插件
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

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
      path: "category",
      component: Category,
      meta: "栏目列表",
    }
  ]
}]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')