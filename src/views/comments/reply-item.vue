<template>
  <div class="reply-item reply-content-block">
    <div class="reply-item-left">
      <!-- <span class="el-icon-caret-top" style="position:absolute; float:left;font-size:14px;"></span> -->
    </div>

    <!-- 回复正文 -->
    <div class="reply-item-right" @click="showReference">
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
        <span class="reply-date text-slave-small">{{reply.postDate | dateDistanceToNow }}</span>
        <div
          class="comment-useragent text-slave-small mobile-hidden"
        >{{ reply.userAgent | formatUserAgent}}</div>
      </div>

      <!-- 回复一个回复 -->
      <!-- <transition name="el-fade-in"> -->
      <div class="reply-reference" v-if="whichRefDsiplay==reply.id">
        <comment-upvote :number="reply.upvote"></comment-upvote>
        <a class="comment-reference text-slave" href="javascript:void(0)" @click="onReply">回复</a>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import CommentUpvote from "./upvote";
export default {
  components: { CommentUpvote },
  props: { reply: { required: true, type: Object } },
  data() {
    return {
      referenceVisible: false
    };
  },
  computed: {
    whichRefDsiplay: {
      get: function() {
        return this.$store.state.comment.whichRefDsiplay;
      },
      set: function(val) {
        this.$store.commit("comment/setWhichRefDsiplay", val);
      }
    }
  },
  mounted() {},
  methods: {
    onReply() {
      let rootId = this.reply.rootId;
      let id = this.reply.id;
      let username = this.reply.nickname;
      this.$store.commit("comment/setReplyTarget", { rootId, id, username });
    },
    showReference() {
      this.whichRefDsiplay = this.reply.id;
      console.log("!!!")
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
  width: 100%;
  cursor: pointer;
}

.reply-item-right > div:not(:last-child) {
  margin-bottom: 5px;
}

.reply-meta {
  display: flex;
  align-items: center;
}

.reply-date {
  color: #999;
}

.reply-reference {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

</style>