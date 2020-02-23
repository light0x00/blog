const OSS = require('ali-oss');

const client = new OSS({
	region: 'oss-cn-shanghai',
	accessKeyId: process.env.ACCESS_KEY_ID,
	accessKeySecret: process.env.ACCESS_KEY_SECRET,
	bucket: 'light0x01'
})
module.exports = client