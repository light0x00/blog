<template>
  <div class="markdown-toc-wrapper">
    <dock-button
      style="right:80px;z-index:3"
      @click.native="toggleToc"
      icon-class="el-icon-notebook-2"
    ></dock-button>

    <!-- !宽度改为使用媒体查询 -->

    <el-drawer
      v-loading="pageState.loading"
      :wrapperClosable="isMobile()"
      :visible.sync="tocToggleFlag"
      :show-close="false"
      direction="rtl"
      :modal="false"
      :append-to-body="false"
    >
      <el-menu ref="tocMenu" class="toc-body" :default-openeds="defaultExpanded">
        <template v-for="(item,index) in headerTrees">
          <recursive-header :header="item" :key="index"></recursive-header>
        </template>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
import RecursiveHeader from "./recursive-header";
import Vue from "vue";

Vue.component(RecursiveHeader.name, RecursiveHeader);

function findDefaultExpanded(header, expandedKeys = []) {
  if (header == null) return expandedKeys;
  if (header.children.length > 0) {
    expandedKeys.push(header.title);
    return findDefaultExpanded(header.children[0], expandedKeys);
  }
  return expandedKeys;
}

export default {
  props: { rawText: { type: String } },
  data() {
    return {
      headerTrees: [],
      tocLeft: "100%",
      tocToggleFlag: !this.isMobile(),
      pageState: {
        loading: true
      }
    };
  },
  created() {},
  computed: {
    defaultExpanded() {
      let keys = findDefaultExpanded(this.headerTrees[0]);
      return keys;
    }
  },
  mounted() {},
  methods: {
    /* 按照vue的渲染顺序  此方法应该在mounted里调用 不然会导致当前组件无法访问子组件 */
    renderToc() {
      /* 递归得到目录树 */
      let articleElement = document.querySelector(".markdown-body");

      for (let headerElement of articleElement.querySelectorAll("h1")) {
        let header = { title: headerElement.id, children: [] };
        this.headerTrees.push(header);
        recursiveHeader(articleElement, header, 2, 3);
      }

      function recursiveHeader(
        articleElement,
        parentHeader,
        depth,
        depthLimit
      ) {
        if (depth > depthLimit) {
          return;
        }
        let childrenElements = articleElement.querySelectorAll("H" + depth);

        for (let child of childrenElements) {
          let header = { ele: child, title: child.id, children: [] };
          parentHeader.children.push(header);
          recursiveHeader(articleElement, header, ++depth, depthLimit);
        }
      }

      let thisRef = this;
      this.$nextTick(() => {
        thisRef.pageState.loading = false;
      });
    },
    toggleToc() {
      if (this.tocToggleFlag) this.hide();
      else this.show();
    },
    show() {
      this.tocLeft = `calc(100% - 300px)`;
      this.tocToggleFlag = true;
    },
    hide() {
      this.tocLeft = `100%`;
      this.tocToggleFlag = false;
    }
  }
};
</script>

<style>
.markdown-toc-wrapper {
  /* position: fixed; */

  /* right: 10px; */
}

.toc-body {
  width: 100%;
  /* border: solid 1px #e6e6e6; */
  /* transition: left 0.5s; */
  /* height: 100%;
  top: 0;
  position: fixed;
  z-index: 2; */
}

.markdown-toc-wrapper .el-dialog__wrapper {
  z-index: 1 !important;
}

@media (min-width: 900px) {
  .markdown-toc-wrapper .el-drawer {
    width: 350px !important;
  }
}

@media (max-width: 900px) {
  .markdown-toc-wrapper .el-drawer {
    width: 75% !important;
  }
}
</style>
