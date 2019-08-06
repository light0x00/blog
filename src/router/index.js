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
                component:Home
            }
        ]
    },
    {
        path: "/post",
        // component: () => isMobile()?import('@/views/layout-mobile'):import('@/views/layout'),
        component: Layout,
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
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/about')
            }
        ]
    },
    {
        path: "/archive",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/archive')
            }
        ]
    },
    {
        path: "/category",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/category')
            }
        ]
    },
    {
        path: "/tags",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/tags')
            }
        ]
    },
    {
        path: "/list",
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/list'),
                props: (route) => ({ query: {tag:route.query.tag} })
            }
        ]
    },
    {
        path: "*",
        redirect:"/"
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
        store.commit("player/show")
    }else{
        store.commit("player/hide")
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})


export default router