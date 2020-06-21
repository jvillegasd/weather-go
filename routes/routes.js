"use strict";

//Libs
let express = require("express");

let router = express.Router();

//Controllers
const currentWeather = require("../controllers/currentWeather");
const forecast = require("../controllers/forecast");

router.use(currentWeather);
router.use("/forecast", forecast);

module.exports = router;