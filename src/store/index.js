
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

const store = new Vuex.Store({
      modules:{
        posts:require('./modules/posts').default,
        music:require('./modules/music').default,
      }
  })

export default store