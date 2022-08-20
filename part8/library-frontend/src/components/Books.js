import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = props => {
  const allBooks = useQuery(ALL_BOOKS)
  const [filterBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'network-only'
  })
  const [genreFilter, setGenreFilter] = useState('all')

  useEffect(()=> {
    filterBooks()
  }, []) //eslint-disable-line

  if (!props.show) {
    return null
  }

  if (allBooks.loading || result.loading) {
    return <div>loading...</div>
  }

  if (allBooks.error || result.error) {
    return <div>Error!</div>
  }

  const genres = [...new Set((allBooks?.data?.allBooks).flatMap(book => book.genres))]
  
  const books = result?.data?.allBooks
  ? result?.data?.allBooks
  : allBooks?.data?.allBook

  const handleClick = genre => {
    setGenreFilter(genre)
    if (genre === 'all') {
      filterBooks()
    } else {
      filterBooks({ variables: { genre: genre } })
    }
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <strong>{genreFilter}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres?.map(g => (
          <button onClick={() => handleClick(g)} key={g}>
            {g}
          </button>
        ))}
        <button onClick={() => handleClick('all')}>all</button>
      </div>
    </div>
  )
}

export default Books
