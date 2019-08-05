<template>
  <el-submenu v-if="treeNode.isGroup" :index="nodeIndex" active-text-color="red">
    <template slot="title">
      <i class="el-icon-s-management"></i>
      <span>{{treeNode.title}}</span>
    </template>
    <template v-for="(childNode,childIndex) in treeNode.childs">
      <recursive-ptree :key="childIndex" :nodeIndex="nodeIndex+'-'+childIndex" :treeNode="childNode"></recursive-ptree>
    </template>
  </el-submenu>
  <el-menu-item v-else @click="openPost(treeNode)" >
      {{treeNode.title}}
  </el-menu-item>
</template>

<script>
import { mapMutations } from "vuex";

import { join } from "path";

export default {
  name: "recursive-ptree",
  props: { treeNode: Object, 
  nodeIndex: {
        default: null,
        validator: val => typeof val === 'string' || val === null
      },
  },
  created() {
  },
  methods: {
    openPost(postNode) {
      this.$router.push({ path: join("/post", postNode.key) });
    }
  }
};
</script>

<style scoped>
.el-submenu{
  border-bottom:1px solid #EBEEF5;
}
.el-menu-item{
  border-bottom:1px solid #F2F6FC;
}
</style>
