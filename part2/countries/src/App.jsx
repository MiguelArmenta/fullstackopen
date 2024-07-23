import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])
  const [inputcountries, setInput] = useState('')

  useEffect(()=>{
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response=>{
      setCountries(response.data)
    })

  }, [])

  const handleCountryChange = (event) => {
    setInput(event.target.value)
    setShowCountries(countries.filter(country=>country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const handleShowChange = (event) => {
    const name = event.target.value
    setShowCountries(showCountries.map(country => country.name.common === name ?({...country, show: !country.show}) : country ))
  }

  return (
    <div>
      find countries <input value={inputcountries} onChange={(event) => handleCountryChange(event)} />
      <div>
        {inputcountries === '' ? '' : <Countries countries={showCountries} handleShowChange={(event)=>handleShowChange(event)} />}
      </div>
    </div>

  )
}

export default App
