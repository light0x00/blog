
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
  async initPlayer({ state }) {
    // let { default: playList } = await import("./play-list")
    // state.playList = playList;
    // await import("APlayer/dist/APlayer.min.css")
    // let { default: APlayer } = await import("APlayer");
    // const ap = new APlayer({
    //   container: document.getElementById("music-box"),
    //   audio: state.playList,
    //   // mini:true,
    //   fixed: true,
    //   order: "random",
    //   autoplay: false,
    //   preload:false
    // });
    // state.player = ap;

    // ap.on('error', function (e) {
    //   // console.log('播放失败,可能所在地区不支持网易云!(是否有翻墙?)',e);
    //   // ap.destroy()
    // });

  },
  async play({ state, dispatch }) {
    if (state.player == null) {
      await dispatch("initPlayer")
    }
    if (state.player) {
      state.player.play()
    }
  },
  //播放或暂停
  async toggle({ state, dispatch }) {
    if (state.player == null) {
      await dispatch("initPlayer")
    }
    if (state.player) {
      state.player.toggle()
    }
  },
   //播放或暂停
   async last({ state, dispatch }) {
    if (state.player == null) {
      await dispatch("initPlayer")
    }
    if (state.player) {
      state.player.skipBack()
    }
  },
  async next({ state, dispatch }) {
    if (state.player == null) {
      await dispatch("initPlayer")
    }
    if (state.player) {
      state.player.skipForward()
    }
  },
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}