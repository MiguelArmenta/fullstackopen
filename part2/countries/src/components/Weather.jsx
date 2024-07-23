import axios from "axios"
import { useEffect, useState } from "react"

const Weather = ({ capital }) => {
    console.log(capital)

    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => {
            setWeather(response.data)

        })
    }, [])
    if (weather){
        return (
            <>
                <h3>Weather in {capital}</h3>
                Temperature {weather.main.temp} Celsius <br />
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" /> <br />
                Wind {weather.wind.speed} m/s
            </>
        )
    }
    return null
    
}

export default Weather