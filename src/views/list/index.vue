<template>
  <div>
    <div>
      <Blog-Menu></Blog-Menu>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import menu from './comps/menu'

export default {
    components:{
        "Blog-Menu":menu
    }
};
</script>

<style>
</style>
