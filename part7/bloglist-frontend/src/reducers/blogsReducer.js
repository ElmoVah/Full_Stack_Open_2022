import blogsService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    likeBlog(state, action) {
      const likedBlog = action.payload
      return state.map(blog =>
        blog.id !== likedBlog.id ? blog : likedBlog)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const { setBlogs, likeBlog, removeBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = newBlog => {
  return async dispatch => {
    await blogsService.create(newBlog)
    dispatch(initializeBlogs())
  }
}

export const like = blog => {
  console.log('blog', blog)
  let likedBlog = {
    user: blog.user.id,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  likedBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
  return async dispatch => {
    const updatedBlog = await blogsService.update(blog.id, likedBlog)
    console.log('updatedBlog', updatedBlog)
    dispatch(likeBlog({ ...updatedBlog, user: blog.user }))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogsService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogsSlice.reducer