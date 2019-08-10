<template>
  <div class="backtop-wrapper" @click="doBacktop">
    <i class="el-icon-top"></i>
  </div>
</template>

<script>
import Headroom from "headroom.js";
import Tween from "@/common/tween";

export default {
  name: "backtop",
  mounted() {
    let eleBacktop = document.querySelector(".backtop-wrapper");
    var headroom = new Headroom(eleBacktop, {
      offset: 500, //第一次触发unpined的top距离
      //   offset: 205,
      tolerance: 10,
      classes: {
        pinned: "backtop--pinned",
        // when scrolling down
        unpinned: "backtop--unpinned",
        noBottom: "headroom--on-bottom"
      }
    });
    headroom.init();
    this.$once("hook:beforeDestroy", function() {
      headroom.destroy();
    });
  },
  methods: {
    doBacktop() {
      let curTop = document.documentElement.scrollTop;

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
          document.documentElement.scrollTop = parseInt(top);
          console.log(parseInt(top));
          ++offset;
          backTopAnimation();
        });
      }
    }
  }
};
</script>

<style>
.backtop-wrapper {
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

  align-items: center;
}
.backtop--unpinned {
  animation: fade-out 0.5s forwards;
}

.backtop--pinned {
  animation: fade-in 0.5s forwards;
}

.backtop--on-bottom {
  animation: fade-in 0.5s forwards;
}
</style>
