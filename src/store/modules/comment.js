
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
    },
    //当前显示哪个回复的「回复栏」
    whichRefDsiplay:""
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
    setList(state, commentList) {
        state.commentList = commentList;
    },
    setPageInfo(state, pageInfo) {
        state.pageInfo = pageInfo;
    },
    push(state,comment){
        state.commentList.push(comment)
    },
    setWhichRefDsiplay(state,replyId){
        state.whichRefDsiplay=replyId
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