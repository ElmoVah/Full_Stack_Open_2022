import { useEffect, useState } from "react"
import axios from "axios"
import Countries from "./components/Countries"
import Filter from "./components/Filter"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
    console.log(countries)
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleShowCountry = (event) => {
    event.preventDefault()
    console.log("show", event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} showCoyntry={handleShowCountry} />
    </div>
  )
}

export default App;
