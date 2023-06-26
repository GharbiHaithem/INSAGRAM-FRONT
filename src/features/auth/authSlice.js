import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authServices from './authService'
const getTokenFromStoorage = JSON.parse(localStorage.getItem('user')) 
const initState = {
    user: getTokenFromStoorage,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    isLogin: false
}
export const createUser = createAsyncThunk('/auth/create', async (data, thunkAPI) => {
    try {
        console.log(data)
        return await authServices.createUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const loginUser = createAsyncThunk('/auth/login', async (data, thunkAPI) => {
    try {
        return await authServices.loginUser(data)
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})
export const forgotpassword = createAsyncThunk('/auth/forgotpassword',async(data,thunkAPI)=>{
    try {
       return await authServices.forgotPassword(data)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true
        })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.createUser = action.payload
            })
            .addCase(createUser.rejected,(state,action)=>{
                console.log(action)
                state.isLoading =false
                state.isSuccess=false
                state.isError=true
                state.message = ''
            })
            .addCase(loginUser.pending,(state)=>{
                state.isLoading = true
            }).addCase(loginUser.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.isError=false
                state.user= action.payload
                state.isLogin = true
            }).addCase(loginUser.rejected,(state,action)=>{
                console.log(action.payload);
                state.isLoading=false
                state.isSuccess=false
                state.isError=true
                state.message=action.payload.response.data.message
            })
            .addCase(forgotpassword.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(forgotpassword.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess = true
                state.token = action.payload.token
            })
    }
})
export default authSlice.reducer