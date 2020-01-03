<template>
  <div style="width:calc(100% - 20px);padding:10px">
    <!-- 按时间线显示 -->
    <el-timeline v-for="arch in articleArchives" :key="arch.year">
      <h2>{{arch.year}}</h2>
      <el-timeline-item
        v-for="(article,index) in arch.articles"
        :key="index"
        :timestamp="article.month"
        placement="top"
      >
        <el-card>
          <router-link :to="article.routePath">
            <h3>{{article.title}}</h3>
          </router-link>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    articleArchives() {
      return this.$store.getters["articles/getArchives"];
    }
  },
  methods: {
 
  }
};
</script>

<style scoped>
.el-timeline {
  padding: 0;
}
</style>
