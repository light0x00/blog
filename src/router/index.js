import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: require("@/views/home").default
    },
    {
        path: "/post",
        component: () => import('@/views/layout'),
        children: [
            {
                path: "*",
                component: () => import('@/views/post'),
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