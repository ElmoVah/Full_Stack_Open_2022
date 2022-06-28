const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('most blogs', () => {

  test('of an empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostBlogs(helper.oneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('of a bigger list is retruned correctly', () => {
    const result = listHelper.mostBlogs(helper.multipleBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

})