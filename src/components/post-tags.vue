<template>
  <div class="post-tag-wrapper">
    <i class="el-icon-price-tag" style="font-size:24px;transform: rotate(90deg);margin-right:10px"></i>
    <a href="javascript:void(0)" class="text-main" style="margin-right:10px" v-for="tag in tags" :key="tag" @click="clickTag(tag)">#{{ tag }}</a>
  </div>
</template>

<script>
export default {
    name:"post-tags",
    // functional:true,
    props:{tags:{type:Array,required:true}},
    methods:{
      clickTag(tag){
		  this.$emit("onChoose",tag)
        // this.$router.push({path:'/list',query:{tag}})
      }
    }
};
</script>

<style scoped>
.post-tag-wrapper{
  display: flex;
  align-items: center;
}

.post-tag-wrapper .el-tag{
  cursor: pointer;
  margin:5px;
}
</style>

