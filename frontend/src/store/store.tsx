import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER} from 'redux-persist'
import  userReducer  from "./slice/userSlice";
import {api} from "./api"

//Persist Configuration for user 

const userPersistConfig = {key:'user', storage, whiteList:['user', 'isEmailVerified', 'isLoggedIn']}

//wrap reducers with persist config

const persistedUserReducer = persistReducer(userPersistConfig, userReducer)

export const store = configureStore({
    reducer:{
        [api.reducerPath]: api.reducer,
        user:persistedUserReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(api.middleware)
});

//setup the listener for RTK Query
setupListeners(store.dispatch)

//create a persister
export const persister =  persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.getState