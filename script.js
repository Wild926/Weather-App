const apiKey = "3766383676878340b9652e23d96e5d2c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    //console.log("city entered", city);

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