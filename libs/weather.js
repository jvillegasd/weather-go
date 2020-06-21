"use strict";

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

module.exports.forecastByCoord = async (latitude, longitude, format, custom) => {
  custom = (custom) ? custom.split(",") : [];
  try {
    let response = await axios({
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&exclude=current,minutely,hourly`,
      method: "GET"
    });

    let weekForecast = [];
    for (let forecast of response.data.daily) {
      forecast.lat = response.data.lat;
      forecast.lon = response.data.lon;
      forecast.timezone_offset = response.data.timezone_offset;
      let formattedWeather = helper.formatForecastWeather(forecast);
      
      weekForecast.push(formatResponse(formattedWeather, format, custom));
    }
    return weekForecast;
  } catch (error) {
    let responseError = error.response;
    console.log("error fetching forecast by coordinates", (responseError && responseError.data) ? responseError.data : error);
    if (error.formatError) throw error.formatError;
    else throw (responseError.data.cod === "404") ? "City not found" : "Error - fetching forecast by coordinates";
  }
};

function formatResponse(response, format, custom) {
  switch (format) {
    case "json":
      return { main: helper.formatWeatherJSON(response) };
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