import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Dashboard from './views/Dashboard.vue';
import store from './store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (store.state.isLoggedIn) {
        next(); 
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (store.state.isLoggedIn) {
        next(); 
      } else {
        next('/');
      }
    }
  }
];

export default new VueRouter({
  mode: 'history', // Use HTML5 history mode
  routes
});