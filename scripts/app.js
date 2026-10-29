const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=15.3647&longitude=75.1240&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=Asia%2FKolkata&forecast_days=7";
const quotesUrl = "https://dummyjson.com/quotes"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const weatherIcons = {
    // 0: Clear sky
    0: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,

    // 1, 2, 3: Mainly clear, partly cloudy, overcast
    1: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    2: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    3: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,

    // 45, 48: Fog and depositing rime fog
    45: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M3 18h18"/><path d="M7 6h10"/></svg>`,
    48: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M3 18h18"/><path d="M7 6h10"/></svg>`,

    // 51, 53, 55, 56, 57: Drizzle (light, moderate, dense, freezing)
    51: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>`,
    53: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>`,
    55: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>`,
    56: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>`,
    57: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>`,

    // 61, 63, 65, 66, 67, 80, 81, 82: Rain & Rain Showers
    61: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    63: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    65: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    66: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    67: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    80: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    81: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    82: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,

    // 71, 73, 75, 77, 85, 86: Snow & Snow Showers
    71: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>`,
    73: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>`,
    75: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>`,

    // 95, 96, 99: Thunderstorm
    95: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`,
    96: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`,
    99: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`
};

let heroSubtext = document.querySelector('.hero-sub-text');

let heroTemp = document.querySelector('.hero-temp');
let tempValue = document.querySelector('#temp-value');
let feelsLikeValue = document.querySelector('#feels-like-value');
let humidityValue = document.querySelector('#humidity-value');
let windSpeedValue = document.querySelector('#wind-speed-value');
let windDirectionValue = document.querySelector('#wind-direction-value');
let pressureValue = document.querySelector('#pressure-value');
let visibilityValue = document.querySelector('#visibility-value');

let hourlyCard = document.querySelector('.hourly-forecast-card');

let dailyCard = document.querySelector('.daily-forecast-card');

fetch(weatherUrl)
    .then(response => response.json())
    .then(function (data) {

        // <------- HERO CARD CONTENT -------->

        heroSubtext.innerHTML = `Feels like ${data.current.apparent_temperature}°C . Humidity ${data.current.relative_humidity_2m}% . Wind ${data.current.wind_speed_10m} km/h`;
        heroTemp.innerHTML = `${data.current.temperature_2m}°C`;

        // <------- CURRENT CONDITIONS -------->

        tempValue.innerHTML = `${data.current.temperature_2m}°C`;
        feelsLikeValue.innerHTML = `${data.current.apparent_temperature}°C`;
        humidityValue.innerHTML = `${data.current.relative_humidity_2m}%`;
        windSpeedValue.innerHTML = `${data.current.wind_speed_10m} km/h`;
        windDirectionValue.innerHTML = `${data.current.wind_direction_10m}°`;
        pressureValue.innerHTML = `${data.current.pressure_msl} hPa`;
        visibilityValue.innerHTML = `${data.hourly.visibility[(Math.floor(Math.random() * 167))] / 1000} km`;

        // <------- HOURLY FORECAST UPDATION -------->

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
            let hourlyCode = data.hourly.weather_code[i];
            let hourlyIcon = weatherIcons[hourlyCode] || weatherIcons[0];

            hourlyHTML +=
            `
                <div class="hourly-data">
                    <p class="time">${stdtime}${ampm}</p>
                    ${hourlyIcon}
                    <p class="hourly-temp">${temp}°C</p>
                    <p class="hourly-wind-speed">${windSpeed} km/h</p>
                </div>
            `;
        }

        hourlyHTML += '</div>';
        hourlyCard.innerHTML = hourlyHTML;

        // <------- DAILY FORECAST UPDATION -------->

        let dailyHTML = '<div class = "daily-forecast-card-content">';
        for(i=0; i<7;i++)
        {
            let max = data.daily.temperature_2m_max[i];
            let min = data.daily.temperature_2m_min[i];
            let dateObj = new Date(data.daily.time[i]);
            let day = dateObj.toLocaleDateString('en-US', {weekday : 'short'});
            let date = data.daily.time[i].split('-')[2];
            let month = months[data.daily.time[i].split('-')[1] - 1];
            let weatherCode = data.daily.weather_code[i];
            let weatherIcon = weatherIcons[weatherCode] || weatherIcons[0];
            
            dailyHTML +=
            `
                <div class = "daily-data">
                    <p class = "day">${day}</p>
                    <p class = "date">${date} ${month}</p>
                    ${weatherIcon}
                    <p class = "min-max">${min}/${max}</p>
                </div>
            `
        }
        dailyHTML += '</div>';
        dailyCard.innerHTML = dailyHTML;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });

// <------- QUOTES UPDATION -------->

let quoteHeader = document.querySelector('.hero-header-extra');
fetch(quotesUrl)
    .then(response => response.json())
    .then(function (quote) {
        quoteHeader.innerHTML = `${quote.quotes[(Math.floor(Math.random() * 30))].quote}`
    })
    .catch(error => {
        console.error('No quote found', error);
    });


//fetch(weatherUrl).then(response => response.json()).then(data => console.log(data));
//fetch(quotesUrl).then(response => response.json()).then(data => console.log(data));