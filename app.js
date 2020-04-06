let express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes/routes");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

app.listen(process.env.NODEJS_PORT, () => {
  console.log(`Server is up and listening on port ${process.env.NODEJS_PORT}`);
});