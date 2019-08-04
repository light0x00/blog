<template>
  <div class="post-tag-wrapper">
    <el-tag v-for="item in tags" :key="item" effect="plain">{{ item }}</el-tag>
  </div>
</template>

<script>
export default {
    name:"post-tags",
    // functional:true,
    props:{tags:{type:Array,required:true}}
};
</script>

<style scoped>
.post-tag-wrapper{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
}
.el-tag{
  margin:10px;
}
</style>
