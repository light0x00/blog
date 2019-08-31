<template>
  <div class="reply-input" v-loading="pageState.loading" element-loading-text="发送中...">
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
    <template>
      <a href="javascript:;" class="text-primary ul-none" @click="onReply">添加回复</a>
    </template>
    <!-- 游客信息弹框 -->
    <guest-info-dialog ref="guest-info-dialog"></guest-info-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MsgCommentControllerApi, MsgCommentVo } from "@/api/index";
export default {
  props: { comment: { type: Object } },
  data() {
    return {
      inputContent: "",
      pageState: {
        loading: false
      }
    };
  },
  computed: {
    replyInputVisible() {
      return this.replyTarget.rootId == this.comment.id;
    },
    guestInfo() {
      return this.$store.state.guest.info;
    },
    articleKey() {
      return this.$store.state.comment.articleKey;
    },
    //回复目标
    replyTarget: {
      get: function() {
        return this.$store.state.comment.replyTarget;
      },
      set: function(val) {
        this.$store.commit("comment/setReplyTarget", val);
      }
    }
  },
  methods: {
    //设置回复目标
    onReply() {
      let rootId = this.comment.id;
      let id = this.comment.id;
      let username = this.comment.nickname;
      this.replyTarget = { rootId, id, username };
    },
    //提交回复
    async commitReply() {
      //检查是否完善游客信息
      let setInfo = this.$refs["guest-info-dialog"].validate();
      if (!setInfo) return;

      let reply = {
        articleKey: this.articleKey,
        // articleKey: "foo", //!for test
        content: this.inputContent,
        refId: this.replyTarget.id,
        ...this.guestInfo
      };

      //提交
      this.pageState.loading = true;

      let {
        body: { data, code, pageInfo }
      } = await MsgCommentControllerApi.addUsingPOST(reply);
      if (this.resOK(code)) {
        this.$notify({ message: "评论成功!", type: "success" });
        // 追加到当前comment 触发view更新
        this.comment.replies.push(data);
        //清空回复
        this.clearReply();
        this.replyTarget = {};
      }

      this.pageState.loading = false;
    },
    clearReply() {
      this.inputContent = "";
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