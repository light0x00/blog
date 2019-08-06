<template>
  <div id="navbar">
    <el-button class="button-box" @click.native.stop="collapseSidebar">
      <i :class="sidebarVisible?'el-icon-s-unfold':'el-icon-s-fold'"></i>
    </el-button>

    <el-menu class="navbar-menu" mode="horizontal" router :default-active="$route.path">
      <el-menu-item index="/category">分类</el-menu-item>
      <el-menu-item index="/archive">归档</el-menu-item>
      <el-menu-item index="/tags">标签</el-menu-item>
    </el-menu>
    <el-button class="button-box" @click="$router.push('/')">
      <i style class="el-icon-s-home"></i>
    </el-button>
  </div>
</template>

<script>
import Headroom from "headroom.js";

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
  },
  mounted() {
    let eleNavbar = document.getElementById("navbar");
    let thisRef = this;

    var headroom = new Headroom(eleNavbar, {
      offset: 205,
      tolerance: 10,
      classes: {
        pinned: "navbar--pinned",
        // when scrolling down
        unpinned: "navbar--unpinned"
      },
      onPin: function() {
        console.log("pin!!!");
        thisRef.$emit("update:pin", true);
      },
      onUnpin: function() {
        console.log("unpin!!!");
        thisRef.$emit("update:pin", false);
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
.navbar-menu {
  border-bottom: none;
  width: calc(100% - 50px);
  height: 100%;
  background-color: inherit;
}

.navbar-menu.el-menu{
  border: none;
}
.navbar-menu .el-menu-item {
  height: 100%;
  display: flex;
  align-items: center;
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

.navbar--unpinned {
  animation: fade-out 0.5s forwards;
}

.navbar--pinned {
  animation: fade-in 0.5s forwards;
}

.headroom--top {
  position: static;
}
</style>
