<template>
  <div class="full-box">

    <div
      id="post-container"
      style="height: calc(100% - 20px) ;width:100%;"
      v-html="postHtml"
    ></div>

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
    this.renderMarkdown();
  },
  methods: {
    async openSlideshow() {
      console.log(document.getElementById("slide-show-container"));
      var slideshow = remark.create({
        source: this.post,
        container: document.getElementById("slide-show-container")
      });
      this.slideshowVisible = true;
    },
    closeSlideshow() {
      console.log("!!!");
      this.slideshowVisible = false;
    },
    renderMarkdown() {
      var converter = new showdown.Converter(),
        text = this.post,
        html = converter.makeHtml(text);
      this.postHtml = html;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    let postKey = to.path.replace(/^\/post/, "");
    let post = await this.$store.dispatch("posts/getPost", postKey);
    this.post = post;
    next();
    this.renderMarkdown();
  }
};
</script>

<style>
</style>
