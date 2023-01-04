import { createSlice } from "@reduxjs/toolkit";

const initialState = {message: null, severity: null}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
       notification(state, action) {
           state.message = action.payload.msg
           state.severity = action.payload.severity
       },

    }
    
})

let timer = null;

export const updateNotification = ({msg, severity}) => {
    return async(dispatch) => {
        dispatch(notification({msg, severity}))

        if (timer) {
            clearTimeout(timer);
          }
      

       timer = setTimeout(() => {dispatch(notification({msg: null, severity: null}))}, 10000) 
    }
}

export const { notification } = notificationSlice.actions

export default notificationSlice.reducer