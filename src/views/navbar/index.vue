<template>
     <el-menu
      class="el-menu-demo"
      mode="horizontal"
      
    >
      <el-menu-item index="1" @click="collapseSidebar"> <i :class="sidebarVisible?'el-icon-s-unfold':'el-icon-s-fold'"></i></el-menu-item>
      <el-menu-item index="2" @click="$router.push('/')">首页</el-menu-item>
      <el-menu-item index="3" @click="$router.push('/about')">关于</el-menu-item>

    </el-menu>
</template>

<script>
export default {
    props:{
        sidebarVisible:Boolean
    }
    ,data:function(){
        return {

        }
    },
    created(){
        console.log("!!!!")
    }, 
    methods:{
        collapseSidebar(){

            console.log("!!!",!this.sidebarVisible)
            this.$emit("update:sidebarVisible",!this.sidebarVisible)
        }
    }
}
</script>

<style>

</style>
