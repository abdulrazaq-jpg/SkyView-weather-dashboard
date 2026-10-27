const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=15.3647&longitude=75.1240&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=Asia%2FKolkata&forecast_days=7";
const quotesUrl = "https://dummyjson.com/quotes"

let heroTemp = document.querySelector('.hero-temp');
let tempValue = document.querySelector('#temp-value');
let feelsLikeValue = document.querySelector('#feels-like-value');
let humidityValue = document.querySelector('#humidity-value');
let windSpeedValue = document.querySelector('#wind-speed-value');
let windDirectionValue = document.querySelector('#wind-direction-value');
let pressureValue = document.querySelector('#pressure-value');
let visibilityValue = document.querySelector('#visibility-value');

let hourlyCard = document.querySelector('.hourly-forecast-card');

fetch(weatherUrl)
    .then(response => response.json())
    .then(function (data) {
        heroTemp.innerHTML = `${data.current.temperature_2m}°C`;

        tempValue.innerHTML = `${data.current.temperature_2m}°C`;
        feelsLikeValue.innerHTML = `${data.current.apparent_temperature}°C`;
        humidityValue.innerHTML = `${data.current.relative_humidity_2m}%`;
        windSpeedValue.innerHTML = `${data.current.wind_speed_10m} km/h`;
        windDirectionValue.innerHTML = `${data.current.wind_direction_10m}°`;
        pressureValue.innerHTML = `${data.current.pressure_msl} hPa`;
        visibilityValue.innerHTML = `${data.hourly.visibility[(Math.floor(Math.random() * 167))] / 1000} km`;

        let hourlyHTML = '<div class="hourly-forecast-card-content">';

        for (let i = 0; i < 24; i++) {
            let temp = data.hourly.temperature_2m[i];
            let windSpeed = data.hourly.wind_speed_10m[i];

            let rawTime = data.hourly.time[i];
            let hourlyTime = rawTime.split('T')[1];
            let timestr = hourlyTime.split(':')[0];
            let timenum = Number(timestr);
            let ampm = (timenum >= 12) ? 'PM' : 'AM';
            let stdtime = timenum % 12 || 12;

            hourlyHTML +=
            `
                <div class="hourly-data">
                    <p class="time">${stdtime} ${ampm}</p>
                    <img src="assets/logo.jpg" alt="Weather Icon" width="30" height="30">
                    <p class="hourly-temp">${temp}°C</p>
                    <p class="hourly-wind-speed">${windSpeed} km/h</p>
                </div>
            `;
        }

        hourlyHTML += '</div>';
        hourlyCard.innerHTML = hourlyHTML;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });


let quoteHeader = document.querySelector('.hero-header-extra');
fetch(quotesUrl)
    .then(response => response.json())
    .then(function (quote) {
        quoteHeader.innerHTML = `${quote.quotes[(Math.floor(Math.random() * 30))].quote}`
    })
    .catch(error => {
        console.error('No quote found', error);
    });


// fetch(weatherUrl).then(response => response.json()).then(data => console.log(data));
//fetch(quotesUrl).then(response => response.json()).then(data => console.log(data));