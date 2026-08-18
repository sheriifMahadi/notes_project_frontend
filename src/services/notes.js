import api from './api'

const getAllNotes = async (filters = {}) => (await api.get('/notes', { params: filters })).data
const getSingleNote = async id => (await api.get(`/notes/${id}`)).data
const createNote = async note => (await api.post('/notes', note)).data
const updateNote = async (id, note) => (await api.put(`/notes/${id}`, note)).data
const setPinned = async (id, pinned) => (await api.patch(`/notes/${id}/pin`, { pinned })).data
const setArchived = async (id, archived) => (await api.patch(`/notes/${id}/archive`, { archived })).data
const setTrashed = async (id, deleted) => (await api.patch(`/notes/${id}/trash`, { deleted })).data
const deleteNote = async id => api.delete(`/notes/${id}`)

export default { getAllNotes, getSingleNote, createNote, updateNote, setPinned, setArchived, setTrashed, deleteNote }
