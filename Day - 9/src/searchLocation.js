document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const resultsContainer = document.getElementById("results");
  const weatherInfoContainer = document.getElementById("weather-info");
  const forecastInfoContainer = document.getElementById("forecast-info");
  const API_KEY = "7d5780142b57451099a42712241410";
  const baseURL = "http://api.weatherapi.com/v1/search.json";

  const fetchWeatherByIP = async () => {
    try {
      const ipApiUrl = `http://api.weatherapi.com/v1/ip.json?key=${API_KEY}&q=auto:ip`;
      const response = await fetch(ipApiUrl);
      if (!response.ok) throw new Error("IP-based weather data not found");
      const ipData = await response.json();

      const geoLocationElement = document.getElementById("geo-location");
      if (geoLocationElement) {
        geoLocationElement.textContent = `${ipData?.city}, ${ipData?.region}, ${ipData?.country}`;
      }

      const locationQuery = `${ipData.lat},${ipData.lon}`;
      const weatherData = await getWeather(null, locationQuery);
      displayWeatherInfo(weatherData);
      fetchWeatherForecast(locationQuery); // Fetch forecast data here
    } catch (error) {
      console.error("Error fetching IP weather data:", error);
    }
  };

  fetchWeatherByIP();

  let debounceTimeout;

  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => func(...args), delay);
    };
  };

  const fetchLocations = async (query) => {
    if (!query.length) {
      resultsContainer.classList.add("hidden");
      return;
    }

    try {
      const response = await fetch(`${baseURL}?key=${API_KEY}&q=${query}`);
      const locations = await response.json();
      resultsContainer.innerHTML = "";

      if (!locations.length) {
        resultsContainer.classList.add("hidden");
        return;
      }

      locations.forEach((location) => {
        const listItem = document.createElement("li");
        listItem.classList.add(
          "px-4",
          "py-2",
          "cursor-pointer",
          "hover:bg-blue-500",
          "hover:text-white"
        );
        listItem.textContent = `${location.name}, ${location.region}, ${location.country}`;
        listItem.addEventListener("click", async () => {
          searchInput.value = listItem.textContent;
          resultsContainer.classList.add("hidden");
          const weatherData = await getWeather(null, listItem.textContent);
          displayWeatherInfo(weatherData);
          fetchWeatherForecast(listItem.textContent); // Fetch forecast data here
        });
        resultsContainer.appendChild(listItem);
      });
      resultsContainer.classList.remove("hidden");
    } catch (error) {
      console.error("Error fetching location data:", error);
      resultsContainer.classList.add("hidden");
    }
  };

  const displayWeatherInfo = (weatherData) => {
    console.log(weatherData);
    if (!weatherData) {
      weatherInfoContainer.innerHTML = "<p>Unable to fetch weather data.</p>";
      weatherInfoContainer.classList.remove("hidden");
      return;
    }

    const { location, current } = weatherData;
    weatherInfoContainer.innerHTML = `
      <div id="weatherInfoContainer" class="w-[100%] mx-auto p-8 backdrop-blur-sm border bg-white bg-opacity-50 h-full border-white rounded-2xl shadow-lg text-gray-800">
      <div>
        <div>
          <h1 class="text-xl font-bold text-gray-900 mb-6 text-center">Weather in ${location.name}</h1>
          <h2 class="text-xl font-semibold text-gray-700 mb-4 text-center">${location.region}, ${location.country}</h2>
        </div>

        <div class="flex justify-center items-center mb-6">
          <img src="${current.condition.icon}" alt="${current.condition.text}" class="w-16 h-16 mr-4" />
          <p class="text-xl font-medium text-gray-900">${current.condition.text}</p>
        </div>
        </div>

        <div class="grid grid-cols-2 gap-6 text-lg">
          <div>
            <p class="mb-2"><strong>Temperature:</strong> <span class="text-blue-600">${current.temp_c}°C</span></p>
            <p><strong>Feels Like:</strong> <span class="text-blue-600">${current.feelslike_c}°C</span></p>
          </div>
          <div>
            <p class="mb-2"><strong>Humidity:</strong> <span class="text-blue-600">${current.humidity}%</span></p>
            <p><strong>Wind:</strong> <span class="text-blue-600">${current.wind_kph} kph</span> (${current.wind_dir})</p>
          </div>
          <div>
            <p class="mb-2"><strong>Pressure:</strong> <span class="text-blue-600">${current.pressure_mb} mb</span></p>
            <p><strong>UV Index:</strong> <span class="text-blue-600">${current.uv}</span></p>
          </div>
          <div>
            <p class="mb-2"><strong>Visibility:</strong> <span class="text-blue-600">${current.vis_km} km</span></p>
            <p><strong>Gusts:</strong> <span class="text-blue-600">${current.gust_kph} kph</span></p>
          </div>
        </div>
      </div>
    `;

    weatherInfoContainer.classList.remove("hidden");
  };

  const fetchWeatherForecast = async (query) => {
    const baseURL = "http://api.weatherapi.com/v1/forecast.json";
    try {
      const response = await fetch(`${baseURL}?key=${API_KEY}&q=${query}&days=7`);
      const forecastData = await response.json();
      displayForecastInfo(forecastData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const displayForecastInfo = (forecastData) => {
    const { forecast } = forecastData;
    const forecastList = forecast.forecastday;

    forecastInfoContainer.innerHTML = ""; 

    forecastList.forEach((day) => {
      const forecastCard = document.createElement("div");
      forecastCard.classList.add(
        "bg-white",
        "bg-opacity-20",
        "backdrop-blur-sm",
        "border",
        "border-white",
        "border-opacity-30",
        "rounded-lg",
        "shadow-lg",
        "p-4",
        "text-center"
      );

      forecastCard.innerHTML = `
        <h3 class="text-lg font-bold">${new Date(day.date).toLocaleDateString()}</h3>
        <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" class="w-12 h-12 mx-auto mb-2" />
        <p class="text-gray-700">${day.day.condition.text}</p>
        <p><strong>Max Temp:</strong> <span class="text-blue-600">${day.day.maxtemp_c}°C</span></p>
        <p><strong>Min Temp:</strong> <span class="text-blue-600">${day.day.mintemp_c}°C</span></p>
        <p><strong>Precipitation:</strong> <span class="text-blue-600">${day.day.totalprecip_mm} mm</span></p>
      `;

      forecastInfoContainer.appendChild(forecastCard);
    });
  };

  searchInput.addEventListener(
    "input",
    debounce((e) => {
      const query = e.target.value.trim();
      fetchLocations(query);
    }, 300)
  );

  document.addEventListener("click", (e) => {
    if (
      !resultsContainer.contains(e.target) &&
      !searchInput.contains(e.target)
    ) {
      resultsContainer.classList.add("hidden");
    }
  });

  const getWeather = async (locationId, query) => {
    const baseURL = "http://api.weatherapi.com/v1/current.json";
    try {
      const response = await fetch(
        `${baseURL}?key=${API_KEY}&q=${query || `id:${locationId}`}`
      );
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };
});
