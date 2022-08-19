import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState('all')

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const allBooks = result.data.allBooks
  const genres = [...new Set(allBooks.flatMap(book => book.genres))]
  const booksFiltered = (result.data.allBooks).filter(book => book.genres.includes(genreFilter))

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
          {(genreFilter === 'all' ? allBooks : booksFiltered ).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button onClick={() => setGenreFilter(g)} key={g}>{g}</button>
        ))}
        <button onClick={() => setGenreFilter('all')}>all</button>
      </div>
    </div>
  )
}

export default Books
