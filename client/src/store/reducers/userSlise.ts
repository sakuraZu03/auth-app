import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {User} from '../../models/user'
import { AuthResponse, Error } from '../../models/authResponse'


const initialError: Error={
    status: 200,
    message: "no error"
}

const initialUser: User = {
    id: 0,
    email: "",
    password: "",
    isActivated: false,
    activationLink: "",
} 
    
const initialState: AuthResponse = {
    accessToken: "",
    refreshToken: "",
    error: initialError,
    isLoading: false,   
    user: initialUser,
}
    
export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = true
        },
        loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.error = initialError
            state.isLoading = false
        },
        setError: (state, action: PayloadAction<Error>) => {            
            state.error = {
                status: action.payload.status,
                message: action.payload.message
            }
            state.isLoading = false
        },
        logoutSuccess: (state, action: PayloadAction<null>) => {
            state = initialState
        },
    }
        
}) 

export default userSlice.reducer;