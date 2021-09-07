const request = require("postman-request");

const geoCode = (cityName, callback) => {
  const mapboxKey =
    "pk.eyJ1IjoibXUtc2FpZiIsImEiOiJja3Q3M2V0ankwb212MnZuOTYxeXk5Z21mIn0.ZTVCmpcNaaZhMpnhZJwCQg";
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    cityName
  )}.json?access_token=${mapboxKey}`;

  request({ url: mapboxUrl, json: true }, (err, {body}) => {
    if (err) {
      callback("Unable to connect to Geocode API", undefined);
    } else if (body.features.length === 0) {
      callback("please try a different search term", undefined);
    } else {
      callback(undefined, {
        latitude:body.features[0].center[1],
        longitude:body.features[0].center[0],
        location:body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode