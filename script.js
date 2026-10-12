<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Forecast Dashboard</title>
    <link rel="stylesheet" href="style.css">
   
    <!-- Leaflet Map CSS & JS -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />
    <script
      src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    ></script>
</head>

<body>

<div class="container">

    <h1>Weather Forecast Dashboard</h1>

    <!-- Search Bar -->
    <div class="search-box">
        <input
            type="text"
            id="cityInput"
            placeholder="Enter city name..."
        >
        <button id="searchBtn">Search</button>
    </div>

    <!-- Map Box -->
    <div id="map" style="height: 300px; width: 100%; border-radius: 8px; margin: 1rem 0;"></div>

    <p id="message"></p>

    <!-- Weather Display Area -->
    <div id="weather" class="hidden">

        <div class="current-weather">

            <h2 id="location"></h2>

            <div class="temperature">
                <span id="temperature"></span>°C
            </div>

            <p id="description"></p>

            <div class="details">

                <div>
                    <strong>Humidity</strong>
                    <span id="humidity"></span>%
                </div>

                <div>
                    <strong>Wind</strong>
                    <span id="wind"></span> km/h
                </div>

            </div>

        </div>

        <h2 style="color:white; margin-top: 1.5rem;">10-Day Forecast</h2>

        <div id="forecast" class="forecast"></div>

    </div>

</div>

<script src="script.js"></script>

</body>
</html>




