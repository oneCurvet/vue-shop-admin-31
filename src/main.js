import Vue from 'vue'
import App from "./App"

//路由
import VueRouter from "vue-router"
import Login from "./components/Login.vue"
//element-ui插件
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

//axios
import axios from "axios"
Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [{
  path: "/login",
  component: Login
}]

const router = new VueRouter({routes})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')