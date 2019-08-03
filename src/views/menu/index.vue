<template>
    <el-menu style="width:100%;border-right:none" v-show="visible" @select="onSelect" background-color="#24292e" text-color="#fff">
      <template v-for="(node,index) in postTrees">
        <recursive :treeNode="node" :nodeIndex="''+index" :key="node.compPath"></recursive>
      </template>
    </el-menu>
</template>

<script>
import { mapState } from "vuex";

import recursive from "./recursive.vue";

import Vue from "vue";
Vue.component("recursive", recursive);

export default {
  props:{
    visible:{type:Boolean,default:true}
  },
  computed: {
    ...mapState("posts", ["postTrees"])
  },
  data:function(){
    return {
    }
  },
  methods:{
    onSelect(e){
      this.$emit("update:visible",false)
    }
  }
};
</script>

<style>
dd {
  display: block;
  margin-inline-start: 10px;
}
dl {
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0em;
}
</style>
