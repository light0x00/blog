<template>
  <div class="application-wrapper">
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
        <router-view :style="{width:isMobile()?'100%':'60%'}"></router-view>
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
  },
  mounted(){
    this.$store.dispatch("player/initPlayer");
  }
};
</script>

<style>
.narrow-box {
  width: 70%;
  color: red;
}

.application-wrapper {
  height: 100%;
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
  z-index: 10;
}
.content-wrapper {
  min-height: calc(100% - 50px);
  /* height: 100%; */
  display: flex;
  justify-content: center;
  position: relative;
  top: 50px;
}

.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
