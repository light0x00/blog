<template>
  <div class="dock-button-wrapper" >
    <i :class="iconClass"></i>
  </div>
</template>

<script>
import Headroom from "headroom.js";
import Tween from "@/common/tween";

export default {
  name: "dock-button",
  props: {
    iconClass: ""
  },
  data() {
    return {
    };
  },
  mounted() {
    let eleDockBtn = this.$el;
    var headroom = new Headroom(eleDockBtn, {
      offset: 500, //第一次触发unpined的top距离
      //   offset: 205,
      tolerance: 10,
      classes: {
        pinned: "dock-button--pinned",
        // when scrolling down
        unpinned: "dock-button--unpinned",
        noBottom: "headroom--on-bottom"
      }
    });
    headroom.init();
    this.$once("hook:beforeDestroy", function() {
      headroom.destroy();
    });
  },
  methods: {}
};

function getDomScrollTop() {
  if (platform.name == "Safari") return window.pageYOffset;
  else return document.documentElement.scrollTop;
}

function setDomScrollTop(top) {
  if (platform.name == "Safari") window.pageYOffset = top;
  else document.documentElement.scrollTop = top;
}
</script>

<style>
.dock-button-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
  /* color: #409eff; */
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  position: fixed;
  bottom: 15px;
  right: 30px;
  cursor: pointer;
  font-size: 20px;
  visibility: hidden;
  display: flex;
  justify-content: center;
  /* align-content: center; */
  z-index: 3;
  align-items: center;
}
.dock-button--unpinned {
  animation: fade-out 0.5s forwards;
}

.dock-button--pinned {
  animation: fade-in 0.5s forwards;
}

.dock-button--on-bottom {
  animation: fade-in 0.5s forwards;
}
</style>
