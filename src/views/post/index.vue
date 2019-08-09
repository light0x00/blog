<template>
  <div style="width:100%;" v-loading="pageState.loading" class="page-component__scroll">
    <div id="post-container" class="markdown-body" v-html="postHtml"></div>

    <post-tags :tags="post.tags"></post-tags>
    <backtop></backtop>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import marked from "marked";

import { setTimeout } from "timers";

import hljs from "./highlight";

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
  watch: {
    $route(n, o) {
      this.loadPost(n);
    }
  },
  methods: {
    renderMarkdown() {
      let html2 = marked(this.postContent);
      this.postHtml = html2;
    },
    async loadPost(route) {
      this.pageState.loading = true;

      //得到post、postContent
      // let postKey = route.path.replace(/(^\/article\/)|(\/$)/g, ""); //从当前路由中提取key
      this.post = await this.$store.dispatch("posts/getPostByRoute", this.$route);
      this.postContent = await this.$store.dispatch(
        "posts/getPostContentByRoute",
        this.$route
      );
      //render
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
#post-container {
  height: auto;
  width: calc(100% - 42px);
  padding: 20px;
  overflow-x: hidden;
}
</style>
