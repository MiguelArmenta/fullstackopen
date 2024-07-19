import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    
    event.preventDefault()
    console.log(event.target.value)
    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)

    } else {
      const personObject = {
        name: newName,
        number : newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
    setShowAll(event.target.value==='')
  }

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} handleFilterChange={(event) => handleFilterChange(event)} />

      <h3>Add a new</h3>

      <PersonForm 
        handleSubmit={(event) => addPerson(event)}
        name={newName}
        number={newNumber}
        handleNameChange={(event) => handleNameChange(event)}
        handleNumberChange={(event) => handleNumberChange(event)}          
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />
    </div>
    
  )
}

export default App