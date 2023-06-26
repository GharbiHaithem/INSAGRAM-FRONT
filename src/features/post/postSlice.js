import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import postService from './postService'
const initState= {
    posts :[],
    isLoading : false,
    isSuccess:false,
    isError:false,
    message:'',

}
export const createposts = createAsyncThunk('/post/create',async(data,thunkAPI)=>{
    try {
        return await postService.createPost(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
const postSlice = createSlice({
    name:'post',
    initialState:initState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createposts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createposts.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = true
            state.isError = false 
            state.posts = action.payload 

        })
        .addCase(createposts.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess=false
            state.isError=true
            state.message = action.payload.response.data.message
        })
    }
})
export default postSlice.reducer