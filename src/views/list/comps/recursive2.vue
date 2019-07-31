<template>
  <div>
      <template v-if="treeNode.isGroup">
        <div >
          {{treeNode.level}}
          <p :style="{fontSize: 24 - treeNode.level*2 }">{{treeNode.title}}</p>
          <template v-for="(childNode,childIndex) in treeNode.childs">
            <recursive :treeNode="childNode" :key="childIndex"></recursive>
          </template>
        </div>
      </template>
      <router-link v-else :to="treeNode.routePath" >{{treeNode.title}}</router-link>
  </div>
</template>

<script>

import recursive from './recursive'

export default {
  name: "recursive",
  components: { recursive },
  props: { treeNode: Object },
  created() {}
};
</script>

<style>
</style>
