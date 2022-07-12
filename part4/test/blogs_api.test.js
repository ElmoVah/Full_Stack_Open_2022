const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const newUser = {
    username: helper.testUsers[0].username,
    name: helper.testUsers[0].name,
    password: helper.testUsers[0].password
  }

  await api
    .post('/api/users')
    .send(newUser)

  await Blog.insertMany(helper.multipleBlogs)
})

test('there are six blogs in the database', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.multipleBlogs.length)
}, 10000)

test('Each posts has an id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
}, 10000)

test('a proper blog can be added', async () => {
  const user = {
    username: helper.testUsers[0].username,
    password: helper.testUsers[0].password
  }

  const login = await api
    .post('/api/login')
    .send(user)
    .expect('Content-Type', /application\/json/)

  const newBlog = {
    title: 'Test post',
    author: 'Teppo Testaaja',
    url: 'http://www.testi.html',
    likes: 66
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${login.body.token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.multipleBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Test post')
}, 10000)

test('if no likes value is given, server will set likes to 0', async () => {
  const user = {
    username: helper.testUsers[0].username,
    password: helper.testUsers[0].password
  }

  const login = await api
    .post('/api/login')
    .send(user)
    .expect('Content-Type', /application\/json/)

  const newBlog = {
    title: 'Test post',
    author: 'Teppo Testaaja',
    url: 'http://www.testi.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${login.body.token}`)
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
}, 10000)

describe('Deleting a blog', () => {
  test('works with proper id and token', async () => {
    const user = {
      username: helper.testUsers[0].username,
      password: helper.testUsers[0].password
    }

    const login = await api
      .post('/api/login')
      .send(user)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: 'Test post',
      author: 'Teppo Testaaja',
      url: 'http://www.testi.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${login.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${login.body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const ids = blogsAtEnd.map(b => b.id)

    expect(ids).not.toContain(blogToDelete.id)

  }, 10000)

  test('fails if token is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  }, 10000)
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
}, 10000)

afterAll(() => {
  mongoose.connection.close()
})