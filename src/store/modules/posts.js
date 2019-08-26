import Axios from "axios";
import { format } from 'date-fns'
import * as _ from 'lodash-es' //这样不会影响tree-shaking
import {extractPostKeyFromRoutePath,recursivePostTrees,searchPost} from "@/common/posts-util";

const state = {
    postTrees: window.APP_CONFIG["postTrees"],
}

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
    async getPostContent({ state }, key) {
        let postInfo = searchPost(state.postTrees, key)
        if (postInfo == null) {
            throw new Error(`can't find post that key is ${key}`)
        }
        let { data } = await Axios.request({ type: 'get', url: postInfo.url })
        return data;
    },
    async getPostByRoute({ state,dispatch }, route) {
        let postKey = extractPostKeyFromRoutePath(route.path)
        return dispatch("getPost", postKey);
    },
    getPost({ state }, key) {
        let postInfo = searchPost(state.postTrees, key)
        if (postInfo == null) {
            throw new Error(`can't find post that key is ${key}`)
        }
        return postInfo;
    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}