<template>
  <div class="navbar-wrapper" style>
    <el-button class="button-box" @click.native.stop="collapseSidebar" >
      <i :class="sidebarVisible?'el-icon-s-unfold':'el-icon-s-fold'"></i>
    </el-button>

    <el-menu
      mode="horizontal"
      router
      :default-active="$route.path"
      style="border-bottom:none;width:calc( 100% - 50px )"
    >
      <!-- <el-menu-item index="/">首页</el-menu-item> -->
      <!-- <el-menu-item index="/list" @click="$router.push('')">列表</el-menu-item> -->
      <el-menu-item index="/category" @click="$router.push('/category')">分类</el-menu-item>
      <el-menu-item index="/archive">归档</el-menu-item>
      <el-menu-item index="/tags" @click="$router.push('')">标签</el-menu-item>
    </el-menu>
    <el-button class="button-box" @click="$router.push('/')">
      <i style class="el-icon-s-home"></i>
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    sidebarVisible: Boolean
  },
  data: function() {
    return {};
  },
  created() {},
  methods: {
    collapseSidebar() {
      this.$emit("update:sidebarVisible", !this.sidebarVisible);
    }
  }
};
</script>

<style>
.navbar-wrapper {
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  flex-wrap: nowrap;
  border-bottom: solid 1px #e6e6e6;
  background-color: #fff;
}

.navbar-wrapper .el-menu-item {
  height: 50px;
  line-height: 50px;
}

.button-box {
  border: none;
  border-bottom: none;
  background-color: inherit;
  height: 100%;
  font-size: 18px;
  /* font-size:30px; */
  margin-left: 0;
  height: inherit;
}

/* github配色 background-color="#24292e" text-color="hsla(0,0%,100%,.75)" active-text-color="#fff"  */
</style>
