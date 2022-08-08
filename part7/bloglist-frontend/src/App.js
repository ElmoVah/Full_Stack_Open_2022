import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import UserList from './components/UserList'
import Profile from './components/Profile'
import BlogInfo from './components/BlogInfo'

import { initializeBlogs, createBlog } from './reducers/blogsReducer'
import { logOut, logIn } from './reducers/signedInUserReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const sortByLikes = useSelector(state => [...state.blogs].sort((a, b) => {
    return b.likes - a.likes
  }))

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(logIn(username, password))
      setUsername('')
      setPassword('')
      dispatch(setNotification({ message: 'logged in successfully', error: false }))
    } catch (error) {
      dispatch(setNotification({ message: 'wrong username or password', error: true }))
    }
  }

  const handleLogout = () => {
    try {
      dispatch(logOut(null))
      dispatch(setNotification({ message: 'logged out successfully', error: false }))
    } catch (error) {
      dispatch(setNotification({ message: 'logging out failed', error: true }))
    }
  }

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification({ message: `new blog ${blogObject.title} by ${blogObject.author} added`, error: false }))
    } catch (exception) {
      dispatch(setNotification({ message: 'adding a new blog failed', error: true }))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin} id="login-fomr">
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button
            id="login-button"
            type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <button onClick={() => handleLogout()}>logout</button>
      <Router>
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/blogs/:id" element={<BlogInfo />} />
          <Route path="/" element={
            <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <h2>create new</h2>
                <BlogForm createBlog={addBlog} />
              </Togglable>
              {sortByLikes.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </div>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
