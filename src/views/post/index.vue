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
  created() {
  },
  computed: {},
  async created() {
    this.loadPost(this.$route);
  },
  watch: {
    post: function(newPost, oldPost) {
      this.renderMarkdown();
    }
  },
  methods: {
    async openSlideshow() {
      // var slideshow = remark.create({
      //   source: this.post,
      //   container: document.getElementById("slide-show-container")
      // });
      // this.slideshowVisible = true;
    },
    closeSlideshow() {
      // this.slideshowVisible = false;
    },
    renderMarkdown() {
      // var converter = new showdown.Converter();
      // let html = converter.makeHtml(this.post);
      let html2 = marked(this.post);
      this.postHtml = html2;
    },
    async loadPost(route) {
      let postKey = route.path.replace(/^\/post\//, "");
      let post;
      try {
        post = await this.$store.dispatch("posts/getPost", postKey);
        this.post = post;
      } catch (e) {
        console.log(`文章没有找到: ${postKey}`);
      }
      this.renderMarkdown();
    }
  },
  async beforeRouteUpdate(to, from, next) {
    next();
    this.loadPost(to);
  }
};
</script>

<style>
#post-container {
  min-height: calc(100% - 20px);
  width: calc(100% - 30px);
  border: 1px solid #d1d5da;
  padding: 20px;
}
</style>
