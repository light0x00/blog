<template>
  <div>
    <template v-for="node in postTrees">
      <recursive :treeNode="node" :key="node.compPath"></recursive>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

import recursive from "./recursive.vue";

import Vue from "vue";
Vue.component("recursive", recursive);

export default {
  computed: {
    ...mapState("posts", ["postTrees"])
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
