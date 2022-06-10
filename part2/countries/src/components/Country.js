import React from "react"

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        Capital: {country.capital}
      </div>
      <div>
        Area: {country.area}
      </div>
      <h2>Languages:</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.iso639_2}>{language.name}</li>
        )}
      </ul>
      <div>
        <img src={country.flag} alt="Flag of the country" height="200" />
      </div>
    </div>
  )
}

export default Country