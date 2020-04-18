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
* Moon phase is available as custom parameter
* Forecast (WIP)	
## Supported output formats

Weather-Go currently supports these formats:
* JSON
* Emojified JSON

For receive the desired format, you have to add the `format` query parameter.

The JSON format was re-format from original OpenWeatherMap response.\
*JSON format input:* `?format=json`.\
**Example:**

    {
        "currentWeather": {
            "coord": {
                "lon": "-0.13",
                "lat": "51.51"
            },
            "weather": {
                "main": "Clear",
                "description": "clear sky"
            },
            ...,
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
    }

You can use the emojified JSON format feature:
*	Format 1:
	*	Format input: `?format=1`.
	*	Response: `{ "currentWeather":  "🌑 4.43°C" }`
*	Format 2:
	*	Format input: `?format=2`.
	*	Response: `{ "currentWeather":  "🌑 🌡️4.43°C 🌬️↗7.56 Km/h" }`
*	Format 3:
	*	Format input: `?format=3`.*
	*	Response: `{ "currentWeather":  "London: 🌑 4.28°C" }`
*	Format 4:
	*	Format input: `?format=4`.*
	*	Response: `{ "currentWeather":  "Detroit: ⛅ 🌡️-1.00°C 🌬️↓11.16 Km/h" }`


## Custom parameters
Custom parameters can be used if the response format is emojified JSON.

    h	💧 Humidity
    p	⤵️ Pressure in hPa
    w	🌬️ Wind speed in Km/h
    wd	↙ Wind direction
    t	🌡️ Temperature in Celsius
    l	City name
    c	Country code
    sr	🌇 Sunrise
    ss	🌆 Sunset
    mp	🌘 Moon phase
The `custom` query parameter has to be provided. You can concatenate them!
**Example**

	  Request:	/London?format=1&custom=h,sr,ss,t,mp
	  Response: 
	  {
	     "currentWeather": "⛅ 2.41°C",
	     "custom": {
	         "humidity": "💧37%",
	         "sunrise": "🌇06:48 AM",
	         "sunset": "🌆08:14 PM",
	         "temperature": "🌡️2.41°C",
	         "moonPhase": {
		         "emoji": "🌘",
		         "name": "Waning crescent",
		         "ilumination": "14.91%"
	         }
	     }
      }
    

## TODO

* Implement the JSON-based ANSI-sequences format
* Forecast
