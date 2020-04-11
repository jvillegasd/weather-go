//Libs
let express = require("express");
let weather = require("../libs/weather");

let router = express.Router();

router.get("/", (request, response) => {
  response.status(200).json({ message: "Server is up!" });
});

router.get("/:city", async (request, response) => {
  try {
    let format = request.query.format;
    let custom = request.query.custom;
    let cityName = request.params.city;
    let currentWeather = await weather.weatherByCity(cityName, format, custom);

    response.status(200).json({
      currentWeather: currentWeather.main,
      custom: currentWeather.custom
    });
  } catch (error) {
    response.status(500).json({ errorMessage: error });
  }
});


router.get("/country/:countryCode/zip/:zipCode", async (request, response) => {
  try {
    let format = request.query.format;
    let custom = request.query.custom;
    let countryCode = request.params.countryCode;
    let zipCode = request.params.zipCode;
    let currentWeather = await weather.weatherByZipCode(zipCode, countryCode, format, custom);

    response.status(200).json({
      currentWeather: currentWeather.main,
      custom: currentWeather.custom
    });
  } catch (error) {
    response.status(500).json({ errorMessage: error });
  }
});

router.get("/latitude/:latitude/longitude/:longitude", async (request, response) => {
  try {
    let format = request.query.format;
    let custom = request.query.custom;
    let latitude = request.params.latitude;
    let longitude = request.params.longitude;
    let currentWeather = await weather.weatherByCoord(latitude, longitude, format, custom);

    response.status(200).json({
      currentWeather: currentWeather.main,
      custom: currentWeather.custom
    });
  } catch (error) {
    response.status(500).json({ errorMessage: error });
  }
});

module.exports = router;