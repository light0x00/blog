<template>
  <el-submenu v-if="treeNode.isGroup" :index="nodeIndex">
    <template slot="title">
      <!-- <i class="el-icon-location"></i> -->
      <span>{{treeNode.title}}</span>
    </template>
    <template v-for="(childNode,childIndex) in treeNode.childs">
      <recursive :key="childIndex" :nodeIndex="nodeIndex+'-'+childIndex" :treeNode="childNode"></recursive>
    </template>
  </el-submenu>
  <el-menu-item v-else>
    <a href="javascript:void(0)" @click="openPost(treeNode)">{{treeNode.title}}</a>
  </el-menu-item>
</template>

<script>
import { mapMutations } from "vuex";

import { join } from "path";

export default {
  name: "recursive",
  props: { treeNode: Object, 
  nodeIndex: {
        default: null,
        validator: val => typeof val === 'string' || val === null
      },
  },
  created() {
    console.log("!",this.nodeIndex)
  },
  methods: {
    openPost(postNode) {
      this.$router.push({ path: join("/post", postNode.key) });
    }
  }
};
</script>

<style scoped>
a {
  color: #fff;
}
</style>
