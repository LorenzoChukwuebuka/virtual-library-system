import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import adminDash from '../views/admin/adminDash.vue'
import register from '../views/register.vue'
import addDept from '../views/admin/addDept.vue'
import uploads from '../views/admin/upload.vue'
import category from '../views/admin/category.vue'
import Userhome from '../views/user/home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/adminDash',
    name: 'adminDash',
    component: adminDash,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/addDept',
    name: 'addDept',
    component: addDept,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/category',
    name: 'category',
    component: category,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/uploads',
    name: 'uploads',
    component: uploads,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/Userhome',
    name: 'Userhome',
    component: Userhome,
    beforeEnter:(to, from, next) => {
      const isAuthenticated = localStorage.getItem('Id') ? true: false;
      if (to.name !== 'Home' && !isAuthenticated) next({ name: 'Home' })
      else next();
      } 
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router