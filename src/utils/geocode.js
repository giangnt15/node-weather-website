const request = require('request');

const geocode = (address, callback) => {
    request({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2lhbmcxNTAyIiwiYSI6ImNqdzA1ZXk0eDA0YjA0MHBzcTE4cXNtOGoifQ.vuvOxCc1_k6hPPrqU1dFjg&limit=1`,
        json: true
    }, (err, res) => {
        if (err) {
            callback('Unable to connect to geo service', undefined);
        } else if (res.body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            const {center,place_name:location} = res.body.features[0];
            const [longtitude,latitude] = center;
            callback(undefined,
                {
                    latitude,
                    longtitude,
                    location
                })
        }
    })
}

module.exports = geocode;