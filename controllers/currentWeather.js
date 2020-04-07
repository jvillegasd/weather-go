//Libs
let express = require("express");
let weather = require("../libs/weather");

let router = express.Router();

router.get("/", async (request, response) => {
  try {
    let cityName = request.query.city;
    let forecast = await weather.weatherByCity(cityName);

    response.status(200).json({ forecast });
  } catch (error) {
    response.status(500).json({ errorMessage: error });
  }
});

module.exports = router;