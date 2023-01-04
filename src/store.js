import { configureStore } from '@reduxjs/toolkit';

import notesReducer from './reducers/notesReducer'
import accountReducer from './reducers/accountReducer'
import notificationReducer from './reducers/notificationReducers'

const store = configureStore({
    reducer: {
        notes: notesReducer,
        account: accountReducer,
        notification: notificationReducer
    }
})

export default store