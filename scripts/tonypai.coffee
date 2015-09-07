module.exports = (robot) ->

  robot.hear /(.*weather) (.*)/i, (result) ->

    if result.length is 0
      city = "Taichung"
    else
      city = result[2]

    robot.http("http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+",tw")
      .header('Accept', 'application/json')
      .get() (err, res, body) ->
        
        if err
          res.send err.toString()
        else
          data = JSON.parse body
          if data.cod is "200"
            weather = data.city.name+", "+data.city.country+"\n------------\n"
            
            for val in data.list
              d = new Date(val.dt * 1000)
              pad = "00"
              yr = d.getFullYear()
              mt = ""+(d.getMonth()+1)
              dt = ""+d.getDate()
              # pad zero
              mt = pad.substring(0, pad.length - mt.length) + mt
              dt = pad.substring(0, pad.length - dt.length) + dt
              # result
              weather += yr + '-' + mt + '-' + dt + ' ' + val.weather[0].main + '(' + val.weather[0].description + ') ' + val.deg / 10 + '°C'
            
            result.send weather
          else
            result.send "weather [Taiwan city name]"