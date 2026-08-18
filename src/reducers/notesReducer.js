import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'
import { updateNotification } from './notificationReducers'

const initialState = { items: [], status: 'idle', error: null, filters: { q: '', status: 'active', sort: 'modified', tag: '' } }

export const retrieveNotes = createAsyncThunk('notes/retrieve', filters => noteService.getAllNotes(filters))
export const retrieveSingleNotes = createAsyncThunk('notes/retrieveSingle', id => noteService.getSingleNote(id))
export const createNote = createAsyncThunk('notes/create', async (note, thunkAPI) => {
  const response = await noteService.createNote(note)
  thunkAPI.dispatch(updateNotification({ msg: 'Note added successfully', severity: 'success' }))
  return response
})
export const updateNote = createAsyncThunk('notes/update', async ({ id, noteobj }, thunkAPI) => {
  const response = await noteService.updateNote(id, noteobj)
  thunkAPI.dispatch(updateNotification({ msg: 'Note saved', severity: 'success' }))
  return response
})
export const togglePin = createAsyncThunk('notes/pin', ({ id, pinned }) => noteService.setPinned(id, pinned))
export const archiveNote = createAsyncThunk('notes/archive', ({ id, archived = true }) => noteService.setArchived(id, archived))
export const trashNote = createAsyncThunk('notes/trash', ({ id, deleted = true }) => noteService.setTrashed(id, deleted))
export const deleteNote = createAsyncThunk('notes/delete', async id => {
  await noteService.deleteNote(id)
  return id
})

const replaceNote = (state, note) => {
  const index = state.items.findIndex(item => item.id === note.id)
  if (index >= 0) state.items[index] = note
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload } }
  },
  extraReducers: builder => builder
    .addCase(retrieveNotes.pending, state => { state.status = 'loading'; state.error = null })
    .addCase(retrieveNotes.fulfilled, (state, action) => { state.items = action.payload; state.status = 'succeeded' })
    .addCase(retrieveNotes.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })
    .addCase(createNote.fulfilled, (state, action) => { state.items.unshift(action.payload) })
    .addCase(updateNote.fulfilled, (state, action) => replaceNote(state, action.payload))
    .addCase(togglePin.fulfilled, (state, action) => replaceNote(state, action.payload))
    .addCase(archiveNote.fulfilled, (state, action) => { state.items = state.items.filter(note => note.id !== action.payload.id) })
    .addCase(trashNote.fulfilled, (state, action) => { state.items = state.items.filter(note => note.id !== action.payload.id) })
    .addCase(deleteNote.fulfilled, (state, action) => { state.items = state.items.filter(note => note.id !== action.payload) })
})

export const { setFilters } = noteSlice.actions
export default noteSlice.reducer
