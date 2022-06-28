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
    expect(blog._id).toBeDefined()
  })
}, 10000)

afterAll(() => {
  mongoose.connection.close()
})