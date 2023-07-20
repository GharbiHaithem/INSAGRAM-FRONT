import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import chatservice from './chatService'
const getTokenFromStoorage = JSON.parse(localStorage.getItem('user')) 
const initState = {
    conversation: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    isLogin: false,
    conversationcreated: [],
    showconversation : false,
    hideconversation : false
}
export const  getchatUser = createAsyncThunk('/chat/user',async(id,thunkAPI)=>{
    try {
       return await chatservice.userChat(id)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  export const  getmessage = createAsyncThunk('/chat/get/message',async(id,thunkAPI)=>{
    try {
       return await chatservice.getMessage(id)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  export const  createmessage = createAsyncThunk('/chat/create/message',async(data,thunkAPI)=>{
    try {
       return await chatservice.createmessage(data)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  export const  createconv = createAsyncThunk('/chat/create/conversation',async(data,thunkAPI)=>{
    try {
       return await chatservice.createconversation(data)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  export const findConversation = createAsyncThunk('/chat/findconversation',async(data,thunkAPI)=>{
    try {
        return await chatservice.findConversation(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
  })
  export const showconversation = createAction('/chat/showconversation')
  export const hideconversation = createAction('/chat/hideconversation')
  export const resetALLConversation = createAction('/chat/resetchat')
export const chatSlice = createSlice({
    name: 'chat',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getchatUser.pending, (state) => {
            state.isLoading = true
        })
            .addCase(getchatUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.conversation = action.payload
            })
            .addCase(getchatUser.rejected,(state,action)=>{
                console.log(action)
                state.isLoading =false
                state.isSuccess=false
                state.isError=true
                state.message = ''
            })
            .addCase(getmessage.pending, (state) => {
                state.isLoading = true
            })
                .addCase(getmessage.fulfilled, (state, action) => {
                    console.log(action.payload);
                    state.isLoading = false
                    state.isSuccess = true
                    state.getedmessage = action.payload
                })
                .addCase(getmessage.rejected,(state,action)=>{
                    console.log(action)
                    state.isLoading =false
                    state.isSuccess=false
                    state.isError=true
                    state.message =action.payload
                })
                .addCase(createmessage.pending, (state) => {
                    state.isLoading = true
                })
                    .addCase(createmessage.fulfilled, (state, action) => {
                        console.log(action.payload);
                        state.isLoading = false
                        state.isSuccess = true
                        state.messagecreated = action.payload
                    })
                    .addCase(createmessage.rejected,(state,action)=>{
                        console.log(action)
                        state.isLoading =false
                        state.isSuccess=false
                        state.isError=true
                        state.message =action.payload
                    })
                    .addCase(createconv.pending, (state) => {
                        state.isLoading = true
                    })
                        .addCase(createconv.fulfilled, (state, action) => {
                            console.log(action.payload);
                            state.isLoading = false
                            state.isSuccess = true
                            state.conversation = [...state.conversation,action.payload]
                            state.conversationcreated =[...state.conversationcreated, action.payload];
                        })
                        .addCase(createconv.rejected,(state,action)=>{
                            console.log(action)
                            state.isLoading =false
                            state.isSuccess=false
                            state.isError=true
                            state.message =action.payload
                        })
                        .addCase(findConversation.pending,(state)=>{
                            state.pending = true
                        })
                        .addCase(findConversation.fulfilled,(state,action)=>{
                            state.pending = false
                            state.isSuccess = true
                            state.findConversation = action.payload
                        })
                        .addCase(findConversation.rejected,(state,action)=>{
                            state.isLoading = false
                            state.isSuccess = false
                            state.isError = true
                            state.message = action.payload
                        })
                        .addCase(showconversation,(state)=>{
                            state.showconversation = true
                            state.hideconversation = false
                        })
                        .addCase(hideconversation,(state)=>{
                            state.hideconversation = true
                            state.showconversation = false
                        })
                        
                
            
         
            
         
            

            
        
            
       
            
    }
})
export default chatSlice.reducer