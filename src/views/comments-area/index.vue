<template>
  <div class="comment-list">
    <!-- 评论列表 -->
    <comment-list ></comment-list>
    <!-- 编辑评论 -->
    <comment-editor style="margin-top:20px"></comment-editor>
  </div>
</template>

<script>
import CommentList from "./comment-list";
import CommentEditor from "./comment-editor";
import { mapState, mapGetters } from "vuex";

export default {
  name: "CommentsArea",
  props: { articleKey: { type: String, required: true } },
  components: { CommentList, CommentEditor },
  data() {
    return {

    };
  },
  computed: {
    commentList() {
      return this.$store.state.comment.commentList;
    }
  },
  async created() {
    // this.$store.commit("comment/setArticleKey", this.articleKey);
    this.$store.commit("comment/setArticleKey", 'foo');
  },
  methods: {}
};
</script>

<style>


</style>