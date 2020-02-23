const client = require("./client")
async function cors() {
	try {
		let r = await client.putBucketCORS("light0x01",
			[
				{
					allowedOrigin: ["http://localhost:4091","http://localhost:4093", "https://blog.light0x00.com", "http://blog-dev.light0x00.com:4093"], // configure for Access-Control-Allow-Origin header
					// allowedOrigin: ["http://localhost:4091"],
					allowedMethod: ["GET","HEAD"], // configure for Access-Control-Allow-Methods header
					allowedHeader:"*" , // configure for Access-Control-Allow-Headers header
					// exposeHeader: [], // configure for Access-Control-Expose-Headers header
					maxAgeSeconds: "3600" // configure for Access-Control-Max-Age header
				}
			],
			{
				responseVary: true
			})
		console.log(r)
	} catch (e) {
		console.error(e)
	}
}
cors()