<template>
  <!-- 回复 -->
  <div class="reply-list" v-loading="pageState.loading" element-loading-text="加载评论中😳">
    <!-- 回复列表 -->
    <template>
      <reply-item v-for="item of renderingReplies" :reply="item" :key="`reply-${item.id}`"></reply-item>
    </template>
    <transition name="el-fade-in">
      <div class="reply-expand-block">
        <!-- 分页栏 -->
        <template v-if="expanded==true">
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

        <!-- 展开更多/收起 -->
        <template v-if="expandable">
          <template v-if="expanded==true">
            <div>
              <a href="javascript:void(0)" class="text-normal" @click="expanded=false">
                <i class="el-icon-d-arrow-right" style="transform:rotate(-90deg)"></i>
                收起
              </a>
              <!-- <template v-if="expanded==true">
              </template>-->
            </div>
          </template>
          <template v-else>
            <a href="javascript:void(0)" class="text-normal" @click="expanded=true">
              <i class="el-icon-d-arrow-right" style="transform:rotate(90deg)"></i>
              展开全部{{pageInfo.total}}条
            </a>
          </template>
        </template>
      </div>
    </transition>
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
      expanded: false,
      initialExpandNum: 3,
      pageState: {
        loading: false
      }
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
    /* 跟踪replies的变化 */
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
    expandable() {
      return this.replies.length > this.initialExpandNum;
    },
    renderingReplies() {
      //可展开,并且非展开状态 只显示initialExpandNum条
      // console.log("expandable", this.expandable, "expanded", this.expanded);
      if (this.expandable && !this.expanded) {
        let r = _.slice(this.replies, 0, this.initialExpandNum);
        return r;
      }
      //「不可展开」 或 「可展开且已展开」
      else {
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
      this.expanded = true;
    },
    async loadData() {
      this.pageState.loading = true;
      let {
        body: { data, pageInfo, code }
      } = await MsgCommentControllerApi.queryRepliesUsingPOST({
        rootId: this.rootId,
        ...this.pageInfo
      });
      this.mutablePageInfo = pageInfo;
      this.mutableReplies = data;
      this.pageState.loading = false;
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