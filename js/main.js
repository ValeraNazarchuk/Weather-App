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

function city(city) {
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
    console.log(value[i].weather[0].main)
    result.push([
      value[i].clouds.all,
      value[i].main.humidity,
      value[i].wind.speed,
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
const app = async () => {
  const weather = await getWeatherData('Polonne')
  // console.log(tempWeather(weather.list))
}

app()