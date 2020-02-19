<template>
    <div style="width:calc(100% - 20px);padding:10px">
        <!-- 按时间线显示 -->
        <el-timeline v-for="arch in groups" :key="arch.year">
            <h1>{{arch.year}}</h1>
            <el-timeline-item
                v-for="(article,index) in arch.articles"
                :key="index"
                :timestamp="article.month"
                placement="top"
            >
                <el-card >
					<p style="margin:10px 0" class="text-main-title">
                    <router-link :to="article.routePath">
                        {{article.title}}
                    </router-link>
					</p>
                    <p>
                        <!-- <strong>摘要:</strong> -->
                        {{article.description}} 
						 <router-link style="margin-left:10px" :to="article.routePath" class="text-slave">阅读全文</router-link>
                    </p>
					<p style="margin:10px 0;display:flex; justify-content:flex-end" >
					<post-tags style="align:right"  :tags="article.tags" @onChoose="onChooseTag"></post-tags>
					</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="pageNo"
            :page-size.sync="pageSize"
        ></el-pagination>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            pageNo: 1,
            pageSize: 10,
            tag: undefined
        };
    },
    computed: {
        articleArchives() {
            return this.$store.getters["articles/getArchives"](
                this.pageNo,
                this.pageSize,
                this.tag
            );
        },
        groups() {
            return this.articleArchives.groupByYear;
        },
        total() {
            return this.articleArchives.total;
        }
    },
    methods: {
        onChooseTag(tag) {
            this.$router.push({ path: "/archives", query: { tag } });
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.tag = to.query.tag;
        next();
    }
};
</script>

<style >
.el-timeline {
    padding: 0;
}
.el-timeline-item__timestamp {
    color: #999;
    font-size: 16px;
}
.el-card__body{
	padding: 10px 20px;
}
</style>
