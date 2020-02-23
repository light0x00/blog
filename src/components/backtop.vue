<template>
  <dock-button style="right:20px"  @click.native="doBacktop" icon-class="el-icon-top"></dock-button>
</template>

<script>
import Tween from "@/common/tween";

export default {
  name: "backtop",
  mounted() {
    // let eleBacktop = document.querySelector(".backtop-wrapper");
    // var headroom = new Headroom(eleBacktop, {
    //   offset: 500, //第一次触发unpined的top距离
    //   //   offset: 205,
    //   tolerance: 10,
    //   classes: {
    //     pinned: "backtop--pinned",
    //     // when scrolling down
    //     unpinned: "backtop--unpinned",
    //     noBottom: "headroom--on-bottom"
    //   }
    // });
    // headroom.init();
    // this.$once("hook:beforeDestroy", function() {
    //   headroom.destroy();
    // });
  },
  methods: {
    doBacktop() {

      let curTop = document.scrollingElement.scrollTop;
      let offset = 0;
      let duration = 35;
      let begin = curTop;
      let change = 0 - curTop;

      backTopAnimation();
      function backTopAnimation() {
        requestAnimationFrame(() => {
          if (offset > duration) {
            return;
          }
          let top = Tween.Quint.easeOut(offset, begin, change, duration);
          document.scrollingElement.scrollTop = parseInt(top);
          ++offset;
          backTopAnimation();
        });
      }
    }
  }
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

</style>
