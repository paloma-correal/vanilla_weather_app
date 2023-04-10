function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0&{minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 

    return days[day]; 
}

function displayForecast(response){
    let forecast = response.data.daily;

    let forecastElement = document.querySelector ("#forecast");


    let forecastHTML = `<div class = "row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6){
    forecastHTML = 
    forecastHTML + `
            
             <div class = "col-2">
               <div class = "weather-forecast-date">${formatDate(forcastDay.dt)}</div>
               ${index}
               <img
               src = "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forcastDay.weather[0].icon}.png"
               alt = ""
               width = "46"
            />
            <div class = "weather-forecast-temperatures">
              <span class = "weather-forecast-temperature-max"> ${Math.round(forecastDay.temperature.maximum)}
                </span>
              <span class = "weather-forecast-temperature-min"> ${Math.round(forecastDay.temperature.minimum)}
                </span>
            </div>
          </div>
        
        `;
    }
});

    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;
}

function getForecast (coordinates){
    console.log(coordinates);
    let apiKey = "4t499e5cbb23dd05b04o16b8befa8cff";
    let apiUrl = `http://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    fahrenheitTemperature = response.data.main.temp;



    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.condition[0].description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute(
        "scr",
        `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition[0].icon}.png`
    );
    iconElement.setAttribute("alt", response.data.condition[0].description);

    getForecast(response.data.coordinates);
}



function search(city) {
    let apiKey = "4t499e5cbb23dd05b04o16b8befa8cff";
    let apiUrl = `http://api.shecodes.io/weather/v1/current?query=${city}&key=4t499e5cbb23dd05b04o16b8befa8cff&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.remove("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");


