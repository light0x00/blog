<template>
  <router-view />
</template>

<script lang="js">
	import axios from "axios";
    export default {
        name: 'App',
        mounted(){
			// axios.get("http://blog-dev.light0x00.com:8080/gc-shop-api/user/info")
        }
    }
</script>
