import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import PersonList from './components/PersonList'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const updatedPerson = {
          name: newName,
          number: newNumber,
          id: persons.find(p => p.name === newName).id
        }

        personService
          .update(updatedPerson)
          .then(() => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Number changed for ${updatedPerson.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)})
          .catch(error => {
            setErrorMessage(
              `Information of '${updatedPerson.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)})

      } else {
        setNewName('')
        setNewNumber('')
      }

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
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then(() => { setPersons(persons.filter(p => p.id !== person.id)) })
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
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter filter={filter} handleChange={handleFilterChange} />
      <AddPerson addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <PersonList persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App