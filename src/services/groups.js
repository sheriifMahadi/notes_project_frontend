import axios from 'axios'
import authHeader from './token'
const baseUrl = 'https://z-note.fly.dev/api/groups'
const getMultiple = 'https://z-note.fly.dev/api/getmultiple'

const getAllGroups = async() => {
    const response = await axios.get(baseUrl,  { headers: authHeader() })
    return response.data
}

const getSingleGroup = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`,  { headers: authHeader() })
    return response.data

}

const getGroupNotes = async (id) => {
    const response = await axios.post(getMultiple, id, { headers: authHeader() })
    return response.data
}

const createGroup = async (newObj) => {
    const response= await axios.post(baseUrl, newObj,  { headers: authHeader() })
    return response.data
}

const deleteGroup = async (id) => {
    await axios.delete(`${baseUrl}/${id}`,  { headers: authHeader() })
    return getAllGroups()

}

export default {
    getAllGroups,
    getSingleGroup,
    getGroupNotes,
    createGroup,
    deleteGroup,
}