const form = document.querySelector("#form");
const search = document.querySelector("#search-btn");
const searchValue = document.querySelector("#search");
const weather = document.querySelector("#weather-details");
const weatherSearch = document.querySelector(".weather-search");
const apiKEY = `8f2ff4a7b08410e66ce21250463bb166`

// Local Weather

function myGetWeather(details) {
    weather.style.display = "block";
    weatherSearch.style.display = "none"
    weather.innerHTML = `<h1>Getting weather details<h1>`
    if (navigator.geolocation.getCurrentPosition !== false) {
        navigator.geolocation.getCurrentPosition(extractDetails);
        weather.innerHTML = `<h1>Gathering Weather Details<h1>`
        function extractDetails(details) {
            let longitude = details.coords.longitude;
            let latitude = details.coords.latitude;
            weatherDetails(longitude, latitude);
        }
    } else {
        weather.innerHTML = `<h1>Please allow location access and try again<h1>`
    }
}
function weatherDetails(lon, lat) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKEY}&units=metric`
    const weatherAPI = fetch(URL, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            weather.innerHTML = `
            <div class="weather">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                alt="">
            <h1>${data.name}</h1>
            <h2>Temperature: ${data.main.temp}&deg; C</h2>
            <h4>Humidity: ${data.main.humidity}&#x25;</h4>
        </div>`
        });
}

// Other Locations

function otherWeather() {
    weather.style.display = "none";
    weatherSearch.style.display = "block";
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const cityName = searchValue.value;
    weather.style.display = "block";
    weather.innerHTML = `<h1>Gathering Weather Information. . . </h1>`
    citySearch(cityName);
    return cityName;
})

const citySearch = async (cityName) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKEY}&units=metric`;
    const response = await fetch(URL);
    const data = await response.json();
    return fillSearch(data);
}

function fillSearch(data) {
    if (data.cod == "404") {
        weather.innerHTML = `<h1> City Not Found <h1>`
        return;
    } else {
        weather.innerHTML = `
            <div class="weather">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                alt="">
            <h1>${data.name}</h1>
            <h2>Temperature: ${data.main.temp}&deg; C</h2>
            <h4>Humidity: ${data.main.humidity}&#x25;</h4>
        </div>`
    }
    searchValue.value = ``
}
