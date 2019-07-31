import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);

const routes = [
    {
        path:"/",
        component: require("@/views/home").default
    },
    {
        path: "/posts",
        component: ()=>import('@/views/list'),
        children : [
            POST_ROUTES_CODE
        ]
    }
]

const router = new VueRouter({
    routes: routes,
})

export default router