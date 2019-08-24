<template>
  <div>
    <button @click="flag=!flag">切换</button>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"
    >
      <h1 v-if="flag" class="test">konnnichiwa sekai.</h1>
    </transition>
  </div>
</template>

<script>

import "velocity-animate/velocity";
import "velocity-animate/velocity.ui";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      flag: false
    };
  },
  methods: {
    // --------
    // 进入中
    // --------

    beforeEnter: function(el) {
      // ...
      console.log("beforeEnter");

      Velocity(
        el,
        {
          opacity: 0
        },
        {
          duration: 400,
        }
      );
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function(el, done) {
      // ...
      console.log("enter");
      setTimeout(() => done(), 2000);
    },
    afterEnter: function(el) {
      console.log("afterEnter");
      Velocity(
        el,
        {
          opacity: 1
        },
        {
          duration: 400,
          easing: "swing"
        }
      );
      // ...
    },
    enterCancelled: function(el) {
      // ...
      console.log("enterCancelled");
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function(el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function(el, done) {
      // ...
      done();
    },
    afterLeave: function(el) {
      // ...
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function(el) {
      // ...
    }
  }
};
</script>

<style>
.test {
  color: #f35626;
  background-image: linear-gradient(92deg, #f35626 0%, #feab3a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hue 60s infinite linear;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: hue;
}
</style>