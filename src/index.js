//Display Date
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = days[now.getDay()];

  return `${date} | ${hours}:${minutes}`;
}
let apiKey = "a15655002ee776e90f4daadb873d9051";

//Default Launch
function launchApp(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  let location = document.querySelector("h2");
  location.innerHTML = `${city}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a15655002ee776e90f4daadb873d9051";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//Search City
function citySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#cityInput");
  let location = document.querySelector("h2");
  location.innerHTML = `${input.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

//Get Temp Data
function displayTemp(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#degree0");
  fahrenheitTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);

  let description = response.data.weather[0].description;
  let description1 = document.querySelector("#description1");
  description1.innerHTML = description;

  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let wind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind Speed: ${wind}m/hr`;

  getForecast(response.data.coord);
}

//6-Day Forecast
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="forecast-date">${formatForecastDay(
                forecastDay.dt
              )}</div>
              <img src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              class="forecast-icon" />
              <div class="forecast-temps">
                <span class="forecast-high">${Math.round(
                  forecastDay.temp.max
                )}°</span> 
                <span class="forecast-low">${Math.round(
                  forecastDay.temp.min
                )}°</span>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let fahrenheitTemp = null;

launchApp("New York");
