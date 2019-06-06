<template>
  <div id="app">
    <Header></Header>
    <el-button type="danger" round>危险按钮</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/HelloWorld.vue";
export default {
  components: {
    Header
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "https://api.github.com/users"
    }).then(res => {
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }
};
</script>

<style>
</style>
