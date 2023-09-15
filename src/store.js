import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./store/counterSlice"
import positionReducer from "./store/positionSlice"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        position: positionReducer,
    }
})