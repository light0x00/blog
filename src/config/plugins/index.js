import Vue from 'vue';
/**
 * Vue Plugin 初始化 (plugin必须在组件之前注册,因为可能会被其他组件使用!)
 */
import ElementInstaller from "@/config/plugins/ElementInstaller";
import AppInstaller from "@/config/plugins/AppInstaller";

Vue.use(ElementInstaller)
Vue.use(AppInstaller)