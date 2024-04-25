import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Dashboard from './views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Login
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
    // TODO keep session as when reload 
    path: '/dashboard',
    component: Dashboard,
  }
];

export default new VueRouter({
  mode: 'history', // Use HTML5 history mode
  routes
});