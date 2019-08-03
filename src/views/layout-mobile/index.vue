<template>
  <div class="full-box">
    <!-- 导航栏 -->
    <navbar id="navbar" style="position:fixed;width:100%;height:60px;z-index:1;transition: top 0.3s;" v-bind:sidebarVisible.sync="sidebarVisible"></navbar>
    <!-- 侧边栏 -->
    <!-- <div style="position:fixed;height:100%;left:0;width:70%;"> -->
    <sidebar :visible.sync="sidebarVisible"></sidebar>
    <!-- 博客 -->
    <div style="display:flex;justify-content:center;height: calc(100% - 20px);width:100%;position:relative;top:60px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbar from "@/views/navbar";
import sidebar from "@/views/sidebar";
import {isMobile} from "@/common/utils";


var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-60px";
  }
  prevScrollpos = currentScrollPos;
}

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
  }
};
</script>

<style>

.narrow-box{
  width:70%;
  color:red;
}


</style>
