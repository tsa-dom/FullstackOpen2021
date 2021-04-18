const baseUrl = '/api/users'
let service = null

const initService = resource => service = resource

const getAll = async () => await service.getAll(baseUrl)

export default { initService, getAll }