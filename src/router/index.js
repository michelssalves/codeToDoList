import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../App.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu
  },
  {
    path: "*",
    redirect: "/Menu",
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
