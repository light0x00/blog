<template>
  <div class="full-box">
    <!-- 导航栏 -->
    <navbar
      class="navbar-wrapper"
      :pin.sync="navbarPin"
      v-bind:sidebarVisible.sync="sidebarVisible"
    ></navbar>
    <!-- 侧边栏 -->
    <sidebar :visible.sync="sidebarVisible"></sidebar>
    <!-- 博客 -->
    <div class="content-wrapper" :style="{top:navbarPin?'50px':'0'}">
      <router-view :style="{width:isMobile()?'100vw':'60vw'}"></router-view>
    </div>
  </div>
</template>

<script>
import navbar from "@/views/navbar";
import sidebar from "@/views/sidebar";
import { isMobile } from "@/common/utils";

export default {
  name: "layout",
  components: {
    navbar: navbar,
    sidebar: sidebar
  },
  data: function() {
    return {
      sidebarVisible: false,
      navbarPin: true
    };
  },
  methods: {
    onNavbarPin() {},
    onNavbarUnpin() {}
  }
};
</script>

<style>
.narrow-box {
  width: 70%;
  color: red;
}

.navbar-wrapper {
  position: fixed;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  /* border-bottom: solid 1px #e6e6e6; */
  background-color: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  height: 50px;
  width: 100%;
  z-index:10;
}
.content-wrapper {
  display: flex;
  height: calc(100% - 50px);
  justify-content: center;
  position: relative;
  /* top: 50px; */
}
</style>
