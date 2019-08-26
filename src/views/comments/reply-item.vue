<template>
  <div class="reply-item reply-content-block">
    <div class="reply-item-left">
      <!-- <span class="el-icon-caret-top" style="position:absolute; float:left;font-size:14px;"></span> -->
    </div>

    <!-- 回复正文 -->
    <div class="reply-item-right">
      <div class="reply-content text-content">
        <a href="javascript:void(0)" class="text-primary">@{{reply.ref.nickname}}</a>
        {{reply.content}}
      </div>
      <!-- 回复元信息 -->
      <div class="reply-meta">
        <span style="margin: 0 5px;color: #666;">—</span>
        <a href="javascript:void(0)" class="reply-nickname text-primary-bold">{{reply.nickname}}</a>
        <span class="comments-isAuthor" v-if="reply.refId==-1">层主</span>
        <span style="margin: 0 5px;">·</span>
        <span class="reply-date text-slave">{{reply.postDate | dateDistanceToNow }}</span>
        <!-- 回复一个回复 -->
        <div class="reply-reference">
          <comment-upvote :number="reply.upvote"></comment-upvote>
          <a class="comment-reference text-slave" href="javascript:void(0)" @click="onReply">回复</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentUpvote from "./upvote";
export default {
  components: { CommentUpvote },
  props: { reply: { required: true, type: Object } },
  mounted() {},
  methods: {
    onReply() {
      console.log("回复目标:",this.reply)
      let rootId = this.reply.rootId;
      let id = this.reply.id;
      let username = this.reply.nickname;
      this.$store.commit("comment/setReplyTarget", { rootId, id, username });
    }
  }
};
</script>

<style>
.comments-isAuthor {
  color: #8a6d3b !important;
  font-size: 12px;
  background: #fcf8e3;
  border-radius: 3px;
  padding: 2px 4px;
}

.reply-item {
  padding: 5px 0;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.09);
  display: flex;
}
.reply-item-left {
  width: 0px;
}

.reply-item-right {
  /* width: */
}

.reply-item-right > div:not(:last-child) {
  margin-bottom: 5px;
}

.reply-date {
  color: #999;
}

/* .reply-date::before {
  content: "·";
  margin: 0 5px;
} */

.reply-reference {
  display: inline-block;
  visibility: hidden;
}
.reply-reference > *:not(:last-child) {
  margin-right: 10px;
}

.reply-item:hover .reply-reference {
  visibility: visible;
}
</style>