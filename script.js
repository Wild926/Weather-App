const apiKey = "3766383676878340b9652e23d96e5d2c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    //console.log(data);

    if (response.status === 404 || !data.main) {
       document.querySelector(".city").innerHTML = "City not found";
       document.querySelector(".temp").innerHTML = "--";
       document.querySelector(".humidity").innerHTML = "--";
       document.querySelector(".wind").innerHTML = "--";
       return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    const weatherIcon = document.querySelector(".weather-icon")

    const condition = data.weather[0].main;

    if(condition === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (condition === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition === "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (condition === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Snow") {
        weatherIcon.src = "images/snow.png";
    }

    //console.log("Weather condition:", condition);
}
    

checkWeather()

const searchBtn = document.getElementById("search-btn")
const cityInput = document.getElementById("city-input")

searchBtn.addEventListener("click", ()=> {
    const city = cityInput.value.trim();
    if(city !==""){
        checkWeather(city);
        cityInput.value = "";
        //console.log("city entered", city);
    }
});

cityInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
       const city = cityInput.value.trim();
       if(city !==""){
          checkWeather(city);
          cityInput.value = "";
    }
  }
});

