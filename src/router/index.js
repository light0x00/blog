import VueRouter from 'vue-router'
import Vue from 'vue'

import {isMobile} from '@/common/utils'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: require("@/views/home").default
    },
    {
        path: "/post",
        // component: () => isMobile()?import('@/views/layout-mobile'):import('@/views/layout'),
        component: () => import('@/views/layout-mobile'),
        children: [
            {
                path: "",
                component: () => import('@/views/post'),
            },
            {
                path: "*",
                component: () => import('@/views/post'),
            }
        ]
    },
    {
        path: "/about",
        component: () => import('@/views/layout-mobile'),
        children: [
            {
                path: '',
                component: ()=>import('@/views/about')
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

NProgress.configure({ showSpinner: true })


router.beforeEach(async (to, from, next) => {

    NProgress.start()
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})


export default router