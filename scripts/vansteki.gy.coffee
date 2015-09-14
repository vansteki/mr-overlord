youtube = require('node-youtu-be')
module.exports = (robot) ->
	robot.hear /gy (https?:\/\/www.youtube.com\/watch\?\w=.*)/i, (res) ->
  		youtube.get res.match[1], ((data, title) ->
  			item =  "> #{title} \n> #{data[0].title} \n> #{data[0].link}"
  			res.send item
  		).bind(res)
