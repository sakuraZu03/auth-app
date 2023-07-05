import {User} from './user'

export interface Error {
    status: number,
    message: string
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    error: Error,
    isLoading: boolean,
    user: User 
}