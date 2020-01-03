<template>
    <el-menu style="width:100%;border-right:none" :collapse-transition="false">
      <template v-for="(node,index) in articleTrees">
        <recursive-ptree :treeNode="node" :nodeIndex="''+index" :key="node.compPath"></recursive-ptree>
      </template>
    </el-menu>
</template>

<script>
import { mapState } from "vuex";
import RecursivePtree from "./recursive-ptree";
import Vue from "vue";

Vue.component(RecursivePtree.name, RecursivePtree);

export default {
  name:"articles-menu",
  props:{
  },
  computed: {
    ...mapState("articles", ["articleTrees"])
  },
  created(){
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

</style>
