import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../reducers/signedInUserReducer'
import { setNotification } from '../reducers/notificationReducer'

const Navigation = () => {
  const padding = {
    paddingRight: 5,
    paddingLeft: 5
  }

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    try {
      dispatch(logOut(null))
      dispatch(setNotification({ message: 'logged out successfully', error: false }))
    } catch (error) {
      dispatch(setNotification({ message: 'logging out failed', error: true }))
    }
  }

  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user.name} logged in
      <button style={padding} onClick={() => handleLogout()}>logout</button>
    </div>
  )
}

export default Navigation