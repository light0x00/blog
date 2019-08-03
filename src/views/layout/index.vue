<template>
  <div class="full-box">
    <div style="height:20px">
      <!-- <router-link to="/">返回首页</router-link> -->
      <navbar></navbar>
    </div>
    <div style="display:flex;justify-content:center; height: calc(100% - 20px)">
      <div style="width:300px">
        <!-- <Blog-Menu></Blog-Menu> -->
      </div>
      <div style="width:1000px;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import menu from "@/views/menu";

import navbar from "@/views/navbar";
import sidebar from "@/views/sidebar";
export default {
  components: {
    navbar: navbar,
    sidebar: sidebar
  }
};
</script>

<style scope>
dl {
  margin: 20px;
}

dt {
  font-size: 16px;
}

dd {
  font-size: 14px;
}
</style>
