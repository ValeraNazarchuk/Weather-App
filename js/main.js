'use strict'

const contentWeekday = document.querySelector('.content__top-weekday')
const contentdateValue = document.querySelector('.content__top-text')
const contentCity = document.querySelector('.content__top-city')

const contentImages = document.querySelector('.content__bottom-img')
const contentTemp = document.querySelector('.content__bottom-temp')
const contentWeather = document.querySelector('.content__bottom-weather')
//-------
const form = document.querySelector('.form')
const formInput = document.querySelector('.form__input')
const formBtn = document.querySelector('.form__button')

const precip = document.querySelector('.info-item-precip')
const humidity = document.querySelector('.info-item-humidity')
const wind = document.querySelector('.info-item-wind')

const infoItem = document.querySelectorAll('.info__box-item')
const infoImages = document.querySelectorAll('.info__box-img')
const infoWeekday = document.querySelectorAll('.info__box-weekday')
const infoTemp = document.querySelectorAll('.info__box-temp')

// event load
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader')
  const container = document.querySelector('.container')
  setTimeout(() => {
    loader.style.display = 'none'
    container.style.display = 'flex'
  },1000)
})

// server request
const getWeatherData = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=77f461e07d8696ecbe2d0479346b20c9`
    const responce = await fetch(url)
    return await responce.json()
  } catch (err) {
    console.error(err)
  }
}

// function to get the date
function date(dateValue) {
  const result = []
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }

  for (let i = 0; i <= dateValue.length / 2; i += 8) {
    const value = new Date(
      dateValue[i].dt_txt
        .slice(0, 10)
        .split('-')
        .map((el) => +el)
    )

    result.push(
      value.toLocaleString('en-US', options).replace(/,/g, '').split(' ')
    )
  }
  return result
}

// I calculate the value
function weatherData(values) {
  const data = []
  const tepm = []
  const weatherDescrp = []
  const img = []

  for (let i = 0; i <= values.length / 2; i += 8) {
    data.push([
      Math.floor(values[i].clouds.all),
      Math.floor(values[i].main.humidity),
      Math.floor(values[i].wind.speed),
    ])
    tepm.push(Math.round(values[i].main.temp))
    weatherDescrp.push(values[i].weather[0].main)
    img.push(values[i].weather[0].icon)
  }
  return [data, tepm, weatherDescrp, img]
}

// Default values
const app = async ({ city = 'Kiev', index = 0 } = {}) => {
  const weather = await getWeatherData(city)

  // error checking
  if (weather.message) {
    console.log(weather.message)
    formInput.setAttribute('placeholder', `${weather.message}`)
    return
  } else {
    formInput.setAttribute('placeholder', 'Search..')
  }

  // get value
  const cityName = weather.city.name + ', ' + weather.city.country
  const day = date(weather.list)
  const dataWeather = weatherData(weather.list)[0]
  const temp = weatherData(weather.list)[1]
  const weatherDescrp = weatherData(weather.list)[2]
  const img = weatherData(weather.list)[3]

  contentWeekday.textContent = day[index][0]
  contentdateValue.textContent = `${day[index][2]} ${day[index][1]} ${day[index][3]}`
  contentCity.textContent = cityName

  contentImages.src = `https://api.openweathermap.org/img/w/${img[index]}.png`
  contentTemp.textContent = temp[index] + '°C'
  contentWeather.textContent = weatherDescrp[index]

  precip.textContent = dataWeather[index][0] + '%'
  humidity.textContent = dataWeather[index][1] + '%'
  wind.textContent = dataWeather[index][2] + ' m/sec'

  for (let i = 0; i < infoTemp.length; i++) {
    infoImages[i].src = `https://api.openweathermap.org/img/w/${img[i]}.png`
    infoWeekday[i].textContent = day[i][0].slice(0, 3)
    infoTemp[i].textContent = temp[i] + ' °C'
  }
}

app()

// sending the name of the city
form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!formInput.value) return

  app({ city: formInput.value })

  formInput.value = ''
  formInput.focus()
})

// element click event
infoItem.forEach((item, index) => {
  item.addEventListener('click', () => {
    const elem = contentCity.textContent
    const indexElem = elem.indexOf(',')
    app({ city: elem.slice(0, indexElem), index: index})
  })
})

// replaced background-images
const content = document.querySelector('.content')
function replacedBackground(){
  let num = 2
  setInterval(() => {
    content.style.backgroundImage = `url(../images/bg-images${num}.jpg)`
    if (num > 4) {
      num = 1
    } else {
      num++
    }
},8000)}

replacedBackground()