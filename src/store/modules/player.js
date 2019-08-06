
/* player */


const state = {
  playList: [],
  player: null,
  visible: true,
  random: true
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
      state.visible = true
    }

  }
}

const actions = {
  async initPlayer({ state, getters }) {
    state.playList = await import("@/config/play-list")
    await import ("APlayer/dist/APlayer.min.css")
    let {default:APlayer} = await import("APlayer");
    const ap = new APlayer({
      container: document.getElementById("music-box"),
      audio: state.playList,
      // mini:true,
      fixed: true,
      order: "random",
      autoplay: false
    });
    state.player=ap;

  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}