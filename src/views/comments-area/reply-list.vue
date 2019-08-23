<template>
  <!-- 回复 -->
  <div class="reply-list">
    <!-- 回复列表 -->
    <template>
      <reply-item v-for="item of renderingReplies" :reply="item" :key="`reply-${item.id}`"></reply-item>
    </template>
    <div class="reply-expand-block">
      <!-- 分页栏 -->
      <transition name="el-fade-in">
        <template v-if="expandable">
          <el-pagination
            class="reply-pagination"
            layout="prev, pager, next"
            :hide-on-single-page="true"
            :current-page.sync="mutablePageInfo.index"
            :page-size.sync="mutablePageInfo.size"
            :total.sync="mutablePageInfo.total"
            @current-change="loadData"
          ></el-pagination>
        </template>
        <!-- 展开更多 -->
        <template v-else-if="expandBtnVisible">
          <a href="javascript:void(0)" class="text-normal" @click="expand">
            <i class="el-icon-d-arrow-right" style="transform:rotate(90deg)"></i>
            展开全部{{pageInfo.total}}条
          </a>
        </template>
      </transition>
    </div>
    <!-- 回复输入区 -->
    <slot></slot>
  </div>
</template>

<script>
import ReplyItem from "./reply-item";
import _ from "lodash-es";
import { MsgCommentControllerApi } from "@/api/index";

export default {
  components: { ReplyItem },
  props: {
    replies: { required: true, type: Array },
    pageInfo: { required: true, type: Object },
    rootId: { required: true, type: Number }
  },
  data() {
    return {
      expandable: false,
      initialExpandNum: 3
    };
  },
  computed: {
    mutablePageInfo: {
      get: function() {
        return this.pageInfo;
      },
      set: function(val) {
        this.$emit("update:pageInfo", val);
      }
    },
    mutableReplies: {
      get: function() {
        return this.replies;
      },
      set: function(val) {
        this.$emit("update:replies", val);
      }
    },
    replyListVisible() {
      return (
        (this.comment.replies != null && this.comment.replies.length > 0) ||
        this.replyTarget.rootId == this.comment.id
      );
    },
    expandBtnVisible() {
      return this.pageInfo.total > this.initialExpandNum && !this.expandable;
    },
    renderingReplies() {
      if (this.pageInfo.total > this.initialExpandNum && !this.expandable) {
        let r = _.slice(this.replies, 0, this.initialExpandNum);
        return r;
      } else {
        return this.replies;
      }
    },
    replyTarget() {
      return this.$store.state.comment.replyTarget;
    }
  },
  mounted() {},
  methods: {
    expand() {
      this.expandable = true;
    },
    async loadData() {
      let {
        body: { data, pageInfo, code }
      } = await MsgCommentControllerApi.queryRepliesUsingPOST({
        rootId: this.rootId,
        ...this.pageInfo
      });
      this.mutablePageInfo = pageInfo;
      this.mutableReplies = data;
    }
  }
};
</script>

<style>
.reply-list {
  color: #666;
  background-color: #fafafa;
  padding: 10px 10px;
  border-radius: 5px;
}

.reply-expand-block {
  margin: 5px 0;
}
.reply-pagination.el-pagination {
  padding: 0;
}
.reply-pagination .btn-prev,
.el-pager li,
.btn-next {
  background-color: inherit !important;
}
</style>