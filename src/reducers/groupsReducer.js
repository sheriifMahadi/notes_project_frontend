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
      const response = await groupService.deleteGroup(id)
      return response
    //   return { id };
    }
  );


const groupSlice = createSlice({
    name: "group",
    initialState,
    extraReducers: {
        [createGroup.fulfilled]: (state, action) => {
            state.push(action.payload)
        },
        [retrieveGroups.fulfilled]: (state, action) => {
          return [...action.payload];
        },
      [retrieveSingleGroup.fulfilled]: (state, action) => {
        return [action.payload];
        },
        [retrieveGroupNotes.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [deleteGroup.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
          },
    }
})  

const { reducer } = groupSlice
export default reducer

