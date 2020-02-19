import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter);
import Layout from '@/views/layout'
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
        path: window.APP_CONFIG["articleRoutePrefix"] ,
        component: Layout,
        children: [
            {
                path: "*",
                component: () => import(/* webpackPrefetch:true,webpackChunkName:'articles' */'@/views/articles'),
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
        path: "/archives",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName:'archives' */'@/views/archives')
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
        path: "/friends",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName:'friends' */'@/views/friends'),
            }
        ]
    },
    {
        path: "/me",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName:'friends' */'@/views/me'),
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
    mode: "history"
})

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import store from '@/store'

NProgress.configure({ showSpinner: true })

router.beforeEach(async (to, from, next) => {

	NProgress.start()
	//播放器隐藏
    if (to.path == "/") {
        // store.commit("player/show")
    } else {
        // store.commit("player/hide")
    }

    //title的动态更改
    try {
        let info = await store.dispatch("articles/getArticleByRoute", to);
        document.title = info.title;
    } catch (e) {
        document.title = "light0x00的博客"  //TODO 改为从 blog.yaml 里获取
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})


export default router