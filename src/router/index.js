import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import LoginService from "@/services/LoginService";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if( LoginService.isAuthenticated() ){
        console.log("Is authenticated go on")
        next()
        return
      }
      if( from.name != "Login"){
        router.push("/login")
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to,from) => {
      if( LoginService.isAuthenticated() ){
        LoginService.logout()
      }
      if( from.name != "Login"){
        router.push("/login")
      }
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
