import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import uploadServices from './uploadService'
const initialState = {
    videos :[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
}
export const upload_vd = createAsyncThunk('/upload/video', async(data,thunkAPI)=>{
    console.log(data)
    try{
        const formData =new FormData()
        for(let i =0 ; i<data.length ;i++){
            formData.append('video',data[i])
        }

        return await uploadServices.uploadVideo(formData)
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})
export const deleteImg = createAsyncThunk('/delete-img',async(id,thunkAPI)=>{
    try {
     return await uploadServices.deleteImages(id)   
    } catch (error) {
     return thunkAPI.rejectWithValue(error)   
    }
})

export const upload_vd_Slice = createSlice({
    name:'uploadvideo',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(upload_vd.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(upload_vd.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess=true
            state.videos=action.payload
        })
        .addCase(upload_vd.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
            state.images=[]
        })
        builder.addCase(deleteImg.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteImg.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.images=[]
        })
        .addCase(deleteImg.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
            state.images=[]
        })
    }
})
export default upload_vd_Slice.reducer