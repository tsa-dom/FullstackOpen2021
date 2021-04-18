const baseUrl = '/api/login'
let service = null

const initService = resource => service = resource

const login = async user => await service.add(user, baseUrl)

export default { login, initService }