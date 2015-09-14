u = require "util"
youtube = require('node-youtu-be')
module.exports = (robot) ->
	robot.hear /gy (https?:\/\/www.youtube.com\/watch\?\w=.*)/i, (msg) ->
  		youtube.get msg.match[1], ((data, title) ->
  			msg.send ">" + title
  			msg.send ">" + data[0].title
  			msg.send ">" + data[0].link
  		).bind(msg)
