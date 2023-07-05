import api from "../http"

import { AxiosResponse } from "axios"
import { AuthResponse } from "../models/authResponse"
import { User } from "../models/user"

export const getUsers = async (): Promise<AxiosResponse<User[]>> => {
    return api.get<User[]>('/user/10')
}
