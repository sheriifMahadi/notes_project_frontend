import axios from 'axios'
import authHeader from './token'
const baseUrl = 'http://localhost:3001/api/notes'


const getAllNotes = async () => {
    const response = await axios.get(baseUrl,  { headers: authHeader() })
    return response.data
}


const getSingleNote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`,  { headers: authHeader() })
    return response.data

}

const createNote = async (newObj) => {
    const date = new Date().toISOString()
    const obj = {...newObj, created: date, modified: date }
    const response= await axios.post(baseUrl, newObj,  { headers: authHeader() })
    return response.data
}

const updateNote = async(id, newObj) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObj,  { headers: authHeader() })
    return response.data
}

const deleteNote = async (id) => {
    return await axios.delete(`${baseUrl}/${id}`,  { headers: authHeader() })
}

export default {
    getAllNotes,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote,
}