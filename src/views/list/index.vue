<template>
  <div class="post-list-wrapper" style="width:100%">
    <el-card class="post-list-row" v-for="post in postList" :key="post.key" >
      <div  class="post-info">
        <router-link class="post-button" :to="post.routePath">
          <h3>{{post.title}}</h3>
        </router-link>
        <post-tags v-if="!isMobile()" :tags="post.tags"></post-tags>
      </div>
      
      <p style="text-align:right;width:">{{post.createDate}}</p>

    </el-card>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  computed: {
    postList() {
      let list = this.$store.getters["articles/getList"];
      //根据搜索参数(如果有)过滤
      let query = this.$attrs.query;
      if (query != null) {
        list = list.filter(post => {
          if (query.tag) {
            let tagMatched = post.tags.indexOf(query.tag) >= 0;
            if (!tagMatched) return false;
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

<style>
.post-list-wrapper {
  padding:15px;
}
.post-list-wrapper .el-card{
  margin-bottom: 15px
}

.post-list-row {
  width: auto;
  /* margin-top: 20px; */
  display: flex;
  flex-direction:column;
  /* justify-content: space-around; */
}

.post-info{
  display: flex;
  /* flex-direction:row; */
  justify-content:space-between;
}
.post-title h3,p{
  margin:0px;
}

.post-button{
  display: inline-block;
  width:100%;
}

</style>
