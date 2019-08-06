<template>
  <div class="full-box">
    <div style="height:20px">
      <!-- <router-link to="/">返回首页</router-link> -->
      <navbar></navbar>
    </div>
    <div style="display:flex;justify-content:center; height: calc(100% - 20px)">
      <div style="width:1000px;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
    navbar: ()=>import("@/views/navbar"),
    sidebar: ()=>import("@/views/sidebar")
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
