api_key = process.env.HUBOT_GIPHY_API_KEY or 'dc6zaTOxFJmzC' # <== Giphy's public API key, please request your own!

getRandomGiphyGif = (msg, tags) ->
  url = 'http://api.giphy.com/v1/gifs/random?api_key='+api_key
  if tags and tags[0] != ''
    url += '&tag=' + tags[0]
    for i in [1...tags.length]
      url += ('+' + tags[i]) if tags[i].length > 0
  msg.http(url).get() (err, res, body) ->
    response = JSON.parse(body);
    msg.send(response.data.image_url)

module.exports = (robot) ->
  robot.hear /gi (.*)/i, (msg) ->
    tags = msg.match[1].trim().split(', ')
    getRandomGiphyGif(msg, tags)
  robot.hear /bitch/ig, (msg) ->
    getRandomGiphyGif(msg, 'bitch')
  robot.hear /婊子/ig, (msg) ->
    msg.send "在哪? 我褲子都脫了!"
