import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [systemMessage, setSystemMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')

      setSystemMessage(
        {
          message: 'logged in successfully',
          error: false
        }
      )
      setTimeout(() => {
        setSystemMessage(null)
      }, 5000)

    } catch (error) {
      setSystemMessage(
        {
          message: 'wrong username or password',
          error: true
        }
      )
      setTimeout(() => {
        setSystemMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    try {
      setUser(null)
      window.localStorage.removeItem('loggedNoteappUser')

      setSystemMessage(
        {
          message: 'logged out successfully',
          error: false
        }
      )
      setTimeout(() => {
        setSystemMessage(null)
      }, 5000)

    } catch (error) {
      setSystemMessage(
        {
          message: 'logging out failed',
          error: true
        }
      )
      setTimeout(() => {
        setSystemMessage(null)
      }, 5000)

    }
  }

  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      setBlogs(await blogService.getAll())
      blogFormRef.current.toggleVisibility()

      setSystemMessage(
        {
          message: `new blog ${blogObject.title} by ${blogObject.author} added`,
          error: false
        }
      )
      setTimeout(() => {
        setSystemMessage(null)
      }, 5000)

    } catch (exception) {
      setSystemMessage(
        {
          message: 'adding a new blog failed',
          error: true
        }
      )
      setTimeout(() => {
        setSystemMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={systemMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={systemMessage} />

      <p>{user.name} logged in</p>
      <button onClick={() => handleLogout()}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
