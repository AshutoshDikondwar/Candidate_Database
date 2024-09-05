import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import candidateReducer from "./slices/candidateSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        candidate: candidateReducer
    },
    devTools: true
})

export default store;