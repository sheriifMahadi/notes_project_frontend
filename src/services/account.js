import axios from "axios";
const loginUrl = 'https://z-note.fly.dev/api/'

const login = async credentials => {
  const response = await axios.post(`${loginUrl}login`, credentials)
  if (response.data.access_token ) {
    await localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const register = async credentials => {
  const response = await axios.post(`${loginUrl}users`, credentials)
  return response
}

const logout = () => {
  localStorage.removeItem("user");
}

export default { register, login, logout }