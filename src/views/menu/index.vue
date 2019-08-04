<template>
    <el-menu style="width:100%;border-right:none" :collapse-transition="false">
      <template v-for="(node,index) in postTrees">
        <recursive-ptree :treeNode="node" :nodeIndex="''+index" :key="node.compPath"></recursive-ptree>
      </template>
    </el-menu>
</template>

<script>
import { mapState } from "vuex";

import recursive from "./recursive-ptree.vue";

import Vue from "vue";
Vue.component("recursive-ptree", recursive);

export default {
  name:"post-menu",
  props:{
  },
  computed: {
    ...mapState("posts", ["postTrees"])
  },
  data:function(){
    return {
    }
  },
  methods:{
  }
};
</script>

<style scoped>
/* dd {
  display: block;
  margin-inline-start: 10px;
}
dl {
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0em;
} */

/* .el-menu-item,.el-submenu__title {
    height:40px;
    line-height:40px;
} */
</style>
