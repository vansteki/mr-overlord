youtube = require('node-youtu-be')
module.exports = (robot) ->
	robot.hear /gy (https?:\/\/www.youtube.com\/watch\?\w=.*)/i, (res) ->
		youtube.get res.match[1], ((data, title) ->
			sortItems = data.map((item, i) ->
				if item.title.match(/flv|mp4/ig)
					item
			)
			item = sortItems[0]
			item =  "> #{title} \n> #{item.title} \n> #{item.link}"
			res.send item
		).bind(res)