import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: newAuthor === '' ? undefined : newAuthor,
      title: newTitle === '' ? undefined : newTitle,
      url: newUrl === '' ? undefined : newUrl
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            value={newTitle}
            onChange={handleTitleChange}
            className="inputTitle"
          />
          <Form.Label>Author</Form.Label>
          <Form.Control
            value={newAuthor}
            onChange={handleAuthorChange}
            className="inputAuthor"
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            value={newUrl}
            onChange={handleUrlChange}
            className="inputUrl"
          />
          <Button variant="primary" type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm