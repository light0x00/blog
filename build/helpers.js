const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const ROOT_PATH = path.resolve(__dirname, '../')
const resolve = (relativePath) => path.join(ROOT_PATH, relativePath)

const VERSION_FILE_PATH= path.resolve(ROOT_PATH, ".version")

function updateVersion() {
	let seq = parseInt( getVersion().split("-")[0]) + 1
	let version =seq + '-'+ Date.now()
	fs.writeFileSync(VERSION_FILE_PATH, version, { encoding: "utf-8" })
	console.log(`[Update Version] The current version is ${version}`)
	return version
}

function getVersion() {
	let version = fs.readFileSync(VERSION_FILE_PATH, { encoding: 'utf-8' })
	return version
}

module.exports = {
	rootPath: ROOT_PATH, resolve, updateVersion, getVersion
}