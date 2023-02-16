const time = document.querySelector('time')
const dateNow = document.querySelector('date')

function showTime() {
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
  showDate()
  const date = new Date()
  const currentTime = date.toLocaleTimeString()
  time.textContent = currentTime
  setTimeout(showTime, 1000)
}
showTime()
