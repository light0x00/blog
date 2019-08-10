<template>
  <div class="post-tag-wrapper">
    <i class="el-icon-price-tag" style="font-size:30px;transform: rotate(90deg);margin-right:10px"></i>
    <el-tag v-for="tag in tags" :key="tag" effect="plain" @click="clickTag(tag)">{{ tag }}</el-tag>
  </div>
</template>

<script>
export default {
    name:"post-tags",
    // functional:true,
    props:{tags:{type:Array,required:true}},
    methods:{
      clickTag(tag){
        this.$router.push({path:'/list',query:{tag}})
      }
    }
};
</script>

<style scoped>
.post-tag-wrapper{
  display: flex;
  align-items: center;
  /* justify-content: center; */

  /* justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: center; */
  /* display: inline-block; */
}
.post-tag-wrapper .el-tag{
  cursor: pointer;
  margin:5px;
}
</style>

