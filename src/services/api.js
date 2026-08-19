import axios from 'axios'

const configuredUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace(/\/+$/, '')
const apiBaseUrl = configuredUrl.endsWith('/api') ? configuredUrl : `${configuredUrl}/api`

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 90000,
})

api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (user?.access_token) config.headers.Authorization = `Bearer ${user.access_token}`
  return config
})

api.interceptors.response.use(response => response, async error => {
  if (error.response?.status === 401) {
    localStorage.removeItem('user')
    window.dispatchEvent(new Event('auth-expired'))
  }

  const config = error.config
  const timedOut = error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT'
  if (timedOut && config && config.method === 'get' && !config.__retried) {
    config.__retried = true
    return api.request(config)
  }
  return Promise.reject(error)
})

export default api
