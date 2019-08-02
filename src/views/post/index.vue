<template>
  <div class="full-box">
    <div id="post-container" class="markdown-body" v-html="postHtml"></div>

    <div style="height:20px">
      <a href="javascript:void(0)" v-on:click="openSlideshow">幻灯片</a>
    </div>

    <div
      v-show="slideshowVisible"
      style="height:100%;width:100%;border:1px solid black;z-index:10;top:20px;left:0;position:fixed"
    >
      <a href="javascript:void(0)" v-on:click="closeSlideshow">退出</a>
      <div id="slide-show-container" style="height:100%;width:100%;"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import showdown from "showdown";
import hljs from "highlightjs";
import marked from "marked";

export default {
  data: function() {
    return {
      post: "空空入也~",
      postHtml: "",
      slideshowVisible: false
    };
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
      var slideshow = remark.create({
        source: this.post,
        container: document.getElementById("slide-show-container")
      });
      this.slideshowVisible = true;
    },
    closeSlideshow() {
      this.slideshowVisible = false;
    },
    renderMarkdown() {
      // var converter = new showdown.Converter();
      // let html = converter.makeHtml(this.post);
      let html2 = marked(this.post);
      this.postHtml = html2;

    },
    async loadPost(route) {
      let postKey = route.path.replace(/^\/post\//, "");
      let post = await this.$store.dispatch("posts/getPost", postKey);
      this.post = post;
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

#post-container{
  min-height: calc(100% - 20px) ;width:100%;padding: 32px!important;
  border: 1px solid #d1d5da;
}
</style>
