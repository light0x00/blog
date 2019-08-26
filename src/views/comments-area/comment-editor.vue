<template>
  <div class="comment-editor">
    <el-form ref="comment-form" :model="editingModel">
      <el-form-item prop="content" :rules="{required:true}">
        <el-input
          class="comment-content-input"
          type="textarea"
          prefix-icon="el-icon-chat-line-round"
          rows="5"
          maxlength="120"
          placeholder="请输入评论内容"
          v-model="editingModel.content"
          show-word-limit
        ></el-input>
        <el-alert title="评论不可以为空~" slot="error" type="error"></el-alert>
      </el-form-item>
    </el-form>
    <div style="text-align:right;margin:3px 0" v-if="!isNilGuestInfo">
      <a
        href="javascript:void(0)"
        @click="guestInfoDialogVisible=true"
        style="width:100px"
        class="el-icon-edit text-slave"
      >编辑我的信息</a>
    </div>
    <div style="display:flex;justify-content:center">
      <el-button type="primary" @click="commit" style="width:100px">提交</el-button>
    </div>

    <el-dialog :close-on-click-modal="false" :visible.sync="guestInfoDialogVisible" title="信息设置">
      <guest-info @commit="guestInfoDialogVisible=false"></guest-info>
    </el-dialog>
  </div>
</template>

<script>
import { MsgCommentControllerApi, MsgCommentVo } from "@/api/index";
import { StringUtils } from "@/common/utils";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      editingModel: {
        content: ""
      },
      guestInfoDialogVisible: false
    };
  },
  computed: {
    isInvalidInput() {
      return StringUtils.isEmpty(this.editingModel.inputContent);
    },
    ...mapState("guest", { guestInfo: "info" }),
    ...mapGetters("guest", { isNilGuestInfo: "isNilInfo" }),
    ...mapState("comment", ["articleKey"]),
    /* list\pageInfo */
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
        this.$store.commit("comment/setCommentList", list);
      }
    },
    articleKey() {
      return this.$store.state.comment.articleKey;
    }
  },
  methods: {
    async commit() {
      //表单是否完善
      try {
        await this.$refs["comment-form"].validate();
      } catch (e) {
        return;
      }
      //检查游客信息是否完善
      if (this.isNilGuestInfo) {
        this.guestInfoDialogVisible = true;
        return;
      }
      //添加
      let {
        body: { code }
      } = await MsgCommentControllerApi.addUsingPOST({
        ...this.guestInfo,
        ...this.editingModel,
        articleKey: this.articleKey
      });
      if (!this.resOK(code)) {
        this.$notify({ message: body.msg, type: "error" });
        return;
      }
      //刷新
      this.$notify({ message: "添加评论成功", type: "success" });
      let {
        body: { data, pageInfo }
      } = await MsgCommentControllerApi.queryUsingPOST({
        lastPage: true,
        articleKey: this.articleKey
      });
      this.commentList = data;
      this.pageInfo = pageInfo;
      this.clearText();
    },
    clearText(){
      // this.editingModel.content=''
      this.$refs['comment-form'].resetFields()
    }
  },
  mounted() {}
};
</script>
<style scoped>
.comment-editor .el-form-item {
  margin: 0px !important;
}
</style>
<style >
.comment-editor .el-alert {
  height: 35px;
  margin: 2px 0 0 0;
}

.comment-editor .el-alert__description {
  margin: 0px !important;
}
.comment-editor .el-dialog {
  margin: 0px !important;
}
.comment-editor .el-dialog__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 900px) {
  .comment-editor .el-dialog {
    width: 300px !important;
  }
}

@media (max-width: 900px) {
  .comment-editor .el-dialog {
    width: 100% !important;
  }
}
</style>