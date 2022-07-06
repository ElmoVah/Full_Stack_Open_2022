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

  await User.insertMany(helper.testUsers)
  await Blog.insertMany(helper.multipleBlogs)
})

test('there are six blogs in the database', async () => {
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

describe('adding a new user to db fails', () => {
  test('when no username is given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Testi Teppo',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('when no passwors is given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Tester',
      name: 'Testi Teppo',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Te',
      name: 'Testi Teppo',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Tester',
      name: 'Testi Teppo',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()
    expect(usersAtStart).toHaveLength(helper.testUsers.length)

    const newUser2 = {
      username: 'ElHa',
      name: 'Testi Testaaja',
      password: 'passu'
    }

    const result = await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

test('Adding a proper user works', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'Tester',
    name: 'Testi Teppo',
    password: 'salainen'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

afterAll(() => {
  mongoose.connection.close()
})