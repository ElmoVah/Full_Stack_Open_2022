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
  }, 10000)

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
  }, 10000)

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
  }, 10000)

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
  }, 10000)

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
  }, 10000)
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
}, 10000)

afterAll(() => {
  mongoose.connection.close()
})