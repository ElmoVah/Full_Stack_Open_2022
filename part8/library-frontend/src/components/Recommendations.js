import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const allBooks = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if (!props.show) {
    return null
  }

  if (allBooks.loading || user.loading) {
    return <div>loading...</div>;
  }

  const favoriteGenere = user.data.me.favoriteGenre
  const booksFiltered = (allBooks.data.allBooks).filter(book => book.genres.includes(favoriteGenere))

  return (
    <div>
      <h2>books</h2>
      <div>
        books in your favorite genre <strong>{favoriteGenere}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksFiltered.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
