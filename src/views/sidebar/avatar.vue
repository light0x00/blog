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
import getRandomMsg from "./message";
import shakeDom from "./shake";

function randomBoolean() {
  return Math.random() > 0.5;
}

export default {
  data() {
    return {
      rotateDeg: 0, //当前度数
      rotateRange: 90, //每次旋转总度数(旋转幅度)
      isRotating: false,
      isRotatingBack: false, //是否正往回旋转!
      message: "hhhhh",
      messageVisible: false
    };
  },
  computed: {},
  mounted() {
    // this.autoRandomMsg();
    this.bindShakeEvent();
  },
  methods: {
    onClickAvatar() {
      this.$store.dispatch("player/toggle");
    },
    showMessage(msg) {
      this.message = msg;
      this.messageVisible = true;
      setTimeout(() => (this.messageVisible = false), 3000);
    },
    autoRandomMsg() {
      setInterval(() => {
        if (randomBoolean()) this.showMessage(getRandomMsg());
      }, 5000);
    },
    randomMsg() {
      if (randomBoolean()) this.showMessage(getRandomMsg());
    },
    bindShakeEvent() {
      let thisRef = this;
      let eleAvatar = document.getElementById("myAvatar") 
      eleAvatar.addEventListener("click", () => {
        //问候语
        thisRef.randomMsg();
        this.shake()
      });
    },
    shake() {
      shakeDom({ target: document.getElementById("myAvatar") });
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
  display:inline-block
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
