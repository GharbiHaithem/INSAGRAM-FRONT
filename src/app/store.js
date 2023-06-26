import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import uploadReducer from '../features/upload/upload.slice'
import postReducer from '../features/post/postSlice'
export const store= configureStore({
    reducer:{
    auth:authReducer,
    upload:uploadReducer,
    post : postReducer
    }
})