<template>
  <div style="width:calc(100% - 20px);padding:10px">
    <!-- 按时间线显示 -->
    <el-timeline v-for="arch in postArchives" :key="arch.year">
      <h2>{{arch.year}}</h2>

      <el-timeline-item
        v-for="(post,index) in arch.posts"
        :key="index"
        :timestamp="post.month"
        placement="top"
      >
        <el-card @click="openPost(post)">
            <router-link :to="'/post/'+post.key"><h3>{{post.title}}</h3></router-link>
          <!-- <el-link type="primary" @click=""> -->
            <!-- {{post.title}} -->
          <!-- </el-link> -->

          <!-- <h4></h4> -->
          <!-- <p>王小虎 提交于 2018/4/12 20:46</p> -->
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <!-- <el-timeline>
      <el-timeline-item v-for="(item,index) in postArchives" :key="index" :timestamp="item.month" placement="top">
        <el-card>
          <h4>{{item.title}}</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    postArchives() {
      return this.$store.getters["posts/getArchives"];
    }
  },
  methods: {
    openPost(post) {
      $router.push("/post/" + post.key);
    }
  }
};
</script>

<style scoped>
.el-timeline {
  padding: 0;
}
</style>
