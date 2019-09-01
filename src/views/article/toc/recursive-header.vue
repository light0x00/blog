<template>

  <el-submenu  v-if="header.children!=null&&header.children.length>0" :index="header.title" active-text-color="red">
    <template slot="title">
      <i class="el-icon-notebook-2"></i>
      <span class="text-main">{{header.title}}</span>
    </template>
    <template v-for="(item,index) in header.children">
      <recursive-header :key="index" :header="item"></recursive-header>
    </template>
  </el-submenu>
  
  <el-menu-item v-else :index="header.title" >
    <a class="text-normal " style="display: inline-block;width:100%;text-decoration:none" :href="`#${header.title}`">{{header.title}}</a>
  </el-menu-item>
</template>

<script>

export default  {
  name: "recursive-header",
  props: {
    header: { required: true, type: Object }
  },
  created() {},
  methods: {}
};


</script>

<style >

</style>
