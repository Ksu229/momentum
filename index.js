const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

function showDate () {
    const date1 = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date1.toLocaleDateString('en-US', options);
    date.textContent = currentDate;
};

const date2 = new Date();
const hours = date2.getHours();
const timeOfDay = getTimeOfDay();

function getTimeOfDay() {
    if (hours >= 6 && hours < 12) {
        return 'morning';
    } if (hours >= 12 && hours < 18) {
        return 'afternoon'; 
    } if (hours >= 18 && hours < 24) {
        return 'evening';
    } else return 'night';
    };

function showGreeting() {
    const greetingText = `Good ${timeOfDay},`;
    greeting.textContent = greetingText;
}

function showTime () {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
    time.textContent = currentTime;
    showDate();
    showGreeting();
};
showTime();

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    };
    if(localStorage.getItem('name')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage)

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//body.style.backgroundImage = "url('https://github.com/Ksu229/img_for_momentum/blob/assets/images/afternoon/03.jpg')";

function setBg() {
    const randomNum = getRandomNum(1, 20);
    bgNum = String(randomNum).padStart(2, '0');
    console.log(bgNum);
    const img = new Image();
    const url = `https://github.com/Ksu229/img_for_momentum/blob/assets/images/${timeOfDay}/${bgNum}.jpg`;
    console.log(url);
    img.src = url;
    img.onload = () => {
        return body.style.backgroundImage = `url(${url})`;
    }
    //body.style.backgroundImage = `https://github.com/Ksu229/img_for_momentum/blob/assets/images/${timeOfDay}/${bgNum}.jpg`;
}
setBg();

city.addEventListener('change', (event) => {
    getWeather(city.value);
   }
   )

async function getWeather(cityInput = "Минск") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&lang=ru&appid=0028896104cc795b61b8a627a71d135d&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${Math.round(data.wind.speed)} м/с`;
    humidity.textContent = `${data.main.humidity}%`;
    city.value = data.name;
};
getWeather();

async function getQuotes() {
    const quotes = 'assets/json/data.json';
    const res = await fetch(quotes);
    const data = await res.json();

    const randomNumQ = getRandomNum(0, 7);

    quote.textContent = `"${data[randomNumQ].text}"`;
    author.textContent = `${data[randomNumQ].author}`;
}
getQuotes();

changeQuote.addEventListener('click', (event) => {
getQuotes()
})