<template>
  <el-container>
    <el-aside width="auto">
      <Menu :isShow="isShow"/>
    </el-aside>
    <el-container>
      <el-header>
        <Header @clickArrow="handleClickArrow"/>
      </el-header>
      <el-main>
        <BreadCrumb/>
        Main
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../components/Header.vue";
import BreadCrumb from "../components/BreadCrumb.vue";
import Menu from "../components/Menu.vue";

export default {
  data(){
    return {
      isShow:false
    }
  },
  components: {
    Header,
    BreadCrumb,
    Menu
  },
  methods:{
    handleClickArrow(){
      this.isShow = !this.isShow
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > div > .el-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
