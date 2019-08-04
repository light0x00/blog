<template>
  <div class="full-box" style="display:flex;justify-content:center">
    <!-- 导航栏 -->
    <!-- position:fixed;width:100%;height:50px;z-index:1;transition: top 0.3s; -->
    <navbar
      id="navbar"
      style="position: fixed;z-index: 10;width:100%;"
      v-bind:sidebarVisible.sync="sidebarVisible"
    ></navbar>
    <!-- 侧边栏 -->
    <!-- <div style="position:fixed;height:100%;left:0;width:70%;"> -->
    <sidebar :visible.sync="sidebarVisible"></sidebar>
    <!-- 博客 -->
    <div
      style="display:flex;justify-content:center;height: calc(100% - 50px);position:relative;top:50px"
      :style="{width:isMobile()?'100%':'60%'}"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbar from "@/views/navbar";
import sidebar from "@/views/sidebar";
import { isMobile } from "@/common/utils";


import Headroom from "headroom.js";

export default {
  name: "layout",
  components: {
    navbar: navbar,
    sidebar: sidebar
  },
  data: function() {
    return {
      sidebarVisible: false
    };
  },
  mounted() {
    let eleNavbar = document.getElementById("navbar");

    var headroom = new Headroom(eleNavbar, {
      offset: 205,
      tolerance: 10,
      classes: {
        pinned : "navbar--pinned",
        // when scrolling down
        unpinned : "navbar--unpinned",
      }
    });
    headroom.init();
    this.$once("hook:beforeDestroy", function() {
      headroom.destroy();
    });
  }
};
</script>

<style>
.narrow-box {
  width: 70%;
  color: red;
}
.navbar--unpinned {
  animation: fade-out 0.5s forwards;
}

.navbar--pinned {
  animation: fade-in 0.5s forwards;
}

.headroom--top{
  position:static
}

</style>
