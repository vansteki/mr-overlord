var fs = require("fs");
var http = require("http");
var unzip = require("unzip");
var parser = require("xml2json");
var fileDate = (function() { //return format like 20150926
	var d = new Date;
	var year = d.getFullYear().toString();
	var month = ((d.getMonth()+1).toString().length <= 1 ? "0" + (d.getMonth()+1) : (d.getMonth()+1));
	var date = ((d.getDate()).toString().length <= 1 ? "0" + (d.getDate()) : (d.getDate()));
	return year + month + date
})();
var zipFile = fs.createWriteStream(fileDate + ".zip");
var	xmlFile = undefined;
var EventEmitter = require('events').EventEmitter;
var trainInfo = {};
var dataPrepare = new EventEmitter();
var Firebase = require("firebase");
var rootRef = new Firebase('https://mr--overlord.firebaseio.com/rail/' + fileDate);

var putDataToFirebase = function(jsonData) {
	rootRef.authWithCustomToken("<YOUR FIREBASE APP'S TOKEN>", function(error, result) {
	  if (error) {
	    console.log("Authentication Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", result.auth);
	    console.log("Auth expires at:", new Date(result.expires));
		rootRef.set(jsonData, function() {
            console.log('set done')
	  		process.exit(0)
		})
	  }
	})
};

//download zip from remote then unzip it and convrt xml to json.
http.get("http://163.29.3.98/XML/" + fileDate + ".zip", function(res, err) {
	console.log("http://163.29.3.98/XML/" + fileDate + ".zip");
	res.pipe(zipFile).on('finish', function() {
		console.log('finish pipe');
		this.end();
		fs.createReadStream(fileDate + ".zip").pipe(unzip.Extract({ path: './' })).on('finish', function() {
			// console.log('extract done!');
			this.end();
		}).on('close', function(){
			//using readFileSync instead of createReadStream is better
			// xmlFile = fs.createReadStream(fileDate + ".xml");
			xmlFile = fs.readFileSync(fileDate + ".xml");
			// console.log(xmlFile.toString())
			trainInfo = JSON.parse(parser.toJson(xmlFile.toString()));
			dataPrepare.emit('done');
		})
	})
});

dataPrepare.on("done", function() {
	console.log("dataPrepare.done!");
	putDataToFirebase(trainInfo);
});
