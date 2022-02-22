<template>
  <el-container>
    <el-header class="header">
      头部
    </el-header>
    <el-container class="container">
      <el-aside class="aside">
        <el-menu></el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.header{
  height: 60px;
  text-align: center;
  background: pink;
  line-height: 60px;
}
.container{
  height: 500px;
  box-sizing: border-box;
  .aside{
    width: 100px;
    background: burlywood;
    height: 100%;
  }
}

</style>