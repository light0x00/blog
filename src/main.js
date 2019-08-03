
import '@/config/premain'  //有副作用!
import '@/styles/global.css'

import Vue from 'vue';
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


// import "APlayer/dist/APlayer.min.css";
// import APlayer from "APlayer";

// const ap = new APlayer({
//   container: document.getElementById("music-box"),
//   audio: PLAY_LIST,
//   mini:true
// });
// ap.play()