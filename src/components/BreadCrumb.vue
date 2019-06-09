<template>
  <el-breadcrumb separator-class="el-icon-caret-right" class="breadcrumb">
    <el-breadcrumb-item v-for="(item,index) in meta" :key="index">{{item.meta}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      meta: []
    };
  },
  watch: {
    $route() {
      // console.log(this.$route.matched);
      this.meta = this.$route.matched;
      // console.log(this.meta);
    }
  },
  mounted() {
    this.meta = this.$route.matched;
  }
};
</script>

<style>
.breadcrumb {
  padding-bottom: 5px;
  border-bottom: 1px solid #999;
}
</style>
