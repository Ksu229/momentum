const body = document.querySelector('body');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const audio = new Audio(); 
const playpauseBtn = document.getElementById('play-button');
const plPrev = document.querySelector('.play-prev');
const plNext = document.querySelector('.play-next');
const li = document.createElement('li');
const li1 = document.createElement('li');
const li2 = document.createElement('li');
const li3 = document.createElement('li');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const ul = document.querySelector('.play-list');
// let randomNum;
let isPlay = false;

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

let randomNum = getRandomNum(1, 20);
function setBg() {
    let timeOfDay = getTimeOfDay();
    let bgNum = String(randomNum).padStart(2, '0');
    let resUrl = `https://raw.githubusercontent.com/Ksu229/stage_1_tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    const img = new Image();
    img.src = resUrl;
    img.onload = () => {
        return body.style.backgroundImage = `url(${resUrl})`;
    }
}

setBg();

function getslideNext() {
    if (randomNum >= 20) {
        randomNum = 1;
    } else {
        randomNum++;
    }
    setBg();
}

slideNext.addEventListener('click', (event) => {
    getslideNext()
})

function getslidePrev() {
    if (randomNum === 1) {
        randomNum = 20;
    } else {
        randomNum--;
    }
    setBg();
}

slidePrev.addEventListener('click', (event) => {
    getslidePrev()
})

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

import playList from './playList.js';
console.log(playList);

let playNum = 0;
function playAudio() {
    if (isPlay === false) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    } else {
    audio.pause();
    isPlay = false;
    }
}

playpauseBtn.addEventListener('click', (event) => {
playAudio();
})

function toggleBtn () {
    playpauseBtn.classList.toggle('pause');
}
playpauseBtn.addEventListener('click', toggleBtn);

function playNext() {
    playpauseBtn.classList.remove('pause');
    if (playNum >= 3) {
        playNum = 0;
    } else {
        playNum++;
    }
    playAudio()
}
plNext.addEventListener('click', (event) => {
    playNext()
})

function playPrev() {
    playpauseBtn.classList.remove('pause');
    if (playNum === 0) {
        playNum = 3;
    } else {
        playNum--;
    }
    playAudio()
}
plPrev.addEventListener('click', (event) => {
    playPrev()
})

// playList.forEach((index) => {
//     console.log(playList);
//     li.classList.add('play-item');
//     li.textContent = playList.title;
//     ul.append(li)
// // });

// for (let i = 0; i < playList.length; i++) {
//     li.classList.add('play-item');
//     li.textContent = playList[i].title;
//     ul.append(li);
// }

li.classList.add('play-item');
li.textContent = playList[0].title;
ul.append(li);
li1.classList.add('play-item');
li1.textContent = playList[1].title;
ul.append(li1);
li2.classList.add('play-item');
li2.textContent = playList[2].title;
ul.append(li2);
li3.classList.add('play-item');
li3.textContent = playList[3].title;
ul.append(li3);

