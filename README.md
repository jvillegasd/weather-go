# Weather-Go!

Weather-Go is wrapper for OpenWeatherMap API. This project is inspired by [wttr](https://github.com/chubin/wttr.in).
Weather-Go supports various information representation like JSON, emojified JSON weather and JSON-based ANSI-sequences.


## Running it in local

This project is dockerized. Run the project with the following command:\
`docker-compose up -d`\
PS: A Nginx container is used for deploy the dockerized project.

## Setting Environment
This project uses two `ENV` variables:
*	Project exposed port: `NODEJS_PORT`
*	OpenWeatherMap API key: `WEATHER_API_KEY`

##	Usage
Weather-Go current endpoints:
*	Current weather
	*	By city: `/:city`
	*	By zipcode: `/country/:country/zip/:zip`
	*	By coordinates: `/latitude/:latitude/longitude/:longitude`
* Moon phase (WIP)
* Forecast (WIP)	
## Supported output formats

Weather-Go currently supports these formats:
* JSON
* Emojified JSON

For receive the desired format, you have to add the `format` query parameter.

The JSON format was re-format from original OpenWeatherMap response.\
*JSON format input: `?format=json`.*\
**Example:**
`{
    "currentWeather": {
        "coord": {
            "lon": "-0.13",
            "lat": "51.51"
        },
        "weather": {
            "main": "Clear",
            "description": "clear sky"
        },
        "temp": {
            "celsius": {
                "current": "4.34 °C",
                "feelsLike": "1.26 °C",
                "min": "2.22 °C",
                "max": "7.22 °C"
            },
            "fahrenheit": {
                "current": "39.81 °F",
                "feelsLike": "34.27 °F",
                "min": "36.00 °F",
                "max": "45.00 °F"
            },
            "pressure": "1017 hPa",
            "humidity": "87 %"
        },
        "visibility": "6.00 Km/h",
        "wind": {
            "speed": "7.56 Km/h",
            "degree": "60°"
        },
        "country": "GB",
        "city": "London",
        "timezone": "1 UTC",
        "sunrise": "4/16/2020, 06:01 AM",
        "sunset": "4/16/2020, 07:58 PM"
    }
}`\
You can use the JSON emojified format feature:
*	Format 1:
	*	*Format input: `?format=1`.*
	*	Response: `{ "currentWeather":  "🌑 4.43°C" }`
*	Format 2:
	*	*Format input: `?format=2`.*
	*	Response: `{ "currentWeather":  "🌑 🌡️4.43°C 🌬️↗7.56 Km/h" }`
*	Format 3:
	*	*Format input: `?format=3`.*
	*	Response: `{ "currentWeather":  "London: 🌑 4.28°C" }`
*	Format 4:
	*	*Format input: `?format=4`.*
	*	Response: `{ "currentWeather":  "Detroit: ⛅ 🌡️-1.00°C 🌬️↓11.16 Km/h" }`
## TODO

* Implement the JSON-based ANSI-sequences format
* Finish the Moon phase port to JavaScript
* Forecast
