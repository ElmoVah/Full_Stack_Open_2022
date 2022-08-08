import { useSelector } from 'react-redux'

const UsersList = () => {
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const users = useSelector((state) => state.users)
  console.log('users', users)

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
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>

    </div>
  )
}

export default UsersList