import Vue from 'vue';
import Router from 'vue-router';
// @ts-ignore
import Home from './views/Home.vue';
// @ts-ignore
import Front from './views/Front.vue';
// @ts-ignore
import Login from './views/Login.vue';
// @ts-ignore
import VaultView from './views/VaultView.vue';
import Store from './store';

function guard(to, from, next) {
  if (Store.state.user) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
}

Vue.use(Router);

const router = new Router({
  routes: [{
      path: '/',
      name: 'front',
      component: Front
    },
    {
      path: '/home',
      beforeEnter: guard,
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/vaultview/:vaultId/:userId',
      name: 'vaultview',
      component: VaultView,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name.toLowerCase() == 'login' || null) {
    next();
  } else {
    Store.dispatch('setLastUrl', from.name);
    next();
  }
});

export default router;