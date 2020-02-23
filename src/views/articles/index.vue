<template>
    <div
        v-loading="pageState.loading"
        element-loading-body
        class="post-wrapper"
        style="overflow-x: hidden;"
    >
        <!-- 文章目录 -->
        <article-toc ref="articleToc" ></article-toc>
        <!-- 文章 -->
        <music-player v-if="article.music!=undefined" :url="article.music"></music-player>
        <div ref="articleWrapper" class="markdown-body" v-html="articleHTML"></div>
        <el-divider></el-divider>
        <!-- 文章标签 -->
        <article-tags
            v-if="article.tags!=undefined"
            class="article-tags"
            :tags="article.tags"
            @onChoose="$router.push({path:'/archives',query:{tag:$event}})"
        ></article-tags>
        <!-- 留言板 -->
        <comments-area :articleKey="articleKey"></comments-area>
        <!-- 至顶 -->
        <backtop></backtop>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { makeDomLazy } from "./async-make-lazy";

import { extractArticleKeyFromRoutePath } from "@/common/articles-util";
import ArticleToc from "./toc";

export default {
    components: {
        CommentsArea: () =>
            import(
                /* webpackPrefetch:true,webpackChunkName:'comment' */ "@/views/comments"
            ),
        ArticleToc
    },
    data: function() {
        return {
            articleKey: extractArticleKeyFromRoutePath(this.$route.path),
            articleText: "空空如也~",
            articleHTML: "",
            pageState: { loading: true }
        };
    },
    computed: {
        article() {
            return this.$store.getters[
                "articles/getArticleByRoute"
            ](this.$route);
        }
    },
    async created() {
    },
    mounted() {
        this.load();
    },
    watch: {},
    methods: {
        async load() {
            this.pageState.loading = true;
            await this.loadArticle();
            this.renderMarkdown();
            this.$nextTick(() => (this.pageState.loading = false));
        },
        async loadArticle() {
			
            try {
                //加载文章源文件
                this.articleText = await this.$store.dispatch(
                    "articles/getArticleContentByRoute",
                    this.$route
                );
            } catch (e) {
                this.$notify({ type: "warning", message: "该文章不存在" });
                this.$router.push({ path: "/404" });
                return;
            }
        },
        async renderMarkdown() {
            //markdown 渲染
            let { default: marked } = await import(
                /* webpackPrefetch:true, webpackChunkName:'markdown-highlight' */ "./marked"
            );
            let rawHtml = marked(this.articleText, {
                baseUrl: this.article.baseUrl
            });

            //懒加载
            rawHtml = makeDomLazy(rawHtml);

            //插入dom
            this.articleHTML = rawHtml;

            //其他特性
            const thisRef = this;
            this.$nextTick(async () => {
				// 目录
                this.$refs["articleToc"].renderToc( this.$refs["articleWrapper"]);

                // 懒加载监听
                import(
                    /* webpackPrefetch:true,webpackChunkName:'img-lazy-load' */ "./async-lozad"
                ).then(({ lazyObserve }) => {
                    lazyObserve();
                });

                // 图片查看器
                import(/* webpackChunkName:'viewer' */ "./async-viewer").then(
                    ({ imageViewer }) => {
                        const viewer = imageViewer();
                        thisRef.$once("destroy", () => {
                            viewer.destroy();
                        });
                    }
                );
				
                // UML支持
                // import(
                //   /* webpackChunkName:'mermaid' */ "./async-mermaid"
                // ).then(({ renderMermaid }) => {
                //   renderMermaid();
                // });
            });
        }
    },
    async beforeRouteUpdate(to, from, next) {
        next();
    }
};
</script>

<style>
.post-wrapper {
    margin: 20px;
    width: 100%;
}

.article-tags {
    /* width: calc(100% - 30px); */
}

.markdown-body {
    /* width: calc(100% - 30px); */
    /* margin: 15px; */
}

/* 防止loading层把navbar的阴影遮住 */
.post-wrapper.el-loading-parent--relative {
    margin-top: 5px;
    z-index: 1;
}

.viewer-toolbar > ul > .viewer-large {
    border-radius: 0;
}
</style>
