<template>
  <div class="home-wrapper">
    <div class="home-slogan">There are only two hard things in Computer Science: cache invalidation and naming things.</div>
    <router-link to="/archive" class="home-btn">
      <!-- <i class="el-icon-arrow-right">随便逛逛</i> -->
    </router-link>
  </div>
</template>

<script>
export default {
  mounted() {}
};
</script>

<style>
.home-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fill-available;
}

.home-wrapper .home-slogan {
  /* font-family: "Open Sans script=latin rev=1";
  font-size: 40px;
  font-style: normal;
  font-weight: 400; */
  /* text-align: center; */
  /* font-family: 'Helvetica Neue', sans-serif; font-size: 28px;  */
  /* font-family: 'Lato', sans-serif; font-size: 28px; font-weight: 300;  */
  color: #909399;
  font-style: italic;
  color: #b6b6b6;
  font-size: 24px;
  text-align: center;
  text-shadow: 0 1px 1px #fff;

  /* font-family: 'Lato', arial, serif; line-height: 1.25; margin: 0 0 10px; font-size: 40px; font-weight: bold; */
}
.home-btn {
  font-style: italic;
  font-size: 14px;
  /* text-decoration: underline */
}
</style>
