
const fs = require('fs')
const { readSync: readYamlSync } = require("node-yaml")

function getJson(path) {
    let exists = fs.existsSync(path)
    if (!exists) {
        throw new Error(`不存在的文件:${path}`)
    }
    let file = fs.readFileSync(path, 'utf-8')
    return JSON.parse(file)
}

function getYaml(path) {
    let exists = fs.existsSync(path)
    if (!exists) {
        throw new Error(`不存在的文件:${path}`)
    }
    return readYamlSync(path)
}

function isDir(path) { return path && fs.statSync(path).isDirectory() }

function exists(path) {return fs.existsSync(path)}



module.exports = {
    getJson, isDir, exists, getYaml
}
