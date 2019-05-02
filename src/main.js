import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { routes } from './routes'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as firebase from "firebase/app";
import "firebase/database";
import UUID from 'vue-uuid';

Vue.use(UUID);

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueResource);

let app ='';
export const eventBus = new Vue();

const router = new VueRouter({
  routes,
  mode: 'history'
});

var config = {
  apiKey: "AIzaSyA-rF_VDMsZmPbznGDT-P50r6HyIyrZxkI",
  authDomain: "mybookshelf-2ad19.firebaseapp.com",
  databaseURL: "https://mybookshelf-2ad19.firebaseio.com",
  projectId: "mybookshelf-2ad19",
  storageBucket: "mybookshelf-2ad19.appspot.com",
  messagingSenderId: "781866483478"
};
let appFb = firebase.initializeApp(config);

export const db = appFb.database();

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('login');
  else if(!requiresAuth && currentUser) next('home');
  else next();
});

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      el: '#app',
      router,
      render: h => h(App),
    });
  }
});
