export default {
     /* 当前环境 后端应用的url根路径映射表
        1. key为ApiName(详见src/api目录),value中的"context-path" 将决定「WebpackDevServer」请求往哪转发(详见webpack.config.dev.js)
        2. 这个表会在发起请求时被使用 (详见src/api) */
    "BASE_URL_MAP":{
        // "blog-api": "http://blog-dev.light0x00.com:4092/blog-api-dev",
        // "blog-api": "/blog-api-dev",
        "blog-api": "/blog-api",
    },
    "request":{
        "timeout":300000
    }
}