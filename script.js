// JavaScript for toggling mobile menu
document.addEventListener("DOMContentLoaded", function () {
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggleBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
});

const apiKey = "492c3c3c18b557eb9904fd26dc4fcb95";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").classList.remove("hidden");
    document.querySelector(".weather").classList.add("hidden");
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

    // Update weather icon based on weather condition

    const weatherCondition = data.weather[0].main.toLowerCase();

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./images/mist.png";
    }

    document.querySelector(".weather").classList.remove("hidden");
    document.querySelector(".error").classList.add("hidden");
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
  // Check if Enter key was pressed
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

// You can remove this line if you don't want to fetch weather data immediately
// checkWeather("New York");
