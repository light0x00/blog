<template>
  <!-- style="position:fixed;max-width:700px" -->
  <div class="sidebar-wrapper">
    <el-drawer
      :size="isMobile()?'70%':'35%'"
      :visible="visible"
      @update:visible="syncVisible"
      :show-close="false"
      direction="ltr"
      :append-to-body="false"
    >
      <!-- style="display:flex; align-items: center;justify-content: center;" -->
      <div slot="title" class="sidebar-title-wraper">
        <img
          class="my-avatar"
          src="https://avatars1.githubusercontent.com/u/29830476?s=460&amp;v=4"
          alt
        />
      </div>
      <!-- <h3 style="text-align:center">light0x00</h3> -->
      <h1 class="sidebar-slogen-text">
        <a href="http://vanilla-js.com/">Vanilla JS</a>
 makes everything an object, which is very convenient for OO JS applications.
      </h1>
      <div class="sidebar-link-logo">
        <a hrfe="https://github.com/light0x00">
        <img
          width="60"
          alt="GitHub Logomark"
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        />
        </a>
        <a hrfe="/">
        <img
          width="60"
          alt="GitHub Logomark"
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        />
        </a>
        <img
          width="60"
          alt="GitHub Logomark"
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import PostMenu from "@/views/menu/index";

export default {
  components: { PostMenu },
  props: {
    visible: Boolean
  },
  data: function() {
    return {
      fuck: true
    };
  },
  methods: {
    syncVisible(e) {
      this.$emit("update:visible", e);
    }
  }
};
</script>

<style >
.sidebar-wrapper {
  color: inherit;
}
/* .sidebar-header {
  color:green;
  height:50%;
} */

/* 遮罩层 */
.el-dialog__wrapper {
}
/* drawer */
.sidebar-wrapper .el-drawer.ltr {
  /* background-color: #24292e; */
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
  margin-bottom: 60px;
}

.sidebar-title-wraper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.my-avatar {
  height: 100px;
  width: 100px;
  position: relative;
  top: 50%;
  border-radius: 60px;
  border: 5px solid white;
}

/* drawer-body */
.el-drawer__body {
  display: flex;
  /* align-content: space-between; */
  flex-direction: column;
  justify-content: space-around;
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
</style>
