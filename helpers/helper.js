//Libs
let nodeEmoji = require("node-emoji");

const kelvinToCelsius = temp => { return temp - 273.15; };
const kelvinToFahrenheit = temp => { return temp * 9/5 - 459.67; };
const meterToKilometer = meassure => { return meassure / 1000; };
const mpsToKmph = meassure => { return meassure * 3.6; };
const secToHour = time => { return time / 3600 };
const unixToDateString = (time, shift) => {
  let utcDate = new Date(time * 1000);
  let shiftHour = secToHour(shift);
  utcDate.setHours(utcDate.getHours() + shiftHour);
  return utcDate.toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};

module.exports.formatWeatherJSON = response => {
  return {
    coord: {
      lon: response.coord.lon.toString(),
      lat: response.coord.lat.toString()
    },
    weather: {
      main: response.weather[0].main,
      description: response.weather[0].description
    },
    temp: {
      celsius: {
        current: `${kelvinToCelsius(response.main.temp).toFixed(2)} °C`,
        feelsLike: `${kelvinToCelsius(response.main.feels_like).toFixed(2)} °C`,
        min: `${kelvinToCelsius(response.main.temp_min).toFixed(2)} °C`,
        max: `${kelvinToCelsius(response.main.temp_max).toFixed(2)} °C`
      },
      fahrenheit: {
        current: `${kelvinToFahrenheit(response.main.temp).toFixed(2)} °F`,
        feelsLike: `${kelvinToFahrenheit(response.main.feels_like).toFixed(2)} °F`,
        min: `${kelvinToFahrenheit(response.main.temp_min).toFixed(2)} °F`,
        max: `${kelvinToFahrenheit(response.main.temp_max).toFixed(2)} °F`
      },
      pressure: `${response.main.pressure} hPa`,
      humidity: `${response.main.humidity} %`
    },
    visibility: `${meterToKilometer(response.visibility).toFixed(2)} Km/h`,
    wind: {
      speed: `${mpsToKmph(response.wind.speed).toFixed(2)} Km/h`,
      degree: `${response.wind.deg}°`
    },
    country: response.sys.country,
    city: response.name,
    timezone: `${secToHour(response.timezone)} UTC`,
    sunrise: unixToDateString(response.sys.sunrise, response.timezone),
    sunset: unixToDateString(response.sys.sunset, response.timezone)
  };
};

module.exports.formatWeather = response => {
  let weather = response.weather[0].main;
};