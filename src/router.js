import Vue from 'vue'
import Router from 'vue-router'
import Tiny from './views/Tiny.vue'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'cur',
    routes: [
        {
            path: '/',
            redirect: '/Tiny'
        }, {
            path: '/Tiny',
            component: Tiny
        },
        {
            path: '/Converter',
            name: 'Converter',
            component: () => import('./views/Converter.vue')
        },
        {
            path: '/Colors',
            name: 'Colors',
            component: () => import('./views/Colors.vue')
        },
        {
            path: '/Sites',
            name: 'Sites',
            component: () => import('./views/Sites.vue')
        }
    ]
})
