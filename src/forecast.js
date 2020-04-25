const request = require('request')

var forecast = function(latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=67b53236039b826116b628df8ce830bf&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to the website',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,'it is currently ' + body.current.temperature + ' degrees out ' + 'the pressure is also ' + body.current.pressure)
        }
    })
}


module.exports = forecast