//Libs
let express = require("express");
let weather = require("../libs/weather");

let router = express.Router();

router.get("/", (request, response) => {
  response.status(200).json({ message: "Server is up!" });
});

router.get("/latitude/:latitude/longitude/:longitude", async (request, response) => {
  try {
    let format = request.query.format;
    let custom = request.query.custom;
    let latitude = request.params.latitude;
    let longitude = request.params.longitude;
    let forecast = await weather.forecastByCoord(latitude, longitude, format, custom);

    response.status(200).json({ forecast });
  } catch (error) {
    response.status(500).json({ errorMessage: error });
  }
});

module.exports = router;