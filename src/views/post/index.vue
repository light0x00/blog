<template>
  <div style="width:100%;">
    <div id="post-container" class="markdown-body" v-html="postHtml"></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import marked from "marked";
import highlightCss from "highlightjs/styles/github.css";
import hljs from "highlightjs";

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
      post: "空空如也~",
      postHtml: "",
      slideshowVisible: false
    };
  },
  computed: {},
  async created() {
    console.log("cre!!!")

    await this.loadPost(this.$route);
  },
  watch: {
    post: function(newPost, oldPost) {
      this.renderMarkdown();
    }
  },
  methods: {
    renderMarkdown() {
      let html2 = marked(this.post);
      this.postHtml = html2;
    },
    async loadPost(route) {
      const loading =this.$loading({
        // lock: true,
        text: "Loading",
      });

      let postKey = route.path.replace(/^\/post\//, "");
      let post;
      try {
        post = await this.$store.dispatch("posts/getPost", postKey);
        this.post = post;
      } catch (e) {
        console.log(`文章没有找到: ${postKey}`);
      }
      this.renderMarkdown();

      loading.close();
    }
  },
  async beforeRouteUpdate(to, from, next) {
    next();
    // console.log("route update!!")
    this.loadPost(to);
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
