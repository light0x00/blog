<template>
  <div class="comment-upvote">
    <span class="comment-upvote-btn" @click="onUpvote">👍</span>
    <span class="comment-upvote-num" v-if="isShowNum" >{{number}}</span>
  </div>
</template>

<script>

import { NumberUtils } from "@/common/utils";

export default {
  props:{number:{required:true}},
  computed:{
    isShowNum(){
      return NumberUtils.gtZero(this.number)
    },
    hasLogined(){
      return this.$store.getters["user/hasLogined"]
    }
  },
  methods:{
    onUpvote(){
      if(!this.hasLogined){
        this.$notify({type:'warning',message:"匿名用户不可以点赞😳"})
      }
    }
  }
};
</script>

<style>
.comment-upvote{
  display: inline-block;  
}

.comment-upvote-btn {
  cursor: pointer;
  padding:2px 3px;
}
.comment-upvote-num {
}

</style>