// Constants & State
const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

let state = {
    lat: 52.52,
    lon: 13.41,
    city: 'Berlin',
    country: 'Germany',
    units: 'metric',
    charts: {
        temp: null,
        condition: null
    }
};

// UI Elements
const elements = {
    citySearch: document.getElementById('citySearch'),
    searchResults: document.getElementById('searchResults'),
    locationName: document.getElementById('locationName'),
    locationCountry: document.getElementById('locationCountry'),
    currentTemp: document.getElementById('currentTemp'),
    weatherCondition: document.getElementById('weatherCondition'),
    tempRange: document.getElementById('tempRange'),
    windSpeed: document.getElementById('windSpeed'),
    humidity: document.getElementById('humidity'),
    precipProb: document.getElementById('precipProb'),
    uvIndex: document.getElementById('uvIndex'),
    mainWeatherIcon: document.getElementById('mainWeatherIcon'),
    forecastContainer: document.getElementById('forecastContainer'),
    currentDate: document.getElementById('currentDate'),
    loader: document.getElementById('loader')
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupEventListeners();
});

async function init() {
    // Load last city from storage or default
    const saved = localStorage.getItem('skyinsight_location');
    if (saved) {
        state = { ...state, ...JSON.parse(saved) };
    }
    
    updateDate();
    await fetchWeatherData();
}

function setupEventListeners() {
    // Unit Toggle
    const unitSpans = document.querySelectorAll('.unit-toggle span');
    unitSpans.forEach(span => {
        span.addEventListener('click', () => {
            if (span.classList.contains('active')) return;
            
            unitSpans.forEach(s => s.classList.remove('active'));
            span.classList.add('active');
            
            state.units = span.textContent.includes('C') ? 'metric' : 'imperial';
            localStorage.setItem('skyinsight_units', state.units);
            fetchWeatherData();
        });
    });

    // Load saved unit
    const savedUnit = localStorage.getItem('skyinsight_units');
    if (savedUnit) {
        state.units = savedUnit;
        unitSpans.forEach(span => {
            const isMetric = span.textContent.includes('C');
            if ((isMetric && savedUnit === 'metric') || (!isMetric && savedUnit === 'imperial')) {
                span.classList.add('active');
            } else {
                span.classList.remove('active');
            }
        });
    }

    // Search Input
    let debounceTimer;
    elements.citySearch.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();
        if (query.length < 2) {
            elements.searchResults.classList.add('hidden');
            return;
        }
        debounceTimer = setTimeout(() => searchCities(query), 300);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            elements.searchResults.classList.add('hidden');
        }
    });
}

// --- API Calls ---

async function searchCities(query) {
    try {
        const response = await fetch(`${GEO_API_URL}?name=${query}&count=5&language=en&format=json`);
        const data = await response.json();
        
        if (data.results) {
            renderSearchResults(data.results);
        } else {
            elements.searchResults.classList.add('hidden');
        }
    } catch (error) {
        console.error('Search error:', error);
    }
}

async function fetchWeatherData() {
    showLoader(true);
    try {
        const u = state.units === 'metric' ? '' : '&temperature_unit=fahrenheit&wind_speed_unit=mph';
        const url = `${API_BASE_URL}?latitude=${state.lat}&longitude=${state.lon}&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation_probability${u}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`;
        const response = await fetch(url);
        const data = await response.json();
        
        updateUI(data);
        renderCharts(data);
        renderForecast(data.daily);
        
        // Save to local storage
        localStorage.setItem('skyinsight_location', JSON.stringify({
            lat: state.lat,
            lon: state.lon,
            city: state.city,
            country: state.country
        }));

    } catch (error) {
        console.error('Weather error:', error);
        alert('Failed to fetch weather data. Please try again.');
    } finally {
        showLoader(false);
    }
}

// --- UI Updates ---

function updateUI(data) {
    const current = {
        temp: Math.round(data.hourly.temperature_2m[0]),
        code: data.hourly.weather_code[0],
        humidity: data.hourly.relative_humidity_2m[0],
        wind: data.hourly.wind_speed_10m[0],
        precip: data.hourly.precipitation_probability[0],
        uv: data.daily.uv_index_max[0],
        high: Math.round(data.daily.temperature_2m_max[0]),
        low: Math.round(data.daily.temperature_2m_min[0])
    };

    const unitLabel = state.units === 'metric' ? 'km/h' : 'mph';
    elements.locationName.textContent = state.city;
    elements.locationCountry.textContent = state.country;
    elements.currentTemp.textContent = current.temp;
    elements.humidity.textContent = `${current.humidity}%`;
    elements.windSpeed.textContent = `${current.wind} ${unitLabel}`;
    elements.precipProb.textContent = `${current.precip}%`;
    elements.uvIndex.textContent = current.uv;
    elements.tempRange.textContent = `H: ${current.high}° L: ${current.low}°`;
    
    const condition = getWeatherCondition(current.code);
    elements.weatherCondition.textContent = condition.label;
    
    // Update main icon
    elements.mainWeatherIcon.setAttribute('data-lucide', condition.icon);
    lucide.createIcons();
}

function renderSearchResults(results) {
    elements.searchResults.innerHTML = '';
    results.forEach(city => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerHTML = `
            <span class="city-name">${city.name}</span>
            <span class="country-name">${city.admin1 ? city.admin1 + ', ' : ''}${city.country}</span>
        `;
        div.onclick = () => {
            state.lat = city.latitude;
            state.lon = city.longitude;
            state.city = city.name;
            state.country = city.country;
            elements.citySearch.value = city.name;
            elements.searchResults.classList.add('hidden');
            fetchWeatherData();
        };
        elements.searchResults.appendChild(div);
    });
    elements.searchResults.classList.remove('hidden');
}

function renderForecast(daily) {
    elements.forecastContainer.innerHTML = '';
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(daily.time[i]);
        const dayName = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
        const condition = getWeatherCondition(daily.weather_code[i]);
        
        const item = document.createElement('div');
        item.className = 'forecast-item';
        item.innerHTML = `
            <span class="day">${dayName}</span>
            <i data-lucide="${condition.icon}"></i>
            <div class="temp-range">
                <span class="max">${Math.round(daily.temperature_2m_max[i])}°</span>
                <span class="min">${Math.round(daily.temperature_2m_min[i])}°</span>
            </div>
        `;
        elements.forecastContainer.appendChild(item);
    }
    lucide.createIcons();
}

// --- Charts Logic ---

function renderCharts(data) {
    const hourlyLabels = data.hourly.time.slice(0, 24).map(t => new Date(t).getHours() + ':00');
    const temps = data.hourly.temperature_2m.slice(0, 24);
    
    // Temp Chart
    if (state.charts.temp) state.charts.temp.destroy();
    
    const ctx = document.getElementById('tempChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

    state.charts.temp = new Chart(ctx, {
        type: 'line',
        data: {
            labels: hourlyLabels,
            datasets: [{
                label: 'Temperature',
                data: temps,
                borderColor: '#38bdf8',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                backgroundColor: gradient,
                pointBackgroundColor: '#38bdf8',
                pointRadius: 0,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1e293b',
                    titleColor: '#94a3b8',
                    bodyColor: '#f8fafc',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        label: (context) => `${context.parsed.y}°C`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b', maxTicksLimit: 8 }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#64748b', callback: value => value + '°' }
                }
            }
        }
    });

    // Condition Distribution Chart
    if (state.charts.condition) state.charts.condition.destroy();
    const cCtx = document.getElementById('conditionChart').getContext('2d');
    
    // Count occurrences of conditions in next 24h
    const conditions = data.hourly.weather_code.slice(0, 24);
    const summary = conditions.reduce((acc, code) => {
        const label = getWeatherCondition(code).label;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});

    state.charts.condition = new Chart(cCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(summary),
            datasets: [{
                data: Object.values(summary),
                backgroundColor: [
                    '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#94a3b8', boxWidth: 10, padding: 15, font: { size: 10 } }
                }
            }
        }
    });
}

// --- Helpers ---

function getWeatherCondition(code) {
    if (code === 0) return { label: 'Clear Sky', icon: 'sun' };
    if (code >= 1 && code <= 3) return { label: 'Partly Cloudy', icon: 'cloud-sun' };
    if (code === 45 || code === 48) return { label: 'Foggy', icon: 'cloud-fog' };
    if (code >= 51 && code <= 55) return { label: 'Drizzle', icon: 'cloud-drizzle' };
    if (code >= 61 && code <= 65) return { label: 'Rainy', icon: 'cloud-rain' };
    if (code >= 71 && code <= 77) return { label: 'Snowy', icon: 'cloud-snow' };
    if (code >= 80 && code <= 82) return { label: 'Showers', icon: 'cloud-rain-wind' };
    if (code >= 95) return { label: 'Thunderstorm', icon: 'cloud-lightning' };
    return { label: 'Unknown', icon: 'help-circle' };
}

function updateDate() {
    const now = new Date();
    elements.currentDate.textContent = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
    });
}

function showLoader(show) {
    if (show) {
        elements.loader.classList.remove('hidden');
        elements.loader.style.opacity = '1';
    } else {
        elements.loader.style.opacity = '0';
        setTimeout(() => elements.loader.classList.add('hidden'), 500);
    }
}
