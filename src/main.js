import '@/config/premain'  //有副作用!

import '@/styles/global.css'
import Vue from 'vue';

import ElementInstaller from "@/config/ElementInstaller";
import AppInstaller from "@/config/AppInstaller";
import AxiosConfig from "@/config/AxiosConfig";

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






