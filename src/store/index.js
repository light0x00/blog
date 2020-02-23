
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

const store = new Vuex.Store({
      modules:{
        articles:require('./modules/articles').default,
        // player:require('./modules/player').default,
        guest:require('./modules/guest').default,
		comment:require('./modules/comment').default,
		bg: require('./modules/bg').default
      }
  })

export default store