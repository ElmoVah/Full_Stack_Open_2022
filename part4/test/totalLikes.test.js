const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('total likes', () => {

  test('of emptylist is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.oneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.multipleBlogs)
    expect(result).toBe(36)
  })
})