import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import uploadServices from './upload.service'
const initialState = {
    images :[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
}
export const upload = createAsyncThunk('/upload', async(data,thunkAPI)=>{
    try{
        const formData =new FormData()
        for(let i =0 ; i<data.length ;i++){
            formData.append('images',data[i])
        }
        return await uploadServices.uploadImages(formData)
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
export const resetState = createAction('/resetUploadImg')

export const uploadSlice = createSlice({
    name:'upload',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(upload.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(upload.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.images=action.payload
        })
        .addCase(upload.rejected,(state,action)=>{
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
        .addCase(resetState,(state)=>{
            state.images=[]
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
        })
    }
})
export default uploadSlice.reducer