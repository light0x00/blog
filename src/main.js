import '@/config/premain' 
import '@/styles/global.css'

import Vue from 'vue';
import ElementInstaller from "@/config/plugins/ElementInstaller";
import AppInstaller from "@/config/plugins/AppInstaller";
import AxiosConfig from "@/config/libs/AxiosConfig";

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






