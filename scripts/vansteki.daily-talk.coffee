module.exports = (robot) ->
  robot.hear /婊子|必取/ig, (msg) ->
    msg.send "在哪? 我褲子都脫了!"
