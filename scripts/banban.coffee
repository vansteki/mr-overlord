util = require "util"
crypto = require "crypto"

module.exports = (robot) ->

   robot.hear /badger/i, (res) ->
     res.send "Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS"

   robot.respond /open the (.*) doors/i, (res) ->
     doorType = res.match[1]
     if doorType is "pod bay"
       res.reply "I'm afraid I can't let you do that."
     else
       res.reply "Opening #{doorType} doors"

    robot.hear /overlord/i, (res) ->
    	res.send "婊子們找我?"

    robot.hear /boss/ig, (res) ->
      res.send "B0ss是他馬的爽兵!"

    robot.hear /pp/i, (res) ->
      res.send "有沒有PP進的是監獄的八卦?"

    robot.hear /婊子|必取/ig, (msg) ->
      msg.send "在哪? 我褲子都脫了!"

    robot.hear /md5ify/, (msg)->
      m = crypto.createHash('md5').update("md5ify this text").digest("hex")
      msg.send m
      msg.send "util.inspect(msg):\n" + util.inspect(msg)
