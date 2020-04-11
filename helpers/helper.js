//Libs
let nodeEmoji = require("node-emoji");

const kelvinToCelsius = temp => { return temp - 273.15; };
const kelvinToFahrenheit = temp => { return temp * 9 / 5 - 459.67; };
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
const weatherToEmoji = (condition, id, icon) => {
  switch (condition) {
    case "Thunderstorm":
      if (id >= 200 && id <= 202 || id >= 230 && id <= 232) return nodeEmoji.emojify(":thunder_cloud_and_rain:");
      else return nodeEmoji.emojify(":lightning_cloud:");
    case "Drizzle":
      return nodeEmoji.emojify(":rain_cloud:");
    case "Rain":
      if (id >= 500 && id <= 504) return nodeEmoji.emojify(":sun_behind_rain_cloud:");
      else if (id === 511) return nodeEmoji.emojify(":snow_cloud:");
      else return nodeEmoji.emojify(":rain_cloud:");
    case "Snow":
      return nodeEmoji.emojify(":snowflake:");
    case "Clouds":
      if (id === 801) return nodeEmoji.emojify(":partly_sunny:");
      else return nodeEmoji.emojify(":cloud:");
    case "Clear":
      if (icon === "01d") return nodeEmoji.emojify(":sunny:");
      else return nodeEmoji.emojify(":new_moon:");
    default:
      if (condition === "Tornado") return nodeEmoji.emojify(":tornado:");
      else if (condition === "Ash") return nodeEmoji.emojify(":volcano:");
      else if (condition) return nodeEmoji.emojify(":fog:");
      else return nodeEmoji.emojify(":grey_question:");
  }
};
const windDegreeToArrow = degree => {
  if (degree === 0 || degree === 360) return "\u2192";
  else if (degree > 0 && degree < 90) return "\u2197";
  else if (degree === 90) return "\u2191";
  else if (degree > 90 && degree < 180) return "\u2196";
  else if (degree === 180) return "\u2190";
  else if (degree > 180 && degree < 270) return "\u2199";
  else if (degree === 270) return "\u2193";
  else return "\u2198";
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

module.exports.formatWeatherEmojiOne = response => {
  let conditionEmoji = weatherToEmoji(response.weather[0].main, response.weather[0].id, response.weather[0].icon);
  let temperature = `${kelvinToCelsius(response.main.temp).toFixed(2)}°C`;
  return nodeEmoji.emojify(`${conditionEmoji} ${temperature}`);
};

module.exports.formatWeatherEmojiTwo = response => {
  let conditionEmoji = weatherToEmoji(response.weather[0].main, response.weather[0].id, response.weather[0].icon);
  let temperature = `${kelvinToCelsius(response.main.temp).toFixed(2)}°C`;
  let windSpeed = `${mpsToKmph(response.wind.speed).toFixed(2)} Km/h`;
  let windDegreeArrow = windDegreeToArrow(response.wind.deg);
  return nodeEmoji.emojify(`${conditionEmoji} :thermometer:${temperature} :wind_blowing_face:${windDegreeArrow}${windSpeed}`);
};

module.exports.formatWeatherEmojiThree = response => {
  let conditionEmoji = weatherToEmoji(response.weather[0].main, response.weather[0].id, response.weather[0].icon);
  let temperature = `${kelvinToCelsius(response.main.temp).toFixed(2)}°C`;
  return nodeEmoji.emojify(`${response.name}: ${conditionEmoji} ${temperature}`);
};

module.exports.formatWeatherEmojiFour = response => {
  let conditionEmoji = weatherToEmoji(response.weather[0].main, response.weather[0].id, response.weather[0].icon);
  let temperature = `${kelvinToCelsius(response.main.temp).toFixed(2)}°C`;
  let windSpeed = `${mpsToKmph(response.wind.speed).toFixed(2)} Km/h`;
  let windDegreeArrow = windDegreeToArrow(response.wind.deg);
  return nodeEmoji.emojify(`${response.name}: ${conditionEmoji} :thermometer:${temperature} :wind_blowing_face:${windDegreeArrow}${windSpeed}`);
};

module.exports.customInfo = (custom, response) => {
  let output = {};
  let supportedParams = custom.filter((element, index, self) => self.indexOf(element) === index && (element === "h" || element === "p" || element === "w" || element === "wd"));
  for (let param of supportedParams) {
    switch (param) {
      case "h":
        output.humidity = nodeEmoji.emojify(`:droplet:${response.main.humidity}%`);
        break;
      case "p":
        output.pressure = nodeEmoji.emojify(`:arrow_heading_down:${response.main.pressure} hPa`);
        break;
      case "w":
        output.windSpeed = nodeEmoji.emojify(`:wind_blowing_face:${mpsToKmph(response.wind.speed).toFixed(2)} Km/h`);
        break;
      case "wd":
        let windDegreeArrow = windDegreeToArrow(response.wind.deg);
        output.windDegree = nodeEmoji.emojify(`${windDegreeArrow}`);
        break;
      default:
        break;
    }
  }
  return output;
};