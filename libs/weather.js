//Libs
let axios = require("axios");

//Helpers
let helper = require("../helpers/helper");

module.exports.weatherByCity = async (cityName, format, custom) => {
  custom = (custom) ? custom.split(",") : [];
  try {
    let response = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`,
      method: "GET"
    });

    return formatResponse(response.data, format, custom);
  } catch (error) {
    let responseError = error.response;
    console.log("error fetching weather by city", (responseError && responseError.data) ? responseError.data : error);
    if (error.formatError) throw error.formatError;
    else throw (responseError.data.cod === "404") ? "City not found" : "Error - fetching weather by city";
  }
};

module.exports.weatherByZipCode = async (zipCode, countryCode, format, custom) => {
  custom = (custom) ? custom.split(",") : [];
  try {
    let response = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${process.env.WEATHER_API_KEY}`,
      method: "GET"
    });

    return formatResponse(response.data, format, custom);
  } catch (error) {
    let responseError = error.response;
    console.log("error fetching weather by zip code", (responseError && responseError.data) ? responseError.data : error);
    if (error.formatError) throw error.formatError;
    else throw (responseError.data.cod === "404") ? "City not found" : "Error - fetching weather by zip code";
  }
};

module.exports.weatherByCoord = async (latitude, longitude, format, custom) => {
  custom = (custom) ? custom.split(",") : [];
  try {
    let response = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`,
      method: "GET"
    });

    return formatResponse(response.data, format, custom);
  } catch (error) {
    let responseError = error.response;
    console.log("error fetching weather by coordinates", (responseError && responseError.data) ? responseError.data : error);
    if (error.formatError) throw error.formatError;
    else throw (responseError.data.cod === "404") ? "City not found" : "Error - fetching weather by coordinates";
  }
};

function formatResponse(response, format, custom) {
  switch (format) {
    case "json":
      return { main: helper.formatWeatherJSON(Response) };
    case "1":
      return {
        main: helper.formatWeatherEmojiOne(response),
        custom: helper.customInfo(custom, response)
      };
    case "2":
      return {
        main: helper.formatWeatherEmojiTwo(response),
        custom: helper.customInfo(custom, response)
      };
    case "3":
      return {
        main: helper.formatWeatherEmojiThree(response),
        custom: helper.customInfo(custom, response)
      };
    case "4":
      return {
        main: helper.formatWeatherEmojiFour(response),
        custom: helper.customInfo(custom, response)
      };
    default:
      throw { formatError: "Format not supported" };
  }
}