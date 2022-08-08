import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../reducers/signedInUserReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Navbar, Nav } from 'react-bootstrap'

const Navigation = () => {
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
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
            <Nav.Link>
              <em>{user.name} logged in</em>
              <Button variant="primary" onClick={() => handleLogout()}>logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Navigation