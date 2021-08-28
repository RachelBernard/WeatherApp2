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

//change degrees---**either equation or change unit in API key to "metric". figure this out later**
//function changeToCel(event) {
//event.preventDefault();
//let cel = (currentTemp - 32) * (5 / 9);

//let degree0 = document.querySelector("#degree0");
//degree0.innerHTML = cel;
//}

//let cel = document.querySelector("#cel");
//cel.addEventListener("click", changeToCel);

// function changeToFar(event) {
//   event.preventDefault();
//far = (cel * 1.8) + 32
//   let degree0 = document.querySelector("#degree0");
//   degree0.innerHTML = ;
// }

// let far = document.querySelector("#far");
// far.addEventListener("click", changeToFar);

//Search City
function citySearch() {
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
  let currentTemp = Math.round(response.data.main.temp);
  let degree0 = document.querySelector("#degree0");
  degree0.innerHTML = currentTemp;

  let description = response.data.weather[0].description;
  let description1 = document.querySelector("#description1");
  description1.innerHTML = description;

  let high = Math.round(response.data.main.temp_max);
  let high0 = document.querySelector("#high0");
  high0.innerHTML = `High: ${high} ℉`;

  let low = Math.round(response.data.main.temp_min);
  let low0 = document.querySelector("#low0");
  low0.innerHTML = `Low: ${low} ℉`;
}
