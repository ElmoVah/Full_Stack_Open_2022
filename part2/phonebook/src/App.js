import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import PersonList from './components/PersonList'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {

      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then(() => {setPersons(persons.filter(p => p.id !== person.id))})
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <AddPerson addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <PersonList persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App