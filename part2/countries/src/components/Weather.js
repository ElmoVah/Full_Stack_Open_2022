import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
      .then(response => {
        console.log("response", response.data)
        setWeather(response.data)
      })
    console.log("state", weather)
  }, [])

  return (
    <>
      {weather.main ? (
        <div>
          <h2>Weather in {capital}</h2>
          <div>Temperature: {weather.main.temp}°C</div>
          <div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          </div>
          <div>Wind: {weather.wind.speed} m/s</div>
        </div>
      ) : null}
    </>
  )
}

export default Weather