import Vue from 'vue'
import Router from 'vue-router'
import Tiny from './views/Tiny.vue'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'cur',
    routes: [
        {
            path: '/',
            component: Tiny
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
            path: '/Formator',
            name: 'Formator',
            component: () => import('./views/Formator.vue')
        }
    ]
})
