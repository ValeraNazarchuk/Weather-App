'use strict'

const url =
  'https://api.weatherapi.com/v1/current.json?key=e9a5d3b74bf84418b11193028231901&q=London'

async function get() {
  const responce = await fetch(url)
  const data = await responce.json()
  return data
}

get().then(data => {
  console.log(data);
})