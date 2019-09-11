<template>
  <div class="comment-list" v-loading="pageState.loading" element-loading-text="加载评论中...">
    <h2 style="margin-top:20px;border-bottom:1px solid #DCDFE6">{{commentTotal}}条评论</h2>

    <comment-item v-for="(item,index) in commentList" :key="`comment${index}`" :comment="item"></comment-item>
    <div
      v-if="pageInfo.total!=null&&pageInfo.total==0"
      class="text-slave"
      style="text-align:center"
    >还没有评论</div>
    <div class="comment-pagination">
      <el-pagination
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :current-page.sync="pageInfo.index"
        :page-size.sync="pageInfo.size"
        :total.sync="pageInfo.total"
        @current-change="loadData"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import CommentItem from "./comment-item";
import { MsgCommentControllerApi } from "@/api/index";
import { mapState } from "vuex";

export default {
  props: { list: { type: Array } },
  components: { CommentItem },
  data() {
    return {
      queryVo: {
        articleKey: this.articleKey,
        repliesPageInfo: { index: 1, size: 10 }
      },
      pageState: {
        loading: false
      },
      commentTotal: 0
    };
  },
  computed: {
    pageInfo: {
      get: function() {
        return this.$store.state.comment.pageInfo;
      },
      set: function(v) {
        this.$store.commit("comment/setPageInfo", v);
      }
    },
    commentList: {
      get: function() {
        return this.$store.state.comment.commentList;
      },
      set: function(list) {
        this.$store.commit("comment/setList", list);
      }
    },
    articleKey() {
      return this.$store.state.comment.articleKey;
    }
  },
  async created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      MsgCommentControllerApi.countByArticle(this.articleKey).then(
        ({data:{data:total}}) => (this.commentTotal = total)
      );

      this.pageState.loading = true;
      this.queryVo.articleKey = this.articleKey;
      let {
        body: { data, pageInfo }
      } = await MsgCommentControllerApi.queryUsingPOST({
        ...this.queryVo,
        ...this.pageInfo
      });
      this.pageInfo = pageInfo;
      this.commentList = data;
      this.pageState.loading = false;
    }
  }
};
</script>

<style>

.comment-list > div:not(:last-child) {
  margin-bottom: 15x;
}

.comment-pagination {
  display: flex;
  justify-content: center;
  /* align-content: center; */
  margin-top: 20px;
}
</style>