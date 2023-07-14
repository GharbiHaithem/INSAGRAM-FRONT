import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authServices from './authService'
const getTokenFromStoorage = JSON.parse(localStorage.getItem('user')) 
const initState = {
    user: getTokenFromStoorage,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    isLogin: false,
    dataUserId:[],
    userUpdated :false
}
console.log(initState.user)
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

  export const  users = createAsyncThunk('/auth/getusers',async(thunkAPI)=>{
    try {
       return await authServices.allusers()  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  
  export const  suggestusers = createAsyncThunk('/auth/suggestusers',async(thunkAPI)=>{
    try {
       return await authServices.suggestionusers()  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  export const  followUer = createAsyncThunk('/auth/follow',async(id,thunkAPI)=>{
    try {
       return await authServices.followuser(id)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  export const  unfollowUer = createAsyncThunk('/auth/unfollow',async(id,thunkAPI)=>{
    try {
       return await authServices.unfollowuser(id)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  export const  refreshdata = createAsyncThunk('/auth/refreshuser',async(thunkAPI)=>{
    try {
       return await authServices.refreshuser()  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })

  export const  getAuser = createAsyncThunk('/auth/getUser',async(id,thunkAPI)=>{
    try {
       return await authServices.user(id)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  export const  getAuserBySearch = createAsyncThunk('/search/getUser',async(searchQuery,thunkAPI)=>{
    try {
       return await authServices.searchUser(searchQuery)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  export const  updateProfileUser = createAsyncThunk('/user/update/profile',async(data,thunkAPI)=>{
    try {
       return await authServices.updateProfileUser(data)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
  })
  export const logout = createAction('/user/logout')
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
            .addCase(users.pending,(state)=>{
                state.isLoading  = true
            })
            .addCase(users.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(suggestusers.pending,(state,action)=>{
                state.isLoading = true
            })
            .addCase(suggestusers.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.isLoading = false
                state.isSuccess = true
                state.suggestuser = action.payload

            })
            .addCase(suggestusers.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.isSuccess=false
                state.message = action.payload
            })
            .addCase(followUer.pending,(state,action)=>{
                state.isLoading = true
            })
            .addCase(followUer.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess=true
                state.follow = action.payload
                let xdata = Object.assign({},state.dataUserId)
                xdata = (JSON.parse(JSON.stringify(xdata)))
                console.log(xdata)
                const arr = Object.values(xdata);
                console.log(arr)
                state.dataUserId = arr.map(user => ({
                    ...user,
                    following: [...user.following, action.payload.newuser]
                  }));
            })
            .addCase(followUer.rejected,(state,action)=>{
                state.isLoading = false
                state.isError=true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(refreshdata.pending,(state,action)=>{
                state.isLoading = true
            })
            .addCase(refreshdata.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess=true
                state.user = action.payload
            })
            .addCase(refreshdata.rejected,(state,action)=>{
                state.isLoading = false
                state.isError=true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(unfollowUer.pending,(state,action)=>{
                state.isLoading = true
            })
            .addCase(unfollowUer.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess=true
                state.unfollow = action.payload
                console.log(action.payload.newuser._id)
            const userObject = Object.assign({}, state.user);
            console.log(userObject)
            const following = Object.assign({},userObject.following)
            
            const dataFollowing = Object.values(following);
            const filtredata =(dataFollowing.filter((x)=>x !==  action.payload.newuser._id)) 
           console.log(filtredata)
            state.user = { ...state.user, following: filtredata };
            console.log(state.dataUserId)
          let xdata = Object.assign({},state.dataUserId)
         xdata = (JSON.parse(JSON.stringify(xdata)))
       
         const arr = Object.values(xdata);
         console.log(arr)
         const res = arr.map(x => {
            const filteredFollowing = x.following.filter(y => y._id !== action.payload.newuser._id);
            return { ...x, following: filteredFollowing };
          });
        
    
       console.log(res);
    //    state.dataUserId = res[0]
        //  state.dataUserId = xdata.map(user => {
        //     console.log(user)
        //     if (user._id === action.payload.newuser._id) {
        //       return { ...user, following: res[0] };
             
        //     }
        //     return user;
        //   });
      state.dataUserId = res
          
            })
            .addCase(unfollowUer.rejected,(state,action)=>{
                state.isLoading = false
                state.isError=true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getAuser.pending,(state,action)=>{
                state.isLoading = true
            })
            .addCase(getAuser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.isSuccess = true;
                console.log(typeof action.payload)
                console.log((Array.isArray(action.payload)))
             
                        // state.dataUserId = [...state.dataUserId, action.payload];
                    
                        if (!state.dataUserId.some(item => item._id === action.payload._id)) {
                            state.dataUserId = [...state.dataUserId, action.payload];
                          }
                
                
                
            })
            .addCase(getAuser.rejected,(state,action)=>{
                state.isLoading = false
                state.isError=true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getAuserBySearch.pending,(state,action)=>{
                state.isLoading = true
            })
            .addCase(getAuserBySearch.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess=true
                state.search = [...action.payload]
            })
            .addCase(getAuserBySearch.rejected,(state,action)=>{
                state.isLoading = false
                state.isError=true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(updateProfileUser.pending,(state,action)=>{
                state.isLoading = true
                state.userUpdated=false
            })
            .addCase(updateProfileUser.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.isLoading = false
                state.isSuccess=true
                state.user = action.payload
                state.userUpdated = true
            })
            .addCase(updateProfileUser.rejected,(state,action)=>{
                state.isLoading = false
                state.isError=true
                state.isSuccess = false
                state.message = action.payload
                state.userUpdated = false
            })
            .addCase(logout,(state)=>{
                state.isSuccess=true
                state.user = {}
                state.isLogin = false
                localStorage.clear()
            })
    }
})
export default authSlice.reducer