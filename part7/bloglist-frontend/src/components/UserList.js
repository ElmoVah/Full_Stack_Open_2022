import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersList = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersList