<template>
  <div>
    我是菜单2
    
 
    <template v-for="node in postTrees">
           <recursive :treeNode="node" :key="node.compPath"></recursive>
    </template>
  </div>
</template>

<script>
//getPostTrees

import { mapState } from "vuex";

import recursive from "./recursive.vue";

export default {
    components:{recursive},
  computed: {
    ...mapState("posts", ["postTrees"])
  },
//   render(h){

//   }
};
</script>

<style>
</style>
