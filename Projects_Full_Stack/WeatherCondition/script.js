const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your actual API key

        document.getElementById('search-btn').addEventListener('click', searchWeather);
        document.getElementById('city-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchWeather();
        });

        function searchWeather() {
            const cityInput = document.getElementById('city-input');
            const weatherResult = document.getElementById('weather-result');
            const city = cityInput.value.trim();

            if (!city) {
                weatherResult.innerHTML = '<p class="error">Please enter a city name</p>';
                return;
            }

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('City not found');
                    }
                    return response.json();
                })
                .then(data => {
                    const temperature = Math.round(data.main.temp);
                    const description = data.weather[0].description;
                    const icon = data.weather[0].icon;

                    weatherResult.innerHTML = `
                        <div class="weather-card">
                            <h2>${data.name}, ${data.sys.country}</h2>
                            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
                            <h3>${temperature}°C</h3>
                            <p>${description}</p>
                            <p>Humidity: ${data.main.humidity}%</p>
                            <p>Wind Speed: ${data.wind.speed} m/s</p>
                        </div>
                    `;
                })
                .catch(error => {
                    weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
                });
        }