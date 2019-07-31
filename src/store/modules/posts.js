
const state = {
    postTrees: POST_TREES
}

console.log(JSON.stringify(state.posts))

const getters = {
    getPostTrees(state, getters, rootState) {
        return state.postTrees
    },
}


const mutations = {

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