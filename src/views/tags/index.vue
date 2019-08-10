<template>
  <div class="tag-wrapper" >
    <a
      class="tag"
      v-for="(posts,tag) in tags"
      @click="$router.push({path:'/list',query:{tag}})"
      :key="tag"
      type="primary"
      :style="'font-size:'+12*posts.length+'px'"
    >{{tag}}</a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// import {PostList} from './list'

export default {
  // components:{PostList},
  created() {},
  computed: {
    tags() {
      return this.$store.getters["posts/getTags"];
    }
  }
};
</script>

<style scoped>
.tag-wrapper {
  width: 100%;
  /* height: calc(100%);
  height: 100%;
  height: -moz-available; 
  height: -webkit-fill-available; */
  height: fill-available;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
}

.tag {
  margin: 10px;
  cursor: pointer;
}
</style>
