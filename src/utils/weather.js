const request = require('postman-request')

const weather = (latitude, longitude, callback) => {
    const weatherstackKey = 'b9c8f6a5dc03fa34185766f7db2fb9c1'
    const weatherstackUrl = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${latitude},${longitude}`
    request({url: weatherstackUrl, json:true}, (err, {body}) => {
        if(err) {
            callback('cannot connect to weather api', undefined)
        } else if(body.error) {
            callback('Search for a different location', undefined)
        } else {
            callback(undefined, `Record time: ${body.current.observation_time}. The temp is ${body.current.temperature}C. There is ${body.current.precip}% chance of rain. `)
        }
    })
}

module.exports = weather

