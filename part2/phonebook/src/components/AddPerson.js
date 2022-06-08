import React from "react"

const AddPerson = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange}) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handlePersonChange}
          />
          <div>
            number: <input
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddPerson