import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import groupService from '../services/groups'
import { updateNotification } from "../reducers/notificationReducers";


const initialState = []

export const createGroup = createAsyncThunk(
    "group/create",
    async(groupObj, thunkAPI) => {
        const response = await groupService.createGroup(groupObj)
        thunkAPI.dispatch(updateNotification({msg: 'New group added successfully',  severity: 'success'}));
        return response
    }
)

export const retrieveGroups = createAsyncThunk(
    "group/retrieve",
    async () => {
        const response = await groupService.getAllGroups()
        return response
    }
)

export const retrieveSingleGroup = createAsyncThunk(
    "group/retrieveSingle",
    async (id) => {
        const response = await groupService.getSingleGroup(id)
        return response
    }
  )
export const retrieveGroupNotes = createAsyncThunk(
    "group/retrieveNotes",
    async (id) => {
        const response = await groupService.getGroupNotes(id)
        return response
    }
)

export const deleteGroup = createAsyncThunk(
    "group/delete",
    async (id) => {
      await groupService.deleteGroup(id)
      return id
    }
  );


const groupSlice = createSlice({
    name: "group",
    initialState,
    extraReducers: builder => builder
        .addCase(createGroup.fulfilled, (state, action) => {
            state.push(action.payload)
        })
        .addCase(retrieveGroups.fulfilled, (state, action) => {
          return [...action.payload];
        })
        .addCase(retrieveSingleGroup.fulfilled, (state) => state)
        .addCase(retrieveGroupNotes.fulfilled, (state) => state)
        .addCase(deleteGroup.fulfilled, (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload);
            if (index >= 0) state.splice(index, 1);
          })
})  

const { reducer } = groupSlice
export default reducer
