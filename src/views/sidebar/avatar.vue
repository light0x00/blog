<template>
  <div class="full-box sidebar-avatar-wrapper">
    <a href="javascript:void(0)" @click="onClickAvatar" class="sidebar-a-button sidebar-avatar-box">
      <img
        id="myAvatar"
        class="sidebar-avatar"
        src="https://avatars1.githubusercontent.com/u/29830476?s=460&amp;v=4"
        alt
      />
    </a>
    <div class="sidebar-bubble" v-show="messageVisible">{{message}}</div>

    <!-- <div class="sidebar-bubble-box"> -->
    <!-- <div class="sidebar-bubble">哈哈</div> -->
    <!-- <div class="sidebar-bubble">哈防辐射服各色如果是电饭锅电饭锅哈</div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import Tween from "./tween";
// import { setTimeout } from "timers";
import getRandomMsg from "./message";
import { setInterval } from "timers";

function randomBoolean() {
  return Math.random() > 0.5;
}

export default {
  data() {
    return {
      rotateDeg: 0, //当前度数
      rotateRange: 90, //每次旋转总度数
      isRotating: false,
      isRotatingBack: false, //是否正往回旋转!
      message: "hhhhh",
      messageVisible: false
    };
  },
  computed: {},
  mounted() {
    this.autoRandomMsg();
    this.rotateAvatar();
  },
  methods: {
    onClickAvatar() {
      this.$store.dispatch("player/toggle");
    },
    showMessage(msg) {
      this.message = msg;
      this.messageVisible = true;
      setTimeout(() => (this.messageVisible = false), 2000);
    },
    autoRandomMsg() {
      setInterval(() => {
        if (randomBoolean()) this.showMessage(getRandomMsg());
      }, 5000);
    },
    rotateAvatar() {
      let avatar = document.getElementById("myAvatar");

      if (this.isMobile()) {
        avatar.addEventListener("click", () => {
          rotate1(() => rotate2());
        });
      } else {
        avatar.addEventListener("mouseenter", () => rotate1());
        avatar.addEventListener("mouseleave", () => rotate2());
      }

      let thisRef = this;

      const rotate1 = onFinish => {
        console.log(onFinish);
        if (thisRef.isRotatingBack || thisRef.isRotating) {
          //防止回旋过程中 再次触发旋转
          console.log("回旋过程中再次触发!!");
          thisRef.showMessage("不要点这么快~(试图掩盖bug");
          if (Math.random() > 0.5) {
            setTimeout(() => thisRef.showMessage("这不是bug,是feature~"), 4000);
          }
          return;
        }

        let beginDeg = thisRef.rotateDeg;
        let changeDeg = thisRef.rotateRange - thisRef.rotateDeg;
        let duration = 30;
        thisRef.isRotating = true;
        rotate(
          0,
          duration,
          offset => {
            return Tween.Sine.easeIn(offset, beginDeg, changeDeg, duration);
          },
          () => {
            thisRef.isRotating = false;
            if (onFinish) onFinish();
          }
        );
      };

      const rotate2 = onFinish => {
        let beginDeg = thisRef.rotateDeg;
        let changeDeg = 0 - thisRef.rotateDeg; //因为希望回到初始的0度,所以设置变化量为负数
        let duration = 90;

        thisRef.isRotatingBack = true;

        rotate(
          0,
          duration,
          offset => {
            return Tween.Elastic.easeOut(offset, beginDeg, changeDeg, duration);
          },
          () => {
            thisRef.isRotatingBack = false;
            if (onFinish) onFinish();
          }
        );
      };

      /**
       * @offset 当前帧
       * @beginDeg 开始值
       * @changeDeg 变化量
       * @duration 持续帧数
       * @fn 动画函数
       */
      function rotate(offset, duration, fn, onFinish) {
        window.requestAnimationFrame(() => {
          if (offset > duration) {
            if (onFinish) onFinish();
            return;
          }
          let r = fn(offset);
          thisRef.rotateDeg = parseInt(r); //更新当前度数
          avatar.style.transform = `rotate(${thisRef.rotateDeg}deg)`; //旋转
          rotate(++offset, duration, fn, onFinish);
        });
      }
    }
  }
};
</script>

<style>
/* @import url("./chat-bubble.scss"); */

.sidebar-avatar-wrapper {
  width: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* text-align: center; */
}

.sidebar-avatar-box {
  position: relative;
  height: 100px;
  width: 100px;
  top: calc(100% - 50px);
  /* left: calc(50% - 50px); */
  /* margin: auto; */
  display: block;
  cursor: pointer;
}
.sidebar-avatar {
  /* 减去边框 */
  height: 90px;
  width: 90px;
  border-radius: 50px;
  border: 5px solid white;
}

.sidebar-bubble {
  align-self: flex-start;
  position: relative;
  display: block;
  max-width: 150px;
  top: calc(100% - 100px);
  left: calc(50% + 50px + 10px);
  /* left: 50% + 50px; */
  background: #9fe859;
  border-radius: 0.4em;
  padding: 10px;
  color: #303133;
  font-weight: 400;
  max-width: 150px;
}

.sidebar-bubble:after {
  content: "";
  width: 0;
  height: 0;
  border: 7px solid transparent;
  position: absolute;
  left: 0;
  top: 20px;
  width: 0;
  height: 0;
  border: 7px solid transparent;
  border-right-color: #9fe859;
  border-left: 0;
  margin-top: -7px;
  margin-left: -7px;
}
</style>
