/* =========================================================
   DISASTERSAFE - LIVE WEATHER
   Open-Meteo API
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const loadingElement =
    document.getElementById("weather-loading");

const errorElement =
    document.getElementById("weather-error");

const errorMessage =
    document.getElementById("error-message");

const retryButton =
    document.getElementById("retry-button");

const weatherCard =
    document.getElementById("weather-card");

const locationName =
    document.getElementById("location-name");

const temperature =
    document.getElementById("temperature");

const weatherCondition =
    document.getElementById("weather-condition");

const weatherIcon =
    document.getElementById("weather-icon");

const humidity =
    document.getElementById("humidity");

const wind =
    document.getElementById("wind");

const rain =
    document.getElementById("rain");

const updatedTime =
    document.getElementById("updated-time");


/* =========================================================
   WEATHER CODE
   Open-Meteo WMO weather codes
========================================================= */

function getWeatherInfo(code) {

    if (code === 0) {
        return {
            condition: "Clear Sky",
            icon: "☀️"
        };
    }

    if (code === 1) {
        return {
            condition: "Mainly Clear",
            icon: "🌤️"
        };
    }

    if (code === 2) {
        return {
            condition: "Partly Cloudy",
            icon: "⛅"
        };
    }

    if (code === 3) {
        return {
            condition: "Overcast",
            icon: "☁️"
        };
    }

    if ([45, 48].includes(code)) {
        return {
            condition: "Foggy",
            icon: "🌫️"
        };
    }

    if ([51, 53, 55].includes(code)) {
        return {
            condition: "Drizzle",
            icon: "🌦️"
        };
    }

    if ([61, 63, 65].includes(code)) {
        return {
            condition: "Rain",
            icon: "🌧️"
        };
    }

    if ([66, 67].includes(code)) {
        return {
            condition: "Freezing Rain",
            icon: "🌧️"
        };
    }

    if ([71, 73, 75, 77].includes(code)) {
        return {
            condition: "Snow",
            icon: "❄️"
        };
    }

    if ([80, 81, 82].includes(code)) {
        return {
            condition: "Rain Showers",
            icon: "🌦️"
        };
    }

    if ([85, 86].includes(code)) {
        return {
            condition: "Snow Showers",
            icon: "🌨️"
        };
    }

    if ([95].includes(code)) {
        return {
            condition: "Thunderstorm",
            icon: "⛈️"
        };
    }

    if ([96, 99].includes(code)) {
        return {
            condition: "Thunderstorm with Hail",
            icon: "⛈️"
        };
    }

    return {
        condition: "Unknown",
        icon: "🌍"
    };
}


/* =========================================================
   SHOW ERROR
========================================================= */

function showError(message) {

    loadingElement.classList.add("hidden");

    weatherCard.classList.add("hidden");

    errorElement.classList.remove("hidden");

    errorMessage.textContent = message;
}


/* =========================================================
   GET USER LOCATION
========================================================= */

function getUserLocation() {

    if (!navigator.geolocation) {

        showError(
            "Your browser does not support location services."
        );

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            getWeather(latitude, longitude);

        },

        function(error) {

            if (error.code === 1) {

                showError(
                    "Location permission was denied. Please allow location access and try again."
                );

            }

            else if (error.code === 2) {

                showError(
                    "Your location could not be determined. Please try again."
                );

            }

            else {

                showError(
                    "Location request timed out. Please try again."
                );

            }

        },

        {
            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 300000
        }

    );

}


/* =========================================================
   GET WEATHER
========================================================= */

async function getWeather(latitude, longitude) {

    try {

        const apiUrl =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m` +
            `&temperature_unit=celsius` +
            `&wind_speed_unit=kmh` +
            `&timezone=auto`;


        const response =
            await fetch(apiUrl);


        if (!response.ok) {

            throw new Error(
                "Weather service is currently unavailable."
            );

        }


        const data =
            await response.json();


        displayWeather(data);


        /*
         * Get a readable location name.
         *
         * Open-Meteo provides weather coordinates,
         * but not a city name in this request.
         *
         * We use a reverse-geocoding request separately.
         */

        getLocationName(latitude, longitude);

    }

    catch (error) {

        console.error(
            "Weather error:",
            error
        );

        showError(
            "Unable to load weather information. Please try again."
        );

    }

}


/* =========================================================
   DISPLAY WEATHER
========================================================= */

function displayWeather(data) {

    const current =
        data.current;


    const weatherInfo =
        getWeatherInfo(
            current.weather_code
        );


    temperature.textContent =
        Math.round(current.temperature_2m) + "°";


    weatherCondition.textContent =
        weatherInfo.condition;


    weatherIcon.textContent =
        weatherInfo.icon;


    humidity.textContent =
        current.relative_humidity_2m + "%";


    wind.textContent =
        Math.round(current.wind_speed_10m)
        + " km/h";


    rain.textContent =
        current.precipitation + " mm";


    const now =
        new Date();


    updatedTime.textContent =
        "Updated " +
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    loadingElement.classList.add(
        "hidden"
    );


    errorElement.classList.add(
        "hidden"
    );


    weatherCard.classList.remove(
        "hidden"
    );

}


/* =========================================================
   REVERSE GEOCODING
========================================================= */

async function getLocationName(
    latitude,
    longitude
) {

    try {

        const url =
            `https://geocoding-api.open-meteo.com/v1/search` +
            `?name=${latitude},${longitude}`;


        /*
         * The Open-Meteo geocoding search endpoint
         * is designed primarily for place-name searches.
         *
         * Therefore, use coordinates directly as a
         * fallback location label.
         */

        locationName.textContent =
            `Lat ${latitude.toFixed(2)}, ` +
            `Lon ${longitude.toFixed(2)}`;

    }

    catch (error) {

        locationName.textContent =
            "Your Location";

    }

}


/* =========================================================
   RETRY
========================================================= */

retryButton.addEventListener(
    "click",
    function() {

        errorElement.classList.add(
            "hidden"
        );

        weatherCard.classList.add(
            "hidden"
        );

        loadingElement.classList.remove(
            "hidden"
        );

        getUserLocation();

    }
);


/* =========================================================
   START
========================================================= */

getUserLocation();