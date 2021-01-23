
let today = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let day = days[today.getDay()];
let hour= today.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute= today.getMinutes();
if (minute < 10) {
  minute= `0${minute}`;
}

let date = document.querySelector("#date");
date.innerHTML= ` ${day}, ${hour}:${minute}`;


  
  function displayWeatherCondition(response) {
    let iconElement= document.querySelector("#icon");
    document.querySelector("#city").innerHTML = response.data.name;

    celsiusTemperature= response.data.main.temp;
    document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }
  
  
  function displayForecast(response){

  let forecastElement=document.querySelector("#forecast");
  let forecast=response.data.list[0];
   
  forecastElement.innerHTML=`      
  <div class="col-2">
  <h5>12:00</h5>
  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
  <div class="weather-forecast-temperature">
   <strong>${Math.round(forecast.main.temp_max)}°</strong>${Math.round(forecast.main.temp_min)}°
  </div>
  </div> 
</div>
  `;
 
  }

  function searchCity(city) {
    let apiKey = "73d378540fbbe0ffd81eaddc0cdce842";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);

    apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "73d378540fbbe0ffd81eaddc0cdce842";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherCondition);   
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
  
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  let celsiusTemperature = null;
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
  
  searchCity("London");