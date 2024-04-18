document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    fetchWeather();
});

function fetchWeather() {
    const apiKey = "dfd8d25efbe73ee107c0e29be146190a";
    const locationType = document.querySelector('input[name="locationType"]:checked').value;
    const locationInput = document.getElementById('locationInput').value.trim();

    if (!locationInput) {
        alert('Please enter a valid location.');
        return;
    }

    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric`;

    switch(locationType) {
        case 'city':
            apiUrl += `&q=${locationInput}`;
            break;
        case 'zip':
            apiUrl += `&zip=${locationInput}`;
            break;
        case 'coordinates':
            const coords = locationInput.split(',');
            if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
                alert('Please enter valid coordinates (lat,lon).');
                return;
            }
            apiUrl += `&lat=${coords[0].trim()}&lon=${coords[1].trim()}`;
            break;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch weather data. Please check the location and try again.');
            return response.json();
        })
        .then(data => processData(data))
        .catch(error => document.getElementById('weatherResults').innerHTML = `<p>${error.message}</p>`);
}

function processData(data) {
    const weatherResultsDiv = document.getElementById('weatherResults');
    weatherResultsDiv.innerHTML = '';

    const dailyData = {};

    data.list.forEach(item => {
        const date = new Date(item.dt_txt).toISOString().split('T')[0];
        if (!dailyData[date]) {
            dailyData[date] = { temps: [], pressures: [], clouds: [] };
        }
        dailyData[date].temps.push(item.main.temp_max);
        dailyData[date].pressures.push(item.main.pressure);
        dailyData[date].clouds.push(item.clouds.all);
    });

    Object.keys(dailyData).slice(1, 4).forEach(date => { // Skipping today's data and limiting to the next 3 days
        const data = dailyData[date];
        const maxTemp = Math.max(...data.temps);
        const avgPressure = data.pressures.reduce((acc, curr) => acc + curr, 0) / data.pressures.length;
        const avgClouds = data.clouds.reduce((acc, curr) => acc + curr, 0) / data.clouds.length;
        weatherResultsDiv.innerHTML += `
            <p>Date: ${new Date(date).toLocaleDateString()}</p>
            <p>Max Temp: ${maxTemp.toFixed(2)} °C</p>
            <p>Avg Pressure: ${avgPressure.toFixed(1)} hPa</p>
            <p>Avg Cloudiness: ${avgClouds.toFixed(1)}%</p>
            <hr>
        `;
    });
}
