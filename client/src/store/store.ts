import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducer from './reducers/userSlise'

const rootReducers = combineReducers({
    reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducers
    })
} 

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
