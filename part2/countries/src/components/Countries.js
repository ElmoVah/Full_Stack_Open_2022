import React from "react"
import Country from "./Country"

const Countries = ({ countries, filter, showCoyntry }) => {

  const countriesFiltered = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  if (countriesFiltered.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countriesFiltered.length === 1) {
    return (
      <Country country={countriesFiltered[0]} />
    )
  } else {
    return (
      <div>
        {countriesFiltered.map(country =>
          <div key={country.alpha3Code}>
            {country.name}
            <button type="button" value={country.name} onClick={showCoyntry}>show</button>
          </div>)}
      </div>
    )
  }
}

export default Countries