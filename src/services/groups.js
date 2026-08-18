import api from './api'

const getAllGroups = async () => (await api.get('/groups')).data
const getSingleGroup = async id => (await api.get(`/groups/${id}`)).data
const getGroupNotes = async id => (await api.get(`/groups/${id}/notes`)).data
const createGroup = async group => (await api.post('/groups', group)).data
const deleteGroup = async id => api.delete(`/groups/${id}`)

export default { getAllGroups, getSingleGroup, getGroupNotes, createGroup, deleteGroup }
