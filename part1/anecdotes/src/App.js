import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const VotesLine = ({votes, selected}) => {
  return(
    <>
      Has {votes[selected]} votes.
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(7))
  const [mostVotes, setMostVotes] = useState(0)

  const handleChange = () => {
    setSelected(Math.floor(Math.random() * 7))
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1

    if (newVotes[selected] > votes[mostVotes]) {
      var copySelected = selected;
      setMostVotes(copySelected);
    } 

    setVotes(newVotes);
  }

  return (
    <div>
      <div>
        <h1>
          Anecdote of the day
        </h1>
        {anecdotes[selected]}
      </div>
      <div>
        <VotesLine votes={votes} selected={selected} />
      </div>
      <div>
        <Button handleClick={handleVote} text="Vote" />
        <Button handleClick={handleChange} text="Next Anecdote" />
      </div>
      <div>
        <h1>
          Anecdote with most votes
        </h1>
        {anecdotes[mostVotes]}
      </div>
      <div>
        <VotesLine votes={votes} selected={mostVotes} />
      </div>
    </div>
  )
}

export default App