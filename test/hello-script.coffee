module.exports = (robot) ->
  robot.hear /hello/, (msg) ->
      msg.send 'hello back'