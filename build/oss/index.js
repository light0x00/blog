const client = require("./client")
const fs = require('fs')
const path = require('path')
const assert = require('assert')
const urljoin = require('url-join');
const _ = require('lodash')
const mime = require('mime');


async function traverse(dir, onFindFile, onFindDir) {
	assert(fs.existsSync(dir), "dir not exits!!!!")
	let stack = [dir]
	while (stack.length > 0) {
		let cur = stack.pop();
		let stat = fs.statSync(cur)
		if (stat.isFile()) {
			if (onFindFile) {
				onFindFile(cur)
			}
		} else {
			let dir = cur;
			if (onFindDir) {
				onFindDir(dir)
			}
			for (let f of fs.readdirSync(dir, {})) {
				let fullpath = path.join(dir, f);
				stack.push(fullpath)

			}
		}
	}
}

function getPutOptions(filename) {

	let contentType = mime.getType(filename.match(/(?<=\.)[^.]*$/)[0])
	return {
		headers: {
			'x-oss-object-acl': 'public-read',
			'Vary': 'Accept-Encoding,Origin',
			// 'Access-Control-Allow-Origin': '*',
			// 'access-control-allow-methods': 'GET',
			// 'access-control-max-age': '3600'
			// 'Content-Encoding': 'identity',
			'Content-Type': contentType,
			// 'Content-Encoding': 'gzip',
			'Cache-Control': 'public, max-age=31536000',

		}
	}

}


function putDir(keyPrefix, dir, ) {
	try {
		traverse(dir, async (filepath) => {
			let key = urljoin(keyPrefix, filepath.replace(new RegExp('^' + dir), ""))
			let r = await client.put(key, filepath, getPutOptions(filepath));
			console.log(key, "\033[34m => \033[0m", filepath, "\033[32m" + `${r.res.statusMessage} ` + "\033[0m")
		})
	} catch (e) {
		throw new Error(e)
	}
}

module.exports = { putDir }