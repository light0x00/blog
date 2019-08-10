<template>
  <div style v-loading="pageState.loading" element-loading-body class="post-wrapper">
    <div class="markdown-toc" v-if="!isMobile()"></div>
    <div id="post-container" class="markdown-body" v-html="postHtml"></div>
    <post-tags class="post-tags" :tags="post.tags"></post-tags>
    <backtop></backtop>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import marked from "marked";

import { setTimeout } from "timers";
import hljs from "./highlight";
import tocbot from "tocbot";
import lozad from "lozad";
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";

marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

export default {
  data: function() {
    return {
      post: { tags: [] },
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
      //正文
      this.postHtml = marked(this.postContent, { baseUrl: this.post.baseUrl });

      this.$nextTick(() => {
        //目录
        tocbot.init({
          tocSelector: ".markdown-toc",
          contentSelector: ".markdown-body",
          headingSelector: "h1,h2"
        });
        //图片懒加载
        const imgList = document.querySelectorAll(".markdown-body img");
        const observer = lozad(imgList); // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
        observer.observe();
        //图片查看器
        const viewer = new Viewer(document.querySelector(".markdown-body"), {
          // inline: true,
          viewed() {
            viewer.zoomTo(1);
          },
          // navbar: 0, //顶部栏
          title: 0, //图片名称
          toolbar: {
            prev: { show: 4, size: "large" },
            play: {
              show: 4,
              size: "large"
            },
            next: { show: 4, size: "large" },
          },
          transition:false,
        });
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

}

#post-container {
  height: auto;
  /* width:100%; */

  /* overflow-x: hidden; */
  width: calc(100% - 30px);
  margin: 15px;
}

.post-tags {
  width: calc(100% - 30px);
  margin: 15px;
}
/* 防止loading层把navbar的阴影遮住 */
.post-wrapper.el-loading-parent--relative {
  margin-top: 5px;
  z-index: 1;
}

.viewer-toolbar > ul > .viewer-large {
  border-radius: 0
}
</style>
