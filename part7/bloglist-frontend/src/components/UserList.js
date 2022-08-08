import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user =>
          <tr>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.username}
              </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>

    </div>
  )
}

export default UsersList