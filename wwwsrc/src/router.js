import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Home from './views/Home.vue'
// @ts-ignore
import Login from './views/Login.vue'
import Store from './store'

function guard(to, from, next) {
  if (Store.state.user) {

    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
}

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      beforeEnter: guard,
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})