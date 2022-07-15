import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  console.log(blog)

  const changeVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        {blog.title}, {blog.author}
        <button onClick={changeVisibility}>show</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, {blog.author}
        <button onClick={changeVisibility}>hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes} 
        <button>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog