//Display Date
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let date = days[now.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${date} ${hours}:${minutes}`; //**geolocation to change time based on city?**

//change 5-day forecast dates--**only works for sunday/monday. figure this out later**
let day1 = document.querySelector("#day1");
day1.innerHTML = days[now.getDay() + 1];
let day2 = document.querySelector("#day2");
day2.innerHTML = days[now.getDay() + 2];
let day3 = document.querySelector("#day3");
day3.innerHTML = days[now.getDay() + 3];
let day4 = document.querySelector("#day4");
day4.innerHTML = days[now.getDay() + 4];
let day5 = document.querySelector("#day5");
day5.innerHTML = days[now.getDay() + 5];

//Search City
function citySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#cityInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;
  let apiKey = "a15655002ee776e90f4daadb873d9051";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

//Getting Temp Data **figure out emoji situation later**
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

  //card info
  let high = Math.round(response.data.main.temp_max);
  let high0 = document.querySelector("#high0");
  high0.innerHTML = `High: ${high} ℉`;

  let low = Math.round(response.data.main.temp_min);
  let low0 = document.querySelector("#low0");
  low0.innerHTML = `Low: ${low} ℉`;

  let windElement = document.querySelector("#wind");
  windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind Speed: ${windSpeed} m/hr`;

  let humidityElement = document.querySelector("#humidity");
  humid = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humid}%`;
}

//temp unit conversion
function changeToCel(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree0");
  far.classList.remove("active");
  cel.classList.add("active");
  let celTemp = (fahrenheitTemp - 32) / 1.8;
  temperatureElement.innerHTML = Math.round(celTemp);
}

function changeToFar(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree0");
  cel.classList.remove("active");
  far.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let cel = document.querySelector("#cel");
cel.addEventListener("click", changeToCel);

let far = document.querySelector("#far");
far.addEventListener("click", changeToFar);

let fahrenheitTemp = null;
