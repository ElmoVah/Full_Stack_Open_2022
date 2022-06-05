import React from "react"

const Total = ({ parts }) => {
const sum = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <p>
      <strong>
        Total of {sum} exercises
      </strong>
    </p>
  )
}

export default Total