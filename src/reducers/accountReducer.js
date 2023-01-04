import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from '../services/account'
import { updateNotification } from "../reducers/notificationReducers";
import ERROR from "../errorMsg";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
    "auth/register",
    async (userCredentials, thunkAPI) => {
      try {
        const response = await loginService.register(userCredentials);
        return response.data;
      } catch (error) {
        if (error.response.data.error === ERROR.usedEmail ) {
          thunkAPI.dispatch(updateNotification({msg: ERROR.usedEmail,  severity: 'error'}));
          return thunkAPI.rejectWithValue();
        }
        else if (error.response.data.error === ERROR.shortPassWord)  {
          thunkAPI.dispatch(updateNotification({msg: ERROR.shortPassWord, severity: 'error'}));
          return thunkAPI.rejectWithValue();
        }

      }
    }
  );

export const login = createAsyncThunk(
    "auth/login",
    async (userCredentials, thunkAPI) => {
        try {
            const data = await loginService.login(userCredentials)
            return { user: data }
        } catch (error) {
            if (error.response.data.error === ERROR.invalidCred) {
              thunkAPI.dispatch(updateNotification({msg: ERROR.invalidCred, severity: 'error'}));
              return thunkAPI.rejectWithValue();
            }

        }
    }
)

export const logout = createAsyncThunk("auth/logout", async () => {
    await loginService.logout();
  });

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
  
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
      [register.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
      },
      [register.rejected]: (state, action) => {
        state.isLoggedIn = false;
      },
      [login.fulfilled]: (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      },
      [login.rejected]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      },
      [logout.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      },
    },
  });

const { reducer } = authSlice;
export default reducer;


