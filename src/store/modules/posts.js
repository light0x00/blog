import Axios from "axios";

const state = {
    postTrees: POST_TREES,
    curPost: {}
}

import {format} from 'date-fns'
import * as _ from 'lodash-es' //这样不会影响tree-shaking

const getters = {
    getPostTrees(state, getters, rootState) {
        return state.postTrees
    },
    getList(state) {
        let postList = []
        recursivePostTree(state.postTrees, (node) => {
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

        for (let k in groupByYear) {

        }

        groupByYear = _.map(groupByYear, (v, k) => {
            return { year: k, posts: v }
        })
        groupByYear = _.sortBy(groupByYear, (p) => p.year).reverse()

        return groupByYear;
    },
    getTags(state) {
        let groupByTag = {}
        recursivePostTree(state.postTrees, (node) => {
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
    async getPostContent({ state }, key) {
        let postInfo = searchPost(state, key)
        if (postInfo == null) {
            throw new Error(`can't find post that key is ${key}`)
        }
        let { data } = await Axios.get(postInfo.url)
        return data;
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

function recursivePostTree(postTrees, callback) {
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