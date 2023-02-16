const time = document.querySelector('time')
const dateNow = document.querySelector('date')
const greeting = document.querySelector('.greeting')

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
  const timesOfDay = ['night', 'morning', 'afternoon', 'evening']
  const timeOfDayNum = Math.floor(date.getHours() / 6)
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
