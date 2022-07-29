import { useDispatch, useSelector } from "react-redux"
import { addVote } from '../reducers/anecdoteReducer'
import { likeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

  useSelector(state => console.log(state.anecdotes))
  //Sorts anecdotes by vote count
  const anecdotes = useSelector(state => [...state.anecdotes].sort((a, b) => {
    return b.votes - a.votes
  }))
  
  const anecdotesFiltered = useSelector(state => {
    if (state.filter !== ''){
      return anecdotes.filter(a => a.content.includes(state.filter))
    } else {
      return anecdotes
    }
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(likeNotification(anecdote.content))
  }

  return (
    <div>
      {anecdotesFiltered.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList