import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [className, setClassName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })  
  }, [])

  const addPerson = (event) => {
    
    event.preventDefault()
    if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase())){
      const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      if (window.confirm(`${person.name} is already to the phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...person, number: newNumber}
        personService
        .update(changedPerson.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map(person=>person.id !== changedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Number changed ${returnedPerson.name}`
          )
          setClassName('message')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(()=>{
          setMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setClassName('error')
          setPersons(persons.filter(p=>p.id !== person.id))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        
      }

    } else {
      const personObject = {
        name: newName,
        number : newNumber
      }

      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${returnedPerson.name}`
        )
        setClassName('message')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      
    }
    
  }

  const deletePerson = (event) => {
    const id = event.target.value
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person=>person.id !== id))
      })
      
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
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

      <Notification message={message} className={className}/>

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

      <Persons persons={personsToShow} handlePersonDelete={(event) => deletePerson(event)} />
    </div>
    
  )
}

export default App