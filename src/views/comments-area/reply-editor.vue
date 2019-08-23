<template>
  <div class="reply-input">
    <template v-if="replyInputVisible">
      <div class="reply-input-top">
        <el-input v-model="inputContent" type="textarea" rows="1" />
        <el-button size="small" @click="commitReply">添加回复</el-button>
      </div>
      <div class="reply-input-bottom text-slave">
        回复:
        <a href="javascript:void(0)" class="text-primary">@{{this.replyTarget.username}}</a>
      </div>
    </template>
    <template >
      <a href="javascript:;" class="text-primary ul-none" @click="onReply">添加回复</a>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MsgCommentControllerApi, MsgCommentVo } from "@/api/index";
export default {
  props: { comment: { type: Object } },
  data() {
    return {
      inputContent: ""
    };
  },
  computed: {
    replyInputVisible() {
      return this.replyTarget.rootId == this.comment.id;
    },
    ...mapState("guest", { guestInfo: "info" }),

    replyTarget: {
      get: function() {
        return this.$store.state.comment.replyTarget;
      },
      set: function(val) {
        this.$store.commit("comment/setReplyTarget", val);
      }
    }
    // ...mapState("comment", ["replyTarget"])
  },
  methods: {
    //提交回复
    async commitReply() {
      let reply = {
        // articleKey: this.articleKey,
        articleKey: "foo", //!for test
        content: this.inputContent,
        refId: this.replyTarget.id,
        ...this.guestInfo
      };
      //提交
      let {
        body: { data, code, pageInfo }
      } = await MsgCommentControllerApi.addUsingPOST(reply);
      if (this.resOK(code)) {
        this.$notify({ message: "评论成功!", type: "success" });
        // 追加到当前comment 触发view更新
        this.comment.replies.push(data);
        //清空回复
        this.clearReply();
        this.replyTarget={}
      }
    },
    clearReply() {
      this.inputContent = "";

    },
    //设置回复目标
    onReply() {
      let rootId = this.comment.id;
      let id = this.comment.id;
      let username = this.comment.nickname;
      this.replyTarget = { rootId, id, username };
    }
  }
};
</script>

<style>
.reply-input {
  padding: 5px 0 0 0;
}

.reply-input-top {
  display: flex;
  align-items: flex-start;
}

.reply-input-top > div:not(:last-child) {
  margin-right: 10px;
}

.reply-input-bottom {
  padding: 5px 0 0 0;
}
</style>