import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <p>
    {text} {value}
    </p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return(
      <div>
        <h1>Statistics</h1>
        No feedback givet
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text="Good" valeue={good}/>
      <StatisticLine text="Neutral" valeue={neutral}/>
      <StatisticLine text="Bad" valeue={bad}/>
      <StatisticLine text="Avarage" valeue={(good - bad) / (good + neutral + bad)}/>
      <StatisticLine text="Positive" valeue={good / (good + neutral + bad) * 100} />%
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App