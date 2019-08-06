<template>
  <div class="wrapper full-box">
    <h3 style="padding:10px">Long long the stream that runs to the sea.</h3>
    <div>
      <router-link to="/archive">文章列表</router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch("music/initPlayer")
  }
  
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
}
a {
  font-size:14px;
  font-weight: bold
}
</style>
