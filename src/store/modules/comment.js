
const state = {
    articleKey: '',
    replyTarget: {
        //当前回复的评论根id
        rootId: 0,
        //当前回复的评论id
        id: 0,
        username: ""
    },
    commentList: [],
    pageInfo: {
        index: 1,
        size: 10
    }
}

const getters = {

}

const mutations = {
    setReplyTarget(state, replyTarget) {
        state.replyTarget = replyTarget;
    },
    setArticleKey(state, articleKey) {
        state.articleKey = articleKey;
    },
    setCommentList(state, commentList) {
        state.commentList = commentList;
    },
    setPageInfo(state,pageInfo){
        state.pageInfo=pageInfo;
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