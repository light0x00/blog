
import '@/config/premain'  //有副作用!
import '@/styles/global.css'

import Vue from 'vue';
import router from '@/router'
import store from '@/store'
import App from './app.vue'

import marked from 'marked'
import highlight from 'highlightjs'
import highlightCss from 'highlightjs/styles/github.css'

marked.setOptions({
  highlight: function(code) {
    return highlight.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})


let vm = new Vue(
  {
    el: "#app",
    render: (h) => h(App),
    store,
    router
  }
)

  