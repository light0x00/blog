import Axios from "axios";

const routePrefix = window.APP_CONFIG["postRoutePrefix"] || "/post"

const state = {
    postTrees: window.APP_CONFIG["postTrees"],
    // curPost: {}
}

import { format } from 'date-fns'
import * as _ from 'lodash-es' //这样不会影响tree-shaking

const getters = {
    getPostTrees(state) {
        return state.postTrees
    },
    getList(state) {
        let postList = []
        recursivePostTrees(state.postTrees, (node) => {
            if (!node.isGroup) {
                node.createDate = format(node.createTime, "yyyy-MM-dd hh:mm")
                postList.push(node)
            }
        })
        postList = _.sortBy(postList, (a) => a.createTime).reverse()
        return postList;
    }
    ,
    getArchives(state, getters) {
        let postList = getters["getList"]

        for (let post of postList) {
            post.year = format(post.createTime, "yyyy")
            post.month = format(post.createTime, "MM/dd")
        }

        let groupByYear = _.groupBy(postList, 'year')

        groupByYear = _.map(groupByYear, (v, k) => {
            return { year: k, posts: v }
        })
        groupByYear = _.sortBy(groupByYear, (p) => p.year).reverse()

        return groupByYear;
    },
    getTags(state) {
        let groupByTag = {}
        recursivePostTrees(state.postTrees, (node) => {
            if (node.isGroup || !node.tags)
                return

            for (let tag of node.tags) {
                let matched = groupByTag[tag] || [];
                matched.push(node)
                groupByTag[tag] = matched
            }
            // postList.push(node)
        })
        return groupByTag;
    }
}

const mutations = {

}

const actions = {
    async getPostContentByRoute({ state, dispatch }, route) {
        let postKey = extractPostKeyFromRoutePath(route.path)
        return dispatch("getPostContent", postKey);
    },
    // async 
    async getPostContent({ state }, key) {
        let postInfo = searchPost(state, key)
        if (postInfo == null) {
            throw new Error(`can't find post that key is ${key}`)
        }
        console.log(postInfo.url)
        let { data } = await Axios.request({ type: 'get', url: postInfo.url })
        return data;
    },
    getPostByRoute({ state,dispatch }, route) {
        let postKey = extractPostKeyFromRoutePath(route.path)
        return dispatch("getPost", postKey);
    },
    getPost({ state }, key) {
        let postInfo = searchPost(state, key)
        if (postInfo == null) {
            throw new Error(`can't find post that key is ${key}`)
        }
        return postInfo;
    }
}

function searchPost(state, key) {
    function searchTree(treeNode) {
        if (treeNode.key == key) {
            return treeNode;
        }
        if (treeNode.isGroup) {
            for (let child of treeNode.childs) {
                let r = searchTree(child)
                if (r != null)
                    return r
            }
        }
        return null;
    }

    for (let rootNode of state.postTrees) {
        let r = searchTree(rootNode)
        if (r)
            return r;
    }
}

/**
 * 从路由路径中提取文章的key
 * @param {*} routePath 路由路径
 */
function extractPostKeyFromRoutePath(routePath){
    let extractKeyReg = new RegExp("^" + routePrefix, "g");
    // return routePath.replace(extractKeyReg, ""); //从当前路由中提取key
    return routePath.replace(extractKeyReg,"").replace(/(^\/)|(\/$)/g,"")
}

function recursivePostTrees(postTrees, callback) {
    function recursiveTree(treeNode) {
        let canStop;
        if (treeNode.isGroup) {
            canStop = callback(treeNode)
            if (canStop) {
                return true;
            }

            for (let child of treeNode.childs) {
                canStop = recursiveTree(child)
                if (canStop)
                    return true;
            }
        } else {
            canStop = callback(treeNode)
            if (canStop)
                return true;
        }
        return false;
    }

    for (let rootNode of postTrees) {
        let r = recursiveTree(rootNode)
        if (r)
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