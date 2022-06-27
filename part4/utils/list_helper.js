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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}