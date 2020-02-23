<template>
      <div
            class="body-cover"
            :style="{'background-image': `url(${bgImgURL})` }"
        ></div>
</template>

<script>
export default {
	computed:{
		bgImgURL(){
			return this.$store.state.bg.imgURL
		}
	}
}
</script>

<style>
.body-cover {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow: 0px 0px 1000px 80px white inset;
	filter: blur(50px) opacity(0.8);
	z-index: -1;
}
</style>