const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('favorite blog', () => {

  test('of an empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  })

  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(helper.oneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list is retruned correctly', () => {
    const result = listHelper.favoriteBlog(helper.multipleBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })

})