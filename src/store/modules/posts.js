import Axios from "axios";

const state = {
    postTrees: POST_TREES,
    curPost:{}
}

const getters = {
    getPostTrees(state, getters, rootState) {
        return state.postTrees
    },

}


const mutations = {
    setCurPost(state,postNode){
        state.curPost=postNode;
    },
    
}

const actions = {   
    async getPost({state},key){
        let postInfo = searchPost(state,key)
        if(postInfo==null){
            throw new Error(`can't find post that key is ${key}`)
        }
        console.log("===",postInfo)
        let {data} = await Axios.get(postInfo.url)
        return data;
    }
}

function searchPost(state,key){
    console.log(key)
    function searchTree(treeNode){
        if(treeNode.key==key){
            return treeNode;
        }
        if(treeNode.isGroup){
            for(let child of treeNode.childs){
                let r =searchTree(child)
                if(r!=null)
                    return r
            }
        }
        return null;
    }

    for(let rootNode of state.postTrees){
        let r = searchTree(rootNode)
        if(r)
            return r;
    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}