//Libs
let axios = require("axios");

//Helpers
let helper = require("../helpers/helper");

module.exports.weatherByCity = async (cityName, format) => {
  try {
    let response = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`,
      method: "GET"
    });
    
    switch (format) {
      case "json":
        return helper.formatWeatherJSON(response.data);
      case "1":
        return helper.formatWeatherEmojiOne(response.data);
      case "2":
        return helper.formatWeatherEmojiTwo(response.data);
      case "3":
        return helper.formatWeatherEmojiThree(response.data);
      case "4":
        return helper.formatWeatherEmojiFour(response.data);
      default:
        throw { formatError: "Format not supported" };
    }
  } catch (error) {
    let responseError = error.response;
    console.log("error fetching weather by city", (responseError && responseError.data) ? responseError.data : error);
    if (error.formatError) throw error.formatError;
    else throw (responseError.data.cod === "404") ? "City not found" : "Error - fetching weather by city";
  }
};

module.exports.weatherByZipCode = async (zipCode, countryCode, format) => {
  try {
    let response = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${process.env.WEATHER_API_KEY}`,
      method: "GET"
    });

    switch (format) {
      case "json":
        return helper.formatWeatherJSON(response.data);
      case "1":
        return helper.formatWeatherEmojiOne(response.data);
      case "2":
        return helper.formatWeatherEmojiTwo(response.data);
      case "3":
        return helper.formatWeatherEmojiThree(response.data);
      case "4":
        return helper.formatWeatherEmojiFour(response.data);
      default:
        throw { formatError: "Format not supported" };
    }
  } catch (error) {
    let responseError = error.response;
    console.log("error fetching weather by zip code", (responseError && responseError.data) ? responseError.data : error);
    if (error.formatError) throw error.formatError;
    else throw (responseError.data.cod === "404") ? "City not found" : "Error - fetching weather by zip code";
  }
};

module.exports.weatherByCoord = async (latitude, longitude, format) => {
  try {
    let response = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`,
      method: "GET"
    });
    console.log(response.data)
    switch (format) {
      case "json":
        return helper.formatWeatherJSON(response.data);
      case "1":
        return helper.formatWeatherEmojiOne(response.data);
      case "2":
        return helper.formatWeatherEmojiTwo(response.data);
      case "3":
        return helper.formatWeatherEmojiThree(response.data);
      case "4":
        return helper.formatWeatherEmojiFour(response.data);
      default:
        throw { formatError: "Format not supported" };
    }
  } catch (error) {
    let responseError = error.response;
    console.log("error fetching weather by coordinates", (responseError && responseError.data) ? responseError.data : error);
    if (error.formatError) throw error.formatError;
    else throw (responseError.data.cod === "404") ? "City not found" : "Error - fetching weather by coordinates";
  }
};