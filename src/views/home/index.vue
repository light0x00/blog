<template>
    <div class="home-wrapper">
        <div class="home-slogan">...</div>
        <!-- <router-link to="/archive" class="home-btn"></router-link> -->
		
    </div>
</template>

<script>
export default {
    mounted() {
       this.$router.push("/archives")
    }
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
    color: #909399;
    font-style: italic;
    color: #b6b6b6;
    font-size: 24px;
    text-align: center;
    text-shadow: 0 1px 1px #fff;
}
.home-btn {
    font-style: italic;
    font-size: 14px;
    /* text-decoration: underline */
}
</style>
