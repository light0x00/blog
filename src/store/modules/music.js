
/* player */
import "APlayer/dist/APlayer.min.css";
import APlayer from "APlayer";
const ap = new APlayer({
  container: document.getElementById("music-box"),
  audio: PLAY_LIST,
  // mini:true,
  fixed: true,
  order:"random",
  autoplay:true
});


const state = {
  playList: PLAY_LIST,
  player: ap,
  visible: true,
  random:true
}


const getters = {

}


const mutations = {
  hide(state) {
    if (state.visible) {
      let classList = document.getElementById("music-box").classList
      classList.remove("music-box-show")
      classList.add("music-box-hide")
      state.visible = false
    }
  },
  show(state) {
    if (!state.visible) {
      let classList = document.getElementById("music-box").classList
      classList.remove("music-box-hide")
      classList.add("music-box-show")
      state.visible=true
    }

  }
}

const actions = {

}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}