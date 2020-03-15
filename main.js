

const sunShower = `
	<div class="icon sun-shower">
	  <div class="cloud"></div>
	  <div class="sun">
    	<div class="rays"></div>
  	  </div>
  	  <div class="rain"></div>
  	</div>
	`
const thunderStorm = `
	<div class="icon thunder-storm">
	  <div class="cloud"></div>
	  <div class="lightning">
	    <div class="bolt"></div>
	    <div class="bolt"></div>
	  </div>
	</div>
	`
const cloudy = `
	<div class="icon cloudy">
	  <div class="cloud"></div>
	  <div class="cloud"></div>
	</div>
	`
const flurries = `
	<div class="icon flurries">
	  <div class="cloud"></div>
	  <div class="snow">
	    <div class="flake"></div>
	    <div class="flake"></div>
	  </div>
	</div>
	`
const sunny = `
	<div class="icon sunny">
	  <div class="sun">
	    <div class="rays"></div>
	  </div>
	</div>
	`
const rainy = `
	<div class="icon rainy">
	  <div class="cloud"></div>
	  <div class="rain"></div>
	</div>
	`
const wrapper = document.querySelector('.wrapper');
const weatherContainer = document.querySelector('.weather-container');
const submitButton = document.querySelector('.submit');
const key = "f535debb98ce44971795e7d37e1f37e2";
const input = document.querySelector('input[type=text]');

function getWeather(e) {
	e.preventDefault();
	const city = input.value || "hongkong";
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
  	  .then(resp => resp.json())
  	  .then(data => display(data));
 	input.value = ""; 	  
}

function handleIcon(weather) {
	if(weather.includes('sun') || weather.includes('clear')) {
		return sunny;
	} else if(weather.includes('shower')) {
		return sunShower;
	} else if(weather.includes('rain')) {
		return rainy;
	} else if(weather.includes('thunder')) {
		return thunderStorm;
	} else if(weather.includes('flurries')) {
		return flurries;
	} else {
		return cloudy;
	}
}

function getDate() {
	const months = [
		"January", "February", "March", 
		"April", "May", "June", 
		"July", "August", "September", 
		"October", "November", "December"
	];
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	const monthSelected = months.slice(month);
	const dateFormatted = `${day} ${monthSelected[0]} ${year}`;
	return dateFormatted;
}

function backgroundImage(weather) {
	let image;
	if(weather.includes('sun') || weather.includes('clear')) {
		image = "sunny.jpg";
	} else if(weather.includes('shower')) {
		image = "shower.jpg";
	} else if(weather.includes('rain')) {
		image = "rainy.jpg";
	} else if(weather.includes('thunder')) {
		image = "rainy.jpg";
	} else if(weather.includes('flurries')) {
		image = "rainy.jpg";
	} else {
		image = "cloudy.jpg";
	};
	wrapper.style.backgroundImage = `url(${image})`;
}

function display(info) {
	const { weather, main, wind, name } = info;
	const description = weather[0].description;
	backgroundImage(description);
  	weatherContainer.innerHTML = `
	  	<div class="name">${name}</div>
		<div class="date">${getDate()}</div>
		<div class="description">${handleIcon(description)}</div>
		<div class="temp">
			<div class="main-temp">${main.temp.toFixed(1)}°C</div>							
			<div>
				<h3 class="max">${main.temp_max.toFixed(1)}°C</h3>				
				<div class="separator"></div>
				<h3 class="min">${main.temp_min.toFixed(1)}°C</h3>				
			</div>
		</div>
		<div class="secondary-data">
			<div class="feels-like">
				<div class="sm-icon"><i class="far fa-user"></i></div>
				<div>${main.feels_like.toFixed(1)}°C</div>
			</div>	
			<div class="humidity">
				<div class="sm-icon"><i class="fas fa-tint"></i></div>
				<div>${main.humidity}</div>
			</div>
			<div class="wind">
				<div class="sm-icon"><i class="fas fa-wind"></i></div>
				<div>${wind.speed}</div>
			</div>			
		</div>		
	  	`
}

submitButton.addEventListener('submit', getWeather);

window.onload = function() {
	const city = "hongkong";
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
  	  .then(resp => resp.json())
  	  .then(data => display(data));	
}


