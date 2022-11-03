import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Home from '@/components/Home'
import Login from '@/pages/Login'
import UserList from '@/pages/User'
import Book from '@/pages/Book'
import Reader from '@/pages/Reader'
import BookType from "@/pages/BookType"
import Borrow from '@/pages/Borrow'
import Echart from "@/pages/Echart"
import Record from '@/pages/Record'
//重写push和replace方法
let originPush = Router.prototype.push;
let originReplace = Router.prototype.replace;
Router.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => {

        });
    }
}
Router.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}
//常量路由
export const constantRoutes= [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/',
        component: Login,
        redirect: '/login',
    },
    {
        path: '/404',
        component: () => import('@/pages/404.vue'),
    },
    {
        path: '/home',
        component: Home,
        redirect: '/home/echart',
        children: [
            {
                path: 'userlist',
                component: UserList,
            },
            {
                path: 'booklist',
                component: Book,
            },
            {
                path: 'reader',
                component: Reader,
            },
            {
                path: 'booktype',
                component: BookType,
            },
            {
                path: 'borrow',
                component: Borrow,
            },
            {
                path: 'record',
                component: Record,
            },
            {
                path: 'echart',
                component: Echart,
            },

        ]
    },

]
//异步路由
// export const asyncRoutes= [
   
// ]
//任意路由
// export const anyRoutes =[
   
// ]
const createRouter = () => new Router ({
    //滚动条位置重置
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()
//路由守卫
//全局前置守卫
router.beforeEach((to, from, next) => {
    // next();
    if (localStorage.getItem('TOKEN')) {

        if (to.path == '/login') {
            next('/home')
        } else {
            next()
        }
    } else {
        if (to.path == '/login') {
            next()
        }else {
            next('/404')
        }
    }
    if(localStorage.getItem('TOKEN') == 'editor'){
        if(to.path == '/home/record'|| to.path == '/home/booklist' || to.path == '/home/echart' || to.path == '/login'){
            next()
        }else {
            next('/404')
        }
    }
})
export default router