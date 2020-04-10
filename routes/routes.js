let express = require("express");

let router = express.Router();

//Controllers
const currentWeather = require("../controllers/currentWeather");

router.use(currentWeather);

module.exports = router;