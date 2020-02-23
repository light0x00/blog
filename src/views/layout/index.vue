<template>
    <div class="application-container">
        <!-- 导航栏 -->
        <navbar
            class="navbar"
            :pin.sync="navbarPin"
            v-bind:sidebarVisible.sync="sidebarVisible"
        ></navbar>
        <!-- 侧边栏 -->
        <sidebar :visible.sync="sidebarVisible"></sidebar>

        <div class="main-container " :style="{top:navbarPin?'50px':'0'}">
            <div class="adaptive-container adaptive-width">
				<!-- 正文 -->
                <div class="content">
                    <router-view></router-view>
                </div>
				<!-- 底部 -->
                <div class="footer" >
                    <visitor-map style="width:80px; height:80px;"></visitor-map>
                </div>
            </div>
        </div>
     
        <bg></bg>
    </div>
</template>

<script>
import navbar from "@/views/layout/navbar";
import sidebar from "@/views/layout/sidebar";
import bg from "@/views/layout/bg";
import { isMobile } from "@/common/utils";
export default {
    name: "layout",
    components: {
        navbar,
        sidebar,
        bg
    },
    data: function() {
        return {
            sidebarVisible: false,
            navbarPin: true
        };
    },
    methods: {
        onNavbarPin() {},
        onNavbarUnpin() {}
    },
    mounted() {}
};
</script>

<style>
.narrow-box {
    width: 70%;
    color: red;
}

.application-container {
    height: 100%;
    /* display: flex;
  flex-direction: column;
  align-items: center; */
}

.navbar {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    /* border-bottom: solid 1px #e6e6e6; */
    background-color: #fff;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    height: 50px;
    width: 100%;
    z-index: 2;
}

.main-container {
    min-height: calc(100% - 50px);
    position: relative;
    display: flex;
    justify-content: center;
}

.adaptive-height {
    min-height: calc(100% - 50px);
}

.adaptive-container{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.content {
    min-height: calc(100% - 100px);
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
}
.footer {
	width: 100%;
    height: 100px;
    /* position: relative; */
    /* top: 50px; */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

@media (min-width: 1800px) {
    .adaptive-width {
        width: 50%;
    }
}

@media (min-width: 900px) and (max-width: 1800px) {
    .adaptive-width {
        width: 60%;
    }
}

@media (max-width: 900px) {
    .adaptive-width {
        width: 100%;
    }
}
</style>
