const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('most likes', () => {

  test('of an empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(null)
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostLikes(helper.oneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list is retruned correctly', () => {
    const result = listHelper.mostLikes(helper.multipleBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

})