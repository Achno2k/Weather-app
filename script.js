//WEATHER APP
async function read_api_key () {
    const filePath = "config.json";  //json file with the api key
    const response = await axios.get(filePath);
    return response.data.apiKey;
}

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";


async function findWeather() {
    const API_KEY = await read_api_key();
    const cityName = searchBar.value;
    const endpoint = `?q=${cityName}&appid=${API_KEY}`;
    const url = BASE_URL + endpoint + "&units=metric";

    if (!cityName) {
        alert("Please enter a city.")
    }

    try {
        const response = await axios.get(url);
        // console.log(response);
        if (response.data && response.data.main && response.data.wind) {
            const temperature = response.data.main.temp;
            const windSpeed = response.data.wind.speed;
            const humidity = response.data.main.humidity;
            const weather = response.data.weather[0].main;

            addTemperature(temperature, cityName);
            addImage(weather);
            addHumidity(humidity);
            addWindSpeed(windSpeed);

            document.querySelector(".weather").style.display = 'block';
            document.querySelector(".error").style.display = 'none';

        } else {
            console.error("Invalid response format");
        }
    } catch (error) {
        document.querySelector(".weather").style.display = 'none';
        document.querySelector(".error").style.display = 'block';
    }
}

function addTemperature(temperature, cityName) {
    const h1 = document.querySelector(".temp");
    h1.innerText = temperature + '°C';

    const h2 = document.querySelector(".city");
    h2.innerText = cityName;
}

function addHumidity(humidity) {
    const text = document.querySelector(".col .humidity");
    text.innerText = humidity + '%';
}

function addWindSpeed(windSpeed) {
    const wind = document.querySelector(".col .wind");
    wind.innerText = windSpeed + ' km/h';
}

function addImage(weather) {
    const img = document.querySelector(".weather-icon");
    const weatherImages = {
        'Clear': "images/clear.png",
        'Rain': "images/rain.png",
        'Clouds': "images/clouds.png",
        'Fog': "images/mist.png",
        'Drizzle': "images/drizzle.png",
        'Mist': "images/mist.png"
    };

    img.src = weatherImages[weather];
}


const searchBar = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", findWeather);
