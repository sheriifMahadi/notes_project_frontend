import api from './api'

const login = async credentials => {
  const { data } = await api.post('/login', credentials)
  localStorage.setItem('user', JSON.stringify(data))
  return data
}
const register = credentials => api.post('/users', credentials)
const logout = () => localStorage.removeItem('user')

export default { register, login, logout }
