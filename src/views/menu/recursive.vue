<template>
  <div>
    <dl v-if="treeNode.isGroup">
      <dt>{{treeNode.title}}</dt>
      <dd v-for="(childNode,childIndex) in treeNode.childs" :key="childIndex">
        <recursive :treeNode="childNode"></recursive>
      </dd>
    </dl>
    <dd v-else>
      <a href="javascript:void(0)" @click="openPost(treeNode)">{{treeNode.title}}</a>
    </dd>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import {join} from 'path'

export default {
  name: "recursive",
  props: { treeNode: Object },
  created() {},
  methods: {
    openPost(postNode) {
      this.$router.push({path:join("/post",postNode.key)});

    }
  }
};
</script>

<style>
</style>
