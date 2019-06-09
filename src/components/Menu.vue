<template>
  <el-menu
    :default-active="num"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isShow">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-truck"></i>
        <span>购物商城</span>
      </template>
      <el-menu-item-group class="inheritColor">
        <el-menu-item index="1-1" @click="changeGoodsListNum">
          <router-link to="/admin/goods-list">商品管理</router-link>
        </el-menu-item>
        <el-menu-item index="1-2" @click="changeCategoryNum">
          <router-link to="/admin/category">栏目管理</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      num: localStorage.getItem("num") || "1-1"
    };
  },
  props: ["isShow"],
  methods: {
    changeGoodsListNum() { 
      localStorage.setItem("num", "1-1");
    },
    changeCategoryNum() {
      localStorage.setItem("num", "1-2");
    }
  }
};
</script>

<style>
.inheritColor a {
  color: inherit;
  text-decoration: none;
  display: block;
  width: 160px;
}
.el-menu-vertical-demo {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
