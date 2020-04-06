let axios = require("axios");

module.exports.weatherByCity = async cityName => {
  try {
    let response = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`,
      method: "GET"
    });

    return response.data;
  } catch (error) {
    let responseError = error.response;
    console.log("error fetching weather by city", (responseError && responseError.data) ? responseError.data : error);
    throw (responseError.data.cod === "404") ? "City not found" :  "Error - fetching weather by city";
  }
};