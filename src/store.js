import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./store/counterSlice"
import positionReducer from "./store/positionSlice"
import userReducer from "./store/userSlice"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        position: positionReducer,
        user: userReducer
    }
})