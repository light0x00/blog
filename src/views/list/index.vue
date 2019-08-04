<template>
  <div style="width:100%">
    <el-card v-for="post in postList" :key="post.key" @click="openPost(post)">
      <router-link :to="'/post/'+post.key"><h3>{{post.title}}</h3></router-link>
      <p style="text-align:right">{{post.createDate}}</p>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  // props: {posts:{required:false,type:Array,default:Vue.$store.getters["posts/getList"]}},
  computed: {
    postList() {
      let list = this.$store.getters["posts/getList"];
      //根据搜索参数(如果有)过滤
      let query = this.$attrs.query;
      if (query != null) {
        list = list.filter(post => {
          if (query.tag) {
            let tagMatched = post.tags.indexOf(query.tag) >= 0;
            if (!tagMatched)
              return false;
          }
          return true;
        });
      }
      return list;
    }
  },
  filter(post) {},
  created() {}
};
</script>

<style scoped>
.el-card {
  width: 100%;
  margin-top: 20px;
}
</style>
