import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from '../services/notes'
import { updateNotification } from "../reducers/notificationReducers";


const initialState = []

export const createNote = createAsyncThunk(
    "note/create",
    async(noteobj, thunkAPI) => {
        const response = await noteService.createNote(noteobj)
        thunkAPI.dispatch(updateNotification({msg: 'Note added successfully',  severity: 'success'}));
        return response
    }
)

export const retrieveNotes = createAsyncThunk(
    "note/retrieve",
    async () => {
        const response = await noteService.getAllNotes()
        return response
    }
)


export const retrieveSingleNotes = createAsyncThunk(
  "note/retrieveSingle",
  async (id) => {
      const response = await noteService.getSingleNote(id)
      return response
  }
)

export const updateNote = createAsyncThunk(
    "tutorials/update",
    async ({id, noteobj}, thunkAPI) => {
      const response = await noteService.updateNote(id, noteobj)
      thunkAPI.dispatch(updateNotification({msg: 'Note added successfully',  severity: 'success'}));
      return response;
    }
  );
  
  export const deleteNote = createAsyncThunk(
    "tutorials/delete",
    async (id) => {
      await noteService.deleteNote(id)
      return { id };
    }
  );


const noteSlice = createSlice({
    name: "note",
    initialState,
    extraReducers: {
        [createNote.fulfilled]: (state, action) => {
            state.push(action.payload)
        },
        [retrieveNotes.fulfilled]: (state, action) => {
            return [...action.payload];

        },
        [retrieveSingleNotes.fulfilled]: (state, action) => {
          return [action.payload];
      },
        [updateNote.fulfilled]: (state, action) => {
            const index = state.findIndex(note => note.id === action.payload.id);
            state[index] = {
              ...state[index],
              ...action.payload,
            };
          },
          [deleteNote.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
          },
    }
})  

const { reducer } = noteSlice
export default reducer

