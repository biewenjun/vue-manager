<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2020-05-13 21:13:46
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2020-05-13 21:31:52
 -->
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{firstmenu}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{secmenu}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'breadcrumb',
  props: [
      'firstmenu',
      'secmenu'
  ]
}
</script>