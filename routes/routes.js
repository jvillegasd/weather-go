let express = require("express");

let router = express.Router();

//Controllers
const currentWeather = require("../controllers/currentWeather");

router.use("/current", currentWeather);

//Server root route
router.get("/", (request, response) => {
  response.status(200).json({ message: "Server is up!" });
});

module.exports = router;