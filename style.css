const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherDiv = document.getElementById("weather");
const message = document.getElementById("message");

const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");

const forecastDiv = document.getElementById("forecast");

// 1. Initialize Map
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker = null;

// 2. Event Listeners
searchBtn.addEventListener("click", getWeatherBySearch);
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") getWeatherBySearch();
});

// Map Click Event
map.on('click', async function (e) {
    const { lat, lng } = e.latlng;
   
    // Move marker to clicked spot
    updateMarker(lat, lng);
   
    // Fetch location name + weather
    await getWeatherByCoordinates(lat, lng);
});

// Helper to update pin position
function updateMarker(lat, lng, zoomLevel = null) {
    if (marker) {
        marker.setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng]).addTo(map);
    }
   
    if (zoomLevel) {
        map.setView([lat, lng], zoomLevel);
    } else {
        map.panTo([lat, lng]);
    }
}

// 3. Handle Search Bar Query
async function getWeatherBySearch() {
    const city = cityInput.value.trim();

    if (!city) {
        message.textContent = "Please enter a city name.";
        weatherDiv.classList.add("hidden");
        return;
    }

    message.textContent = "Searching location...";
    weatherDiv.classList.add("hidden");

    try {
        const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoURL);

        if (!geoResponse.ok) throw new Error("Unable to connect to location service.");

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found.");
        }

        const location = geoData.results[0];
        const { latitude, longitude, name, country } = location;

        // Move pin to searched location
        updateMarker(latitude, longitude, 10);

        // Fetch & render weather
        await fetchAndRenderWeather(latitude, longitude, name, country);

    } catch (error) {
        console.error(error);
        message.textContent = error.message;
        weatherDiv.classList.add("hidden");
    }
}

// 4. Handle Pin Click (Reliable Reverse Geocoding)
async function getWeatherByCoordinates(latitude, longitude) {
    message.textContent = "Finding city details...";
    weatherDiv.classList.add("hidden");

    let cityName = "Unknown Place";
    let countryName = "";

    try {
        // High-reliability free client-side API for exact city/country extraction
        const reverseURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        const response = await fetch(reverseURL);

        if (response.ok) {
            const data = await response.json();

            // Extract primary city/locality fields
            cityName =
                data.city ||
                data.locality ||
                data.principalSubdivision ||
                data.continent ||
                "Selected Area";

            countryName = data.countryName || "";
        }
    } catch (err) {
        console.warn("Reverse geocoding error:", err);
    }

    // Format final string (e.g. "Mumbai, India")
    const fullLocationStr = countryName ? `${cityName}, ${countryName}` : cityName;

    // UPDATE SEARCH BAR TEXT
    cityInput.value = fullLocationStr;

    // Fetch and render weather data
    await fetchAndRenderWeather(latitude, longitude, cityName, countryName);
}

// 5. Fetch & Render Weather
async function fetchAndRenderWeather(latitude, longitude, name, country) {
    try {
        const weatherURL = `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
            `&timezone=auto` +
            `&forecast_days=10`;

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather data.");
        }

        const weatherData = await weatherResponse.json();

        // Render card
        displayWeather({ name, country }, weatherData);

        message.textContent = "";
        weatherDiv.classList.remove("hidden");

    } catch (err) {
        console.error(err);
        message.textContent = err.message || "Failed to fetch weather.";
        weatherDiv.classList.add("hidden");
    }
}

// Render Weather Card
function displayWeather(location, data) {
    const countryText = location.country ? `, ${location.country}` : "";
   
    // Sets card header to "City, Country"
    locationElement.textContent = `${location.name}${countryText}`;

    temperatureElement.textContent = Math.round(data.current.temperature_2m);
    descriptionElement.textContent = getWeatherDescription(data.current.weather_code);
    humidityElement.textContent = data.current.relative_humidity_2m;
    windElement.textContent = data.current.wind_speed_10m;

    displayForecast(data.daily);
}

// Render Daily Forecast
function displayForecast(daily) {
    forecastDiv.innerHTML = "";

    daily.time.forEach((dateString, i) => {
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
            timeZone: "UTC"
        });

        const card = document.createElement("div");
        card.classList.add("forecast-card");

        card.innerHTML = `
            <h3>${dayName}</h3>
            <p>${getWeatherDescription(daily.weather_code[i])}</p>
            <p class="temp">${Math.round(daily.temperature_2m_max[i])}°C</p>
            <p>Min: ${Math.round(daily.temperature_2m_min[i])}°C</p>
        `;

        forecastDiv.appendChild(card);
    });
}

// WMO Weather Codes
function getWeatherDescription(code) {
    const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Fog", 48: "Depositing rime fog",
        51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
        61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
        71: "Slight snowfall", 73: "Moderate snowfall", 75: "Heavy snowfall",
        80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
        95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
    };

    return weatherCodes[code] || "Unknown weather";
}
