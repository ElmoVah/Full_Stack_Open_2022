import React from "react"
import Person from "./Person"

const PersonList = ({ persons, filter }) => {

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Numbers</h2>
      {personsFiltered.map(person =>
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

export default PersonList