import Auth from './Components/Auth'
import NotFound from './Components/404.vue'
import Dashboard from './Components/Dashboard/'
import Student from './Components/Dashboard/Student'
import store from './Store'
import { createRouter, createWebHashHistory,} from 'vue-router';

const routes = createRouter({
    history: createWebHashHistory(),
    hashbang: false,
    routes: [
        { path: '/', component: Dashboard, name: 'Dashboard' },
        { path: '/student/:id', component: Student, name: 'Student' },
        { path: '/auth', component: Auth, name: 'Auth' },
        { path: '/:notFound(.*)*', component: NotFound, name: '404' }
    ]
})



routes.beforeEach((to, from, next) => {

    if (!store.getters['auth/isAuth'] && to.path !=='/auth') {

        return next('/auth')
    }

    if (store.getters['auth/isAuth'] && to.path ==='/auth') {

        return next('/')
    }
   return next()
    

}
)


export default routes;