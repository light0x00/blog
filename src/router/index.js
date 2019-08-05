import VueRouter from 'vue-router'
import Vue from 'vue'

import { isMobile } from '@/common/utils'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import('@/views/layout-mobile'),
        children: [
            {
                path: '',
                component: require("@/views/home").default
            }
        ]
    },
    {
        path: "/post",
        // component: () => isMobile()?import('@/views/layout-mobile'):import('@/views/layout'),
        component: () => import('@/views/layout-mobile'),
        children: [
            {
                path: "",
                component: () => import(/* webpackPrefetch:true */'@/views/post'),
            },
            {
                path: "*",
                component: () => import(/* webpackPrefetch:true */'@/views/post'),
            }
        ]
    },
    {
        path: "/about",
        component: () => import('@/views/layout-mobile'),
        children: [
            {
                path: '',
                component: () => import('@/views/about')
            }
        ]
    },
    {
        path: "/archive",
        component: () => import('@/views/layout-mobile'),
        children: [
            {
                path: '',
                component: () => import('@/views/archive')
            }
        ]
    },
    {
        path: "/category",
        component: () => import('@/views/layout-mobile'),
        children: [
            {
                path: '',
                component: () => import('@/views/category')
            }
        ]
    },
    {
        path: "/tags",
        component: () => import('@/views/layout-mobile'),
        children: [
            {
                path: '',
                component: () => import('@/views/tags')
            }
        ]
    },
    {
        path: "/list",
        component: () => import('@/views/layout-mobile'),
        children: [
            {
                path: '',
                component: () => import('@/views/list'),
                props: (route) => ({ query: {tag:route.query.tag} })
            }
        ]
    }
]

const router = new VueRouter({
    routes: routes,
})


//-----------------------------------hook

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import store from '@/store'

NProgress.configure({ showSpinner: true })


router.beforeEach(async (to, from, next) => {

    NProgress.start()
    if(to.path=="/"){
        store.commit("music/show")
    }else{
        store.commit("music/hide")
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})


export default router