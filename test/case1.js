let detector = require('../build/detector')
let {resolve} = require("path")


let r = detector({
    contextPath: "posts",
    postRootPath: resolve("public/posts"),
})

console.log(r)