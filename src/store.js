import { configureStore } from '@reduxjs/toolkit';

import notesReducer from './reducers/notesReducer'
import accountReducer from './reducers/accountReducer'
import notificationReducer from './reducers/notificationReducers'
import groupsReducer from './reducers/groupsReducer'

const store = configureStore({
    reducer: {
        notes: notesReducer,
        groups: groupsReducer,
        account: accountReducer,
        notification: notificationReducer
    }
})

export default store