import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but not url or likes by default', () => {
  const blog = {
    user: {
      id: 'testID001',
      username: 'Teppo',
      name: 'Teppo Testinen'
    },
    likes: 13,
    author: 'Kyllikki Kirjoittaja',
    title: 'Eka blogi',
    url: 'https://blogit.fi'
  }

  const user = {
    token: 'Token-XX0011',
    username: 'Teppo',
    name: 'Teppo Testinen'
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler} user={user} handleRemove={mockHandler} />)

  const blogDiv = container.querySelector('.blog')

  expect(blogDiv).toHaveTextContent(`${blog.title}, ${blog.author}`)
  expect(blogDiv).not.toHaveTextContent(`${blog.url}`)
  expect(blogDiv).not.toHaveTextContent(`${blog.likes}`)

})