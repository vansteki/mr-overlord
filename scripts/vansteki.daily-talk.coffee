module.exports = (robot) ->
  robot.hear /婊子/ig, (msg) ->
    msg.send "在哪? 我褲子都脫了!"
