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
        geoLocationElement.innerHTML = `
        <div class="font text-start flex flex-col items-center justify-start space-y-1 w-fit">
            <p class="text-sm font-medium flex justify-start text-gray-800 w-[100%]">${ipData?.city}</p>
            <p class="text-md text-gray-600 text-start">${ipData?.region}, ${ipData?.country}</p>
        </div>

    `;
      }

      const locationQuery = `${ipData.lat},${ipData.lon}`;
      const weatherData = await getWeather(null, locationQuery);
      displayWeatherInfo(weatherData);
      fetchWeatherForecast(locationQuery);
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
          fetchWeatherForecast(listItem.textContent);
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
      <div id="weatherInfoContainer" class="w-[100%] mx-auto p-8 flex flex-col justify-start items-center text-gray-700">
        <div class="flex flex-col justify-between text-center items-center p-10">
          
          <div class="p-10">
            <p class="text-8xl font-semibold">${current.temp_c}°<span class="text-[2rem]">C</span></p>
            <div class="text-gray-900"> 
             <div class="p-5 text-2xl font-medium flex items-center justify-center">
              <img src="${current?.condition?.icon}" alt="${current?.condition?.text}" class="w-10 h-10 ">
              <span>${current?.condition?.text}</span>
            </div>


              <p class="text-md font-normal text-gray-800">Feels Like: <span class="font-semibold">${current.feelslike_c}°C</span></p>
            </div>
            <p class="text-2xl font-normal text-gray-200 bg-gray-700 py-3 px-5 rounded-full m-5">${location.name}, ${location.country}</p>

          </div>

          <div class="grid grid-cols-5 gap-6 text-lg w-[70%] max-w-[80%]">
            <div class="bg-gray-200 p-4 text-gray-600 rounded-xl flex flex-col items-center text-center">
              <p class="mb-2"><strong>Humidity: </br> </strong> <span class="text-gray-600">${current.humidity}%</span></p>
            </div>
            <div class="bg-gray-200 p-4 text-gray-600 rounded flex flex-col items-center text-center">
              <p class="mb-2"><strong>Wind: </br> </strong> <span class="text-gray-600">${current.wind_kph} kph</span> (${current.wind_dir})</p>
            </div>
            <div class="bg-gray-200 p-4 text-gray-600 rounded flex flex-col items-center text-center">
              <p class="mb-2"><strong>Pressure: </br> </strong> <span class="text-gray-600">${current.pressure_mb} mb</span></p>
            </div>
            <div class="bg-gray-200 p-4 text-gray-600 rounded flex flex-col items-center text-center">
              <p class="mb-2"><strong>UV Index: </br> </strong> <span class="text-gray-600">${current.uv}</span></p>
            </div>
            <div class="bg-gray-200 p-4 text-gray-600 rounded flex flex-col items-center text-center">
              <p class="mb-2"><strong>Visibility: </br> </strong> <span class="text-gray-600">${current.vis_km} km</span></p>
            </div>
          </div>

        </div>
      </div>
    `;

    weatherInfoContainer.classList.remove("hidden");
  };

  const fetchWeatherForecast = async (query) => {
    const baseURL = "http://api.weatherapi.com/v1/forecast.json";
    try {
      const response = await fetch(
        `${baseURL}?key=${API_KEY}&q=${query}&days=7`
      );
      const forecastData = await response.json();
      displayForecastInfo(forecastData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const displayForecastInfo = (forecastData) => {
    const { forecast } = forecastData;
    const forecastList = forecast.forecastday.slice(1); 
    const todayForecast = forecastData.forecast.forecastday[0];
    
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  
    forecastInfoContainer.innerHTML = "";
  
    const topPart = document.createElement("div");
    topPart.classList.add(
      "text-center",
      "mt-8",
      "p-6",
      "border-b-2",
      "border-gray-300",
    );
  
    topPart.innerHTML = `
      <div class="h-[30vh] flex flex-col justify-center items-center">
        <h3 class="text-4xl text-gray-800 font-bold">${currentDate.toLocaleDateString('en-US', {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}</h3>
        <p class="text-lg text-gray-600">${currentDate.toLocaleDateString('en-US', {
          weekday: "long",
        })}</p>
        <p class="text-md text-gray-500 mb-2">Current Time: ${currentTime}</p>
    
        <div class="flex gap-8 justify-center mt-4">
          <div class="flex flex-col items-center">
            <p class="text-md font-semibold text-gray-700">Max Temp</p>
            <p class="text-lg text-blue-600">${todayForecast.day.maxtemp_c}°C</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-md font-semibold text-gray-700">Min Temp</p>
            <p class="text-lg text-blue-600">${todayForecast.day.mintemp_c}°C</p>
          </div>
        </div>
  
        <div class="flex gap-8 justify-center mt-4">
          <div class="flex flex-col items-center">
            <p class="text-md font-semibold text-gray-700">Sunrise</p>
            <p class="text-lg text-yellow-600">${todayForecast.astro.sunrise}</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-md font-semibold text-gray-700">Sunset</p>
            <p class="text-lg text-yellow-600">${todayForecast.astro.sunset}</p>
          </div>
        </div>
      </div>
    `;
  
    forecastInfoContainer.appendChild(topPart);
  
    const weeklyForecastHeading = document.createElement("h2");
    weeklyForecastHeading.classList.add("text-2xl", "font-bold", "text-gray-800", "mt-10", "mb-6", "text-center");
    weeklyForecastHeading.textContent = "Weekly Forecast";
    forecastInfoContainer.appendChild(weeklyForecastHeading);
  
    const bottomPart = document.createElement("div");
    bottomPart.classList.add(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-3",
      "gap-4",
      "p-4"
    );
  
    forecastList.forEach((day) => {
      const forecastCard = document.createElement("div");
      forecastCard.classList.add(
        "bg-white",
        "bg-opacity-60",
        "backdrop-blur-sm",
        "border",
        "border-white",
        "border-opacity-30",
        "rounded-lg",
        "shadow-lg",
        "p-4",
        "text-center",
        "transition-transform",
        "hover:scale-105"
      );
  
      forecastCard.innerHTML = `
        <p class="text-sm text-gray-600 mb-2">${new Date(day.date).toLocaleDateString('en-US', {
          weekday: 'long',
        })}</p>
        <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" class="w-12 h-12 mx-auto mb-2" />
        <p class="text-gray-700 mb-2">${day.day.condition.text}</p>
        
      `;
  
      bottomPart.appendChild(forecastCard);
    });
  
    forecastInfoContainer.appendChild(bottomPart);
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