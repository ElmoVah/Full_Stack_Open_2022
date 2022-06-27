const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const highestLikes = blogs.reduce((prev, current) => {
    return prev.likes > current.likes
      ? prev
      : current
  })

  return {
    title: highestLikes.title,
    author: highestLikes.author,
    likes: highestLikes.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const blogsPerWriter = lodash.countBy(blogs, 'author')
  const highestBlogCount = Math.max(...Object.values(blogsPerWriter))

  return {
    author: Object.keys(blogsPerWriter).find(key => blogsPerWriter[key] === highestBlogCount),
    blogs: highestBlogCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likesPerWriter = blogs.reduce((blog, { author, likes }) => {
    blog[author] = blog[author] || 0
    blog[author] += likes
    return blog
  }, {})

  let highestLikesAuthor = Object.keys(likesPerWriter).sort((a,b) => likesPerWriter[b] - likesPerWriter[a])[0]

  return{
    author: highestLikesAuthor,
    likes: likesPerWriter[highestLikesAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}