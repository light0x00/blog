
const DEFAULT_BG_IMG_URL = "https://light0x01.oss-cn-shanghai.aliyuncs.com/blog-ui/cover.jpg"
const state = {
	imgURL: DEFAULT_BG_IMG_URL
}

const getters = {

}

const mutations = {
	setImg(state, url) {
		state.imgURL = url
	},
	setDefaultImg(state){
		state.imgURL = DEFAULT_BG_IMG_URL
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