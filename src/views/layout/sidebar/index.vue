<template>
  <el-drawer
    class="sidebar-wrapper"
    :visible.sync="mutableVisible"
    :show-close="false"
    direction="ltr"
    :append-to-body="false"
	:modal="false"
  >
    <!-- 头 -->
    <my-avator ref="myAvator" slot="title"></my-avator>
    <!-- 中间 -->
    <h3 style="text-align:center">light0x00</h3>

    <h1 class="sidebar-slogen-text">
		...
    </h1>

    <!-- 页面入口 -->
    <div class="sidebar-feature-box">
      <a  href="javascript:void(0)" @click="mutableVisible=false;$router.push('/friends')">友链</a>
      <a  href="javascript:void(0)" @click="mutableVisible=false;$router.push('/me')">关于我</a>
    </div>

    <!-- 链接按钮 -->
    <div class="sidebar-link-box">
      <a href="https://github.com/light0x00" target="_blank" class="sidebar-a-button">
        <img
          width="60"
          alt="GitHub Logomark"
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        />
      </a>
      <!-- <a href="https://github.com/light0x00" target="_blank" class="sidebar-a-button">
        <img
          width="60"
          alt="GitHub Logomark"
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        />
      </a>
      <a href="https://github.com/light0x00" target="_blank" class="sidebar-a-button">
        <img
          width="60"
          alt="GitHub Logomark"
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        />
      </a> -->
    </div>
  </el-drawer>
  <!-- </div> -->
</template>

<script>

import MyAvatar from "./avatar";
import { setTimeout } from "timers";

export default {
  created() {},
  components: { "my-avator": MyAvatar },
  props: {
    visible: Boolean
  },
  data: function() {
    return {
      fuck: true
    };
  },
  computed: {
    mutableVisible: {
      get: function() {
        return this.visible;
      },
      set: function(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  watch: {
    visible(n, o) {
      if (n) {
        let thisRef = this;
        thisRef.$refs["myAvator"].shake();
        setTimeout(() => {
          thisRef.$refs["myAvator"].showMessage("Hello!");
        }, 500);
      }
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style >
.sidebar-link-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-feature-box {
  text-align: center;
  font-size: 16px;
}

.sidebar-slogen-text {
  color: #909399;
  font-style: italic;
  color: #b6b6b6;
  font-size: 24px;
  margin-top: 20px;
  text-align: center;
  text-shadow: 0 1px 1px #fff;
  /* text-align:center */
}
.sidebar-slogen-text a {
  color: #909399;
}

/********************** element组件样式 **********************/

/* drawer */
.sidebar-wrapper .el-drawer.ltr {
  overflow: visible;
}

/* drawer-header */
.sidebar-wrapper .el-drawer__header {
  /* color:red; */
  background-color: #24292e;
  height: 20%;
  padding: 0;
  margin: 0;
  color: #fff;
  margin-bottom: 50px;
}
/* drawer-body */
.sidebar-wrapper .el-drawer__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
@media (min-width: 900px) {
  .sidebar-wrapper .el-drawer {
    width: 500px !important;
  }
}

@media (max-width: 900px) {
  .sidebar-wrapper .el-drawer {
    width: 75% !important;
  }
}
</style>
