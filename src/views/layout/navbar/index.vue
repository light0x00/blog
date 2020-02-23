<template>
    <div id="navbar">
			<!-- <a class="menu-icon" @click="collapseSidebar"></a> -->
        <el-button class="button-box" @click.native.stop="collapseSidebar">
            <!-- <span style="font-family:Comic Sans MS;font-size:14px;">
                <div class="menu-icon"></div>
            </span> -->
            <i :class="sidebarVisible?'el-icon-s-unfold':'el-icon-s-unfold'"></i>
        </el-button>

        <el-menu class="navbar-menu" mode="horizontal" router :default-active="$route.path">
            <el-menu-item index="/archives">归档</el-menu-item>
            <el-menu-item index="/tags">标签</el-menu-item>
        </el-menu>
        <el-button class="button-box" @click="$router.push('/')">
            <i style class="el-icon-s-home"></i>
        </el-button>
    </div>
</template>

<script>
import Headroom from "headroom.js";

export default {
    props: {
        sidebarVisible: Boolean
    },
    data: function() {
        return {};
    },
    created() {},
    methods: {
        collapseSidebar() {
            this.$emit("update:sidebarVisible", !this.sidebarVisible);
        }
    },
    mounted() {
        let eleNavbar = document.getElementById("navbar");
        let thisRef = this;

        var headroom = new Headroom(eleNavbar, {
            offset: 205,
            tolerance: 10,
            classes: {
                pinned: "navbar--pinned",
                // when scrolling down
                unpinned: "navbar--unpinned"
            },
            onPin: function() {
                thisRef.$emit("update:pin", true);
            },
            onUnpin: function() {
                thisRef.$emit("update:pin", false);
            }
        });
        headroom.init();
        this.$once("hook:beforeDestroy", function() {
            headroom.destroy();
        });
    }
};
</script>

<style>
.navbar {
    align-items: center;
}

.navbar-menu {
    border-bottom: none;
    width: calc(100% - 50px);
    height: 100%;
    background-color: inherit;
}

.navbar-menu.el-menu {
    border: none;
}
.navbar-menu .el-menu-item {
    height: 100%;
    display: flex;
    align-items: center;
}

.button-box {
    border: none;
    border-bottom: none;
    background-color: inherit;
    height: 100%;
    font-size: 18px;
    /* font-size:30px; */
    margin-left: 0;
    height: inherit;
}

.navbar--unpinned {
    animation: fade-out 0.5s forwards;
}

.navbar--pinned {
    animation: fade-in 0.5s forwards;
}
.menu-icon {
box-sizing: border-box;
    width: 35px;
    height: 25px;
    border-top: 5px solid #A8B5C2;
    border-bottom: 5px solid #A8B5C2;
    /* position: absolute; */
    top: calc(100px - 40px);
	right: 5px;
	cursor: pointer;
}
.menu-icon::after {
    content: "";
    display: block;
    width: 100%;
    height: 5px;
    position: relative;
    top: calc((100% - 5px) / 2);
    background: #A8B5C2;
}
</style>
