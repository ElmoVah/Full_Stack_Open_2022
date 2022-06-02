import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === 'positive'){
    return(
      <tr>
        <td>{text}</td> 
        <td>{value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good}/>
          <StatisticLine text="Neutral" value={neutral}/>
          <StatisticLine text="Bad" value={bad}/>
          <StatisticLine text="Avarage" value={(good - bad) / (good + neutral + bad)}/>
          <StatisticLine text="Positive" value={good / (good + neutral + bad) * 100} />
        </tbody>  
      </table>
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
      <div>
        <h1>Give feedback</h1>
        <Button text="good" handleClick={() => setGood(good + 1)}/>
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
        <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      </div>
      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App