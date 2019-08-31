<template>
  <div class="comment-item">
    <div class="comment-left">
      <img class="comment-user-avator" style height="36" width="36" />
    </div>
    <div class="comment-right">
      <!-- 评论用户信息 -->
      <div class="comment-meta">
        <a href="javascript:void(0)" class="comment-user text-primary-bold">{{comment.nickname}}</a>
        <span style="margin: 0 5px;">·</span>
        <div class="comment-date text-slave-small">{{comment.postDate | dateDistanceToNow}}</div>
      </div>
      <!-- 评论正文 -->
      <div class="comment-content text-content">{{comment.content}}</div>
      <!-- 评论操作按钮 -->
      <div class="comment-opt">
        <comment-upvote :number="comment.upvote"></comment-upvote>
        <a class="comment-reference text-slave" href="javascript:void(0)" @click="onReply">回复</a>

        <div class="comment-useragent text-slave-small">{{ comment.userAgent | formatUserAgent}}</div>
      </div>
      <!-- 回复列表 -->
      <comment-reply-list
        v-if="replyListVisible"
        :rootId="comment.id"
        :replies.sync="comment.replies"
        :pageInfo.sync="comment.repliesPageInfo"
      >
        <reply-editor :comment="comment"></reply-editor>
      </comment-reply-list>
    </div>
  </div>
</template>

<script>
import CommentReplyList from "./reply-list";
import CommentUpvote from "./upvote";
import ReplyEditor from "./reply-editor";
import { mapState } from "vuex";

import { formatDistanceToNow, parseISO } from "date-fns";

export default {
  components: { CommentReplyList, CommentUpvote, ReplyEditor },
  props: { comment: { type: Object } },

  computed: {
    ...mapState("comment", ["articleKey", "replyTarget"]),
    replyListVisible() {
      //当前评论的回复列表不为空 或者 当前评论为被回复目标
      return (
        (this.comment.replies != null && this.comment.replies.length > 0) ||
        this.replyTarget.rootId == this.comment.id
      );
    }
  },
  methods: {
    onReply() {
      //设置回复目标
      let rootId = this.comment.id;
      let id = this.comment.id;
      let username = this.comment.nickname;

      this.$store.commit("comment/setReplyTarget", { rootId, id, username });
    }
  }
};
</script>

<style>
.comment-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  padding: 20px 0;
  display: flex;
}
.comment-left {
  width: 45px;
  display: flex;
  flex-direction: column;
  /* align-items:center; */
}
.comment-user-avator {
  align-self: flex-start;
  background-color: gray;
  border-radius: 16px;
  width: 32px;
  height: 32px;
}

.comment-right {
  width: calc(100% - 45px);
}
.comment-right > div:not(:last-child) {
  margin-bottom: 10px !important;
}

.comment-meta {
  display: flex;
  align-items: center;
}
.comment-opt {
  display: flex;
  align-items: center;
}

.comment-meta > div:not(:last-child) {
  margin-right: 10px;
}
.comment-opt > div:not(:last-child) {
  margin-right: 10px;
}

.comment-content {
  padding: 5px 0;
}

.comment-reference {
  /* margin-right: 10px; */
}
.comment-useragent {
  margin-left: auto;
}
</style>