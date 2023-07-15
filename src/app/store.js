import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import uploadReducer from '../features/upload/upload.slice'
import postReducer from '../features/post/postSlice'
import commentReducer from '../features/comment/commentSlice'
import upload_vd_Reducer from '../features/uploadVideo/uploadSlice'
import chatReducer from '../features/chat/chatSlice'
const middleware = getDefaultMiddleware({
    // Exclude the SerializableStateInvariantMiddleware
    serializableCheck: false,
  });
  
export const store= configureStore({
    reducer:{
    auth:authReducer,
    upload:uploadReducer,
    post : postReducer,
    comment:commentReducer,
    upload_vd : upload_vd_Reducer,
    chat:chatReducer,
    middleware,
    }
})