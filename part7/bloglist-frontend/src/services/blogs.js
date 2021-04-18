const baseUrl = '/api/blogs'
let service = null

const initService = resource => service = resource

const getAll = async () => await service.getAll(baseUrl)

const createBlog = async blog => await service.add(blog, baseUrl)

const modifyBlog = async blog => await service.modify(blog, `${baseUrl}/${blog.id}`)

const deleteBlog = async blog => await service.remove(`${baseUrl}/${blog.id}`)

const createComment = async (id, comment) => await service.add(comment, `${baseUrl}/${id}/comments`)

export default { getAll, initService, createBlog, modifyBlog, deleteBlog, createComment }