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
    console.log(data)
    try {
        return await postService.createPost(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getAllPosts = createAsyncThunk('/post/getall',async(thunkAPI)=>{
    try {
        return await postService.allposts()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const likedislikePost = createAsyncThunk('/post/likedislike',async(data,thunkAPI)=>{
    try {
        return await postService.likedislikePost(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deletePost = createAsyncThunk('/post/delete',async(id,thunkAPI)=>{
    try {
        return await postService.deletePost(id)
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
            state.postcreated = action.payload 

        })
        .addCase(createposts.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess=false
            state.isError=true
            state.message = action.payload.response.data.message
        })
        .addCase(getAllPosts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllPosts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.isError =false
            state.posts = action.payload
        })
        .addCase(getAllPosts.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message = action.payload    

        })
       
        .addCase(likedislikePost.pending,(state)=>{
            state.isLoading = true
        }).addCase(likedislikePost.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.dislike = action.payload 

        }).addCase(likedislikePost.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deletePost.pending,(state)=>{
            state.isLoading = true
        }).addCase(deletePost.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.postDeleted = action.payload.post 
            state.commentsDeleted = action.payload.comments

        }).addCase(deletePost.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        


    }
})
export default postSlice.reducer