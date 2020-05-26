const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
 
})


blogsRouter.get('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }

})


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: body.comments
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

  response.json(savedBlog.toJSON())

})



blogsRouter.post('/:id/comments', async (request, response) => {
  const content = request.body.content
  if (!content) {
    response.status(404).end()
  }
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
  }

  blog.comments = blog.comments.concat([content])

  const updatedBlog = await blog.save()

  if (updatedBlog) {
    await updatedBlog.populate('user', { username: 1, name: 1 }).execPopulate()
    response.json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }

})


blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  
  if (!user) {
    response.status(404).end()
  }
  if ( blog.user.toString() === user._id.toString() ){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else{
    return response.status(401).json({ error: 'user and creator are different' })
  }

})


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
  if (updatedBlog) {
    await updatedBlog.populate('user', { username: 1, name: 1 }).execPopulate()
    response.json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }

})

module.exports = blogsRouter