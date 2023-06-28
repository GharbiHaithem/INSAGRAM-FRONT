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
export const getAllPosts = createAsyncThunk('/post/getall',async(thunkAPI)=>{
    try {
        return await postService.allposts()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const likePost = createAsyncThunk('/post/like',async(id,thunkAPI)=>{
    try {
        return await postService.likePost(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const dislikepost = createAsyncThunk('/post/dislike',async(id,thunkAPI)=>{
    try {
        return await postService.dislikePost(id)
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
        .addCase(likePost.pending,(state,action)=>{
            state.isLoading = false
        })
        .addCase(likePost.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.likes = action.payload
        })
        .addCase(likePost.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError=true
            state.message = action.payload
        })
        .addCase(dislikepost.pending,(state)=>{
            state.isLoading = true
        }).addCase(dislikepost.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.dislike = action.payload 

        }).addCase(dislikepost.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

    }
})
export default postSlice.reducer