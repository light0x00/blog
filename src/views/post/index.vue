<template>
  <div
    v-loading="pageState.loading"
    element-loading-body
    class="post-wrapper"
    style="overflow-x: hidden;"
  >
    <!-- 文章目录 -->
    <div class="markdown-toc" v-if="!isMobile()" style="left:80% "></div>
    <!-- 文章 -->
    <div id="post-container" class="markdown-body" v-html="postHtml"></div>
    <el-divider></el-divider>
    <!-- 文章标签 -->
    <post-tags class="post-tags" :tags="post.tags"></post-tags>
    <!-- 留言板 -->
    <comments-area :articleKey="post.key"></comments-area>

    <!-- 至顶 -->
    <backtop></backtop>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import CommentsArea from "@/views/comments-area";

import { lazyObserve, makeDomLazy } from "./feature";

import marked from "@/common/marked";

export default {
  components: {
    CommentsArea
  },
  data: function() {
    return {
      post: { key: "", tags: [] },
      postContent: "空空如也~",
      postHtml: "",
      slideshowVisible: false,
      pageState: { loading: false }
    };
  },
  computed: {},
  async created() {
    await this.loadPost(this.$route);
  },
  mounted() {},
  watch: {
    $route(n, o) {
      this.loadPost(n);
    }
  },
  methods: {
    renderMarkdown() {
      let rawHtml = marked(this.postContent, { baseUrl: this.post.baseUrl });
      //懒加载
      rawHtml = makeDomLazy(rawHtml);
      this.postHtml = rawHtml;

      this.$nextTick(async () => {
        const thisRef = this;

        //目录
        if (!this.isMobile()) {
          import("./async-tocbot").then(({ markdownToc }) => {
            let tocbot = markdownToc();
            thisRef.$once("destroy", () => {
              tocbot.destroy();
            });
          });
        }

        //懒加载监听
        lazyObserve();

        //图片查看器
        import("./async-viewer").then(({ imageViewer }) => {
          const viewer = imageViewer();
          thisRef.$once("destroy", () => {
            viewer.destroy();
          });
        });

        //UML支持
        // renderFlow();
        // import("./async-mermaid").then(({renderMermaid}) => {
        //   renderMermaid();
        // });
      });
    },
    async loadPost(route) {
      this.pageState.loading = true;

      //得到文章信息、文章文本形式内容
      this.post = await this.$store.dispatch(
        "posts/getPostByRoute",
        this.$route
      );
      this.postContent = await this.$store.dispatch(
        "posts/getPostContentByRoute",
        this.$route
      );
      //渲染
      this.renderMarkdown();

      this.pageState.loading = false;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    next();
  }
};
</script>

<style>
.post-wrapper {
  margin: 20px;
  width: 100%;
}

.post-tags {
  width: calc(100% - 30px);
}

.markdown-body {
  width: calc(100% - 30px);
  /* margin: 15px; */
}

/* 防止loading层把navbar的阴影遮住 */
.post-wrapper.el-loading-parent--relative {
  margin-top: 5px;
  z-index: 1;
}

.viewer-toolbar > ul > .viewer-large {
  border-radius: 0;
}
</style>
