import React, { useState, useEffect } from 'react'
import axios from "axios"
import Weather from "./Weather"

const api_key = process.env.REACT_APP_WEATHERMAP_KEY

const Country = ({ country }) => {
  const [ weather, setWeather ] = useState(null)

  const { name, capital, population, languages, flag } = country

  const getWeather = () => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
    .then(res => {
      setWeather(res.data)
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getWeather, [])

  // console.log(weather)

  return (
    <div>
      <h2>{name}</h2>
      <div>capital: {capital}</div>
      <div>population: {population}</div>
      <h3>languages</h3>
      <ul>
      {languages.map(language => (
        <li key={language.name}>{language.name}</li>
      ))}
      </ul>
      <img src={flag} alt="flag" width="200px" />
      <h3>Weather in {capital}</h3>
      {weather === null
        ? <div></div>
        : <Weather weather={weather} />
        }  
    </div>  
  )
}

export default Country
