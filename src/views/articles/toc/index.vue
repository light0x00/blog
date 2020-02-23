<template>
    <div class="markdown-toc-wrapper">
        <dock-button
            style="right:80px;z-index:3"
            @click.native.stop="toggleToc"
            icon-class="el-icon-notebook-2"
        ></dock-button>
        <el-drawer
            v-loading="pageState.loading"
            :visible.sync="tocToggleFlag"
            :show-close="false"
            direction="rtl"
            :modal="false"
            :modal-append-to-body="false"
            :append-to-body="false"
        >
            <el-menu ref="tocMenu" class="toc-body" :default-openeds="defaultOpeneds">
                <template v-for="(item,index) in headerTrees">
                    <recursive-header :header="item" :key="index"></recursive-header>
                </template>
            </el-menu>
        </el-drawer>
    </div>
</template>

<script>
import RecursiveHeader from "./recursive-header";
import Vue from "vue";
import { ar } from "date-fns/locale";

Vue.component(RecursiveHeader.name, RecursiveHeader);

function getHeaderTrees(container, depthLimit) {
    let selectable = new Map();
    for (let i = 0; i < depthLimit; i++) {
        selectable.set("H" + (i + 1), i);
        // for (let ele of container.querySelectorAll("h" + (i + 1))) {
        // headers.push({ depth: i, title: ele.id, children: [] });
        // }
    }
    let headers = [];
    for (let ele of container.children) {
        let depth = selectable.get(ele.tagName);
        if (depth != undefined) {
            headers.push({ depth, title: ele.id, children: [] });
        }
    }

    let L = 0,
        R = 1;
    let trees = [headers[L]];

    for (; R < headers.length; ) {
        if (headers[L].depth < headers[R].depth) {
            headers[R].parent = headers[L];
            headers[L].children.push(headers[R]);
        } else if (headers[L].depth == headers[R].depth) {
            if (headers[L].parent != null) {
                headers[R].parent = headers[L].parent;
                headers[L].parent.children.push(headers[R]);
            } else {
                trees.push(headers[R]);
            }
        } else {
            let brother;
            for (let i = L - 1; i >= 0; i--) {
                if (headers[i].depth == headers[R].depth) {
                    brother = headers[i];
                    break;
                }
            }
            if (brother == null || brother.parent == null) {
                trees.push(headers[R]);
            } else {
                headers[R].parent = brother.parent;
                brother.parent.children.push(headers[R]);
            }
        }
        R++;
        L++;
    }
    return trees;
}

function findDefaultOpeneds(header, expandedKeys = []) {
    if (header == null) return expandedKeys;
    if (header.children.length > 0) {
        expandedKeys.push(header.title);
        return findDefaultOpeneds(header.children[0], expandedKeys);
    }
    return expandedKeys;
}

export default {
    props: {},
    data() {
        return {
            headerTrees: [],
            tocLeft: "100%",
            tocToggleFlag: !this.isMobile(),
            pageState: {
                loading: true
            }
        };
    },
    created() {},
    computed: {
        defaultOpeneds() {
            let keys = findDefaultOpeneds(this.headerTrees[0]);
            return keys;
        }
    },
    mounted() {
        //只有手机端可以关闭 目录
        if (this.isMobile()) {
            let thisRef = this;
            document.addEventListener("click", event => {
                thisRef.tocToggleFlag = false;
            });
        }
    },
    methods: {
        /* 按照vue的渲染顺序  此方法应该在mounted里调用 不然会导致当前组件无法访问子组件 */
        renderToc(container) {
            this.headerTrees = getHeaderTrees(container, 3);

            let thisRef = this;
            this.$nextTick(() => {
                thisRef.pageState.loading = false;
            });
        },
        toggleToc() {
            if (this.tocToggleFlag) this.hide();
            else this.show();
        },
        show() {
            this.tocLeft = `calc(100% - 300px)`;
            this.tocToggleFlag = true;
        },
        hide() {
            this.tocLeft = `100%`;
            this.tocToggleFlag = false;
        }
    }
};
</script>

<style>
.toc-body {
    width: 100%;
}

.markdown-toc-wrapper .el-dialog__wrapper,
.el-drawer__container {
    z-index: 1 !important;
    user-select: none;
}

.markdown-toc-wrapper .el-drawer {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
}
@media (min-width: 900px) {
    .markdown-toc-wrapper .el-drawer {
        width: 350px !important;
    }

    .markdown-toc-wrapper .el-dialog__wrapper,
    .markdown-toc-wrapper .el-drawer__container {
        width: 360px !important;
        left: calc(100% - 360px) !important;
    }
}

@media (max-width: 900px) {
    .markdown-toc-wrapper .el-drawer {
        width: 75% !important;
    }
}
</style>
