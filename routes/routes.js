let express = require("express");

let router = express.Router();

//Controllers
const simpleForecast = require("../controllers/simpleForecast");

router.use("/simple", simpleForecast);

//Server root route
router.get("/", (request, response) => {
  response.status(200).json({ message: "Server is up!" });
});

module.exports = router;