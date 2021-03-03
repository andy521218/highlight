
import Vue from 'vue'
import VueRouter from 'vue-router'
import teacher from './teacher'
import user from './user'
import admin from './admin'


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
]


export function initRoutes() {
  const token = sessionStorage.getItem('token')
  const currentRouter = router.options.routes
  if (token == 'ADMIN') {
    admin.forEach(item => {
      currentRouter.push(item)
    })
  }
  if (token == 'TEACHER') {
    teacher.forEach(item => {
      currentRouter.push(item)
    })
  }
  if (token == 'STUDENT') {
    user.forEach(item => {
      currentRouter.push(item)
    })
  }
  router.addRoutes(currentRouter)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
