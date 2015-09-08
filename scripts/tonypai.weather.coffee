module.exports = (robot) ->

  robot.hear /[w|W]{1}eather (.*),(.*)/i, (result) ->

    if result.match.length is 0
      city = "taichung"
      country = "tw"
    else
      city = result.match[2].trim()
      country = result.match[3].trim()
    
    url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"," + country
    
    robot.http(url)
      .header('Accept', 'application/json')
      .get() (err, res, body) ->
        
        if err
          result.send err.toString()
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
              weather += yr + '-' + mt + '-' + dt + ' ' + val.weather[0].main + '(' + val.weather[0].description + ') ' + (val.temp.day / 10).toFixed(1) + '°C\n'
              
            result.send weather
          else
            result.send "GET "+url+"("+data.cod+")\nweather [taiwan city name]"
