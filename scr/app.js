function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
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

function displayTemperature(response){
    console.log (response.data);
    let temperatureElement = document.querySelector("Temperature");
    let cityElement = document.querySelector ("City");
    let descriptionElement = document.querySelector ("Description");
    let humidityElement = document.querySelector ("Humidity");
    let windElement = document.querySelector ("Wind");
    temperatureElement.innerHTML = Math.round (response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round (response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "scr",
        `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.weather[0].icon}.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

    function search(city){
    let apiKey = "4t499e5cbb23dd05b04o16b8befa8cff";
    let apiUrl = "http://api.shecodes.io/weather/v1/current?query=New York&key=4t499e5cbb23dd05b04o16b8befa8cff&units=metric";
    axios.get(apiUrl).then(displayTemperature);
    }

    function handleSubmit(event){
        event.preventDefault();
        let cityInputElement = document.querySelector("city-input");
        search(cityInputElement.value);
    }

    function displayFahrenheitTemperature (event){
        event.preventDefault();
        let fahrenheitTemperature = (14 * 9)/5 +32;
    
        let temperatureElement = document.querySelector ("#temperature");
        temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    }

    function displayCelsiusTemperature (event){
        event.preventDefault();
        let temperatureElement = document.querySelector ("#temperature");
        temperatureElement.innerHTML = Math.round(celsiusTemperature);
    }

    let celsiusTemperature = null;

    let form = document.querySelector ("search-form");
    form.addEventListener("submit", handleSubmit);

    let fahrenheitLink = document.querySelector ("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

    let celsiusTemperature = document.querySelector ("celsius-link");
    celsiusLink.addEventListener ("click", displayCelsiusTemperature);

    search("New York");