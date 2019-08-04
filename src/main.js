import '@/config/premain'  //有副作用!
import '@/styles/global.css'

import Vue from 'vue';
import router from '@/router'
import store from '@/store'
import App from './app.vue'

import ElementInstaller from "@/config/ElementInstaller";
import AppInstaller from "@/config/AppInstaller";

/* vue */
let vm = new Vue(
  {
    el: "#app",
    render: (h) => h(App),
    store,
    router
  }
)

Vue.use(ElementInstaller)
Vue.use(AppInstaller)





