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
    let cityName = request.params.city;
    let forecast = await weather.weatherByCity(cityName, format);

    response.status(200).json({ forecast });
  } catch (error) {
    response.status(500).json({ errorMessage: error });
  }
});


router.get("/country/:countryCode/zip/:zipCode", async (request, response) => {
  try {
    let format = request.query.format;
    let countryCode = request.params.countryCode;
    let zipCode = request.params.zipCode;
    let forecast = await weather.weatherByZipCode(zipCode, countryCode, format);

    response.status(200).json({ forecast });
  } catch (error) {
    response.status(500).json({ errorMessage: error });
  }
});

router.get("/latitude/:latitude/longitude/:longitude", async (request, response) => {
  try {
    let format = request.query.format;
    let latitude = request.params.latitude;
    let longitude = request.params.longitude;
    let forecast = await weather.weatherByCoord(latitude, longitude, format);

    response.status(200).json({ forecast });
  } catch (error) {
    response.status(500).json({ errorMessage: error });
  }
});

module.exports = router;