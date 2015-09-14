module.exports = (robot) ->

	robot.hear /gog [help|?]/i, (result) ->
		result.send "gog [rank|new|bestselling_per_week],[number]"

	robot.hear /gog (.*),(.*)/i, (result) ->
		sort = result.match[1].trim()
		num = result.match[2]

		url = "http://www.gog.com/games/ajax/filtered?sort="+sort+"&limit=" + num

		robot.http(url)
			.header('Accept', 'application/json')
			.get() (err, res, body) ->
				list = ""
				if err
					result.send err.toString()
				else
					data = JSON.parse body
					for product in data.products
						list += product.title + "\nPrice: $" + product.price.amount + "/$" + product.price.baseAmount + " (" + product.price.discountPercentage + "%)\nhttp://www.gog.com" + product.url + "\n\n"
					result.send list