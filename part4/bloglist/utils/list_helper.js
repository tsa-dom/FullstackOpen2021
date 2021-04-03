const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  favorite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) favorite = blog
  })
  return (
    {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const count = _.max(_.toArray(_.countBy(blogs, 'author')))
  const author = _.findKey(_.countBy(blogs, 'author'), value => value === count)
  return (
    {
      author: author,
      blogs: count
    }
  )
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const authors = _.groupBy(_.map(blogs, blog => _.pick(blog, ['author', 'likes'])), 'author')
  const group = []
  _.forEach(authors, author => {
    const member = {
      author: author[0].author,
      likes: _.sum(_.map(author, value => value.likes))
    }
    group.push(member)
  })
  const target = _.maxBy(group, 'likes')
  return target
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}