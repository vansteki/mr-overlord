https = require("https")

var url = 'https://mr-overlord.herokuapp.com'
https.get(url, function(res, err) {
	console.log("GET " + url)
	res.on('data', function(chunk) {
		if (chunk.toString() == "Cannot GET /\n")
			console.log("GET DONE", new Date)
		else
			console.log("WARNING: WEIRD STATE")
	})
})
