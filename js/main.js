'use strict'

const contentWeekday = document.querySelector('.content__top-weekday')
const contentDate = document.querySelector('.content__top-text')
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

const infoImages = document.querySelectorAll('.info__box-img')
const infoWeekday = document.querySelectorAll('.info__box-weekday')
const infoTemp = document.querySelectorAll('.info__box-temp')

// const url =
// 'https://api.weatherapi.com/v1/current.json?key=e9a5d3b74bf84418b11193028231901&q=London'

// const imgSrc = `https://api.openweathermap.org/img/w/${value}.png`

// `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=77f461e07d8696ecbe2d0479346b20c9`

const getWeatherData = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=77f461e07d8696ecbe2d0479346b20c9`
    const responce = await fetch(url)
    return await responce.json()
  } catch (err) {
    console.error(err)
  }
}

function date(date) {
  const result = []
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }

  for (let i = 0; i <= date.length - 24; i += 8) {
    const value = new Date(
      date[i].dt_txt
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

function cityCountry(city) {
  const result = []
  for (let i = 0; i < 3; i++) {
    result.push(city.name + ', ' + city.country)
  }
  return result
}
//-----

function data(value) {
  const result = []
  for (let i = 0; i <= value.length - 24; i += 8) {
    // result.push(value[i].clouds.all)
    // result.push(value[i].main.humidity)
    // result.push(value[i].wind.speed)
    // console.log(value[i].weather[0].main)
    result.push([
      Math.floor(value[i].clouds.all),
      Math.floor(value[i].main.humidity),
      Math.floor(value[i].wind.speed),
    ])
  }
  return result
}

function tempWeather(values) {
  const result = []
  for (let i = 0; i <= values.length - 24; i += 8) {
    result.push([Math.round(values[i].main.temp), values[i].weather[0].main])
  }
  return result
}

function images(img) {
  const result = []
  for (let i = 0; i <= img.length - 24; i += 8) {
    result.push(img[i].weather[0].icon)
  }
  return result
}

// Default values
const app = async (city = 'Kiev') => {
  const weather = await getWeatherData(city)

  const cityName = cityCountry(weather.city)
  const temp_Weather = tempWeather(weather.list)
  const img = images(weather.list)
  const day = date(weather.list)
  const dataWeather = data(weather.list)

  contentWeekday.textContent = day[0][0]
  contentDate.textContent = `${day[0][2]} ${(day[0][1])} ${day[0][3]}`
  contentCity.textContent = cityName[0]

  contentImages.src = `https://api.openweathermap.org/img/w/${img[0]}.png`
  contentTemp.textContent = temp_Weather[0][0] + '°C'
  contentWeather.textContent = temp_Weather[0][1]

  precip.textContent = dataWeather[0][0] + '%'
  humidity.textContent = dataWeather[0][1] + '%'
  wind.textContent = dataWeather[0][2] + ' m/sec'

  for (let i = 0; i < infoTemp.length; i++) {
    infoTemp[i].textContent = temp_Weather[i][0] + ' °C'
    infoImages[i].src = `https://api.openweathermap.org/img/w/${img[i]}.png`
    infoImages[i].style.width = '65px'
    infoWeekday[i].textContent = day[i][0]
  }
}

app()

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!formInput.value) return
  
  app(formInput.value)
  
  formInput.value = ''
  formInput.focus()
})