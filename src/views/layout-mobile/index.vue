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
      <div class="content-inner-wrapper">
        <router-view></router-view>
      </div>
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
  mounted() {
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
  /* display: flex;
  flex-direction: column;
  align-items: center; */
}

.navbar-wrapper {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  /* border-bottom: solid 1px #e6e6e6; */
  background-color: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  height: 50px;
  width: 100%;
  z-index: 2;
}
.content-wrapper {
  min-height: calc(100% - 50px);
  /* height: 100%; */
  display: flex;
  justify-content: center;
  position: relative;
  top: 50px;
  width: 100%;
}

.content-inner-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
}

@media (min-width: 1800px) {
  .content-inner-wrapper {
    width: 50%;
  }
}

@media (min-width: 900px) and (max-width: 1800px) {
  .content-inner-wrapper {
    width: 60%;
  }
}

@media (max-width: 900px) {
  .content-inner-wrapper {
    width: 100%;
  }
}
</style>
