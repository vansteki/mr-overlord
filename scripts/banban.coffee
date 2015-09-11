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
      res.send "PP怎麼一進來就滿屋子菜味?"
