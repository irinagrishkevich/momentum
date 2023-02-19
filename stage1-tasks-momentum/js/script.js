const time = document.querySelector('time')
const dateNow = document.querySelector('date')
const greeting = document.querySelector('.greeting')
const body = document.querySelector('body')
let randomNumber = Math.floor(Math.random() * 20) + 1
let slideNext = document.querySelector('.slide-next')
let slidePrev = document.querySelector('.slide-prev')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const city = document.querySelector('.city')

getRandomNum()

function showTime() {
  showDate()
  showGreeting()
  const date = new Date()
  const currentTime = date.toLocaleTimeString()
  time.textContent = currentTime
  setTimeout(showTime, 1000)
}
showTime()

function showGreeting() {
  const date = new Date()
  const timeDay = date.getHours()
  const timesOfDay = ['night', 'morning', 'afternoon', 'evening']
  const timeOfDayNum = Math.floor(timeDay / 6)
  const timeOfDay = timesOfDay[timeOfDayNum]
  greeting.innerHTML = `Good ${timeOfDay}`
}
function showDate() {
  const date = new Date()
  const options = {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }
  const dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const dayName = dayOfWeek[date.getDay()]
  const currentDate = date.toLocaleDateString('en-RU', options)
  dateNow.textContent = dayName + ', ' + currentDate
}
const nameInput = document.querySelector('.name')

function setLocalStorage() {
  localStorage.setItem('name', nameInput.value)
}
window.addEventListener('beforeunload', setLocalStorage)
function getLocalStorage() {
  if (localStorage.getItem('name')) {
    nameInput.value = localStorage.getItem('name')
  }
}
window.addEventListener('load', getLocalStorage)
function getRandomNum() {
  if (randomNumber < 10) {
    randomNumber = '0' + randomNumber
  }
  setBg()
}

slidePrev.addEventListener('click', getSlidePrev)
function getSlideNext() {
  if (randomNumber !== 21) {
    if (randomNumber === 20) {
      randomNumber = 1
    } else {
      randomNumber++
    }
  }
  if (randomNumber < 10) {
    randomNumber = '0' + randomNumber
  }
  setBg()
}
slideNext.addEventListener('click', getSlideNext)
function getSlidePrev() {
  if (randomNumber !== 0) {
    if (randomNumber === '01') {
      randomNumber = 20
    } else {
      randomNumber--
    }
  }
  if (randomNumber < 10) {
    randomNumber = '0' + randomNumber
  }
  setBg()
}
function setBg() {
  const img = new Image()
  img.src =
    'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/' +
    randomNumber +
    '.jpg'
  img.onload = () => {
    body.style.backgroundImage =
      "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/" +
      randomNumber +
      ".jpg')"
  }
}
city.addEventListener('change', (event) => {
  const cityName = event.target.value
  console.log(cityName)
  getWeather()
  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=6bf57d68880f67c12d677aff0febd81a&units=metric`

    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json()
        } else {
          temperature.textContent =
            'Error! city not found for ' + cityName + '!'
          weatherDescription.textContent = ' '
        }
      })
      .then((res) => {
        weatherIcon.className = 'weather-icon owf'
        weatherIcon.classList.add(`owf-${res.weather[0].id}`)
        temperature.textContent = `${res.main.temp}°C`
        weatherDescription.textContent = res.weather[0].description
      })
  }
})
