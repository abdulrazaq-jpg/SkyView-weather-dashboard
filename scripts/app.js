const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=15.3647&longitude=75.1240&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=Asia%2FKolkata&forecast_days=7";
const quotesUrl = "https://dummyjson.com/quotes"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const iconColors = {
    0: "#f59e0b",

    1: "#3b82f6",
    2: "#3b82f6",
    3: "#6b7280",

    45: "#9ca3af",
    48: "#9ca3af",

    51: "#60a5fa",
    53: "#60a5fa",
    55: "#60a5fa",
    56: "#60a5fa",
    57: "#60a5fa",

    61: "#2563eb",
    63: "#2563eb",
    65: "#2563eb",
    66: "#2563eb",
    67: "#2563eb",
    80: "#2563eb",
    81: "#2563eb",
    82: "#2563eb",

    71: "#93c5fd",
    73: "#93c5fd",
    75: "#93c5fd",
    77: "#93c5fd",
    85: "#93c5fd",
    86: "#93c5fd",

    95: "#eab308",
    96: "#eab308",
    99: "#eab308"
};

const iconPath = {
    // 0: Clear sky
    0: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`,

    // 1, 2, 3: Mainly clear, partly cloudy, overcast
    1: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
    2: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
    3: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,

    // 45, 48: Fog and depositing rime fog
    45: `<path d="M5 12h14"/><path d="M3 18h18"/><path d="M7 6h10"/>`,
    48: `<path d="M5 12h14"/><path d="M3 18h18"/><path d="M7 6h10"/>`,

    // 51, 53, 55, 56, 57: Drizzle
    51: `<path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/>`,
    53: `<path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/>`,
    55: `<path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/>`,
    56: `<path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/>`,
    57: `<path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/>`,

    // 61, 63, 65, 66, 67, 80, 81, 82: Rain and rain showers
    61: `<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>`,
    63: `<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>`,
    65: `<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>`,
    66: `<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>`,
    67: `<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>`,
    80: `<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>`,
    81: `<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>`,
    82: `<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>`,

    // 71, 73, 75, 77, 85, 86: Snow and snow showers
    71: `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/>`,
    73: `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/>`,
    75: `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/>`,
    77: `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/>`,
    85: `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/>`,
    86: `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/>`,

    // 95, 96, 99: Thunderstorm
    95: `<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/>`,
    96: `<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/>`,
    99: `<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/>`
};

const weatherIcons = {
    // 0: Clear sky
    0: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[0]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,

    // 1, 2, 3: Mainly clear, partly cloudy, overcast
    1: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[1]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    2: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[2]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    3: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[3]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,

    // 45, 48: Fog and depositing rime fog
    45: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[45]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M3 18h18"/><path d="M7 6h10"/></svg>`,
    48: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[48]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M3 18h18"/><path d="M7 6h10"/></svg>`,

    // 51, 53, 55, 56, 57: Drizzle
    51: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[51]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>`,
    53: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[53]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>`,
    55: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[55]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>`,
    56: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[56]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>`,
    57: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[57]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>`,

    // 61, 63, 65, 66, 67, 80, 81, 82: Rain and rain showers
    61: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[61]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    63: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[63]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    65: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[65]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    66: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[66]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    67: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[67]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    80: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[80]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    81: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[81]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,
    82: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[82]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`,

    // 71, 73, 75, 77, 85, 86: Snow and snow showers
    71: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[71]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>`,
    73: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[73]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>`,
    75: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[75]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>`,
    77: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[77]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>`,
    85: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[85]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>`,
    86: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[86]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>`,

    // 95, 96, 99: Thunderstorm
    95: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[95]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`,
    96: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[96]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`,
    99: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="${iconColors[99]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`
};

let heroSubtext = document.querySelector('.hero-sub-text');
let heromaindisplay = document.querySelector('.hero-main-display');
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
        let time = new Date().getHours();
        let timeNum = 0;
        if(time === '00'){
            timeNum = 0;
        }
        else{
            timeNum = Number(time);
        }
        heromaindisplay.innerHTML = 
        `
            <div id = "main-icon">
                <svg class="icon" id="main-icon" viewBox="0 0 24 24" fill="none"
                        stroke="${iconColors[data.hourly.weather_code[timeNum]]}"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${iconPath[data.hourly.weather_code[timeNum]]}
                </svg>
            </div>
            <p class="hero-temp">${data.current.temperature_2m}°C</p>
        `

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