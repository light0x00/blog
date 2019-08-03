import '@/config/premain'  //有副作用!
import '@/styles/global.css'

import Vue from 'vue';
import router from '@/router'
import store from '@/store'
import App from './app.vue'

/* element */
import 'element-ui/lib/theme-chalk/index.css'
import {Loading,Menu,MenuItem,MenuItemGroup,Submenu,Drawer,Avatar} from 'element-ui';
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Submenu.name, Submenu)
Vue.component(Drawer.name, Drawer)
Vue.component(Avatar.name, Avatar)
Vue.use(Loading)

/* vue */
let vm = new Vue(
  {
    el: "#app",
    render: (h) => h(App),
    store,
    router
  }
)

import {isMobile} from '@/common/utils'
const MyPlugin = {
  install(Vue, options) {
      Vue.prototype.isMobile = isMobile
  }
}
Vue.use(MyPlugin)



/* player */
import "APlayer/dist/APlayer.min.css";
import APlayer from "APlayer";
const ap = new APlayer({
  container: document.getElementById("music-box"),
  audio: PLAY_LIST,
  mini:true,
  // fixed:true
});
