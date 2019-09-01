import VueRouter from 'vue-router'
import Vue from 'vue'

import { isMobile } from '@/common/utils'

Vue.use(VueRouter);

import Layout from '@/views/layout-mobile'
import Home from '@/views/home'



const routes = [

    {
        path: "/",
        component: Layout,
        children: [
            {
                path: '',
                component: Home
            }
        ]
    },
    {
        path: window.APP_CONFIG["postRoutePrefix"] || "/article",
        component: Layout,
        children: [
            // {
            //     path: "",
            //     component: () => import(/* webpackPrefetch:true,webpackChunkName:'article' */'@/views/article'),
            // },
            {
                path: "*",
                component: () => import(/* webpackPrefetch:true,webpackChunkName:'article' */'@/views/article'),
            }
        ]
    },
    {
        path: "/about",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName:'about' */'@/views/about')
            }
        ]
    },
    {
        path: "/archive",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName:'archive' */'@/views/archive')
            }
        ]
    },
    {
        path: "/category",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName:'category' */'@/views/category')
            }
        ]
    },
    {
        path: "/tags",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName:'tags' */'@/views/tags')
            }
        ]
    },
    {
        path: "/list",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName:'list' */'@/views/list'),
                props: (route) => ({ query: { tag: route.query.tag } })
            }
        ]
    },
    {
        path: "*",
        component: require("@/components/404").default
    },
    // {
    //     path: "/test",
    //     component: require("@/views/test").default
    // },
]


const router = new VueRouter({
    routes: routes,
    /* devServer运行时是输出到内存的,这会导致预渲染插件无法根据磁盘文件渲染
        所以devServer模式使用hash,避免浏览器向服务器请求预渲染页导致404 */
    // mode: window.APP_CONFIG["activeProfile"] === "devServer" ? "hash" : "history"
    mode: "history"

})

//-----------------------------------hook

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import store from '@/store'

NProgress.configure({ showSpinner: true })


router.beforeEach(async (to, from, next) => {

    NProgress.start()
    if (to.path == "/") {
        store.commit("player/show")
    } else {
        store.commit("player/hide")
    }

    //title的动态更改
    try {
        let info = await store.dispatch("posts/getPostByRoute", to);
        document.title = info.title;
    } catch (e) {
        document.title = "Light0x00的博客"
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})


export default router