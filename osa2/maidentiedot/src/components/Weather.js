import React from 'react'

const Weather = ({ weather }) => {

  const temp = weather.main.temp
  const wind = weather.wind.speed
  const icon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`

  return (
    <div>
      <div>temperature: {temp} Celcius</div>
      <div><img src={icon} alt="weather icon" width="100px" /></div>
      <div>wind: {wind} m/s</div>
    </div>
  )
}

export default Weather
