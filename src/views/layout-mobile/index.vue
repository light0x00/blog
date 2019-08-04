<template>
  <div class="full-box">
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
      style="display:flex;justify-content:center;height: calc(100% - 50px);width:100%;position:relative;top:50px"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbar from "@/views/navbar";
import sidebar from "@/views/sidebar";
import { isMobile } from "@/common/utils";

// var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
//   var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     document.getElementById("navbar").style.top = "0";
//   } else {
//     document.getElementById("navbar").style.top = "-50px";
//   }
//   prevScrollpos = currentScrollPos;
// }

import Headroom from "headroom.js";

// var headroom = new Headroom(,{onUnpin:()=>console.log("un!!")});
// initialise
// headroom.init();
// onUnpin;
//

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
.headroom--unpinned {
  animation: fade-out 0.5s forwards;
}

.headroom--pinned {
  color: red;
  animation: fade-in 0.5s forwards;
}

.headroom--top{
  position:static
}

</style>
