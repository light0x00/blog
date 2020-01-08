<template>
  <div
    v-loading="pageState.loading"
    element-loading-body
    class="post-wrapper"
    style="overflow-x: hidden;"
  >
  
    <!-- 文章目录 -->
    <article-toc ref="articleToc" :rawText="articleText"></article-toc>
    <!-- 文章 -->
    <div id="post-container" class="markdown-body" v-html="articleHTML"></div>
    <el-divider></el-divider>
    <!-- 文章标签 -->
    <post-tags class="post-tags" :tags="article.tags"></post-tags>
    <!-- 留言板 -->
    <comments-area :articleKey="article.key"></comments-area>
    <!-- 至顶 -->
    <backtop></backtop>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
// import { makeDomLazy } from "./async-make-lazy";

import marked from "@/common/marked";
import { extractArticleKeyFromRoutePath } from "@/common/articles-util";
import ArticleToc from "./toc";

export default {
  components: {
    CommentsArea: () =>
      import(
        /* webpackPrefetch:true,webpackChunkName:'comment' */ "@/views/comments"
      ),
    ArticleToc
  },
  data: function() {
    return {
      article: { key: extractArticleKeyFromRoutePath(this.$route.path), tags: [] },
      articleText: "空空如也~",
      articleHTML: "",
      pageState: { loading: true }
    };
  },
  computed: {},
  async created() {},
  mounted() {
    this.loadPost();
  },
  watch: {},
  methods: {
    /* ------------------------------------------------------------------------------
    加载
    ------------------------------------------------------------------------------ */
    async loadPost(route) {
      this.pageState.loading = true;
      try {
        //得到文章信息、文章文本形式内容
        this.post = await this.$store.dispatch(
          "articles/getArticleByRoute",
          this.$route
        );
        //加载文章源文件
        this.articleText = await this.$store.dispatch(
          "articles/getArticleContentByRoute",
          this.$route
        );
      } catch (e) {
        this.$notify({ type: "warning", message: "该文章不存在" });
        this.$router.push({ path: "/404" });
        return;
      }
      //渲染
      this.renderMarkdown();

      this.$nextTick(
        ()=>this.pageState.loading = false
      );
      
    },
    /* ------------------------------------------------------------------------------
    渲染
    ------------------------------------------------------------------------------ */
    renderMarkdown() {
      let rawHtml = marked(this.articleText, { baseUrl: this.article.baseUrl });

      //懒加载
      // rawHtml = makeDomLazy(rawHtml);  

      this.articleHTML = rawHtml;
      const thisRef = this;
      this.$nextTick(async () => {
        /* -------------------------------- 目录 -------------------------------- */
        this.$refs["articleToc"].renderToc();

        /* -------------------------------- 懒加载监听 -------------------------------- */
        // import("./async-lozad").then(({ lazyObserve }) => {
        //   lazyObserve();
        // });
        
        /* -------------------------------- 图片查看器 -------------------------------- */
        import(
          /* webpackPrefetch:true,webpackChunkName:'viewer' */ "./async-viewer"
        ).then(({ imageViewer }) => {
          const viewer = imageViewer();
          thisRef.$once("destroy", () => {
            viewer.destroy();
          });
        });

        /* -------------------------------- UML支持 -------------------------------- */
        import(
          /* webpackPrefetch:true,webpackChunkName:'mermaid' */ "./async-mermaid"
        ).then(({ renderMermaid }) => {
          renderMermaid();
        });

      });
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
  /* width: calc(100% - 30px); */
}

.markdown-body {
  /* width: calc(100% - 30px); */
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
