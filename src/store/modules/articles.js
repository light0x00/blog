import Axios from "axios";
import { format } from 'date-fns'
import { sortBy, groupBy, map } from 'lodash-es' //这样不会影响tree-shaking
import { extractArticleKeyFromRoutePath, recursiveArticleTrees, searchPost } from "@/common/articles-util";

function getList() {
	let postList = []
	recursiveArticleTrees(window.APP_CONFIG["articleTrees"], (node) => {
		if (!node.isGroup) {
			node.createDate = format(node.createTime, "yyyy-MM-dd")
			postList.push(node)
		}
	})
	postList = sortBy(postList, (a) => a.createTime).reverse()
	return postList;
}

const state = {
	articleTrees: window.APP_CONFIG["articleTrees"],
	articles: getList(),
}
const getters = {
	getArticleTrees(state) {
		return state.articleTrees
	},
	//删除!
	getList(state) {
		let postList = []
		recursiveArticleTrees(state.articleTrees, (node) => {
			if (!node.isGroup) {
				node.createDate = format(node.createTime, "yyyy-MM-dd")
				postList.push(node)
			}
		})
		postList = sortBy(postList, (a) => a.createTime).reverse()
		return postList;
	},
	query(state) {
		return (pageNo, pageSize, tag ) => {
			let matched	
			console.log(tag)
			if(tag != undefined )
				matched = state.articles.filter( (a)=>a.tags.indexOf(tag)>=0 )
			else
				matched = state.articles
			if(matched.length==0){
				return {
					list : [],
					total: 0
				}
			}
			let total = matched.length;

			let start = (pageNo - 1) * pageSize
			let end = start + pageSize

			console.log(start,end,total)

			let list = []
			for (let idx = start; idx < end && idx < matched.length; idx++) {
				list.push(matched[idx]);
			}
			return {
				list, total 
			}
			
		}
	},
	getTotal(state) {
		console.log(state.articles)
		return state.articles.length
	},
	getArchives(state, getters ){
		return (pageNo = 1, pageSize = 10 , tag )=>{
			let { total,list} = getters["query"](pageNo,pageSize,tag)
			for (let article of list) {
				article.year = format(article.createTime, "yyyy")
				article.month = format(article.createTime, "MM/dd")
			}
			let groupByYear = groupBy(list, 'year')
	
			groupByYear = map(groupByYear, (v, k) => {
				return { year: k, articles: v }
			})
			groupByYear = sortBy(groupByYear, (p) => p.year).reverse()
			return { total,groupByYear };
		}

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
	async getArticleByRoute({ state, dispatch }, route) {
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