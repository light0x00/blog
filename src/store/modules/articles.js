import Axios from "axios";
import { format } from 'date-fns'
import * as _ from 'lodash-es' //这样不会影响tree-shaking
import {extractArticleKeyFromRoutePath,recursiveArticleTrees,searchPost} from "@/common/articles-util";

const state = {
    articleTrees: window.APP_CONFIG["articleTrees"],
}

const getters = {
    getArticleTrees(state) {
        return state.articleTrees
    },
    getList(state) {
        let postList = []
        recursiveArticleTrees(state.articleTrees, (node) => {
            if (!node.isGroup) {
                node.createDate = format(node.createTime, "yyyy-MM-dd")
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
            return { year: k, articles: v }
        })
        groupByYear = _.sortBy(groupByYear, (p) => p.year).reverse()

        return groupByYear;
    },
    getTags(state) {
        let groupByTag = {}
        recursiveArticleTrees(state.articleTrees, (node) => {
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
    async getArticleContentByRoute({ state, dispatch }, route) {
        let postKey = extractArticleKeyFromRoutePath(route.path)
        return dispatch("getArticleContent", postKey);
    },
    async getArticleContent({ state }, key) {
        let postInfo = searchPost(state.articleTrees, key)
        if (postInfo == null) {
            throw new Error(`can't find article that key is ${key}`)
        }
        let { data } = await Axios.request({ type: 'get', url: postInfo.url })
        return data;
    },
    async getArticleByRoute({ state,dispatch }, route) {
        let postKey = extractArticleKeyFromRoutePath(route.path)
        return dispatch("getArticle", postKey);
    },
    getArticle({ state }, key) {
        let postInfo = searchPost(state.articleTrees, key)
        if (postInfo == null) {
            throw new Error(`can't find article that key is ${key}`)
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