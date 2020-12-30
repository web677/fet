import Vue from 'vue'
import Router from 'vue-router'
import Tiny from './views/Tiny.vue'

Vue.use(Router)

export default new Router({
    linkExactActiveClass: 'cur',
    routes: [
        {
            path: '/',
            name: 'Tiny',
            component: Tiny
        }, {
            path: '/Tiny',
            name: 'Tiny',
            component: Tiny
        },
        {
            path: '/ToBase64',
            name: 'ToBase64',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/ToBase64.vue')
        }
    ]
})
