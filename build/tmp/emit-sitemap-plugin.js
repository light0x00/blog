
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const { _resolve } = require('../helpers')
const { format } = require("date-fns")

/**
 * 追加文件到输出
 */
module.exports = class EmitSitemapPlugin {

    constructor({ originPath, targetPath, urlset = [] }) {
        this.targetPath = targetPath;

        let siteMap = ""
        if (originPath == null) {
            siteMap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`
        } else {
            if (!path.isAbsolute(originPath))
                originPath = _resolve(originPath)
            siteMap = fs.readFileSync(originPath, { encoding: 'utf-8' })
        }

        const $ = cheerio.load(siteMap, { xml: { normalizeWhitespace: true, xmlMode: true } })
        for (let url of urlset) {
            $("urlset").append(`<url>
                <loc>${url}</loc>
                <lastmod>${format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX")}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
            </url>`)
        }
        this.siteMap = $.xml();
    }

    apply(compiler) {

        if (this.targetPath == null) {
            this.targetPath = path.join(compiler.options.output.path, 'sitemap.xml')
        } else if (!path.isAbsolute(this.targetPath)) {
            this.targetPath = _resolve(this.targetPath)
            if (targetPath.match(/\/sitemap\.xml/) == null) {
                this.targetPath = path.join(this.targetPath, 'sitemap.xml')
            }
        }
        compiler.hooks.done.tap('EmitSitemapPlugin', (bundle) => {
            let fs_out = compiler.outputFileSystem;
            fs_out.writeFile(this.targetPath, this.siteMap, function () {
            });
        });
    }
}

// new EmitSitemapPlugin({ origin: "public/sitemap.xml", urlset: ["aa.com", "bb.com"] })