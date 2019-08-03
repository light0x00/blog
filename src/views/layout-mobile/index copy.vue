<template>
  <div class="full-box">
    <!-- 导航栏 -->
    <div class="nav-bar" style="">
      <router-link to="/">返回首页</router-link>
      <a href="javascript:void(0)"  @click="toggleMenuVisible">菜单</a>
    </div>
    <!-- 博客菜单 -->
    <div class="sidebar" style="" v-show="menuVisible">
      <Blog-Menu></Blog-Menu>
    </div>
    <!-- 博客 -->
    <div style="display:flex;justify-content:center;height: calc(100% - 20px);width:100%">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menu from "@/views/menu";

export default {
  components: {
    "Blog-Menu": menu
  },
  data:function(){
    return {
      menuVisible:true
    }
  },
  methods:{
    toggleMenuVisible(){
      this.menuVisible=!this.menuVisible
    }
  }
};
</script>

<style scope>


/* dl {
  margin: 20px;
}

dt {
  font-size: 16px;
}

 */

dl>dl {
  text-indent: 2em;
}

dd {
  text-indent: 2em;
}
dl>dl>dd {
  text-indent: 4em;
}
.nav-bar{
  width:100%;
  position:fixed;
  top:0;
  padding: 10px 0;
  background-color: #DCDFE6;
}

.sidebar{
  width:100%;position:fixed;bottom:0;background-color: #DCDFE6;
}

.nav-bar a{
}
</style>
