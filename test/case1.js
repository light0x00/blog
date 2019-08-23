let detector = require('../build/post-detector/index')
let {resolve} = require("path")


let r = detector({
    contextPath: "posts",
    postRootPath: resolve("public/posts"),
    routePrefix:'/article'
})
