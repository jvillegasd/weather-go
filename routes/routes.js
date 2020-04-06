let express = require("express");

let router = express.Router();

//Server root route
router.get("/", (request, response) => {
  response.status(200).json({ message: "Server is up!" });
});

module.exports = router;