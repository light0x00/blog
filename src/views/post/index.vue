<template>
  <div style="width:100%;" v-loading="pageState.loading">
    <div id="post-container" class="markdown-body" v-html="postHtml"></div>
    <post-tags :tags="post.tags"></post-tags>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import marked from "marked";
import highlightCss from "highlightjs/styles/github.css";
import hljs from "highlightjs/highlight.pack.min.js";
import { setTimeout } from 'timers';

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
      post: {tags:[]},
      postContent: "空空如也~",
      postHtml: "",
      slideshowVisible: false,
      pageState:{loading:false}
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
      
      this.pageState.loading=true
      
      //得到post、postContent
      let postKey = route.path.replace(/^\/post\//, "");
      try {
        this.post = await this.$store.dispatch("posts/getPost", postKey);
        this.postContent = await this.$store.dispatch(
          "posts/getPostContent",
          postKey
        );
      } catch (e) {
        console.log(`文章没有找到: ${postKey}`);
      }
      //render
      this.renderMarkdown();
      
      this.pageState.loading=false
      
    }
  },
  async beforeRouteUpdate(to, from, next) {
    next();
  }
};
</script>

<style>
#post-container {
  width: calc(100% - 42px);
  padding: 20px;
  overflow-x: hidden;
}
</style>
