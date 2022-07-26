import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { likeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

  //Sorts anecdotes by vote count
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => {
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

  const vote = ({ id, content}) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(likeNotification(content))
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