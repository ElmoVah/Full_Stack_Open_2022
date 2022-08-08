import { useSelector, useDispatch } from 'react-redux'
import { useParams,  useNavigate } from 'react-router-dom'
import { like, deleteBlog } from '../reducers/blogsReducer'
import { Button } from 'react-bootstrap'

const BlogInfo = () => {
  const id = useParams().id

  const blog = useSelector((state) =>
    state.blogs.find(blog => blog.id === id))

  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLike = async (blog) => {
    dispatch(like(blog))
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}
        <Button variant="primary" id="likeButton" onClick={() => handleLike(blog)}>like</Button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        {user.username === blog.user.username ?
          <Button variant="primary" onClick={() => handleRemove(blog)}>remove</Button> :
          <></>}
      </div>
    </div>
  )
}

export default BlogInfo