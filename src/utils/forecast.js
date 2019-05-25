const request = require('request');

const forecast = (lat,lon,callback)=>{
    request({
        url: `https://api.darksky.net/forecast/3067b85381b54d95dd7bcb069cb8fc99/${lat},${lon}`,
        json: true//auto parse body from json to obj
    },(err,res)=>{
        if (err) {
            callback('Unable to connect to weather service',undefined);
        } else if (res.body.error){
            callback('Unable to find forecast for your location',undefined);
        }else {
            const {temperature,precipProbability} = res.body.currently;
            callback(undefined,{
               temperature,
               precipProbability
            });
        }
    })
}

module.exports = forecast;