<template>
  <div class="backtop-wrapper" @click="doBacktop">
    <i class="el-icon-caret-top"></i>
  </div>
</template>

<script>
import Headroom from "headroom.js";

export default {
  name: "backtop",
  mounted() {
    let eleBacktop = document.querySelector(".backtop-wrapper");
    var headroom = new Headroom(eleBacktop, {
      offset: 500, //第一次触发unpined
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
  methods:{
      doBacktop(){
          console.log(document.body.scrollTop)
        //   window.scrollTo({top:0})
        //   console.log(document.body.scrollTop)
      }
  }
};
</script>

<style>
.backtop-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #fff;
  color: #409eff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  position: fixed;
  bottom: 40px;
  right: 40px;
  cursor: pointer;
  font-size: 30px;
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
