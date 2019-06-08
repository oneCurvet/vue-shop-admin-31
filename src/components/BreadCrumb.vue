<template>
  <el-breadcrumb separator-class="el-icon-caret-right" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {};
</script>

<style>
.breadcrumb{
    padding-bottom: 10px;
    border-bottom: 1px solid #000;
}
</style>
