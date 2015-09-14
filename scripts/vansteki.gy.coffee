u = require "util"
youtube = require('node-youtu-be')
module.exports = (robot) ->
	robot.hear /gy (https?:\/\/www.youtube.com\/watch\?\w=.*)/i, (msg) ->
  		msg.send u.inspect msg.match[1]
  		youtube.get msg.match[1], ((data, title) ->
  			msg.send ">" + title
  			msg.send "<" + data[0].title + "|" + data[0].link + ">"
  			msg.send "<https://github.com/|yoooo> fix some broken"
  		).bind(msg)
