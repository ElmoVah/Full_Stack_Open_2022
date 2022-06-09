import { useEffect, useState } from "react"
import axios from "axios"
import Countries from "./components/Countries"

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

  return (
    <div>
      <div>
        find countries <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <Countries countries={countries} filter={filter} />
    </div>
  )
}

export default App;
