import React, { useState, useEffect } from "react"
import axios from "axios"
import Input from "./components/Input"
import CountryContainer from "./components/CountryContainer"

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState("")

  const getCountries = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        setCountries(res.data)
      })
  }

  useEffect(getCountries, [])

  const handleChange = (e) => setFilter(e.target.value)

  return (
    <div>
      <Input handleChange={handleChange} />
      <CountryContainer countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App
