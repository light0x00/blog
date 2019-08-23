
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

const store = new Vuex.Store({
      modules:{
        posts:require('./modules/posts').default,
        player:require('./modules/player/index').default,
        guest:require('./modules/guest').default,
        comment:require('./modules/comment').default,
      }
  })

export default store