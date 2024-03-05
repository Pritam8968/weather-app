import { API_KEY } from './api.js';

const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;
const elements = {
	searchBox: document.querySelector('.search input'),
	searchButton: document.querySelector('.search button'),
	weatherImage: document.querySelector('.weather-icon'),
	temperatureField: document.querySelector('.temp'),
	cityField: document.querySelector('.city'),
	humidityField: document.querySelector('.humidity'),
	windSpeedField: document.querySelector('.wind'),
	errorMessage: document.querySelector('.error'),
	weather: document.querySelector('.weather'),
};

const checkWeather = async function (city) {
	try {
		const response = await fetch(`${API_URL}&q=${city}`);
		if (response.status === 404) {
			elements.errorMessage.classList.add('show');
			return;
		}
		if (!response.ok) throw new Error(`City not found! ${response.status}`);
		const data = await response.json();
		console.log(data);
		displayWeather(data);
	} catch (error) {
		console.error(error);
	}
};

const displayWeather = function (data) {
	elements.weather.classList.add('show');
	elements.temperatureField.textContent = data.main.temp.toFixed(2) + '°C';
	elements.cityField.textContent = data.name;
	elements.humidityField.textContent = data.main.humidity + '%';
	elements.windSpeedField.textContent = data.wind.speed.toFixed(2) + ' km/h';
	const weather = data.weather[0].main.toLowerCase();
	elements.weatherImage.src = `./images/${weather}.png`;
};

elements.searchButton.addEventListener('click', function (e) {
	e.preventDefault();
	const city = elements.searchBox.value.trim();
	elements.errorMessage.classList.remove('show');
	if (city) {
		checkWeather(city);
		elements.searchBox.value = '';
	}
});
