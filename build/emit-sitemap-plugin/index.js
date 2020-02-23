
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const { _resolve } = require('../helpers')
const { format } = require("date-fns")

/**
 * 动态生成sitemap
 */
module.exports = class EmitSitemapPlugin {

	constructor({ originTxtPath, originXmlPath, urlset = [] }) {
		//xml
		let originSiteMapXml = ""
		if (originXmlPath == null) {
			originSiteMapXml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`
		} else {
			if (!path.isAbsolute(originXmlPath))
				originXmlPath = _resolve(originXmlPath)
			originSiteMapXml = fs.readFileSync(originXmlPath, { encoding: 'utf-8' })
		}

		//txt
		let originSiteMapTxt = "";
		if (originTxtPath != null) {
			if (!path.isAbsolute(originTxtPath))
				originTxtPath = _resolve(originTxtPath)
			originSiteMapTxt = fs.readFileSync(originTxtPath, { encoding: 'utf-8' }) + "\n"
		}

		const $ = cheerio.load(originSiteMapXml, { xml: { normalizeWhitespace: true, xmlMode: true } })
		for (let url of urlset) {
			$("urlset").append(`<url>
                <loc>${url}</loc>
                <lastmod>${format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX")}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
            </url>`)
			originSiteMapTxt += `${url}\n`
		}
		this.siteMapXml = $.xml();
		this.siteMapTxt = originSiteMapTxt;
	}

	apply(compiler) {
		let outputDir = compiler.options.output.path;
		let xmlPath = path.join(outputDir, 'sitemap.xml')
		let txtPath = path.join(outputDir, 'sitemap.txt')

		compiler.hooks.done.tap('EmitSitemapPlugin', (bundle) => {
			let fs_out = compiler.outputFileSystem;
			fs_out.writeFile(xmlPath, this.siteMapXml, function () {
			});

			fs_out.writeFile(txtPath, this.siteMapTxt, function () {
			});
			this.siteMapTxt
		});
	}
}