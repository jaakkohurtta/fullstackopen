import React from 'react'
import Country from "./Country"

const CountryContainer = ({ countries, filter, setFilter }) => {

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  // console.log(filteredCountries)

  if(filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, speficy another filter
      </div>
    )
  } else if(filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(country => (
          <div key={country.name}>
            {country.name}
            <button onClick={(e) => setFilter(e.target.previousSibling.textContent)}>show</button>
          </div>
        ))}
      </div>
    )  
  } else {
    return (
      <div>
        {filteredCountries.map(country => (
          <Country key={country.name} country={country} />
        ))}
      </div>
    )
  
  }
}

export default CountryContainer
