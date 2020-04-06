let axios = require("axios");

module.exports.weatherByCity = async cityName => {
  try {
    let response = await axios({
      url: `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`,
      method: "GET"
    });

    return response.data;
  } catch (error) {
    console.log("error fetching weather by city", (error.data) ? error.data : error);
    throw (error.data) ? error.data : error;
  }
};