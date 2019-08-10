<template>
  <!-- style="position:fixed;max-width:700px" -->
  <!-- <div class="sidebar-wrapper"> -->
  <el-drawer
    class="sidebar-wrapper"
    :size="isMobile()?'70%':'35%'"
    :visible="visible"
    @update:visible="syncVisible"
    :show-close="false"
    direction="ltr"
    :append-to-body="false"
  >
    <!-- 头 -->

    <my-avator ref="myAvator" slot="title"></my-avator>
    <!-- 中间 -->
    <h3 style="text-align:center">light0x00</h3>
    <h1 class="sidebar-slogen-text">
      <a href="http://vanilla-js.com/">Vanilla JS</a>
      makes everything an object, which is very convenient for OO JS applications.
    </h1>
    <!-- 链接按钮 -->
    <div class="sidebar-link-logo">
      <a href="https://github.com/light0x00" target="_blank" class="sidebar-a-button">
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
      </a>
      <a href="https://github.com/light0x00" target="_blank" class="sidebar-a-button">
        <img
          width="60"
          alt="GitHub Logomark"
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        />
      </a>
    </div>
  </el-drawer>
  <!-- </div> -->
</template>

<script>
import PostMenu from "@/views/menu/index";

import MyAvatar from "./avatar";

export default {
  created() {},
  components: { PostMenu, "my-avator": MyAvatar },
  props: {
    visible: Boolean
  },
  data: function() {
    return {
      fuck: true
    };
  },
  watch: {
    visible(n, o) {
      if (n) {
        this.$refs["myAvator"].shake();
        this.$refs["myAvator"].showMessage("Hello!");
      }
    }
  },
  methods: {
    syncVisible(e) {
      this.$emit("update:visible", e);
    }
  },
  mounted() {}
};
</script>

<style >
/* 遮罩层 */
.el-dialog__wrapper {
}
/* drawer */
.sidebar-wrapper .el-drawer.ltr {
  /* background-color: #24292e; */
  /* 消息气泡在手机端的可见 */
  overflow: visible;
}

/* drawer-header */
.sidebar-wrapper .el-drawer__header {
  /* background-color: rgba(0, 0, 0, 0.009); */
  /* color:red; */
  background-color: #24292e;
  height: 20%;
  padding: 0;
  margin: 0;
  color: #fff;
  margin-bottom: 50px;
}

/* drawer-body */
.el-drawer__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-link-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar-link-logo img {
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

.sidebar-a-button {
}
</style>
