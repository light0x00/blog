import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: require("@/views/home").default
    },
    // {
    //     path:"/post",

    // },
    {
        path: "/post",
        component: () => import('@/views/list'),
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

export default router