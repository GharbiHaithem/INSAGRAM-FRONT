import { createAction, createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import servicecomment from './commentService'

const initState = {
    comment : {},
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:''
}
export const createcomments = createAsyncThunk('/comment/create',async(data,thunkAPI)=>{
    try {
        return await servicecomment.createComment(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const receivecomment = createAction('/comment/receive')
export const commentSlice = createSlice({
    name:'comment',
    initialState:initState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(createcomments.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createcomments.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.comment = action.payload
        })
        .addCase(createcomments.rejected,(action,state)=>{
            state.isLoading  = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(receivecomment,(state,action)=>{
            state.comment = action.payload
        })
    }

})
export default commentSlice.reducer