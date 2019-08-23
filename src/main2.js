import '@/styles/global.css'
import Vue from 'vue';

import ElementInstaller from "@/config/ElementInstaller";
import AppInstaller from "@/config/AppInstaller";

// plugin必须在组件之前注册,因为可能会被其他组件使用!
Vue.use(ElementInstaller)
Vue.use(AppInstaller)

import router from '@/router'
import store from '@/store'
import App from './app.vue'

let vm = new Vue(
  {
    el: "#app",
    render: (h) => h(App),
    store,
    router
  }
)






