const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.multipleBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.multipleBlogs.length)
}, 10000)

test('posts have id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
}, 10000)

test('a proper blog can be added', async () => {
  const newBlog = {
    title: 'Test post',
    author: 'Teppo Testaaja',
    url: 'http://www.testi.html',
    likes: 66
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.multipleBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Test post')
}, 10000)

test('if no likes value is given, server will set likes to 0', async () => {
  const newBlog = {
    title: 'Test post',
    author: 'Teppo Testaaja',
    url: 'http://www.testi.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.multipleBlogs.length + 1)

  expect(blogsAtEnd[helper.multipleBlogs.length].likes).toBe(0)
}, 10000)

test('Server responses 400, if title and url are missing', async () => {
  const newBlog = {
    title: 'Test post',
    likes: 66
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deleting a blog with id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

  const ids = blogsAtEnd.map(b => b.id)

  expect(ids).not.toContain(blogToDelete.id)

})

test('updating a blog with id', async () => {
  const newBlog = {
    title: 'Test post',
    author: 'Teppo Testaaja',
    url: 'http://www.testi.html',
    likes: 66
  }

  const blogsAtStart = await helper.blogsInDb()

  await api
    .put(`/api/blogs/${blogsAtStart[0].id}`)
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[0].title).toEqual(newBlog.title)
  expect(blogsAtEnd[0].author).toEqual(newBlog.author)
  expect(blogsAtEnd[0].url).toEqual(newBlog.url)
  expect(blogsAtEnd[0].likes).toEqual(newBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})